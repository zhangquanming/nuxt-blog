<template>
  <div class="admin-layout-wrap">
    <div class="admin-layout-left">
      <admin-side />
    </div>
    <div class="admin-layout-main">
      <admin-content />
    </div>
  </div>
</template>

<script>
import AdminSide from '@/components/framework/AdminSide/AdminSide'
import AdminContent from '@/components/framework/AdminContent/AdminContent'

export default {
  name: 'AdminLayout',
  components: {
    AdminSide,
    AdminContent
  }
}
</script>

<style lang="less" scoped>
.admin-layout-wrap {
  height: 100%;
  width: 100%;
  .admin-layout-left {
    float: left;
    position: relative;
    width: 240px;
    height: 100%;
  }
  .admin-layout-main {
    height: 100%;
    overflow: auto;
  }
}
</style>
