<script>
  import ChatInput from '../lib/components/ChatInput.svelte';
  import ChatBubble from '../lib/components/ChatBubble.svelte';

  // providers
  import { AnthropicProvider } from '../lib/providers/anthropic.js';
  import { OpenAIProvider } from '$lib/providers/openai';

  const llm = new AnthropicProvider(import.meta.env.VITE_ANTHROPIC_API_KEY);
  //const llm = new OpenAIProvider(import.meta.env.VITE_OPENAI_API_KEY);

  let messages = [];

  async function handleMessage(event) {
    const userMessage = {
      text: event.detail,
      timestamp: new Date(),
      isUser: true
    };
    messages = [...messages, userMessage];

    try {
      const response = await llm.sendMessage(event.detail);
      messages = [...messages, {
        text: response,
        timestamp: new Date(),
        isUser: false
      }];
    } catch (error) {
      messages = [...messages, {
        text: error,
        timestamp: new Date(),
        isUser: false,
        isError: true
      }];
    }
  }
</script>

<div class="chat-container">
  <div class="messages">
    {#each messages as message}
      <ChatBubble {message} />
    {/each}
  </div>
  <div class="input-spacer"></div>
</div>
<ChatInput on:message={handleMessage} />

<style>
  .chat-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .message {
    max-width: 80%;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
  }

  .message.user {
    align-self: flex-end;
    background-color: #396cd8;
    color: white;
  }

  .message.bot {
    align-self: flex-start;
    background-color: #3f3f3f;
    color: white;
  }

  .message-content {
    margin-bottom: 0.25rem;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .message-timestamp {
    font-size: 0.75rem;
    opacity: 0.7;
    text-align: right;
  }

  .input-spacer {
    height: 76px;
  }
</style>
