import Anthropic from '@anthropic-ai/sdk';

export class AnthropicProvider {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('API key is missing!');
    }
    this.client = new Anthropic({
      apiKey: apiKey,
      defaultHeaders: {
        'Anthropic-Client': 'ii/1.0.0'
      },
      dangerouslyAllowBrowser: true
    });
    this.messageHistory = [];
  }

  async sendMessage(message) {
    try {
      this.messageHistory.push({ role: 'user', content: message });

      const response = await this.client.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages: this.messageHistory
      });

      const assistantMessage = { role: 'assistant', content: response.content[0].text };
      this.messageHistory.push(assistantMessage);

      return assistantMessage.content;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
}