<template>
  <div class="page">
    <billboard :poster="banneImg" poster-blue="0" height="400px" is-home-page>
      <div class="z-container">
        <card class="comment-form">
          <comments-form @on-success="handleCommentsSuccess"></comments-form>
        </card>
      </div>
    </billboard>
    <div class="z-container cont-list"></div>
  </div>
</template>

<script>
import Billboard from '@/components/kit/Billboard/Billboard'
import Card from '@/components/base/Card/Card'
import CommentsForm from '@/components/kit/CommentsForm/CommentsForm'
// import CommentsList from '@/components/kit/CommentsList/CommentsList'

const banneImg = require('@/assets/images/home/banner.jpg')

export default {
  name: 'Message',
  components: {
    Billboard,
    Card,
    CommentsForm
    // CommentsList
  },
  data() {
    return {
      banneImg
    }
  },
  methods: {
    /**
     * @desc 评论发表成功 回调
     */
    handleCommentsSuccess() {
      this.$toast.success('添加评论成功！')
      // this.requestCommentsList()
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
  .comment-form {
    text-align: left;
  }
  .cont-list {
    margin-top: 20px;
    padding: 20px;
    background: #fff;
  }
}
</style>
