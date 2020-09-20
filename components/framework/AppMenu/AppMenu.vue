<template>
  <div>
    <div :class="classes" class="app-menu">
      <icon :size="32" @click="handleToggleMenu" class="app-menu-handle" type="iconcaidan"></icon>
      <ul class="app-menu-list">
        <li v-for="(nav, index) in navList" :key="index" class="app-menu-item">
          <nuxt-link :to="nav.path" class="app-menu-link" active-class="current">{{ nav.name }}</nuxt-link>
        </li>
        <li class="app-menu-item app-menu-login">
          <login-control :theme="theme" />
        </li>
      </ul>
    </div>
    <div v-if="isShowMenu" @click="handleToggleMenu" class="app-menu-mask"></div>
  </div>
</template>

<script>
import LoginControl from '@/components/framework/AppMenu/LoginControl'
import Icon from '@/components/base/Icon/Icon'
import { mapGetters } from 'vuex'

export default {
  name: 'AppMenu',
  components: {
    Icon,
    LoginControl
  },
  props: {
    theme: {
      type: String,
      default: 'white'
    }
  },
  data() {
    return {
      isShowMenu: false
    }
  },
  computed: {
    ...mapGetters(['navList']),
    classes() {
      return [this.isShowMenu ? 'app-menu-show' : '', `app-menu-${this.theme}`]
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleToggleMenu() {
      this.isShowMenu = !this.isShowMenu
    }
  }
}
</script>

<style lang="less" scoped>
.app-menu-mask {
  position: fixed;
  top: @heightHeader;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 990;
  background-color: rgba(0, 0, 0, 0.3);
}
.app-menu {
  font-size: 0;
  &.app-menu-black {
    color: @colorTextWhite;
  }
  &.app-menu-white {
    color: @colorTextTitle;
  }
  .app-menu-handle {
    display: none;
    padding: 10px;
  }
  .app-menu-item {
    margin: 0 10px;
    display: inline-block;
    line-height: @heightHeader;
  }
  .app-menu-link {
    display: block;
    line-height: @heightHeader;
    position: relative;
    padding: 0 20px;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.25s ease;
    &:after {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 50%;
      height: 2px;
      width: 0;
      border-radius: 2px;
      background-image: @color;
      transition: all 0.3s ease;
    }
    &:hover {
      color: @colorPrimary;
      background: @color;
      -webkit-background-clip: text;
      color: transparent;
      &:after {
        width: 100%;
        left: 0;
      }
    }
    &.current {
      color: @colorPrimary;
      font-weight: 600;
      background: @color;
      -webkit-background-clip: text;
      color: transparent;
      &:after {
        width: 100%;
        left: 0;
      }
    }
  }
}

@media only screen and (max-width: @breakpoints-lg) {
  .app-menu {
    color: @colorTextTitle;
    .app-menu-handle {
      display: block;
    }
    .app-menu-list {
      height: 0;
      position: fixed;
      width: 100%;
      top: @heightHeader;
      left: 0;
      z-index: 1000;
      overflow: hidden;
      background-color: rgba(255, 255, 255, 0.95);
      .app-menu-item {
        display: block;
        text-align: center;
        line-height: 50px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }
      .app-menu-link {
        line-height: 50px;
        &:after {
          display: none;
        }
        &.current {
          color: @colorPrimary;
          font-weight: 600;
          background: @color;
          -webkit-background-clip: text;
          color: transparent;
        }
        &:hover {
          color: @colorPrimary;
          background: @color;
          -webkit-background-clip: text;
          color: transparent;
        }
      }
    }
    &.app-menu-show .app-menu-list {
      height: auto;
      overflow: inherit;
      top: @heightHeader;
    }
  }
}
.app-menu-login {
  vertical-align: top;
  &:after {
    display: none;
  }
}
</style>
