<template>
  <div class="page">
    <billboard :poster="banneImg" title="留言板" title-sub="没事儿，我们一起来吹吹nb~~~" is-page poster-blue="0" height="300px"> </billboard>
    <div class="z-container cont-list">
      <card class="message-form">
        <comments-form @on-success="handleCommentsSuccess" type="message"></comments-form>
      </card>
      <div class="message-list">
        <card v-loading="isCommentsListLoading" v-if="commentsList && commentsList.length > 0">
          <title-bar :bottom="0" title="留言"></title-bar>
          <comments-list @on-fresh="requestCommentsList" :commentsList="commentsList" type="message"></comments-list>
          <pagenation :totalEle="totalEle" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
        </card>
        <card-no-data v-else style="height: 300px;" />
      </div>
    </div>
  </div>
</template>

<script>
import Billboard from '@/components/kit/Billboard/Billboard'
import TitleBar from '@/components/kit/TitleBar/TitleBar'
import Card from '@/components/base/Card/Card'
import CommentsForm from '@/components/kit/CommentsForm/CommentsForm'
import CommentsList from '@/components/kit/CommentsList/CommentsList'
import Pagenation from '@/components/base/Pagenation/Pagenation'
import CardNoData from '@/components/kit/CardNoData/CardNoData'

const banneImg = require('@/assets/images/home/banner.jpg')

export default {
  name: 'Message',
  components: {
    Billboard,
    TitleBar,
    Card,
    CommentsForm,
    CommentsList,
    Pagenation,
    CardNoData
  },
  data() {
    return {
      banneImg,
      isCommentsListLoading: false,
      commentsList: [],
      page: 1,
      limit: 10,
      pageTotal: 0,
      totalEle: 0
    }
  },
  created() {
    this.requestCommentsList()
  },
  methods: {
    /**
     * @desc 评论发表成功 回调
     */
    handleCommentsSuccess() {
      this.$toast.success('发布成功，将在审核后展示...', { icon: 'iconfont toasted-icon iconsuccess' })
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
     * @desc 请求 评论列表
     */
    requestCommentsList() {
      this.isCommentsListLoading = true
      const params = {
        page: this.page,
        limit: this.limit
      }
      this.$myApi.messages
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
    }
  },
  head() {
    return {
      title: '留言板 - 明么的博客'
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  margin-top: -@heightHeader - 20;
  .cont-list {
    margin-top: 20px;
    .message-list {
      margin-top: 20px;
    }
  }
}
</style>
