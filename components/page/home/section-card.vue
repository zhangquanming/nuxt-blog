<template>
  <div class="section-card">
    <div class="section-card-head">
      <i :class="['iconfont', `${icon}`]"></i>
    </div>
    <div class="section-card-body">
      <p class="section-card-title">{{ title }}</p>
      <div class="section-card-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionCard',
  props: {
    title: String,
    icon: String,
    path: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style lang="less" scoped>
.section-card {
}
</style>
