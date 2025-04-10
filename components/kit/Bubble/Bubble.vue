<template>
  <div :class="['bubble', `bubble-${placement}`]">
    <div v-if="placement == 'start'" class="bubble-avatar"></div>
    <div class="bubble-content-wrapper">
      <div v-if="loading" class="bubble-content-filled">
        <span class="bubble-loading">
          <i class="bubble-loading-dot-item"></i>
          <i class="bubble-loading-dot-item"></i>
          <i class="bubble-loading-dot-item"></i>
        </span>
      </div>

      <div v-else class="bubble-content-filled">
        <md-preview :content="content" />
      </div>
    </div>
  </div>
</template>

<script>
import MdPreview from '@/components/kit/MdPreview/MdPreview'

export default {
  name: 'Bubble',
  components: {
    MdPreview
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'start'
    },
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.bubble {
  display: flex;
  column-gap: 12px;
  & + .bubble {
    margin-top: 16px;
  }
  &.bubble-start {
  }
  &.bubble-end {
    justify-content: end;
    flex-direction: row-reverse;
    .bubble-content-wrapper {
      .bubble-content-filled {
        background-color: #eff6ff;
      }
    }
  }
  .bubble-avatar {
    flex: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: 80% 80%;
    background-position: center center;
    background-image: url('../../../assets/images/avatar_img.jpg');
    border: 1px solid rgba(107, 195, 13, 0.75);
  }
  .bubble-content-wrapper {
    max-width: calc(100% - 80px);
    .bubble-content-filled {
      min-height: 46px;
      padding: 2px 6px;
      border-radius: 8px;
      word-break: break-word;
      line-height: 1.5;
      font-size: 14px;
      background-color: rgba(0, 0, 0, 0.06);
      color: #262626;
      .bubble-loading {
        height: 42px;
        position: relative;
        display: flex;
        align-items: center;
        column-gap: 8px;
        padding: 0 14px;
        .bubble-loading-dot-item {
          background-color: @colorPrimary;
          border-radius: 100%;
          width: 4px;
          height: 4px;
          animation-name: bubble-loading;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          &:nth-child(1) {
            animation-delay: 0s;
          }
          &:nth-child(2) {
            animation-delay: 0.2s;
          }
          &:nth-child(3) {
            animation-delay: 0.4s;
          }
        }
        @keyframes bubble-loading {
          0% {
            transform: translateY(0);
          }
          10% {
            transform: translateY(4px);
          }
          20% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-4px);
          }
          40% {
            transform: translateY(0);
          }
        }
      }
    }
  }
}
</style>
