<template>
  <div class="z-container">
    <div class="z-row">
      <div class="z-col-md-42 z-col-xl-45">
        <template v-if="blogList && blogList.length > 0">
          <topic-item v-for="(blog, index) in blogList" :key="index" :topic="blog"></topic-item>
        </template>
        <card-no-data v-else style="height: 300px;" />
        <pagenation v-if="blogList && blogList.length > 0 && itemTotal > 10" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
      </div>
      <div class="list-side z-col-md-18 z-col-xl-15">
        <card class="search-wrap">
          <search-blog @on-search="handleSearch"></search-blog>
        </card>
        <card-category :category-list="categoryList" />
      </div>
    </div>
  </div>
</template>

<script>
import TopicItem from '@/components/kit/TopicItem/TopicItem'
import Card from '@/components/base/Card/Card'
import CardNoData from '@/components/kit/CardNoData/CardNoData'
import CardCategory from '@/components/kit/CardCategory/CardCategory'
import SearchBlog from '@/components/kit/SearchBlog/SearchBlog'
import Pagenation from '@/components/base/Pagenation/Pagenation'

import { mapGetters } from 'vuex'

export default {
  name: 'ArticleCategory',
  components: {
    Card,
    TopicItem,
    CardNoData,
    CardCategory,
    SearchBlog,
    Pagenation
  },
  data() {
    return {
      page: 1,
      limit: 10,
      pageTotal: 0,
      itemTotal: 0,
      blogList: [],
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['categoryList', 'categoryIdByValue'])
  },
  async asyncData({ app, params, store }) {
    const categoryList = store.getters.categoryList

    if (categoryList.length === 0) {
      await store.dispatch('getCategoryList')
    }

    const category = store.getters.categoryIdByValue(params.category)
    const sendParams = {
      page: 1,
      limit: 10,
      category
    }

    const res = await app.$myApi.blogs.index(sendParams)

    return {
      blogList: res.result.docs,
      pageTotal: res.result.pages,
      itemTotal: res.result.total
    }
  },
  methods: {
    /**
     * @desc 搜索
     */
    handleSearch(keyword) {
      this.$router.push({ path: '/article/search', query: { keyword } })
    },

    /**
     * @desc 分页点击
     */
    changePage(page) {
      this.page = page
      this.requestblogList()
    },

    /**
     * @desc 请求分页数据
     */
    requestblogList() {
      const category = this.$store.getters.categoryIdByValue(this.$route.params.category)

      const params = {
        page: this.page,
        limit: this.limit,
        category
      }
      this.isLoading = true
      this.$myApi.blogs
        .index(params)
        .then((res) => {
          this.blogList = res.result.docs
          this.pageTotal = res.result.pages
          this.itemTotal = res.result.total
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  },
  head() {
    return {
      title: `文章-分类-${this.$route.params.category}`
    }
  }
}
</script>

<style lang="less">
.list-side {
  position: sticky;
  top: @heightHeader + 20;
}
.z-card.search-wrap {
  background-image: @color;
}
</style>
