<template>
  <div class="z-container">
    <div class="filter-bar">
      <filter-search
        v-model="formData.category"
        @on-change="handleChangeCategory"
        :options="categoryListFormat"
        title="分类"
        icon="iconwenzhangfenlei"
        label-key="name"
        value-key="_id"
      ></filter-search>
      <filter-search v-model="formData.tag" :options="tagList" @on-change="handleChangeTag" multiple title="标签" icon="iconbiaoqian" label-key="name" value-key="_id">
      </filter-search>
    </div>
    <div class="z-row blog-mobile">
      <div v-loading="isLoading" class="z-col-md-42 z-col-xl-45">
        <template v-if="blogList.length > 0">
          <topic-item v-for="(blog, index) in blogList" :key="index" :topic="blog"></topic-item>
        </template>
        <card-no-data v-else style="height: 300px;" />
        <pagenation v-if="blogList && blogList.length > 0 && itemTotal > 10" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
      </div>
      <div class="list-side z-col-md-18 z-col-xl-15">
        <card class="search-wrap">
          <search-blog @on-search="handleSearch"></search-blog>
        </card>
        <card :padding="0" title="热门文章" class="hidden-xs hidden-sm">
          <ul v-if="rankBlog.length > 0" class="card-rank-list">
            <li v-for="(blog, index) in rankBlog" :key="index" class="rank-item">
              <router-link :to="{ path: `/article/detail/${blog._id}` }" active-class="current" class="rank-item-link">
                <div class="rank-item-title">{{ blog.title }}</div>
                <div class="rank-item-number">
                  <icon type="iconliulan" title="浏览" size="16px"></icon>
                  <span class="number">{{ blog.viewed }}</span>
                </div>
              </router-link>
            </li>
          </ul>
          <no-data v-else style="height: 260px;" />
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import FilterSearch from '@/components/kit/FilterSearch/FilterSearch'
import Card from '@/components/base/Card/Card'
import TopicItem from '@/components/kit/TopicItem/TopicItem'
import CardNoData from '@/components/kit/CardNoData/CardNoData'
import SearchBlog from '@/components/kit/SearchBlog/SearchBlog'
import Pagenation from '@/components/base/Pagenation/Pagenation'
import NoData from '@/components/kit/NoData/NoData'
import Icon from '@/components/base/Icon/Icon'

import { mapGetters } from 'vuex'

export default {
  name: 'BlogSearch',
  components: {
    FilterSearch,
    Card,
    TopicItem,
    CardNoData,
    SearchBlog,
    Pagenation,
    NoData,
    Icon
  },
  data() {
    return {
      formData: {},
      page: 1,
      limit: 10,
      pageTotal: 0,
      itemTotal: 0,
      blogList: [],
      rankBlog: [],
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['tagList', 'categoryList']),
    categoryListFormat() {
      return this.categoryList.filter((item) => item.value !== '/')
    }
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        const { keyword, tag, author } = this.$route.query
        if (keyword) {
          this.formData.keyword = keyword
        }
        if (author) {
          this.formData.author = author
        }
        if (tag) {
          this.$set(this.formData, 'tag', [this.$route.query.tag])
        }
        this.page = 1
        this.requestblogList()
      }
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
      blogList: res.result.docs,
      pageTotal: res.result.pages,
      itemTotal: res.result.total
    }
  },
  async fetch({ store }) {
    await store.dispatch('getTagList')
  },
  mounted() {
    this.requestRankBlog()
    const { keyword, tag, author } = this.$route.query
    if (keyword) {
      this.formData.keyword = keyword
    }
    if (author) {
      this.formData.author = author
    }
    if (tag) {
      this.$set(this.formData, 'tag', [this.$route.query.tag])
    }
  },
  methods: {
    /**
     * @desc 获取热门文章
     */
    requestRankBlog() {
      this.$myApi.blogs
        .index({ sort: '-viewed' })
        .then((res) => {
          this.rankBlog = res.result.docs
        })
        .catch(() => {})
    },
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
          this.blogList = res.result.docs
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
      title: '文章搜索 - 明么的博客'
    }
  }
}
</script>

<style lang="less" scoped>
.filter-bar {
  position: relative;
  padding: 20px 20px 20px 22px;
  margin-bottom: 20px;
  background-color: #fff;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background: @colorCol;
  }
}
.list-side {
  position: sticky;
  top: @heightHeader + 20;
  z-index: 10;
}
.z-card.search-wrap {
  background-image: @color;
}
.card-rank-list {
  position: relative;
  .rank-item {
    padding: 0 15px;
    z-index: 1;
  }

  .rank-item-link {
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    height: 40px;
    color: @colorTextSub;
    line-height: 40px;
    text-decoration: none;
    border-bottom: 1px solid lighten(@colorBorderLight, 2%);
    .rank-item-title {
      margin-right: 30px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .rank-item-number {
      flex: none;
    }
  }

  .rank-item-link:hover {
    color: @colorTextTitle;
  }

  .current {
    color: @colorTextTitle;
  }
}
@media (min-width: @breakpoints-xs) and (max-width: @breakpoints-md) {
  .blog-mobile {
    display: flex;
    flex-direction: column-reverse;
    .list-side {
      position: relative;
      top: 0;
      margin-bottom: 20px;
    }
  }
}
</style>
