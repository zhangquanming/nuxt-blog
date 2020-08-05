<template>
  <div class="no-data-wrap">
    <icon :size="size" :color="color" type="iconno-data" class="no-data-icon"></icon>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon/Icon'
export default {
  name: 'NoData',
  components: {
    Icon
  },
  props: {
    size: {
      type: [Number, String],
      default: 150
    },
    color: {
      type: String,
      default: '#ccc'
    }
  }
}
</script>

<style lang="less" scoped>
.no-data-wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
