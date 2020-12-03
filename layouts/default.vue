<template>
  <app-layout>
    <nuxt />
    <div :class="{ shown: btnFlag }" @click="handleBackTop" class="go-top-btn hidden-xs hidden-sm"><i class="iconfont icontop"></i></div>
  </app-layout>
</template>

<script>
import AppLayout from '@/components/framework/AppLayout/AppLayout'

export default {
  name: 'AppLayoutDefault',
  components: {
    AppLayout
  },
  data() {
    return {
      btnFlag: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    handleBackTop() {
      const that = this
      const timer = setInterval(() => {
        const ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 20)
    },
    scrollToTop() {
      const that = this
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 100) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    }
  },
  head() {
    return {
      title: '明么的博客'
    }
  }
}
</script>
