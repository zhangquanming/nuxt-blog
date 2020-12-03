<template>
  <div class="search-movie-wrap">
    <input
      id="searchInput"
      ref="zSearch"
      v-model="searchWord"
      @click="handleClick"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @keyup.enter="handleEnter"
      @keyup.up="handleKeyupUp"
      @keyup.down="handleKeyupDown"
      class="search-movie-input"
      type="text"
      autocomplete="off"
    />
    <button @click="requestSearchMovieFull" class="search-movie-button">
      <Icon class="search-movie-button-icon" type="iconsearch" />
      <span class="search-movie-button-text">搜索</span>
    </button>
    <div ref="zSearchOptions" v-show="isShowOptions" class="search-movie-suggest">
      <router-link
        v-for="(item, index) in suggestList"
        :key="index"
        :to="{ path: `/movie/detail/${item.id}`, target: '_blank' }"
        :class="`search-movie-suggest-item ${cursorIndex === index ? 'search-movie-suggest-item-active' : ''}`"
        @mouseover="handleMouseoverOptionItem(index)"
        target="_blank"
      >
        <img :src="item.img" class="search-movie-suggest-item-poster" alt="电影海报" />
        <div>
          <p class="search-movie-suggest-item-title">{{ item.title }}（{{ item.year }}）</p>
          <p class="search-movie-suggest-item-desc">{{ item.sub_title }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import doubanApi from '@/assets/js/douban/api-douban'
import Icon from '@/components/base/Icon/Icon'

let timer = null

export default {
  name: 'SearchMovie',
  components: {
    Icon
  },
  data() {
    return {
      searchWord: '',
      suggestList: [],
      isShowOptions: false,
      cursorIndex: 0
    }
  },
  methods: {
    /**
     * @desc 显示 suggestList
     */
    handleShowOptions() {
      this.isShowOptions = true
    },

    /**
     * @desc 隐藏 suggestList
     */
    handleHideOptions() {
      this.isShowOptions = false
      this.$refs.zSearch.blur()
      this.cursorIndex = 0
    },
    /**
     * @desc 让选项在固定高度盒子中 可见
     */
    makeOptionItemVisable() {
      const optionsUl = this.$refs.zSearchOptions
      const optionsUlHeight = optionsUl.clientHeight
      const optionsUlScrollTop = optionsUl.scrollTop
      const optionsUlItem = optionsUl.getElementsByTagName('a')[this.cursorIndex]
      const optionsUlItemHeight = optionsUlItem.clientHeight
      const optionsUlItemOffsetTop = optionsUlItem.offsetTop

      if (optionsUlScrollTop <= optionsUlItemOffsetTop && optionsUlItemOffsetTop + optionsUlItemHeight <= optionsUlScrollTop + optionsUlHeight) {
        // 在 suggestList 盒子里可见
      } else {
        optionsUl.scrollTop = optionsUlItemOffsetTop
      }
    },
    /**
     * @desc 选择 option
     */
    handleSelect(option) {
      // this.$router.push({ path: `/movie/detail/${option.id}`, target: '_blank' });
      const routeUrl = this.$router.resolve({
        path: `/movie/detail/${option.id}`
      })
      window.open(routeUrl.href, '_blank')
      this.handleHideOptions()
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
      setTimeout(() => {
        this.handleHideOptions()
      }, 1000)
    },
    /**
     * @desc input 事件
     */
    handleInput() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.requestSearchMovie()
      }, 600)
    },
    /**
     * @desc 回车事件
     */
    handleEnter() {
      if (this.isShowOptions) {
        this.handleSelect(this.suggestList[this.cursorIndex])
      } else {
        this.handleHideOptions()
      }
    },
    /**
     * @desc 键盘 上 事件
     */
    handleKeyupUp() {
      if (this.cursorIndex <= 0) {
        this.cursorIndex = this.suggestList.length - 1
      } else {
        this.cursorIndex -= 1
      }
      this.makeOptionItemVisable()
    },
    /**
     * @desc 键盘 下 事件
     */
    handleKeyupDown() {
      if (this.cursorIndex >= this.suggestList.length - 1) {
        this.cursorIndex = 0
      } else {
        this.cursorIndex += 1
      }
      this.makeOptionItemVisable()
    },
    handleMouseoverOptionItem(index) {
      this.cursorIndex = index
    },
    /**
     * @desc 请求搜索结果
     */
    requestSearchMovie() {
      const params = {
        q: this.searchWord
      }
      this.isSearchLoading = true
      doubanApi
        .DoubanMovieSearch(params)
        .then((res) => {
          this.isSearchLoading = false
          this.suggestList = res
        })
        .catch(() => {
          this.isSearchLoading = false
        })
    },

    /**
     * @desc 请求搜索结果 这个接口暂时没找到
     */
    requestSearchMovieFull() {
      const params = {
        q: this.searchWord
      }
      this.isSearchLoading = true
      doubanApi
        .DoubanMovieSearchFull(params)
        .then(() => {
          this.isSearchLoading = false
        })
        .catch(() => {
          this.isSearchLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.search-movie {
  &-wrap {
    position: relative;
  }
  &-input {
    width: 100%;
    height: 32px;
    padding: 0 75px 0 13px;
    font-size: 12px;
    color: @colorTextContent;
    border-radius: 100px;
    border: 1px solid @colorPrimary;
    outline: 0;
    background-color: transparent;
    transition: width 0.3s ease;
  }
  &-button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 65px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    color: #fff;
    // font-weight: bold;
    background-color: @colorPrimary;
    background: @color;
    border: 0;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    outline: 0;
    &-icon {
      vertical-align: inherit;
      margin-right: 3px;
    }
  }

  &-suggest {
    position: absolute;
    z-index: 999;
    top: 100%;
    left: 13px;
    right: 65px;
    background-color: #fff;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);

    &-item {
      display: block;
      padding: 6px;
      border: 1px solid @colorBorder;
      border-top: 0;
      overflow: hidden;
      zoom: 1;
      &-active {
        background-color: darken(@colorBg, 2%);
      }
      &:hover {
        background-color: darken(@colorBg, 1%);
      }

      &-poster {
        width: 40px;
        height: 58px;
        margin-right: 5px;
        float: left;
      }
      &-title {
        margin-right: 5px;
        color: @colorTextTitle;
        font-style: normal;
      }
      &-desc {
        display: block;
        margin-top: 3px;
      }
    }
  }
}
</style>
