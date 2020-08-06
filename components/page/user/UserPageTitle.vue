<template>
  <div class="user-page-title-wrap">
    <p v-if="title" class="user-page-title">{{ title }}</p>
    <div v-if="isShowTitleSlot" class="user-page-title">
      <slot name="title"></slot>
    </div>

    <p v-if="titleSub" class="user-page-title-sub">{{ titleSub }}</p>
    <div v-if="isShowTitleSubSlot" class="user-page-title-sub">
      <slot name="titleSub"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPageTitle',
  props: {
    title: String,
    titleSub: String
  },
  data() {
    return {
      isShowTitleSlot: true,
      isShowTitleSubSlot: true
    }
  },
  mounted() {
    this.isShowTitleSlot = this.$slots.title !== undefined
    this.isShowTitleSubSlot = this.$slots.titleSub !== undefined
  }
}
</script>

<style lang="less" scoped>
.user-page-title-wrap {
  margin-bottom: 20px;
}
.user-page-title {
  font-size: 16px;
  margin-bottom: 3px;
  color: @colorTextContent;
}
.user-page-title-sub {
  font-size: 12px;
  color: @colorTextSub;
}
</style>
