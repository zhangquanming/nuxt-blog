<template>
  <div class="admin-layout">
    <AdminLayout>
      <nuxt />
    </AdminLayout>

    <SignIn />
    <SignUp />
  </div>
</template>

<script>
import AdminLayout from '@/components/framework/AdminLayout/AdminLayout'

import SignIn from '@/components/kit/SignIn/SignIn'
import SignUp from '@/components/kit/SignUp/SignUp'

export default {
  name: 'AdminLayoutWrapper',
  components: {
    AdminLayout,

    SignIn,
    SignUp
  },
  head() {
    return {
      title: '后台管理系统 - 明么的博客'
    }
  }
}
</script>

<style lang="less" scoped>
.admin-layout {
  height: 100%;
  width: 100%;
}
</style>
