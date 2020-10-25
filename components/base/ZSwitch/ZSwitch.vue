<template>
  <div :class="{ 'is-disabled': disabled, 'is-checked': checked }" @click="switchValue" class="switch-wrap">
    <span ref="core" class="switch-bar">
      <span class="switch-point"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ZSwitch',
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    }
  },
  computed: {
    checked() {
      return this.value === this.activeValue
    }
  },
  watch: {
    checked() {
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor()
      }
    }
  },
  mounted() {
    if (this.activeColor || this.inactiveColor) {
      this.setBackgroundColor()
    }
  },
  methods: {
    switchValue() {
      !this.disabled && this.handleChange()
    },
    handleChange() {
      this.$emit('input', !this.checked ? this.activeValue : this.inactiveValue)
      this.$emit('change', !this.checked ? this.activeValue : this.inactiveValue)
    },
    setBackgroundColor() {
      const newColor = this.checked ? this.activeColor : this.inactiveColor
      this.$refs.core.style.backgroundColor = newColor
    }
  }
}
</script>

<style lang="less" scoped>
.switch-wrap {
  font-size: 0;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;

  .switch-bar {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    background: linear-gradient(@colorInfo, @colorInfo);
    border-radius: 30px;
    transition: background 0.3s;
  }

  .switch-point {
    display: inline-block;
    position: absolute;
    top: 2px;
    left: 2px;
    height: 16px;
    width: 16px;
    background-color: #fff;
    border-radius: 30px;
    transition: transform 0.3s;
  }
}

.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.is-checked {
  .switch-bar {
    background: @color;
  }

  .switch-point {
    transform: translate3d(20px, 0, 0);
  }
}
</style>
