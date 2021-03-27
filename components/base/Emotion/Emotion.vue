<template>
  <div :style="{ height: height + 'px' }" class="emoji-box">
    <ul :style="{ width: width + 'px' }" class="emoji-wrap">
      <li v-for="item in list" :key="item.id" :data-code="item.id" :title="item.text" @click="handleClick(item)" class="emoji">
        <img :alt="item.text" :src="getEmotionImgUrl(item.id)" />
      </li>
    </ul>
  </div>
</template>

<script>
import { emotionData, getImgUrl } from '@/components/base/Emotion/emotion.js'
export default {
  name: 'Emotion',
  props: {
    width: {
      type: Number,
      default: 290
    },
    height: {
      type: Number,
      default: 250
    }
  },
  data() {
    return {
      list: emotionData
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('emotion', item)
    },
    getEmotionImgUrl(id) {
      return getImgUrl(id)
    }
  }
}
</script>

<style lang="less" scoped>
.emoji-box {
  border: 1px solid #ccc;
  background: #fff;
  overflow: hidden;
  overflow-y: auto;
  .emoji-wrap {
    padding: 5px;
    overflow: hidden;
    .emoji {
      float: left;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        background: #eee;
        img {
          transform: scale(1.2);
        }
      }
      img {
        transition: all 0.2s ease-in-out;
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
