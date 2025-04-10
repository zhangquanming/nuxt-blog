<template>
  <div class="ai-layout-wrap">
    <ai-header />
    <ai-content />

    <sign-in />
    <sign-up />
  </div>
</template>

<script>
import AiHeader from '@/components/framework/AiHeader/AiHeader.vue'
import AiContent from '@/components/framework/AiContent/AiContent.vue'

import SignIn from '@/components/kit/SignIn/SignIn'
import SignUp from '@/components/kit/SignUp/SignUp'

export default {
  name: 'AiLayout',
  components: {
    AiHeader,
    AiContent,
    SignIn,
    SignUp
  }
}
</script>

<style lang="less" scoped>
.ai-layout-wrap {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
