<template>
  <app-layout>
    <div class="z-container">
      <div class="user-page-wrap">
        <div class="user-page-side">
          <div class="hidden-xs">
            <user-brief />
          </div>
          <card :padding="0" style="margin-bottom: 0;">
            <user-menu></user-menu>
          </card>
        </div>
        <div class="user-page-main">
          <nuxt />
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import AppLayout from '@/components/framework/AppLayout/AppLayout'

import Card from '@/components/base/Card/Card'
import UserMenu from '@/components/framework/UserMenu/UserMenu'
import UserBrief from '@/components/framework/UserBrief/UserBrief'

export default {
  name: 'AppLayoutUser',
  components: {
    AppLayout,
    Card,
    UserMenu,
    UserBrief
  },
  head() {
    return {
      title: '个人中心'
    }
  }
}
</script>

<style lang="less" scoped>
.user-page-wrap {
  display: flex;
}
.user-page-side {
  width: 240px;
  margin-right: 20px;
}
.user-page-main {
  flex: 1;
}
</style>
