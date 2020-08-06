<template>
  <div class="z-container">
    <div class="filter-bar">
      <div class="z-row">
        <div class="z-col-sm-10">
          <filter-select
            v-model="formData.category"
            @on-change="handleChangeCategory"
            :options="categoryListFormat"
            placeholder="不限分类"
            label-key="name"
            value-key="_id"
          ></filter-select>
        </div>
        <div class="z-col-sm-10">
          <filter-select v-model="formData.tag" :options="tagList" @on-change="handleChangeTag" multiple placeholder="不限标签" label-key="name" value-key="_id"></filter-select>
        </div>
      </div>
    </div>
    <div class="z-row">
      <div v-loading="isLoading" class="z-col-md-42 z-col-xl-45">
        <template v-if="blogList.length > 0">
          <Card v-for="(blog, index) in blogList" :key="index">
            <topic-item :topic="blog"></topic-item>
          </Card>
        </template>
        <card-no-data v-else style="height: 300px;" />
        <pagenation v-if="blogList && blogList.length > 0 && itemTotal > 10" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
      </div>
      <div class="list-side z-col-md-18 z-col-xl-15">
        <Card class="search-wrap">
          <search-blog @on-search="handleSearch"></search-blog>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import FilterSelect from '@/components/kit/FilterSelect/FilterSelect'
import Card from '@/components/base/Card/Card'
import TopicItem from '@/components/kit/TopicItem/TopicItem'
import CardNoData from '@/components/kit/CardNoData/CardNoData'
import SearchBlog from '@/components/kit/SearchBlog/SearchBlog'
import Pagenation from '@/components/base/Pagenation/Pagenation'

import { mapGetters } from 'vuex'

export default {
  name: 'BlogSearch',
  components: {
    FilterSelect,
    Card,
    TopicItem,
    CardNoData,
    SearchBlog,
    Pagenation
  },
  data() {
    return {
      formData: {},
      page: 1,
      limit: 10,
      pageTotal: 0,
      itemTotal: 0,
      blogList: [],
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['tagList', 'categoryList']),
    categoryListFormat() {
      return this.categoryList.filter((item) => item.value !== '/')
    }
  },
  async asyncData({ app, query }) {
    const params = {
      page: 1,
      limit: 10,
      ...query
    }
    const res = await app.$myApi.blogs.index(params)
    return {
      blogList: res.result.list,
      pageTotal: res.result.pages,
      itemTotal: res.result.total
    }
  },
  async fetch({ store }) {
    await store.dispatch('getTagList')
  },
  mounted() {
    const { keyword, tag } = this.$route.query
    if (keyword) {
      this.formData.keyword = keyword
    }
    if (tag) {
      this.$set(this.formData, 'tag', [this.$route.query.tag])
    }
  },
  methods: {
    /**
     * @desc 请求 文章列表
     */
    requestblogList() {
      this.isLoading = true
      const params = {
        page: this.page,
        limit: this.limit,
        ...this.formData
      }
      this.$myApi.blogs
        .index(params)
        .then((res) => {
          this.blogList = res.result.list
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    handleChangeCategory() {
      this.page = 1
      this.requestblogList()
    },

    handleChangeTag() {
      this.page = 1
      this.requestblogList()
    },
    /**
     * @desc 搜索
     */
    handleSearch(keyword) {
      this.page = 1
      this.formData.keyword = keyword
      this.requestblogList()
    },
    /**
     * @desc 分页点击
     */
    changePage(page) {
      this.page = page
      this.requestblogList()
    }
  },
  head() {
    return {
      title: '文章-搜索结果'
    }
  }
}
</script>

<style lang="less" scoped>
.filter-bar {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid darken(@colorBorder, 5%);
  background-color: @colorBgBody;
}
.list-side {
  position: sticky;
  top: @heightHeader + 20;
  z-index: 10;
}
.z-card.search-wrap {
  margin: 5px 0;
  // background-color: transparent;
  background-image: linear-gradient(90deg, @colorSuccess, @colorInfo);
}
</style>
