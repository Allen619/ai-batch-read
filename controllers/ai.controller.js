const aiService = require('../services/ai.service.js');

class AIController {
  async search(req, res) {
    try {
      const { query } = req.body;

      if (!query) {
        return res.status(400).json({
          success: false,
          message: '查询内容不能为空',
        });
      }

      const result = await aiService.aiService.search(query);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('搜索处理错误:', error);
      res.status(500).json({
        success: false,
        message: error.message || '服务器处理请求失败',
      });
    }
  }

  /**
   * 批量处理 AI 请求
   * @param {Object} req Express请求对象
   * @param {Object} res Express响应对象
   */
  async batchProcess(req, res) {
    try {
      const { queries } = req.body;
      // 验证输入
      if (!queries) {
        return res.status(400).json({
          success: false,
          message: '请求参数错误：queries 不能为空',
        });
      }

      let queryArray;
      // 尝试解析字符串为数组
      if (typeof queries === 'string') {
        try {
          const parsed = JSON.parse(queries);
          queryArray = Array.isArray(parsed) ? parsed : [parsed];
        } catch (e) {
          return res.status(400).json({
            success: false,
            message: '请求参数错误：queries 格式无效',
          });
        }
      } else {
        queryArray = queries;
      }

      // 严格验证数组
      if (!Array.isArray(queryArray)) {
        return res.status(400).json({
          success: false,
          message: '请求参数错误：queries 必须是数组',
        });
      }

      // 过滤掉空字符串并验证
      queryArray = queryArray.filter((q) => {
        return typeof q === 'string' && q.trim().length > 0;
      });

      if (queryArray.length === 0) {
        return res.status(400).json({
          success: false,
          message: '请求参数错误：queries 数组必须包含非空字符串',
        });
      }

      // 调用服务层的批量处理方法
      const results = await aiService.aiService.batchProcess(queryArray);

      res.json({
        success: true,
        data: results,
      });
    } catch (error) {
      console.error('批量处理失败:', error);
      res.status(500).json({
        success: false,
        message: error.message || '批量处理请求失败',
      });
    }
  }
}

module.exports = new AIController();
