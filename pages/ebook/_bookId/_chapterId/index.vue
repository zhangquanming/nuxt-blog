<template>
  <div id="ebookPageWrap" v-loading="isLoading">
    <div class="page-content-wrap">
      <div class="read-main ebook-paper-bg">
        <h1 class="read-title">{{ chapterData.title }}</h1>
        <div>
          <span>{{ chapterData.content.length }} 字</span>
        </div>
        <div v-html="chapterData.content" class="read-content"></div>
      </div>
      <div class="read-nav ebook-paper-bg">
        <router-link :to="{ path: `/ebook/${chapterData.bookId}/${chapterData.chapterPrevId}` }">上一章</router-link>
        <router-link :to="{ path: `/ebook/${chapterData.bookId}` }">目录</router-link>
        <router-link :to="{ path: `/ebook/${chapterData.bookId}/${chapterData.chapterNextId}` }">下一章</router-link>
      </div>
      <div id="chapterSideBar" class="chapter-side-bar ebook-paper-bg">
        <btn theme="text">目录</btn>
        <btn theme="text">设置</btn>
        <btn theme="text">手机</btn>
        <btn theme="text">书页</btn>
      </div>

      <div>阅读主题 字体大小 页面宽度</div>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/base/Btn/Btn'
import { throttle } from '@/assets/js/tools'

export default {
  name: 'EbookChapter',
  components: {
    Btn
  },
  // async asyncData({ app, params }: ctxProps) {
  //   const res = await app.$myApi.ebooks.getChapter({ bookId: params.bookId, chapterId: params.chapterId });
  //   return { chapterData: res.result };
  // },
  data() {
    return {
      isLoading: false,
      chapterData: {
        content: ''
      }
    }
  },
  mounted() {
    this.getChapter()

    const vm = this
    this.throttleScroll = throttle(function() {
      vm.scrollHandler()
    }, 0)
    window.addEventListener('scroll', this.throttleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.throttleScroll)
  },
  // beforeRouteUpdate(to, from, next) {
  //   if (to.path.indexOf('/chapter/') > -1) {
  //     this.getChapter(to.params.bookId, to.params.chapterId);
  //   }
  //   next();
  // },
  methods: {
    scrollHandler() {
      const t = document.documentElement.scrollTop || document.body.scrollTop
      const chapterSideBar = document.getElementById('chapterSideBar') || document.createElement('div')
      const ebookPageWrap = document.getElementById('ebookPageWrap') || document.createElement('div')

      if (t >= ebookPageWrap.offsetTop) {
        chapterSideBar.style.top = t - ebookPageWrap.offsetTop + 'px'
      } else {
        chapterSideBar.style.top = '0'
      }
    },

    /**
     * @desc 获取分类书籍
     */
    getChapter(bookId = this.$route.params.bookId, chapterId = this.$route.params.chapterId) {
      this.isLoading = true
      this.$myApi.ebooks
        .getChapter({ bookId, chapterId })
        .then((res) => {
          this.isLoading = false
          this.chapterData = res.result
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
@colorPaperBg: #f8f3e8;

.page-content-wrap {
  position: relative;
  max-width: 800px;
  min-height: 700px;
  margin: 0 auto;

  .read-main {
    padding: 5% 10%;
    .read-title {
      font-size: 24px;
      color: @colorTextTitle;
      margin-bottom: 15px;
    }
    .read-content {
      /deep/ p {
        text-indent: 2em;
        font-size: 18px;
        line-height: 1.8;
        margin: 0.8em 0;
        word-wrap: break-word;
        word-break: break-all;
        color: darken(@colorTextContent, 5%);
      }
    }
  }
  .read-nav {
    margin-top: 15px;
    margin-bottom: 15px;
    overflow: hidden;
    a {
      display: block;
      position: relative;
      float: left;
      width: 33.33%;
      line-height: 50px;
      height: 50px;
      color: @colorTextContent;
      font-size: 18px;
      text-align: center;
      &:hover {
        background-color: darken(@colorPaperBg, 3%);
      }
    }
    a + a {
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 15px;
        bottom: 15px;
        width: 1px;
        background-color: lighten(@colorTextSub, 20%);
      }
    }
  }
  .chapter-side-bar {
    position: absolute;
    top: 0;
    right: 100%;
    margin-right: 10px;
  }
}

.ebook-paper-bg {
  background-image: url('~assets/images/book-bg.png');
  background-color: @colorPaperBg;
  border: 1px solid @colorBorder;
}
</style>
