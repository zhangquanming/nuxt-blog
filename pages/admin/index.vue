<template>
  <div class="page">
    <img :src="logoUrl" class="logo" alt="logo" />
    <div class="desc">后台管理系统</div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  layout: 'admin',
  data() {
    return {
      logoUrl: require('~/assets/images/logo.png')
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo {
    height: 100px;
  }
  .desc {
    margin-top: 30px;
    font-weight: 600;
    font-size: 80px;
  }
}
</style>
