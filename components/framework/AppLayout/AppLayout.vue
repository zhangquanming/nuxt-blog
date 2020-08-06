<template>
  <div class="app-layout-wrap">
    <app-header />
    <div class="app-content">
      <slot></slot>
    </div>
    <app-footer />

    <sign-in />
    <sign-up />
  </div>
</template>

<script>
import AppHeader from '@/components/framework/AppHeader/AppHeader'
import AppFooter from '@/components/framework/AppFooter/AppFooter'

import SignIn from '@/components/kit/SignIn/SignIn'
import SignUp from '@/components/kit/SignUp/SignUp'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppFooter,
    SignIn,
    SignUp
  }
}
</script>

<style lang="less" scoped>
.app-layout-wrap {
  height: 100%;
  .app-content {
    padding-top: @heightHeader + 20;
    min-height: 100%;
    padding-bottom: @heightFooter + 20;
    margin-bottom: -@heightFooter;
  }
}
</style>
