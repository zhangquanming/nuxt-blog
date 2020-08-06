<template>
  <div :style="styles" @click="handleClick" class="logo">
    <img :src="logoColor" alt="Mingme" />
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    color: {
      type: String,
      default: 'white'
    },
    w: {
      type: [Number, String],
      default: 'auto'
    },
    h: {
      type: [Number, String],
      default: 'auto'
    }
  },
  computed: {
    logoColor() {
      if (this.color === 'black') {
        return require('@/assets/images/logo.png')
      } else {
        return require('@/assets/images/logo2.png')
      }
    },
    styles() {
      return {
        width: typeof this.w === 'number' ? `${this.w}px` : this.w,
        height: typeof this.h === 'number' ? `${this.h}px` : this.h
      }
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  z-index: 310;
  overflow: hidden;
  display: flex;
  margin: 0 auto;
  align-items: center;
  img {
    flex: none;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
