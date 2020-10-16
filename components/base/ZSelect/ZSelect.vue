<template>
  <button
    ref="zSelect"
    :class="`${prefixCls} ${isShowOptions ? prefixCls + '-open' : ''}`"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    @keyup.enter="handleEnter"
    @keyup.up="handleKeyupUp"
    @keyup.down="handleKeyupDown"
  >
    <template v-if="selectedArray.length === 0">
      <span :class="`${prefixCls}-placeholder`">{{ placeholder }}</span>
    </template>

    <template v-else>
      <template v-if="multiple">
        <tag v-for="item in selectedArray" :key="item[valueKey]" @on-close="handleSelect(item)" theme="success" closeable>{{ item[labelKey] }}</tag>
      </template>
      <template v-else>
        <span :class="`${prefixCls}-label`">{{ selectedLabel }}</span>
      </template>
    </template>

    <icon :class="`${prefixCls}-icon`" type="iconarrowdown" />
    <ul ref="zSelectOptions" :class="`${prefixCls}-options`" v-show="isShowOptions">
      <li
        v-for="(item, index) in options"
        :key="index"
        :class="`${prefixCls}-options-item ${includeSomeValue(item, selectedArray) ? prefixCls + '-checked' : ''} ${cursorIndex === index ? prefixCls + '-cursor' : ''}`"
        @click.stop="handleSelect(item)"
        @mouseover="handleMouseoverOptionItem(index)"
      >
        <span>{{ item[labelKey] }}</span>
        <icon :class="`${prefixCls}-check-icon`" type="iconxuanzhong" />
      </li>
    </ul>
  </button>
</template>

<script>
import Icon from '@/components/base/Icon/Icon'
import Tag from '@/components/base/Tag/Tag'

export default {
  name: 'ZSelect',
  components: {
    Icon,
    Tag
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
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    id: String,
    name: String,
    placeholder: String,
    multiple: Boolean,
    disabled: Boolean
  },
  data() {
    return {
      prefixCls: 'z-select',
      isShowOptions: false,
      selectedArray: [],
      cursorIndex: -1
    }
  },
  computed: {
    selectedLabel() {
      return this.selectedArray.map((item) => item[this.labelKey]).join(',')
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
      if (value && value.length >= 0 && options && options.length > 0) {
        this.selectedArray = options.filter((item) => value.includes(item[this.valueKey]))
      }
    },

    /**
     * @desc 将值发射给 v-model 绑定的值
     */
    updateValue() {
      this.$emit('input', this.selectedValue)
    },

    /**
     * @desc 选择 option
     */
    handleSelect(option) {
      if (this.multiple) {
        this.handleSelectMultiple(option)
      } else {
        this.handleSelectSingle(option)
        this.handleHideOptions()
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
    },

    /**
     * @desc 点击 select 组件
     */
    handleClick() {
      this.handleShowOptions()
    },

    /**
     * @desc 聚焦事件
     */
    handleFocus() {
      this.handleShowOptions()
    },

    /**
     * @desc 失焦事件
     */
    handleBlur() {
      this.handleHideOptions()
    },

    handleEnter() {
      if (this.isShowOptions) {
        this.handleSelect(this.options[this.cursorIndex])
      } else {
        this.handleHideOptions()
      }
    },

    handleKeyupUp() {
      if (this.cursorIndex <= 0) {
        this.cursorIndex = this.options.length - 1
      } else {
        this.cursorIndex -= 1
      }
      this.makeOptionItemVisable()
    },

    handleKeyupDown() {
      if (this.cursorIndex >= this.options.length - 1) {
        this.cursorIndex = 0
      } else {
        this.cursorIndex += 1
      }
      this.makeOptionItemVisable()
    },

    handleMouseoverOptionItem(index) {
      this.cursorIndex = index
    },

    makeOptionItemVisable() {
      const optionsUl = this.$refs.zSelectOptions
      const optionsUlHeight = optionsUl.clientHeight
      const optionsUlScrollTop = optionsUl.scrollTop
      const optionsUlItem = optionsUl.getElementsByTagName('li')[this.cursorIndex]
      const optionsUlItemHeight = optionsUlItem.clientHeight
      const optionsUlItemOffsetTop = optionsUlItem.offsetTop

      if (optionsUlScrollTop <= optionsUlItemOffsetTop && optionsUlItemOffsetTop + optionsUlItemHeight <= optionsUlScrollTop + optionsUlHeight) {
        // 在 options 盒子里可见
      } else {
        optionsUl.scrollTop = optionsUlItemOffsetTop
      }
    },

    /**
     * @desc 显示 options
     */
    handleShowOptions() {
      this.isShowOptions = true
    },

    /**
     * @desc 隐藏 options
     */
    handleHideOptions() {
      this.isShowOptions = false
      this.$refs.zSelect.blur()
      this.cursorIndex = -1
    }
  }
}
</script>

<style lang="less" scoped>
button {
  outline: none;
  display: block;
  width: 100%;
  padding: 0;
  line-height: inherit;
}
.z-select {
  text-align: left;
  position: relative;
  min-height: 40px;
  margin: 5px 0;
  padding-left: 10px;
  padding-right: 30px;
  border-radius: 5px;
  border: 1px solid @colorBorder;
  background-color: #fff;

  &:focus {
    border-color: @colorInfo;
  }
  &-placeholder {
    color: @colorTextLight;
    font-size: 14px;
  }
  &-label {
    line-height: 40px;
    font-size: 14px;
  }
  &-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(0, -50%) rotate(0);
    transition: all 0.2s ease;
  }
  &-open &-icon {
    transform: translate(0, -50%) rotate(180deg);
  }
  &-options {
    position: absolute;
    z-index: 999;
    top: 41px;
    left: 0;
    right: 0;
    background-color: #fff;
    max-height: 300px;
    overflow: auto;
    border: 1px solid @colorBorder;
  }
  &-options-item {
    padding: 10px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: @colorPrimary;
    }
  }
  &-check-icon {
    display: none;
  }
  &-options-item&-checked {
    color: #fff;
    background-color: @colorSuccess;
    &:hover {
      color: #fff;
      background-color: @colorError;
    }
  }
  &-options-item&-checked &-check-icon {
    display: block;
  }

  &-options-item&-cursor {
    color: #fff;
    background-color: @colorPrimary;
  }
  &-options-item&-cursor&-checked {
    color: #fff;
    background-color: @colorSuccess;
  }
}
</style>
