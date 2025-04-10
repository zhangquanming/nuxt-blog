<template>
  <div class="sender">
    <div class="sender-body">
      <textarea
        ref="inputRef"
        v-model="senderVal"
        :disabled="senderLoading"
        @input="handleChange"
        v-focus
        @keydown.enter.prevent="handleKeydown"
        class="sender-input"
        placeholder="给 Mingme 发送消息"
        rows="2"
      ></textarea>
    </div>
    <div class="sender-footer">
      <button class="sender-file-btn">
        <input class="sender-file-input" type="file" accept="*/*" />
        <i class="iconfont iconfujian"></i>
      </button>
      <div class="sender-actions-list">
        <button v-if="senderLoading" @click="handleStop" class="sender-stop-btn">
          <i class="iconfont iconstop"></i>
        </button>
        <button v-else :class="['sender-action-btn', { 'btn-disabled': disabled }]" @click="handleSender">
          <i class="iconfont iconarrowup"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sender',
  data() {
    return {
      senderLoading: false,
      senderVal: ''
    }
  },
  computed: {
    disabled() {
      return !this.senderVal.trim() || this.senderLoading
    }
  },
  methods: {
    resetValue() {
      this.senderVal = ''
    },
    showLoading() {
      this.senderLoading = true
    },
    hideLoading() {
      this.senderLoading = false
    },
    inputFocus() {
      this.$nextTick(() => {
        this.$refs.inputRef.focus()
      })
    },
    handleStop() {
      this.$emit('onStop')
    },
    handleChange(val) {
      this.$emit('onChange', val)
    },
    // ... 其他方法保持不变 ...
    handleKeydown(event) {
      if (event.ctrlKey || event.metaKey) {
        // 允许默认换行行为
        event.preventDefault()
        this.senderVal += '\n'
      } else {
        this.handleSender()
      }
    },
    handleSender() {
      if (!this.disabled && this.senderVal.trim()) {
        this.$emit('onSend', this.senderVal)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sender {
  position: relative;
  width: 100%;
  padding: 14px;
  border-radius: 24px;
  background: #f4f5f5;
  border-color: #d9d9d9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  transition: background 0.3s;
  border-width: 0;
  border-style: solid;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: border-color 0.3s;
    border-radius: inherit;
    border-style: inherit;
    border-color: inherit;
    border-width: 1px;
  }
  &:focus-within {
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    border-color: @colorPrimary;
    &::after {
      border-width: 2px;
    }
  }
  .sender-body {
    .sender-input {
      width: 100%;
      font-size: 16px;
      line-height: 28px;
      height: 56px;
      border: none;
      resize: none;
      outline: none;
      color: #333;
      background: transparent;
      word-break: break-all;
      white-space: pre-wrap;
    }
  }
  .sender-footer {
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    .btn-disabled {
      opacity: 0.45 !important;
    }
    .sender-file-btn {
      width: 32px;
      height: 32px;
      padding: 0;
      white-space: nowrap;
      text-align: center;
      background-image: none;
      background-color: transparent;
      border: 1px solid transparent;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      position: relative;
      .sender-file-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        border: none;
        background-color: transparent;
        outline: none;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
      }
      i {
        font-size: 24px;
      }
    }
    .sender-action-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: #fff;
      background-color: @colorPrimary;
      box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
      outline: none;
      font-weight: 400;
      text-align: center;
      background-image: none;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      user-select: none;
      touch-action: manipulation;
      &:hover {
        color: #fff;
        background-color: @colorPrimaryLight;
      }
      i {
        font-size: 16px;
      }
    }
    .sender-stop-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: transparent;
      box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
      outline: none;
      font-weight: 400;
      text-align: center;
      background-image: none;
      border: 2px solid @colorPrimary;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      user-select: none;
      touch-action: manipulation;
      position: relative;
      &:hover {
        border-color: @colorPrimaryLight;
        i {
          color: @colorPrimaryLight;
        }
      }
      i {
        color: @colorPrimary;
        font-size: 14px;
      }
    }
  }
}
</style>
