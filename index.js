require('dotenv/config');
const app = require('./app.js');
const config = require('./config/index.js');

app.listen(config.PORT, () => {
  console.log(`服务器已启动，监听端口 ${config.PORT}`);
});
