const express = require('express');
const aiRoutes = require('./routes/ai.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/ai', aiRoutes);
app.use(express.static('public'));

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
  });
});

module.exports = app;
