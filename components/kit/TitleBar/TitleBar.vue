<template>
  <div class="z-title-bar">
    <components :is="tagName" class="z-title-bar-left">{{ title }}</components>
    <div v-if="showTitleRight" class="z-title-bar-right">
      <slot name="titleRight"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    title: String,
    tagName: {
      type: String,
      default: 'h3'
    }
  },
  data() {
    return {
      showTitleRight: false
    }
  },
  mounted() {
    this.showTitleRight = this.$slots.titleRight !== undefined
  }
}
</script>

<style lang="less" scoped>
.z-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 10px 15px;
  border-bottom: 1px solid darken(@colorBg, 8%);
  color: @colorTextContent;
  margin-bottom: 15px;
  &:before {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    top: 13px;
    bottom: 13px;
    width: 3px;
    background: linear-gradient(@colorInfo, @colorSuccess);
  }
}
.z-title-bar-left {
  font-size: 18px;
  font-size: @colorTextTitle;
  font-weight: bold;
}
.z-title-bar-right {
  flex: 1;
  text-align: right;
}
</style>
