<template>
  <div class="ai-page">
    <chat-side />
    <chat-box />
  </div>
</template>

<script>
import ChatSide from '@/components/kit/ChatSide/ChatSide.vue'
import ChatBox from '@/components/kit/ChatBox/ChatBox.vue'
export default {
  name: 'AiIndex',
  layout: 'ai',
  components: {
    ChatSide,
    ChatBox
  }
}
</script>

<style lang="less" scoped>
.ai-page {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
