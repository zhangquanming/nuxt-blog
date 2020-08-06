<template>
  <div class="comment-item">
    <div class="comment-content">{{ comment.content }}</div>
    <div class="comment-target">
      <span>{{ comment.createdAt | dateFormatFilter('YYYY-MM-DD HH:mm:ss') }}</span>
      <span style="margin: 0 5px;">评论于</span>
      <router-link v-if="comment.blogObj" :to="{ path: `/article/detail/${comment.blogObj._id}` }" class="comment-blog-link">{{ comment.blogObj.title }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCommentItem',
  props: {
    comment: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  position: relative;
  border: 1px solid @colorBorder;
  margin-bottom: 15px;
  .comment-content {
    padding: 10px;
    font-size: 14px;
    color: @colorTextContent;
  }
  .comment-target {
    padding: 10px;
    font-size: 12px;
    background-color: @colorBg;
    color: @colorTextLight;
  }
  .comment-blog-link {
    &:hover {
      color: @colorInfo;
    }
  }
}
</style>
