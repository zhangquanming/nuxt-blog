<template>
  <div :style="stylesWrap" class="z-progress">
    <div @click="handleClick" class="z-progress-bar-top"></div>
    <div :style="stylesBar" class="z-progress-bar"></div>
  </div>
</template>

<script>
export default {
  name: 'ZPropgress',
  props: {
    value: {
      type: Number,
      default: 0
    },
    height: {
      type: [Number, String],
      default: '15px'
    }
  },
  data() {
    return {
      percent: ''
    }
  },
  computed: {
    stylesWrap() {
      return {
        height: typeof this.height === 'number' ? `${this.height}px` : this.height
      }
    },
    stylesBar() {
      return {
        width: `${this.percent * 100}%`
      }
    }
  },
  watch: {
    value(value) {
      this.percent = value
    }
  },
  mounted() {
    this.percent = this.value
  },
  methods: {
    /**
     * @desc 点击进度条
     */
    handleClick(e) {
      const currentLen = e.offsetX
      const progressWidth = e.target.clientWidth
      const percent = this.formatPercent(currentLen, progressWidth, true)
      this.percent = percent
      this.$emit('on-click', percent)
    },
    // 计算百分比 返回浮点数值 或者 百分比字符串
    formatPercent(num, total, isNum) {
      const percent = Math.round((num / total) * 10000) / 100.0
      return isNum ? percent / 100 : percent + '%'
    }
  }
}
</script>

<style lang="less" scoped>
.z-progress {
  position: relative;
  &-bar-top {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.3);
  }
  &-bar {
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    border-right: 1px solid #cdcdcd;
    transition: width 0.3s ease;
  }
}
</style>
