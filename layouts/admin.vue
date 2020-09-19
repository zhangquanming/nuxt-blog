<template>
  <div class="admin-layout-wrap">
    <div class="admin-layout-left">
      <admin-side />
    </div>
    <div class="admin-layout-main">
      <admin-content />
    </div>

    <SignIn />
    <SignUp />
  </div>
</template>

<script>
import AdminSide from '@/components/framework/AdminSide/AdminSide'
import AdminContent from '@/components/framework/AdminContent/AdminContent'

import SignIn from '@/components/kit/SignIn/SignIn'
import SignUp from '@/components/kit/SignUp/SignUp'

export default {
  name: 'AdminLayout',
  components: {
    AdminSide,
    AdminContent,

    SignIn,
    SignUp
  },
  head() {
    return {
      title: '后台管理系统-明么的博客'
    }
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
    width: 200px;
    height: 100%;
  }
  .admin-layout-main {
    height: 100%;
    overflow: auto;
  }
}
</style>
