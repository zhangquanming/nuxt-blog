<template>
  <div class="page">
    <div class="title">Mingme</div>
    <div class="desc">后台管理系统</div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  layout: 'admin'
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
  .title {
    font-weight: bold;
    font-size: 60px;
  }
  .desc {
    font-weight: bold;
    font-size: 50px;
  }
}
</style>
