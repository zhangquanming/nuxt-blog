<template>
  <div class="comments-from">
    <div class="comments-form-body">
      <div class="comments-form-user">
        <div class="comments-form-user-avatar no-img-placeholder-colorful no-img-placeholder-horizon">
          <img v-if="userInfo" :src="userInfo ? userInfo.avatar : ''" alt="用户头像" />
        </div>
        <span v-if="userInfo" class="comments-form-user-name">{{ userInfo.userName }}</span>
        <btn v-else @click="handleLogin" theme="text" style="width: 60px;padding:4px 0;">报上名来</btn>
      </div>
      <div class="comments-form-content">
        <div class="comments-form-content-input">
          <textarea v-model="formData.content" placeholder="我有酒，来说出你的故事..." rows="5"></textarea>
        </div>
      </div>
    </div>
    <div class="comments-form-footer">
      <div class="comments-form-footer-btns">
        <button @blur="handleBlur" class="mo-btns">
          <i @click="handleClick" class="iconfont iconsmile"></i>
          <Emotion v-show="showDialog" @emotion="handleEmotion" class="emoji-picker" />
        </button>
        <span>{{ formData.content ? formData.content.length : 0 }} / 500</span>
      </div>
      <btn @click="handleComment" :loading="isAddCommentLoading" theme="gradient" shape="rect">{{ commentId ? '回复' : '发布' }}</btn>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/base/Btn/Btn'
import Emotion from '@/components/base/Emotion/Emotion.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommentsForm',
  components: {
    Btn,
    Emotion
  },
  props: {
    type: {
      type: String,
      default: 'comment'
    },
    commentId: String,
    toUserId: String
  },
  data() {
    return {
      showDialog: false,
      isAddCommentLoading: false,
      formData: {
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    if (!document.querySelector('#address')) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.id = 'address'
      script.src = 'https://pv.sohu.com/cityjson?ie=utf-8'
      document.head.appendChild(script)
    }
  },
  methods: {
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog
    },
    handleEmotion(emoji) {
      this.formData.content += `[${emoji.text}]`
    },
    /**
     * @desc 点击 表情按钮
     */
    handleClick() {
      this.toogleDialogEmoji()
    },
    /**
     * @desc 失焦事件
     */
    handleBlur() {
      this.showDialog = false
    },
    handleLogin() {
      this.toggleSignInModal(true)
    },
    handleComment() {
      if (this.userInfo && this.userInfo._id) {
        if (this.type === 'message') {
          if (this.commentId) {
            this.requestMessageReply()
          } else {
            this.requestMessages()
          }
        }
        if (this.type === 'comment') {
          if (this.commentId) {
            this.requestCommentReplys()
          } else {
            this.requestComments()
          }
        }
      } else {
        this.$toast.info('请登录', { icon: 'iconfont toasted-icon iconinfo' })
        this.toggleSignInModal(true)
      }
    },
    /**
     * @desc 请求 发布评论
     */
    requestComments() {
      if (!this.formData.content.trim()) {
        this.$toast.error('请输入评论内容', { icon: 'iconfont toasted-icon iconerror' })
        return false
      }
      let address = ''
      try {
        // eslint-disable-next-line no-undef
        address = returnCitySN.cname
      } catch (err) {
        address = ''
      }
      const params = {
        blogId: this.$route.params.articleId,
        from: this.userInfo._id,
        content: this.formData.content,
        address
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
     * @desc 请求 发布评论回复
     */
    requestCommentReplys() {
      if (!this.formData.content.trim()) {
        this.$toast.error('请输入回复内容', { icon: 'iconfont toasted-icon iconerror' })
        return false
      }
      let address = ''
      try {
        // eslint-disable-next-line no-undef
        address = returnCitySN.cname
      } catch (err) {
        address = ''
      }
      const params = {
        commentId: this.commentId,
        from: this.userInfo._id,
        to: this.toUserId,
        content: this.formData.content,
        address
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
    /**
     * @desc 请求 发布留言
     */
    requestMessages() {
      if (!this.formData.content.trim()) {
        this.$toast.error('请输入评论内容', { icon: 'iconfont toasted-icon iconerror' })
        return false
      }
      let address = ''
      try {
        // eslint-disable-next-line no-undef
        address = returnCitySN.cname
      } catch (err) {
        address = ''
      }

      const params = {
        from: this.userInfo._id,
        content: this.formData.content,
        address
      }
      this.isAddCommentLoading = true
      this.$myApi.messages
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
     * @desc 请求 发布留言回复
     */
    requestMessageReply() {
      if (!this.formData.content.trim()) {
        this.$toast.error('请输入回复内容', { icon: 'iconfont toasted-icon iconerror' })
        return false
      }
      let address = ''
      try {
        // eslint-disable-next-line no-undef
        address = returnCitySN.cname
      } catch (err) {
        address = ''
      }
      const params = {
        commentId: this.commentId,
        from: this.userInfo._id,
        to: this.toUserId,
        content: this.formData.content,
        address
      }
      this.isAddCommentLoading = true
      this.$myApi.messageReplys
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
    flex: none;
    text-align: center;
    margin-right: 15px;
    &-avatar {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      margin: 0 auto;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    &-name {
      margin-top: 4px;
      display: block;
      width: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 75px;
    &-btns {
      z-index: 100;
      display: flex;
      align-items: center;
      color: #ccc;
      .mo-btns {
        padding: 0;
        position: relative;
        border: none;
        outline: none;
        background: none;
        margin-right: 20px;
        &:hover {
          i {
            @colorActive();
          }
        }
        i {
          font-size: 30px;
          color: #ccc;
        }
      }
      .emoji-picker {
        position: absolute;
        top: 40px;
        left: 0px;
      }
    }
  }
}
@media only screen and (max-width: @containerMaxWidth-sm) {
  .emoji-picker {
    left: -70px !important;
  }
}
</style>
