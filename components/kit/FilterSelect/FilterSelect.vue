<template>
  <div class="filter-select">
    <a class="active" href="javascript:;">
      <icon :type="icon" :size="20"></icon>
      <span class="active-text">{{ selectedLabel }}</span>
      <icon :size="20" class="select-arrow" type="iconarrowdown"></icon>
    </a>
    <ul class="filter-options">
      <li v-for="(item, index) in options" :key="index" @click="handleSelect(item)" :class="`${includeSomeValue(item, selectedArray) ? 'options-checked' : ''}`">
        <span>{{ item[labelKey] }}</span>
        <icon class="options-check-icon" type="iconxuanzhong" />
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon/Icon'

export default {
  name: 'FilterSelect',
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
      type: String,
      default: 'icontag'
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
  position: relative;
  .active {
    display: block;
    padding: 10px;
    color: @colorTextTitle;
    cursor: pointer;
    border: 1px solid @colorBorder;
  }
  .active-text {
    margin: 0 5px;
  }
  .select-arrow {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translate(0, -50%) rotate(0);
    transition: all 0.2s ease;
  }

  &:hover {
    .active {
      background-color: #fff;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
    }
    .filter-options {
      display: block;
    }
    .select-arrow {
      transform: translate(0, -50%) rotate(180deg);
    }
  }

  .filter-options {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 99;
    background-color: #fff;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);

    max-height: 300px;
    overflow: auto;
    li {
      position: relative;
      font-size: 12px;
      padding: 12px 10px;
      text-indent: 20px;
      color: @colorTextTitle;
      background-color: #fff;
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
        background-color: @colorInfo;
        color: #fff;
      }
      .options-check-icon {
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translate(0, -50%);
        display: none;
      }
    }
    .options-checked {
      color: #fff;
      background-color: @colorSuccess;
      &:hover {
        background-color: @colorSuccess;
        color: #fff;
      }
      .options-check-icon {
        display: block;
      }
    }
  }
}
</style>
