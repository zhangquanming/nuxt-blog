<template>
  <div class="conversations-wrap">
    <div v-for="(item, index) in list" :key="index" class="conversations-group">
      <!-- <div class="conversations-title">{{ group.title }}</div> -->
      <ul class="conversations-list">
        <li @click="handleTaggerItem(item)" :class="['conversations-item', { active: currentId == item.id }]">
          <span class="conversations-label">{{ item.title }}</span>
          <i @click.stop="handleShowDeleteBlogModal(item)" class="conversations-menu-icon iconfont iconshanchu"></i>
        </li>
      </ul>
    </div>

    <modal v-if="isShowDeleteModal" @close="handleHideDeleteBlogModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除这条对话吗?</p>
      </div>
      <div slot="footer">
        <btn @click="requestDelete" theme="error" long>确认删除</btn>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from '@/components/base/Modal/Modal'
import Btn from '@/components/base/Btn/Btn'

export default {
  name: 'Conversations',
  components: {
    Modal,
    Btn
  },
  data() {
    return {
      isShowDeleteModal: false,
      currentId: '',
      currentRow: null,
      list: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    userInfo: {
      handler() {
        this.requestList(true)
      },
      deep: true
    },
    '$route.params.chat'(val) {
      this.currentId = val || ''
      this.requestList()
    }
  },
  mounted() {
    this.currentId = this.$route.params.chat || ''
    this.requestList(true)
  },
  methods: {
    handleTaggerItem(item) {
      this.currentId = item.id
      this.$router.push({ path: `/ai/${item.id}` })
    },
    requestDelete() {
      this.$myApi.conversation
        .delete(this.currentRow.id)
        .then((res) => {
          this.$toast.success('删除成功！', { icon: 'iconfont toasted-icon iconsuccess' })
          this.currentId = ''
          this.requestList(true)
          this.handleHideDeleteBlogModal()
        })
        .catch(() => {})
    },
    requestList(reload = false) {
      if (this.userInfo) {
        this.$myApi.conversation
          .index({
            author: this.userInfo._id,
            page: 1,
            limit: 100
          })
          .then((res) => {
            this.list = res.result.docs
            if (reload && !this.currentId && this.list.length) {
              this.$router.push({ path: `/ai/${this.list[0].id}` })
            }
            if (!this.list.length) {
              this.$router.push({ path: '/ai' })
            }
          })
          .catch(() => {})
      }
    },
    /**
     * @desc 显示删除弹框
     */
    handleShowDeleteBlogModal(row) {
      this.currentRow = row
      this.isShowDeleteModal = true
    },

    /**
     * @desc 隐藏删除弹框
     */
    handleHideDeleteBlogModal() {
      this.currentRow = null
      this.isShowDeleteModal = false
    }
  }
}
</script>

<style lang="less" scoped>
.conversations-wrap {
  .conversations-group {
    .conversations-title {
      font-size: 14px;
      font-weight: bold;
      color: #555;
      line-height: 18px;
    }
    .conversations-list {
      padding: 4px 0;
      .conversations-item {
        display: flex;
        align-items: center;
        height: 40px;
        line-height: 40px;
        padding: 0 8px;
        border-radius: 8px;
        transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        cursor: pointer;
        & + .conversations-item {
          margin-top: 8px;
        }
        &:hover,
        &.active {
          background: rgba(0, 0, 0, 0.06);
          .conversations-menu-icon {
            display: block;
          }
        }
        .conversations-label {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
        }
        .conversations-menu-icon {
          display: none;
          margin-left: 10px;
          width: 32px;
          height: 32px;
          text-align: center;
          line-height: 32px;
        }
      }
    }
  }
}
</style>
