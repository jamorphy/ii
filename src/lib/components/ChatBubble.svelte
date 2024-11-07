<script>
  export let message;
</script>

<div class="message {message.isUser ? 'user' : 'bot'}">
  <div class="message-content">
    {message.text}
  </div>
  <div class="message-timestamp">
    {message.timestamp.toLocaleTimeString()}
  </div>
</div>

<style>
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
</style>