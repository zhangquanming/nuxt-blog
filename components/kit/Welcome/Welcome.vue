<template>
  <div class="welcome">
    <div class="welcome-title">
      <div class="welcome-icon">
        <img src="@/assets/images/logo_img_280.png" alt="LOGO" />
      </div>
      <div class="welcome-title">Hello, I'm Mingme</div>
    </div>
    <div class="welcome-description">我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~</div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .welcome-title {
    display: flex;
    align-items: center;
    .welcome-icon {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .welcome-title {
      font-size: 24px;
      font-weight: bold;
      margin-left: 16px;
      color: #000;
    }
  }
  .welcome-description {
    color: #404040;
    margin: 8px 0 20px;
    font-size: 14px;
  }
}
</style>
