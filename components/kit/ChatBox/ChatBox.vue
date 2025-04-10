<template>
  <div ref="chatBoxWrapRef" class="chat-box-wrap">
    <div :class="['chat-box', { center: !currentId }]">
      <Welcome v-if="!currentId"></Welcome>
      <BubbleChat ref="bubbleChat" v-show="currentId"></BubbleChat>
      <div class="sender-wrap">
        <Sender ref="senderRef" @onSend="handleSend" @onStop="handleStop" @onChange="handleChange"></Sender>
        <div class="sender-tip">内容由 AI 生成，请仔细甄别</div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '~/plugins/eventBus'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { throttle } from '@/assets/js/tools'
import Welcome from '@/components/kit/Welcome/Welcome.vue'
import BubbleChat from '@/components/kit/BubbleChat/BubbleChat.vue'
import Sender from '@/components/kit/Sender/Sender.vue'
export default {
  name: 'ChatBox',
  components: {
    Welcome,
    BubbleChat,
    Sender
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['userInfo', 'conversationsList', 'currentConversation']),
    currentId() {
      return this.$route.params.chat || ''
      // return this.currentConversation ? this.currentConversation.id : ''
    }
  },
  watch: {
    '$route.params.chat'() {
      this.$refs.senderRef.resetValue()
    }
  },
  mounted() {
    eventBus.$on('refreshBubbleList', this.requsetBubbleList)
    eventBus.$on('stopChat', this.requsetStop)
  },
  beforeDestroy() {
    eventBus.$off('refreshBubbleList', this.requsetBubbleList)
    eventBus.$off('stopChat', this.requsetStop)
  },
  methods: {
    ...mapMutations(['setConversationsList']),
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal',
      changeCurrentConversation: 'changeCurrentConversation'
    }),
    handleSend(val) {
      if (!this.userInfo) {
        this.toggleSignInModal(true)
        return
      }
      if (this.currentId) {
        this.requsetSender(val, this.currentId)
      } else {
        this.createConversation(val)
      }
    },
    handleStop() {
      if (!this.currentId) {
        return
      }
      this.requsetStop(this.currentId)
    },
    handleChange() {
      if (!this.userInfo) {
        this.toggleSignInModal(true)
      }
    },
    scrollBottom: throttle(function() {
      this.$nextTick(() => {
        const chatBoxWrap = this.$refs.chatBoxWrapRef
        if (chatBoxWrap) {
          chatBoxWrap.scrollTo({
            top: chatBoxWrap.scrollHeight,
            behavior: 'auto'
          })
        }
      })
    }),
    requsetBubbleList(conversationId = '') {
      if (!conversationId) {
        this.$refs.bubbleChat.list = []
        return
      }
      this.$myApi.chat
        .index({ conversationId })
        .then((res) => {
          this.$refs.bubbleChat.list = res.result
          this.scrollBottom()
        })
        .catch(() => {
          this.$refs.bubbleChat.list = []
        })
    },
    createConversation(val) {
      this.$myApi.conversation.create({ title: val, author: this.userInfo._id }).then((res) => {
        this.requsetBubbleList()
        this.$router.push({ path: `/ai/${res.result.id}` })
        this.setConversationsList([res.result, ...this.conversationsList])
        this.changeCurrentConversation(res.result)
        this.requsetSender(val, res.result.id)
      })
    },
    async requsetSender(val, conversationId) {
      this.$refs.bubbleChat.list.push({
        conversationId,
        role: 'user',
        author: this.userInfo._id,
        content: val
      })
      this.$refs.bubbleChat.list.push({
        conversationId,
        role: 'assistant',
        author: this.userInfo._id,
        content: '',
        loading: true
      })
      this.scrollBottom()
      this.$refs.senderRef.showLoading()
      this.$refs.senderRef.resetValue()
      const response = await this.$myApi.chat.completion({
        conversationId,
        role: 'user',
        author: this.userInfo._id,
        content: val
      })
      const lastBubble = this.$refs.bubbleChat.list[this.$refs.bubbleChat.list.length - 1]
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let chunkBuffer = '' // 新增缓冲区变量
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const buffer = decoder.decode(value, { stream: true })
        chunkBuffer += buffer // 累积数据块
        // 处理完整的事件数据
        const events = chunkBuffer.split('\n\n')
        for (let i = 0; i < events.length - 1; i++) {
          const event = events[i]
          if (event.startsWith('data:')) {
            const content = event.slice(5).trim()
            if (content === '[DONE]') {
              lastBubble.loading = false
              this.$refs.senderRef.hideLoading()
              this.$refs.senderRef.inputFocus()
              continue
            }
            try {
              const jsonData = JSON.parse(content)
              lastBubble.loading = false
              lastBubble.messageId = jsonData.id
              lastBubble.content += jsonData.choices[0].delta.content
              this.$refs.bubbleChat.list = [...this.$refs.bubbleChat.list.slice(0, -1), lastBubble]
              this.scrollBottom()
            } catch (error) {}
          }
        }
        chunkBuffer = events[events.length - 1]
      }
    },
    async requsetStop(conversationId) {
      if (!conversationId) return
      await this.$myApi.chat
        .stop({ conversationId })
        .then((res) => {
          const lastBubble = this.$refs.bubbleChat.list[this.$refs.bubbleChat.list.length - 1]
          if (lastBubble.loading || lastBubble.content === '') {
            this.$refs.bubbleChat.list.splice(-1, 1)
          }
        })
        .catch(() => {})
        .finally(() => {
          this.$refs.senderRef.hideLoading()
          this.$refs.senderRef.inputFocus()
        })
    }
  }
}
</script>

<style lang="less" scoped>
.chat-box-wrap {
  flex: 1;
  overflow: auto;
  padding: 0 32px;
  .chat-box {
    position: relative;
    max-width: 800px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    &.center {
      justify-content: center;
      align-items: center;
      padding: 0 64px;
    }
    .sender-wrap {
      width: 100%;
      position: sticky;
      bottom: 0;
      z-index: 1;
      .sender-tip {
        color: #999;
        margin: 6px 0;
        font-size: 12px;
        line-height: 14px;
        text-align: center;
      }
    }
  }
}
</style>
