<template>
  <div class="conversations-wrap">
    <div v-for="(item, index) in list" :key="index" class="conversations-group">
      <!-- <div class="conversations-title">{{ group.title }}</div> -->
      <ul class="conversations-list">
        <li @click="handleTaggerItem(item)" :class="['conversations-item', { active: current && current.id == item.id }]">
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
        <btn @click="handleDelete" theme="error" long>确认删除</btn>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/base/Modal/Modal'
import Btn from '@/components/base/Btn/Btn'

export default {
  name: 'Conversations',
  components: {
    Modal,
    Btn
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    current: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentItem: null,
      isShowDeleteModal: false,
      delRow: null
    }
  },
  methods: {
    handleTaggerItem(item) {
      this.$emit('on-change', item)
    },
    handleDelete() {
      this.isShowDeleteModal = false
      this.$emit('on-delete', this.delRow)
    },
    /**
     * @desc 显示删除弹框
     */
    handleShowDeleteBlogModal(row) {
      this.delRow = row
      this.isShowDeleteModal = true
    },

    /**
     * @desc 隐藏删除弹框
     */
    handleHideDeleteBlogModal() {
      this.delRow = null
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
