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
    overflow-y: auto;

    /* 设置滚动条的样式 */
    &::-webkit-scrollbar {
      width: 6px;
      border-radius: 12px;
      background-color: #c5c8ce;
    }

    /* 滚动槽 */
    &::-webkit-scrollbar-track {
      border-radius: 12px;
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 12px;
      background: #808695;
    }
  }
}
</style>
