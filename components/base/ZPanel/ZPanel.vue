<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-header`" v-if="showHeaderRight || title">
      <div :class="`${prefixCls}-header-left`">
        <span :class="`${prefixCls}-title`">{{ title }}</span>
      </div>

      <div :class="`${prefixCls}-header-right`">
        <slot name="headerRight"></slot>
      </div>
    </div>
    <div :class="`${prefixCls}-body`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const prefixCls = 'z-panel'

export default {
  name: 'ZPanel',
  props: {
    title: String
  },
  data() {
    return {
      prefixCls,
      showHeaderRight: true
    }
  },
  mounted() {
    this.showHeaderRight = this.$slots.headerRight !== undefined
  }
}
</script>

<style lang="less" scoped>
.z-panel {
  margin-bottom: 20px;
  background-color: #fff;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 15px 20px;
    border-bottom: 1px solid fade(@colorBorder, 65%);
    color: @colorTextContent;
    &:before {
      display: block;
      content: '';
      position: absolute;
      left: 0;
      top: 13px;
      bottom: 13px;
      width: 3px;
      background: @colorCol;
    }
  }
  &-title {
    font-size: 16px;
    font-size: @colorTextTitle;
    font-weight: bold;
  }
  &-body {
    padding: 10px;
  }
}
</style>
