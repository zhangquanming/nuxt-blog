<template>
  <card title="目录" padding="10px 0 0">
    <div class="wrap">
      <div id="mdAnchorNavWrap" v-if="articleTitles && articleTitles.nav && articleTitles.nav.length > 0" class="md-anchor-nav-wrap">
        <div id="mdAnchorFloatBar" class="md-anchor-float-bar"></div>
        <md-anchor-nav :list="articleTitles.nav" :offsetTopList="offsetTopList" />
      </div>
      <no-data v-else style="height: 260px;" />
    </div>
  </card>
</template>

<script>
import Card from '@/components/base/Card/Card'
import MdAnchorNav from '@/components/kit/MdAnchorNav/MdAnchorNav'
import NoData from '@/components/kit/NoData/NoData'
import getMKTitles from '@/assets/js/getMKTitles.js'
import { throttle } from '@/assets/js/tools'
export default {
  name: 'CardMdNav',
  components: {
    Card,
    MdAnchorNav,
    NoData
  },
  props: {
    blogResult: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      idPrefix: 'titleAnchor-',
      offsetTopList: [],
      windowHeight: 0
    }
  },
  computed: {
    articleTitles() {
      return getMKTitles(this.blogResult.content || '')
    }
  },
  mounted() {
    const vm = this
    this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight
    this.throttleScroll = throttle(function() {
      vm.scrollHandler()
    })
    window.addEventListener('scroll', this.throttleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.throttleScroll)
  },
  methods: {
    scrollHandler() {
      const mdAnchorNavWrap = document.getElementById('mdAnchorNavWrap')
      const mdAnchorFloatBar = document.getElementById('mdAnchorFloatBar')
      const distance = 80
      const headerList = this.getHeaderList()
      // 对所有的y值为正标的题，按y值升序排序。第一个标题就是当前处于阅读中的段落的标题。也即要高亮的标题
      const readingVO = headerList
        .filter(function(item) {
          return item.y > distance
        })
        .sort(function(a, b) {
          return a.y - b.y
        })[0]
      // TODO 如果已经到最底部了 继续下滑 readingVO 会取到 undefined , 报错 所以 这里需要判断下
      if (!readingVO) {
        return
      }
      const floatBarHeight = headerList.slice(0, readingVO.index).reduce(function(preValue, curValue) {
        if (typeof preValue === 'number') {
          return preValue + curValue.navTitleClientHeight
        } else {
          return preValue.navTitleClientHeight + curValue.navTitleClientHeight
        }
      }, 0)
      this.$store.dispatch('changeHighLightIndex', { index: readingVO.index })
      mdAnchorFloatBar.style.top = `${floatBarHeight}px`
      mdAnchorFloatBar.style.height = `${readingVO.navTitleClientHeight}px`
      mdAnchorNavWrap.style.marginTop = `${Math.min(-floatBarHeight + (this.windowHeight / 2 - 100), 0)}px`
    },
    getHeaderList() {
      const list = []
      const t = document.documentElement.scrollTop || document.body.scrollTop
      for (let i = 0; i < this.articleTitles.length; i++) {
        const contentTitle = document.getElementById(`${this.idPrefix}${i}`)
        const navTitle = document.querySelector(`a[id="#${this.idPrefix}${i}"]`)
        if (!navTitle) {
          continue
        }
        list.push({
          y: contentTitle.getBoundingClientRect().top,
          navTitleClientHeight: navTitle.clientHeight,
          contentTitleOffsetTopList: contentTitle.getBoundingClientRect().top + t,
          index: i
        })
      }
      this.offsetTopList = list.map((item) => item.contentTitleOffsetTopList)
      return list
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  overflow: hidden;
}
.md-anchor-nav-wrap {
  margin-top: 0px;
  position: relative;
  transition: margin 0.2s ease;
  // padding-top: 10px;
}
.md-anchor-float-bar {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  height: 28px;
  width: 100%;
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    background-color: @colorPrimary;
    background: @colorCol;
  }
}
</style>
