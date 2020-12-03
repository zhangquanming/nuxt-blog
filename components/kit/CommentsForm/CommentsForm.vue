<template>
  <div class="comments-from">
    <div class="comments-form-body">
      <div class="comments-form-user">
        <div class="comments-form-user-avatar no-img-placeholder-colorful no-img-placeholder-horizon">
          <img v-if="userInfo" :src="userInfo ? userInfo.avatar : ''" alt="用户头像" />
        </div>
        <span v-if="userInfo" class="comments-form-user-name">{{ userInfo.userName }}</span>
        <btn v-else @click="handleLogin" theme="text">请登录</btn>
      </div>
      <div class="comments-form-content">
        <div class="comments-form-content-input">
          <textarea v-model="formData.content" placeholder="说点什么吧..." rows="5"></textarea>
        </div>
        <span style="position: absolute;left: 0;top: 105%;color: #ccc;">{{ formData.content ? formData.content.length : 0 }} / 500</span>
      </div>
    </div>
    <div class="comments-form-footer">
      <btn @click="handleComment" :loading="isAddCommentLoading" theme="gradient" shape="rect">{{ commentId ? '回复' : '发表' }}</btn>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/base/Btn/Btn'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommentsForm',
  components: {
    Btn
  },
  props: {
    commentId: String,
    toUserId: String
  },
  data() {
    return {
      isAddCommentLoading: false,
      formData: {
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    handleLogin() {
      this.toggleSignInModal(true)
    },
    handleComment() {
      if (this.userInfo && this.userInfo._id) {
        if (this.commentId) {
          this.requestRepay()
        } else {
          this.requestComments()
        }
      } else {
        this.$toast.info('请登录')
        this.toggleSignInModal(true)
      }
    },
    /**
     * @desc 请求 发表评论
     */
    requestComments() {
      if (!this.formData.content.trim()) {
        this.$toast.error('请输入评论内容')
        return false
      }
      const params = {
        blogId: this.$route.params.articleId,
        from: this.userInfo._id,
        content: this.formData.content
      }
      this.isAddCommentLoading = true
      this.$myApi.comments
        .create(params)
        .then(() => {
          this.formData.content = ''
          this.$emit('on-success')
          this.isAddCommentLoading = false
        })
        .catch(() => {
          this.isAddCommentLoading = false
        })
    },
    /**
     * @desc 请求 发表回复
     */
    requestRepay() {
      if (!this.formData.content.trim()) {
        this.$toast.error('请输入回复内容')
        return false
      }
      const params = {
        commentId: this.commentId,
        from: this.userInfo._id,
        to: this.toUserId,
        content: this.formData.content
      }
      this.isAddCommentLoading = true
      this.$myApi.replys
        .create(params)
        .then(() => {
          this.formData.content = ''
          this.$emit('on-success')
          this.isAddCommentLoading = false
        })
        .catch(() => {
          this.isAddCommentLoading = false
        })
    },
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal'
    })
  }
}
</script>

<style lang="less" scoped>
.comments-form {
  &-body {
    display: flex;
    align-items: flex-start;
  }
  &-user {
    text-align: center;
    margin-right: 15px;
    &-avatar {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      margin: 0 auto;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
  &-content {
    position: relative;
    flex: 1;
    border: 1px solid @colorBorder;
    &-input {
      position: relative;
      display: block;
      width: 100%;
      height: auto;
      &:before {
        content: '';
        position: absolute;
        display: block;
        width: 14px;
        height: 14px;
        top: 14px;
        left: -8px;
        border: 1px solid @colorBorder;
        border-width: 0 0 1px 1px;
        background-color: #fff;
        transform: rotate(45deg);
      }
      textarea {
        all: unset;
        display: block;
        height: 100%;
        width: 100%;
        padding: 10px;
        word-break: break-word;
        box-sizing: border-box;
      }
    }
    &:focus-within {
      border: 1px solid @colorPrimary;
    }
    &:focus-within :before {
      border: 1px solid @colorPrimary;
      border-width: 0 0 1px 1px;
    }
  }
  &-footer {
    margin-top: 15px;
    text-align: right;
  }
}
</style>
