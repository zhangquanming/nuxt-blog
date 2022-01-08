<template>
  <div class="admin-header-wrap">
    <div></div>
    <app-menu theme="black" />
  </div>
</template>

<script>
import AppMenu from '@/components/framework/AppMenu/AppMenu'

export default {
  name: 'AdminHeader',
  components: {
    AppMenu
  }
}
</script>

<style lang="less" scoped>
.admin-header-wrap {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 50px;
  background: @colorTextTitle;
}
</style>
