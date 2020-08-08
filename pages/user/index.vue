<template>
  <card :padding="20" style="height: 100%;">
    <user-page-title title="用户中心">
      <template v-slot:titleSub>
        <div>
          亲爱的 <span class="color-info">{{ userInfo ? userInfo.nicName || userInfo.userName : '' }}</span> {{ greetings }}
        </div>
      </template>
    </user-page-title>
    <div class="z-row">
      <div class="z-col-15">
        <div class="info-item info-item-theme-primary"></div>
      </div>
      <div class="z-col-15">
        <div class="info-item info-item-theme-info"></div>
      </div>
      <div class="z-col-15">
        <div class="info-item info-item-theme-warning"></div>
      </div>
      <div class="z-col-15">
        <div class="info-item info-item-theme-success"></div>
      </div>
    </div>
  </card>
</template>

<script>
import Card from '@/components/base/Card/Card'
import UserPageTitle from '@/components/page/user/UserPageTitle.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'UserHome',
  layout: 'user',
  components: {
    Card,
    UserPageTitle
  },
  computed: {
    ...mapGetters(['userInfo']),
    greetings() {
      const hour = new Date().getHours()
      let greetingsStr = ''
      if (hour < 6) {
        greetingsStr = '凌晨好！'
      } else if (hour < 9) {
        greetingsStr = '早上好！'
      } else if (hour < 12) {
        greetingsStr = '上午好！'
      } else if (hour < 14) {
        greetingsStr = '中午好！'
      } else if (hour < 17) {
        greetingsStr = '下午好！'
      } else if (hour < 19) {
        greetingsStr = '傍晚好！'
      } else if (hour < 22) {
        greetingsStr = '晚上好！'
      } else {
        greetingsStr = '夜里好！'
      }
      return greetingsStr
    }
  }
}
</script>

<style lang="less" scoped>
.color-info {
  color: @colorInfo;
}
.info-item {
  height: 120px;
}
.info-item-theme-info {
  background-color: @colorInfo;
}
.info-item-theme-primary {
  background-color: @colorPrimary;
}
.info-item-theme-warning {
  background-color: @colorWarning;
}
.info-item-theme-success {
  background-color: @colorSuccess;
}
.info-item-theme-error {
  background-color: @colorError;
}
</style>
