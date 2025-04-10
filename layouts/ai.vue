<template>
  <ai-layout>
    <nuxt />
  </ai-layout>
</template>

<script>
import AiLayout from '@/components/framework/AiLayout/AiLayout.vue'
export default {
  name: 'AiLayoutWrapper',
  components: {
    AiLayout
  },
  head() {
    return {
      title: 'Ai - 明么的博客'
    }
  }
}
</script>

<style lang="scss" scoped></style>
