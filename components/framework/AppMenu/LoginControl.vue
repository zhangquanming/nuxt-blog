<template>
  <div>
    <div v-if="userInfo" class="dropdown-menu-wrap">
      <btn :to="{ path: '/user' }" theme="gradient" size="small" shape="circle" icon="iconuser">{{ userInfo.nicName || userInfo.userName }}</btn>
      <div :class="['dropdown-menu', `dropdown-menu-${theme}`]">
        <concave-radius-box :size="18" :theme="theme">
          <btn :theme="theme === 'white' ? 'text' : 'white'" :to="{ path: '/user/write' }" icon="iconwenzhang" shape="rect" long>发布文章</btn>
          <btn :theme="theme === 'white' ? 'text' : 'white'" :to="{ path: '/user/avatar' }" icon="iconxiugaitouxiang_gerenzhongxin_" shape="rect" long>修改头像</btn>
          <btn :theme="theme === 'white' ? 'text' : 'white'" :to="{ path: '/user/profile' }" icon="iconbianjiziliao" shape="rect" long>编辑资料</btn>
          <btn :theme="theme === 'white' ? 'text' : 'white'" @click="handleSignOut" icon="iconsignout-copy" shape="rect" long>退出账号</btn>
        </concave-radius-box>
      </div>
    </div>
    <btn-group v-else>
      <btn @click="handleSignUp" theme="assist" size="small" shape="circle" icon="iconsignup">注册</btn>
      <btn @click="handleSignIn" theme="primary" size="small" shape="circle" icon="iconsignin">登录</btn>
    </btn-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Btn from '@/components/base/Btn/Btn'
import BtnGroup from '@/components/base/BtnGroup/BtnGroup'
import ConcaveRadiusBox from '@/components/kit/ConcaveRadiusBox/ConcaveRadiusBox'

export default {
  name: 'LoginControl',
  components: {
    Btn,
    BtnGroup,
    ConcaveRadiusBox
  },
  props: {
    theme: String
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions({
      toggleSignUpModal: 'toggleSignUpModal',
      toggleSignInModal: 'toggleSignInModal'
    }),
    /**
     * @desc 登录
     */
    handleSignIn() {
      this.toggleSignInModal(true)
      this.toggleSignUpModal(false)
    },

    /**
     * @desc 注册
     */
    handleSignUp() {
      this.toggleSignInModal(false)
      this.toggleSignUpModal(true)
    },

    /**
     * @desc 退出登录
     */
    handleSignOut() {
      sessionStorage.clear()
      this.$store.dispatch('changeUserInfo', null)
      this.$store.dispatch('changeToken', '')
    }
  }
}
</script>

<style lang="less" scoped>
.dropdown-menu-wrap {
  position: relative;
  .dropdown-menu {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 99;
    display: none;
    color: #fff;
    line-height: initial;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .dropdown-menu-white {
    background-color: rgba(255, 255, 255, 0.9);
  }
  .dropdown-menu-black {
    background-color: @colorTextTitle;
  }
  &:hover .dropdown-menu {
    display: block;
  }
}
</style>
