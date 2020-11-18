<template>
  <app-layout>
    <nuxt />
  </app-layout>
</template>

<script>
import AppLayout from '@/components/framework/AppLayout/AppLayout'

export default {
  name: 'AppLayoutDefault',
  components: {
    AppLayout
  },
  head() {
    return {
      title: '明么的博客'
    }
  }
}
</script>
