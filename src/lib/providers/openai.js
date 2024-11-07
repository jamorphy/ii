import OpenAI from 'openai';

export class OpenAIProvider {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('API key is missing!');
    }
    this.client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
    this.messageHistory = [];
  }

  async sendMessage(message) {
    try {
      this.messageHistory.push({ role: 'user', content: message });

      const response = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: this.messageHistory
      });

      const assistantMessage = response.choices[0].message;
      this.messageHistory.push(assistantMessage);

      return assistantMessage.content;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
}