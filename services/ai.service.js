const { ChatOpenAI } = require('@langchain/openai');
const { HumanMessage, SystemMessage } = require('@langchain/core/messages');
const config = require('../config/index.js');
const { articlePrompt } = require('../constant/index.ts');

class AIService {
  constructor() {
    this.chat = new ChatOpenAI(
      {
        modelName: config.MODEL_NAME,
        temperature: 0.8,
        streaming: false,
        openAIApiKey: config.OPENAI_API_KEY,
      },
      {
        basePath: config.OPENAI_API_BASE,
        baseOptions: {},
      }
    );

    this.chatHistory = [];
    this.systemMessage = new SystemMessage(articlePrompt);
  }

  async search(query) {
    try {
      console.log('正在处理查询:', query);

      const messages = [this.systemMessage, new HumanMessage(query)];

      // 调用 AI 接口
      const result = await this.chat.invoke(messages);
      console.log(result?.content);
      return result?.content;
    } catch (error) {
      console.error('AI服务错误:', error);
      console.error('错误详情:', error.response?.data || error.message);
      throw new Error('AI服务处理失败');
    }
  }

  clearHistory() {
    this.chatHistory = [];
  }
}

module.exports = new AIService();
