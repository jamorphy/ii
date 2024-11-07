<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let message = '';

  function handleSubmit() {
    if (!message.trim()) return;
    dispatch('message', message.trim());
    message = '';
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
</script>

<div class="input-wrapper">
  <div class="input-container">
    <textarea
      bind:value={message}
      placeholder="Type your message..."
      on:keydown={handleKeydown}
      rows="1"></textarea>
    <button on:click={handleSubmit}>Send</button>
  </div>
</div>

<style>
  .input-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #2f2f2f;
    border-top: 1px solid #444;
  }

  .input-container {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    max-width: 100%;
  }

  textarea {
    flex: 1;
    padding: 0.75rem;
    min-height: 44px;
    max-height: 200px;
    border: 1px solid #444;
    border-radius: 4px;
    background: #1f1f1f;
    color: #fff;
    font-family: inherit;
    font-size: 1rem;
    resize: none;
  }

  textarea:focus {
    outline: none;
    border-color: #396cd8;
  }

  button {
    padding: 0.5rem 1rem;
    height: 44px;
    background-color: #396cd8;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #2954b5;
  }
</style>