# My Search API

基于 OpenAI 和 LangChain 的搜索服务 API。

## 环境要求

- Node.js >= 14
- pnpm (推荐) 或 npm

## 安装

```bash
# 使用 pnpm
pnpm install

# 或使用 npm
npm install
```

## 环境变量配置

在项目根目录创建 `.env` 文件，配置以下环境变量：

| 变量名              | 说明                | 必填 | 示例值                    |
| ------------------- | ------------------- | ---- | ------------------------- |
| PORT                | 服务端口号          | 是   | 3000                      |
| OPENAI_API_KEY      | OpenAI API 密钥     | 是   | sk-xxx...                 |
| OPENAI_API_BASE_URL | OpenAI API 基础 URL | 否   | https://api.openai.com/v1 |
| MODEL_NAME          | 使用的模型名称      | 否   | gpt-3.5-turbo             |
| MAX_TOKENS          | 最大 token 数       | 否   | 2000                      |
| TEMPERATURE         | 温度参数            | 否   | 0.7                       |

## 启动服务

```bash
# 开发环境
pnpm dev

# 生产环境
pnpm start
```

## API 接口文档

### 1. AI 搜索接口

**请求地址**：`/api/ai/search`

**请求方法**：POST

**请求头**：

```json
{
  "Content-Type": "application/json"
}
```

**请求参数**：

```json
{
  "query": "搜索关键词"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "result": "搜索结果内容"
  },
  "message": "success"
}
```

### 2. AI 批量处理接口

**请求地址**：`/api/ai/batch`

**请求方法**：POST

**请求头**：

```json
{
  "Content-Type": "application/json"
}
```

**请求参数**：

```json
{
  "queries": "[\"第一个查询地址\", \"第二个查询地址\", \"第三个查询地址\"]"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "results": [
      {
        "input": "第一个查询内容",
        "output": "处理结果1",
        "success": true
      },
      {
        "input": "第二个查询内容",
        "output": "处理结果2",
        "success": true
      },
      {
        "input": "第三个查询内容",
        "output": "处理结果3",
        "success": true
      }
    ]
  },
  "message": "success"
}
```

**错误响应**：

```json
{
  "code": 500,
  "message": "处理失败的具体原因",
  "data": null
}
```

## 项目依赖

主要使用以下核心依赖：

- @langchain/openai: ^0.3.16
- @langchain/core: ^0.3.27
- express: ^4.18.2
- openai: ^4.77.3

## 开发说明

1. 项目使用 Express.js 框架构建
2. 使用 LangChain 进行 AI 模型调用
3. 支持热重载开发（通过 nodemon）

## 注意事项

1. 确保 `.env` 文件中的 API 密钥正确配置
2. API 密钥请勿提交到版本控制系统
3. 建议在 `.gitignore` 中添加 `.env` 文件

## 目录结构

```
.
├── config/          # 配置文件
├── controllers/     # 控制器
├── routes/         # 路由
├── services/       # 服务层
├── views/          # 视图文件
├── public/         # 静态资源
├── .env            # 环境变量
└── index.js        # 入口文件
```
