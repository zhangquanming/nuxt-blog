<template>
  <div class="z-container">
    <div class="z-row">
      <div class="z-col-lg-42 z-col-xl-45">
        <card padding="0">
          <billboard :poster="blogResult.poster" :title="blogResult.title" :titleSub="blogResult.createdAt | dateFormatFilter('YYYY 年 MM 月 DD 日')">
            <div class="tags">
              <tag v-for="(tag, index) in blogResult.tagArray" :key="index" size="large" theme="gradient" shape="rect">{{ tag.name }}</tag>
              <btn v-if="isLiked" @click="handleUnLike" :loading="isLikeLoading" shape="rect" theme="gradient" icon="iconliked"></btn>
              <btn v-else @click="handleLike" :loading="isLikeLoading" shape="rect" theme="gradient" icon="iconlike"></btn>
              <btn v-if="userInfo && userInfo._id === authorObj._id" :to="{ path: `/user/write?articleId=${blogResult.id}` }" theme="assist" shape="rect">编辑</btn>
            </div>
          </billboard>
        </card>
        <card padding="0" style="margin-bottom: 20px;">
          <md-preview :content="blogResult.content" />
        </card>
        <card>
          <comments-form @on-success="handleCommentsSuccess"></comments-form>
        </card>

        <card v-loading="isCommentsListLoading" v-if="commentsList && commentsList.length > 0">
          <comments-list @on-fresh="requestCommentsList" :commentsList="commentsList"></comments-list>
          <pagenation :totalEle="totalEle" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
        </card>
      </div>
      <div class="z-col-lg-18 z-col-xl-15 visible-lg visible-xl">
        <div id="briefWrap" style="margin-bottom: 20px;">
          <card-brief-blog :blogResult="blogResult" v-if="blogResult && blogResult.content" />
          <card-no-data v-else style="height: 385px;" />
        </div>
        <div id="jsCardMdNav">
          <card-md-nav :blogResult="blogResult" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { throttle } from '@/assets/js/tools'

import Btn from '@/components/base/Btn/Btn'
import Tag from '@/components/base/Tag/Tag'
import Card from '@/components/base/Card/Card'
import Billboard from '@/components/kit/Billboard/Billboard'
import MdPreview from '@/components/kit/MdPreview/MdPreview'
import CommentsForm from '@/components/kit/CommentsForm/CommentsForm'
import CommentsList from '@/components/kit/CommentsList/CommentsList'
import Pagenation from '@/components/base/Pagenation/Pagenation'
import CardBriefBlog from '@/components/kit/CardBriefBlog/CardBriefBlog'
import CardNoData from '@/components/kit/CardNoData/CardNoData'
import CardMdNav from '@/components/kit/CardMdNav/CardMdNav'

export default {
  name: 'BlogDetail',
  components: {
    Card,
    Btn,
    Tag,
    Billboard,
    MdPreview,
    CommentsForm,
    CommentsList,
    Pagenation,
    CardBriefBlog,
    CardNoData,
    CardMdNav
  },
  data() {
    return {
      isLikeLoading: false,
      isLoading: false,
      isCommentsListLoading: false,
      blogResult: {},
      commentsList: [],
      page: 1,
      limit: 10,
      pageTotal: 0,
      totalEle: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    authorObj() {
      return this.blogResult.authorObj || {}
    },
    isLiked() {
      const likes = this.blogResult.likes
      if (likes && likes.length > 0 && this.userInfo && this.userInfo._id) {
        return likes.includes(this.userInfo._id)
      }
      return false
    }
  },
  async asyncData({ app, params }) {
    const sendParams = {
      id: params.articleId
    }
    const res = await app.$myApi.blogs.show(sendParams)
    return {
      blogResult: res.result || {}
    }
  },
  created() {
    this.requestBlogDetail()
    this.requestCommentsList()
  },
  mounted() {
    const vm = this
    this.throttleScroll = throttle(function() {
      vm.scrollHandler()
    }, 20)
    window.addEventListener('scroll', this.throttleScroll)
    document.documentElement.scrollTop = document.documentElement.scrollTop + 1
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttleScroll)
  },
  methods: {
    scrollHandler() {
      const t = document.documentElement.scrollTop || document.body.scrollTop
      const jsCardMdNav = document.getElementById('jsCardMdNav') || document.createElement('div')
      const jsBriefWrap = document.getElementById('briefWrap') || document.createElement('div')

      if (t >= jsBriefWrap.clientHeight + 20) {
        jsCardMdNav.classList.add('fixed-side-card')
      } else {
        jsCardMdNav.classList.remove('fixed-side-card')
      }
    },
    /**
     * @desc 评论发表成功 回调
     */
    handleCommentsSuccess() {
      this.$toast.success('添加评论成功！')
      this.requestCommentsList()
    },
    /**
     * @desc 分页点击
     */
    changePage(page) {
      this.page = page
      this.requestCommentsList()
    },

    /**
     * @desc 请求 文章详情
     */
    requestBlogDetail() {
      this.isLoading = true
      const params = {
        id: this.$route.params.articleId
      }
      this.$myApi.blogs
        .show(params)
        .then((res) => {
          this.isLoading = false
          this.blogResult = res.result
        })
        .catch(() => {
          this.isLoading = false
        })
    },

    /**
     * @desc 请求 评论列表
     */
    requestCommentsList() {
      this.isCommentsListLoading = true
      const params = {
        blogId: this.$route.params.articleId,
        page: this.page,
        limit: this.limit
      }
      this.$myApi.comments
        .index(params)
        .then((res) => {
          this.isCommentsListLoading = false
          this.commentsList = res.result.docs
          this.pageTotal = res.result.pages
          this.totalEle = res.result.total
        })
        .catch(() => {
          this.isCommentsListLoading = false
        })
    },

    /**
     * @desc 请求 点赞
     */
    requestLike() {
      const params = {
        blogId: this.blogResult.id,
        userId: this.userInfo._id
      }
      this.isLikeLoading = true
      this.$myApi.blogs
        .PostBlogLike(params)
        .then((res) => {
          this.blogResult.likes = res.result.likes
          this.isLikeLoading = false
        })
        .catch(() => {
          this.isLikeLoading = false
        })
    },

    /**
     * @desc 请求 取消点赞
     */
    requestUnLike() {
      const params = {
        blogId: this.blogResult.id,
        userId: this.userInfo._id
      }
      this.isLikeLoading = true
      this.$myApi.blogs
        .PostBlogUnLike(params)
        .then((res) => {
          this.blogResult.likes = res.result.likes
          this.isLikeLoading = false
        })
        .catch(() => {
          this.isLikeLoading = false
        })
    },

    /**
     * @desc 点击事件 点赞
     */
    handleLike() {
      if (this.userInfo && this.userInfo._id) {
        this.requestLike()
      } else {
        this.toggleSignInModal(true)
      }
    },

    /**
     * @desc 点击事件 取消点赞
     */
    handleUnLike() {
      if (this.userInfo && this.userInfo._id) {
        this.requestUnLike()
      } else {
        this.toggleSignInModal(true)
      }
    },
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal'
    })
  },
  head() {
    return {
      title: `${this.blogResult.title}-详情页`,
      meta: [{ hid: 'article-detail referrer', name: 'referrer', content: 'never' }]
    }
  }
}
</script>

<style lang="less" scoped>
.fixed-side-card {
  position: fixed;
  top: @heightHeader + 20;
  width: 100%;
  @media screen and (min-width: @breakpoints-xs) {
    // min-width: 320px;
  }

  @media screen and (min-width: @breakpoints-sm) {
    max-width: @containerMaxWidth-sm * 7 / 24 - 16;
  }

  @media screen and (min-width: @breakpoints-md) {
    max-width: @containerMaxWidth-md * 7 / 24 - 16;
  }

  @media screen and (min-width: @breakpoints-lg) {
    max-width: @containerMaxWidth-lg * 7 / 24 - 16;
  }

  @media screen and (min-width: @breakpoints-xl) {
    max-width: @containerMaxWidth-xl * 6 / 24 - 16;
  }
}
</style>
