<template>
  <div>
    <div v-loading="isLoading" class="z-container" style="background: #fff;">
      <div class="book-baseinfo">
        <div class="book-baseinfo-poster">
          <img :src="bookInfoData.poster" :alt="bookInfoData.name" />
        </div>
        <div class="book-baseinfo-main">
          <h2 class="book-baseinfo-main-name">{{ bookInfoData.name }}</h2>
          <p class="book-baseinfo-main-author">
            {{ bookInfoData.author }}
          </p>
          <p class="book-baseinfo-main-author">{{ bookInfoData.status }}</p>
          <p class="book-baseinfo-main-author">
            最新章节：
            <router-link :to="{ path: `/ebook/${$route.params.bookId}/${bookInfoData.chapterId}` }">{{ bookInfoData.lastChapter }}</router-link>
          </p>
          <p class="book-baseinfo-main-update">{{ bookInfoData.updateTime }}</p>
          <hr />
          <p class="book-baseinfo-main-author">{{ bookInfoData.count }}</p>
        </div>
      </div>

      <div v-for="part in bookInfoData.chaptersList" :key="part.category" class="z-row ebook-catalog-part">
        <div class="z-col-60">
          <title-bar :title="part.category" :bottom="0"></title-bar>
        </div>
        <div v-for="item in part.list" :key="`${item.bookId}-${item.chapterId}`" class="z-col-md-20 z-col-sm-30 ebook-catalog-link-wrap">
          <router-link :to="{ path: `/ebook/${item.bookId}/${item.chapterId}` }" :title="item.title" class="ebook-catalog-link">{{ item.title }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from '@/components/kit/TitleBar/TitleBar'

export default {
  name: 'EbookCatalog',
  components: {
    TitleBar
  },
  // async asyncData({ app, params }: ctxProps) {
  //   const res = await app.$myApi.ebooks.getBookInfo({ bookId: params.bookId });
  //   return { bookInfoData: res.result };
  // },
  data() {
    return {
      isLoading: false,
      bookInfoData: {}
    }
  },
  mounted() {
    this.getBookInfo()
  },
  // beforeRouteUpdate(to, from, next) {
  //   if (to.path.indexOf('/ebook') > -1) {
  //     this.getBookInfo(to.params.bookId);
  //   }
  //   next();
  // },
  methods: {
    /**
     * @desc 获取书籍信息
     */
    getBookInfo(bookId = this.$route.params.bookId) {
      this.isLoading = true
      this.$myApi.ebooks
        .getBookInfo({ bookId })
        .then((res) => {
          this.isLoading = false
          this.bookInfoData = res.result
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.book-baseinfo {
  margin-top: 10px;
  padding: 10px;
  overflow: hidden;
  .book-baseinfo-poster {
    float: left;
    padding-right: 20px;
    padding-bottom: 10px;
    background: #fff;
    img {
      height: 200px;
    }
  }
  .book-baseinfo-main-author {
    margin-bottom: 4px;
  }
  .book-baseinfo-main-name {
    font-size: 26px;
    color: @colorTextTitle;
    margin-bottom: 10px;
  }
  .book-baseinfo-main-brief {
    color: @colorTextSub;
    text-align: justify;
  }
}

.ebook-catalog-part {
  margin-bottom: 15px;
}
.ebook-catalog-link-wrap {
  border-bottom: 1px solid @colorBorder;
}
.ebook-catalog-link {
  display: block;
  padding: 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
