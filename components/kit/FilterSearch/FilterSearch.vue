<template>
  <div class="filter-select">
    <div class="filter-label">
      <icon :type="icon" :size="22"></icon>
      <span>{{ title }}：</span>
    </div>
    <ul class="filter-options">
      <li v-for="(item, index) in options" :key="index" @click="handleSelect(item)" :class="`${includeSomeValue(item, selectedArray) ? 'options-checked' : ''}`">
        {{ item[labelKey] }}
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon/Icon'
export default {
  name: 'FilterSearch',
  components: {
    Icon
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    multiple: Boolean,
    icon: {
      type: String
    },
    title: {
      type: String
    },
    placeholder: {
      type: String,
      default: '不限'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  data() {
    return {
      selectedArray: []
    }
  },
  computed: {
    selectedLabel() {
      if (this.selectedArray && this.selectedArray.length > 0) {
        return this.selectedArray.map((item) => item[this.labelKey]).join(',')
      }
      return this.placeholder
    },
    selectedValue() {
      return this.selectedArray.map((item) => item[this.valueKey])
    }
  },
  watch: {
    options() {
      this.initValue()
    },
    value() {
      this.initValue()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initValue()
    })
  },

  methods: {
    /**
     * @desc 初始化数据
     */
    initValue() {
      const { value, options } = this
      if (value && value.length > 0 && options && options.length > 0) {
        this.selectedArray = options.filter((item) => value.includes(item[this.valueKey]))
      }
    },

    /**
     * @desc 将值发射给 v-model 绑定的值
     */
    updateValue() {
      this.$emit('input', this.selectedValue)
      this.$emit('on-change', this.selectedValue)
    },

    /**
     * @desc 选择 option
     */
    handleSelect(option) {
      if (this.multiple) {
        this.handleSelectMultiple(option)
      } else {
        this.handleSelectSingle(option)
      }
    },

    /**
     * @desc 选择 option 单选
     */
    handleSelectSingle(option) {
      if (this.includeSomeValue(option, this.selectedArray)) {
        this.selectedArray = []
      } else {
        this.selectedArray = [option]
      }
      this.updateValue()
    },

    /**
     * @desc 选择 option 多选
     */
    handleSelectMultiple(option) {
      if (this.includeSomeValue(option, this.selectedArray)) {
        this.removeSomeValue(option, this.selectedArray)
      } else {
        this.selectedArray.push(option)
      }
      this.updateValue()
    },

    /**
     * @desc 判断 val 是否 在 values 中
     */
    includeSomeValue(val, values) {
      return values && values.some((item) => item[this.valueKey] === val[this.valueKey])
    },

    /**
     * @desc 从 values 移除 val
     */
    removeSomeValue(val, values) {
      let rmIndex = -1
      values.forEach((item, index) => {
        if (item[this.valueKey] === val[this.valueKey]) {
          rmIndex = index
        }
      })
      if (rmIndex !== -1) {
        values.splice(rmIndex, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.filter-select {
  margin-top: 12px;
  position: relative;
  display: flex;
  align-items: flex-start;
  .filter-label {
    flex: none;
    line-height: 28px;
    display: flex;
    align-items: center;
    color: @colorTextSub;
    span {
      margin-left: 6px;
    }
  }
  .filter-options {
    flex: 1;
    overflow: hidden;
    li {
      float: left;
      cursor: pointer;
      margin-left: 20px;
      padding: 0 10px;
      font-size: 14px;
      color: #4d555d;
      line-height: 28px;
      border-radius: 6px;
      margin-bottom: 12px;
      &.options-checked {
        background: @color;
        color: #fff;
        &:hover {
          background: @color;
          -webkit-text-fill-color: #fff;
          color: #fff;
        }
      }
      &:hover {
        @colorActive();
      }
    }
  }
}
</style>
