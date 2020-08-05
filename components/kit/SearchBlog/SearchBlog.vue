<template>
  <div class="search">
    <input v-model="searchWord" :placeholder="placeholder" @keyup.enter="handleEnter" class="search-input" type="text" autocomplete="off" />
    <button @click="handleSearch" class="search-button">
      <icon :size="20" class="search-button-icon" type="iconsearch"></icon>
    </button>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon/Icon'
export default {
  name: 'SearchBlog',
  components: {
    Icon
  },
  props: {
    placeholder: {
      type: String,
      default: '搜一搜...'
    }
  },
  data() {
    return {
      searchWord: ''
    }
  },
  mounted() {
    if (this.$route.query.keyword) {
      this.searchWord = this.$route.query.keyword
    }
  },
  methods: {
    /**
     * @desc 回车事件
     */
    handleEnter() {
      this.handleSearch()
    },

    /**
     * @desc 点击搜索
     */
    handleSearch() {
      this.$emit('on-search', this.searchWord)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  position: relative;
  &:focus-within &-input {
    box-shadow: 0 0 3px inset;
  }
  &-input {
    all: unset;
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    padding: 0 40px 0 13px;
    font-size: 12px;
    color: @colorTextContent;
    border-radius: 100px;
    outline: 0;
    background-color: #fff;
    transition: width 0.3s ease;
  }
  &-button {
    all: unset;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 40px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    color: @colorTextSub;
    border: 0;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    outline: 0;
    &:hover {
      color: @colorTextTitle;
    }
  }
}
</style>
