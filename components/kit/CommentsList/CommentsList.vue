<template>
  <div>
    <ul class="comments-list">
      <li v-for="comments in commentsList" :key="comments.id" class="comments-list-item">
        <div class="comments-body">
          <div class="comments-user no-img-placeholder-colorful no-img-placeholder-horizon">
            <img v-if="comments.from" :src="comments.from ? comments.from.avatar : ''" class="comments-user-avatar" alt="用户头像" />
          </div>
          <div class="comments-main">
            <div class="comments-mate">
              <span class="comments-mate-username">{{ comments.from ? comments.from.userName : '未知' }}</span>
              <span v-if="comments.from.userName === 'Mingme'" class="comments-mate-tag">站长</span>
              <span class="comments-mate-time">{{ comments.createdAt | dateFormatFilter('YYYY-MM-DD HH:mm:ss') }}</span>
              <span v-if="commentId && commentId === comments.id" @click="handleUnRepay(comments)" class="comments-mate-unrepay">取消回复</span>
              <span v-else @click="handleRepay(comments)" class="comments-mate-repay">回复</span>
              <div class="comments-mate-order">#{{ comments.orderIndex }}</div>
            </div>
            <div class="comments-content">{{ comments.content }}</div>
            <div class="comments-address"><i class="iconfont iconweizhi"></i>{{ comments.address ? comments.address : '可能在火星' }}</div>
            <ul v-if="comments.reply && comments.reply.length > 0" class="repay-list">
              <li v-for="repay in comments.reply" :key="repay.id" class="repay-list-item">
                <div class="comments-body">
                  <div class="comments-user no-img-placeholder-colorful no-img-placeholder-horizon">
                    <img v-if="repay.from" :src="repay.from ? repay.from.avatar : ''" class="comments-user-avatar" alt="用户头像" />
                  </div>
                  <div class="comments-main">
                    <div class="comments-mate">
                      <span class="comments-mate-username">{{ repay.from ? repay.from.userName : '未知' }}</span>
                      <span v-if="repay.from.userName === 'Mingme'" class="comments-mate-tag">站长</span>
                      <span class="comments-mate-time">{{ repay.createdAt | dateFormatFilter('YYYY-MM-DD HH:mm:ss') }}</span>
                    </div>
                    <div class="comments-content">{{ repay.content }}</div>
                    <div class="comments-address"><i class="iconfont iconweizhi"></i>{{ repay.address ? repay.address : '可能在火星' }}</div>
                  </div>
                </div>
              </li>
            </ul>
            <div v-if="commentId && commentId === comments.id" style="margin-top: 20px;">
              <comments-form @on-success="handleCommentsSuccess" :commentId="commentId" :type="type" :toUserId="toUserId"></comments-form>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import CommentsForm from '@/components/kit/CommentsForm/CommentsForm'
export default {
  name: 'CommentsList',
  components: {
    CommentsForm
  },
  props: {
    type: {
      type: String,
      default: 'comment'
    },
    commentsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      commentId: '',
      toUserId: ''
    }
  },
  methods: {
    handleRepay(data) {
      this.commentId = data.id
      this.toUserId = data.from.id
    },
    handleUnRepay() {
      this.commentId = ''
      this.toUserId = ''
    },

    handleCommentsSuccess() {
      this.commentId = ''
      this.toUserId = ''
      this.$emit('on-fresh')
    }
  }
}
</script>

<style lang="less" scoped>
.comments-list {
  position: relative;
  .comments-list-item {
    padding: 15px;
    border-top: 1px solid @colorBorderLight;
    border-bottom: 1px solid @colorBorderLight;
  }
  .comments-list-item:hover .comments-mate-repay {
    display: inline;
  }

  .repay-list {
    padding: 10px 10px 0;
  }
  .repay-list-item {
    padding: 5px;
    border-top: 1px dashed @colorBorder;
  }

  .comments-body {
    display: flex;
    align-items: flex-start;
  }
  .comments-user {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .comments-user-avatar {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  .comments-main {
    flex: 1;
  }
  .comments-content {
    margin: 10px 0;
    min-height: 60px;
    text-align: justify;
    line-height: 1.75;
  }
  .comments-mate {
    margin-bottom: 5px;
    vertical-align: middle;
    font-size: 12px;
  }
  .comments-mate-username {
    font-size: 16px;
    margin-right: 10px;
    color: @colorAssist;
    @colorActive();
  }
  .comments-mate-tag {
    display: inline-block;
    padding: 0px 8px;
    background: @color;
    color: #fff;
    margin-right: 10px;
    border-radius: 4px;
  }
  .comments-mate-time {
    color: @colorTextLight;
    margin-right: 10px;
  }
  .comments-mate-repay {
    color: @colorError;
    cursor: pointer;
    display: none;
  }
  .comments-mate-unrepay {
    color: @colorError;
    cursor: pointer;
  }
  .comments-mate-order {
    font-weight: bold;
    float: right;
    font-size: 16px;
    color: @colorAssist;
    @colorActive();
  }
  .comments-address {
    display: flex;
    align-items: center;
    color: @colorTextLight;
    font-size: 13px;
    i {
      margin-right: 5px;
      font-size: 18px;
    }
  }
}
</style>
