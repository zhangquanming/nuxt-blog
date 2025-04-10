<template>
  <div class="chat-side">
    <div class="chat-side-logo">
      <router-link to="/" class="ai-header-brand">
        <logo :h="38" />
      </router-link>
    </div>
    <a @click="handleNewChat" class="chat-side-btn"><i class="iconfont iconxinduihua"></i><span>开启新对话</span></a>
    <div class="chat-history">
      <Conversations :list="conversationsList" :current="currentConversation" @on-change="handleChange" @on-delete="handleDelete"></Conversations>
    </div>
    <div class="chat-side-bottom">
      <div @click="handleChatUser" class="chat-user">
        <div class="chat-user-avatar">
          <img v-if="userInfo" :src="userInfo.avatar" alt="avatar" />
          <i v-else class="iconfont iconuser"></i>
        </div>
        <div class="chat-user-info">
          <div class="chat-user-name">{{ userInfo ? userInfo.userName : '请先登录' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '~/plugins/eventBus'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Logo from '@/components/base/Logo/Logo'
import Conversations from '@/components/kit/Conversations/Conversations.vue'

export default {
  name: 'ChatSide',
  components: {
    Logo,
    Conversations
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['userInfo', 'conversationsList', 'currentConversation']),
    chatId() {
      return this.$route.params.chat || ''
    }
  },
  watch: {
    userInfo: {
      handler() {
        this.requestList()
      },
      deep: true
    }
  },
  created() {
    if (!this.chatId) {
      this.changeCurrentConversation(null)
    }
  },
  mounted() {
    this.requestList()
  },
  methods: {
    ...mapMutations(['setConversationsList']),
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal',
      getConversationsList: 'getConversationsList',
      changeCurrentConversation: 'changeCurrentConversation'
    }),
    handleNewChat() {
      if (!this.userInfo) {
        this.toggleSignInModal(true)
        return
      }
      eventBus.$emit('stopChat', this.chatId)
      this.changeCurrentConversation(null)
      eventBus.$emit('refreshBubbleList')
      this.$router.push({ path: '/ai' })
    },
    handleChange(row) {
      eventBus.$emit('stopChat', this.chatId)
      this.changeCurrentConversation(row)
      eventBus.$emit('refreshBubbleList', row.id)
      this.$router.push({ path: `/ai/${row.id}` })
    },
    handleDelete(row) {
      eventBus.$emit('stopChat', this.chatId)
      this.$myApi.conversation
        .delete(row.id)
        .then((res) => {
          this.$toast.success('删除成功！', { icon: 'iconfont toasted-icon iconsuccess' })
          if (row.id === this.currentConversation.id) {
            this.changeCurrentConversation(null)
            eventBus.$emit('refreshBubbleList')
            this.$router.push({ path: '/ai' })
          }
          this.requestList()
        })
        .catch(() => {})
    },
    handleChatUser() {
      if (!this.userInfo) {
        this.toggleSignInModal(true)
        return
      }
      this.$router.push({ path: '/user' })
    },
    requestList() {
      eventBus.$emit('stopChat', this.chatId)
      if (this.userInfo) {
        this.getConversationsList({
          author: this.userInfo._id,
          page: 1,
          limit: 100
        })
          .then((res) => {
            if (!res.result.docs.length) {
              this.changeCurrentConversation(null)
              eventBus.$emit('refreshBubbleList')
              this.$router.push({ path: '/ai' })
            }
            if (this.chatId) {
              const currentRow = this.conversationsList.find((item) => item.id === this.chatId)
              if (currentRow) {
                this.changeCurrentConversation(currentRow)
                eventBus.$emit('refreshBubbleList', currentRow.id)
              }
            }
          })
          .catch(() => {})
      } else {
        this.setConversationsList([])
        this.changeCurrentConversation(null)
        eventBus.$emit('refreshBubbleList')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.chat-side {
  flex: none;
  display: flex;
  flex-direction: column;
  width: 260px;
  background: #f9fbff;
  .chat-side-logo {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .chat-side-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 22px;
      margin-right: 10px;
    }
    height: 40px;
    padding: 10px;
    border: none;
    line-height: 30px;
    font-size: 16px;
    margin: 20px;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    color: #fff;
    background-color: transparent;
    cursor: pointer;
    background-image: linear-gradient(90deg, rgba(45, 183, 245, 0.75), rgba(107, 195, 13, 0.75));
    &:hover {
      background-image: linear-gradient(90deg, #2db7f5, #6bc30d);
      color: #fff;
    }
  }
  .chat-history {
    flex: 1;
    padding: 0 10px;
    overflow: auto;
  }
  .chat-side-bottom {
    display: flex;
    flex-direction: column;
    padding: 10px 12px;
  }
  .chat-user {
    display: flex;
    align-items: center;
    border-radius: 12px;
    cursor: pointer;
    padding: 8px 10px;
    &:hover {
      background: #e8f3ff;
    }
    .chat-user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      background: #ccc;
      i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #fff;
      }
      img {
        background: #fff;
        border: 1px solid #ccc;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .chat-user-info {
      flex: 1;
      margin-left: 10px;
      .chat-user-name {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
