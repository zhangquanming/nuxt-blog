<template>
  <header class="ai-header">
    <nav class="ai-menu">
      <ul class="ai-menu-list">
        <li v-for="(nav, index) in navList" :key="index" class="ai-menu-item">
          <nuxt-link :to="nav.path" class="ai-menu-link" active-class="current">{{ nav.name }}</nuxt-link>
        </li>
        <li v-if="userInfo && userInfo._id === '5f87ac69bcde488243ec47fb'" class="ai-menu-item">
          <nuxt-link to="/admin" class="ai-menu-link" active-class="current">后台管理</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AiHeader',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['navList', 'userInfo'])
  }
}
</script>

<style lang="less" scoped>
.ai-header {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  .ai-menu {
    padding: 0 24px;
    border-radius: 24px;
    height: 48px;
    background: linear-gradient(117deg, #ffffff1a 17%, #ffffff0d 51%);
    -webkit-backdrop-filter: blur(40px);
    backdrop-filter: blur(40px);
    pointer-events: auto;
    -webkit-backdrop-filter: blur(40px);
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    .ai-menu-list {
      height: 100%;
      display: flex;
      align-items: center;
      .ai-menu-item {
        height: 100%;
        display: flex;
        align-items: center;
        .ai-menu-link {
          white-space: nowrap;
          font-size: 16px;
          color: #333;
          padding: 0 10px;
          position: relative;
          transition: color 0.25s ease;
          &:hover {
            color: @colorPrimary;
            background: @color;
            -webkit-background-clip: text;
            color: transparent;
          }
          &.current {
            color: @colorPrimary;
            font-weight: 600;
            background: @color;
            -webkit-background-clip: text;
            color: transparent;
          }
        }
      }
    }
  }
}
</style>
