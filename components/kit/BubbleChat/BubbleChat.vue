<template>
  <div class="bubble-chat">
    <div class="bubble-list">
      <Bubble v-for="(item, index) in list" :key="index" :loading="item.loading" :placement="item.role == 'user' ? 'end' : 'start'" :content="item.content" />
    </div>
  </div>
</template>

<script>
import Bubble from '@/components/kit/Bubble/Bubble.vue'
export default {
  name: 'BubbleChat',
  components: {
    Bubble
  },
  data() {
    return {
      list: []
    }
  }
}
</script>

<style lang="less" scoped>
.bubble-chat {
  flex: 1;
  .bubble-list {
    padding: 80px 0 40px;
  }
}
</style>
