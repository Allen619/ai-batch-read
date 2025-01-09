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

      // 将字符串按逗号分割成数组
      let queryArray =
        typeof queries === 'string'
          ? queries.split(',').map((q) => q.trim())
          : queries;

      // 过滤掉空字符串
      queryArray = queryArray.filter((q) => q && q.trim().length > 0);

      if (queryArray.length === 0) {
        return res.status(400).json({
          success: false,
          message: '请求参数错误：queries 必须包含非空内容',
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
