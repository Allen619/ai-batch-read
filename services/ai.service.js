const { ChatOpenAI } = require('@langchain/openai');
const { HumanMessage, SystemMessage } = require('@langchain/core/messages');
const { RunnableParallel } = require('@langchain/core/runnables');
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

  /**
   * 批量处理 AI 请求
   * @param {Array<string>} requests - 请求数组
   * @returns {Promise<Array>} - 返回处理结果数组
   */
  async batchProcess(requests) {
    try {
      console.log(`开始并行处理 ${requests.length} 个请求`);

      // 为每个请求创建一个处理函数
      const parallelTasks = {};
      requests.forEach((request, index) => {
        parallelTasks[`task_${index}`] = async () => {
          const messages = [this.systemMessage, new HumanMessage(request)];
          const result = await this.chat.invoke(messages);
          return {
            input: request,
            output: result.content,
            success: true,
          };
        };
      });

      // 创建并行执行器
      const parallel = RunnableParallel.from(parallelTasks);

      // 并行执行所有请求
      const results = await parallel.invoke();

      // 转换结果格式
      return Object.values(results);
    } catch (error) {
      console.error('批量处理失败:', error);
      throw new Error('批量处理请求失败');
    }
  }
}

const aiService = new AIService();

module.exports = {
  aiService,
};
