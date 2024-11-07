<script>
  import ChatInput from '../lib/components/ChatInput.svelte';

  let messages = [];

  function handleMessage(event) {
    messages = [...messages, {
      text: event.detail,
      timestamp: new Date(),
      isUser: true
    }];

    setTimeout(() => {
      messages = [...messages, {
        text: "This is a dummy response from the bot.",
        timestamp: new Date(),
        isUser: false
      }];
    }, 1000);
  }
</script>

<div class="chat-container">
  <div class="messages">
    {#each messages as message}
      <div class="message {message.isUser ? 'user' : 'bot'}">
        <div class="message-content">
          {message.text}
        </div>
        <div class="message-timestamp">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
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
