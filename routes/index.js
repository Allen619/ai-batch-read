const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

// 处理搜索请求
router.get('/search', (req, res) => {
  const query = req.query.q;
  // 这里后续可以添加搜索逻辑
  res.send(`您搜索的关键词是：${query}`);
});

module.exports = router;
