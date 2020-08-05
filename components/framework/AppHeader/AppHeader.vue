<template>
  <div class="app-header-wrap">
    <div class="z-container">
      <div class="app-header">
        <router-link to="/" class="app-header-brand">
          <logo :h="40" />
        </router-link>
        <AppMenu />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/base/Logo/Logo'
import AppMenu from '@/components/framework/AppMenu/AppMenu'

export default {
  name: 'AppHeader',
  components: {
    Logo,
    AppMenu
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.app-header-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  color: @colorTextSilver;
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: @heightHeader;
  }
}
</style>
