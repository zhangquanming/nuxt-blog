<template>
  <div class="admin-header-wrap">
    <div></div>
    <app-menu />
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
  padding: 0 16px;
  background: rgba(0, 0, 0, 0.8);
}
</style>
