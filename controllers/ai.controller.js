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

      const result = await aiService.search(query);

      // 直接返回完整的搜索结果
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('搜索处理错误:', error);
      res.status(500).json({
        success: false,
        message: '服务器处理请求失败',
      });
    }
  }
}

module.exports = new AIController();
