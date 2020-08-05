<template>
  <div class="score-start-wrap">
    <div class="score-start">
      <div :style="style" class="score-start-active">
        <icon v-for="i in 5" :key="i" type="iconbiaoxingfill" />
      </div>
      <div class="score-start-default">
        <icon v-for="i in 5" :key="i" type="iconbiaoxing" />
      </div>
    </div>
    <span class="score-start-num">{{ value }}</span>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon/Icon'
export default {
  name: 'ScoreStart',
  components: {
    Icon
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 10
    }
  },
  computed: {
    style() {
      return {
        width: `${(this.value / this.total) * 100}%`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.score-start {
  position: relative;
  display: inline-block;
  width: 5em;
  &-wrap {
    display: inline-block;
    // width: 7em;
  }
  &-active {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    color: @colorWarning;
    white-space: nowrap;
    .iconfont {
      vertical-align: inherit;
    }
  }
  &-default {
    display: inline-block;
    color: @colorTextSub;
    .iconfont {
      vertical-align: inherit;
    }
  }
  &-num {
    // margin-left: 5px;
    color: @colorWarning;
  }
}
</style>
