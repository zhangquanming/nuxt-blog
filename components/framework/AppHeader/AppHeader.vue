<template>
  <div class="app-header-wrap">
    <div class="z-container">
      <div class="app-header">
        <router-link to="/" class="app-header-brand">
          <logo :h="40" />
        </router-link>
        <app-menu />
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
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.9);
  color: @colorTextTitle;
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: @heightHeader;
  }
}
@media only screen and (max-width: @breakpoints-lg) {
  .app-header-wrap {
    background-color: rgba(255, 255, 255, 0.95);
  }
}
</style>
