<template>
  <div class="admin-content-wrap">
    <admin-header />
    <div class="admin-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AdminHeader from '@/components/framework/AdminHeader/AdminHeader'

export default {
  name: 'AdminContent',
  components: {
    AdminHeader
  }
}
</script>

<style lang="less" scoped>
.admin-content-wrap {
  height: 100%;
  .admin-content {
    padding: 16px;
    height: calc(100% - @heightHeader);
  }
}
</style>
