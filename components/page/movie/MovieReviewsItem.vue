<template>
  <li class="reviews-item-wrap">
    <img :src="review.author.avatar" class="reviews-item-avatar" alt="" />
    <div class="reviews-item">
      <h3 class="reviews-item-title">{{ review.title }}</h3>
      <div class="reviews-item-content">
        <div :class="`reviews-item-content-text ${isShowReviewFull && reviewText ? 'reviews-item-content-html' : ''}`" v-html="reviewText"></div>
        <a @click="handleToggleReviewFull" href="javascript:;" class="reviews-item-toggle">({{ isShowReviewFull ? '收起' : '展开' }})</a>
      </div>
    </div>
  </li>
</template>

<script>
import doubanApi from '@/assets/js/douban/api-douban'

export default {
  name: 'MovieReviewsItem',
  props: {
    review: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isReviewDetailLoading: false,
      isShowReviewFull: false,
      reviewTextFull: ''
    }
  },
  computed: {
    reviewText() {
      return this.isShowReviewFull && this.reviewTextFull ? this.reviewTextFull : this.review.summary
    }
  },
  methods: {
    /**
     * @desc 切换 短评 长评
     */
    handleToggleReviewFull() {
      this.isShowReviewFull = !this.isShowReviewFull
      if (this.isShowReviewFull && !this.reviewTextFull) {
        this.requestReviewDetail()
      }
    },

    /**
     * @desc 请求长评
     */
    requestReviewDetail() {
      this.isReviewDetailLoading = true
      doubanApi
        .DoubanMovieFullReview({ id: this.review.id })
        .then((res) => {
          this.isReviewDetailLoading = false
          this.reviewTextFull = res.html
        })
        .catch(() => {
          this.isReviewDetailLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.reviews-item {
  padding-left: 60px;
  &-wrap {
    list-style: none;
    padding: 20px 0;
    & + & {
      border-top: 1px solid #e0e0e0;
    }
  }
  &-avatar {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }
  &-title {
    font-size: 16px;
  }
  &-toggle {
    color: @colorInfo;
  }
  &-content {
    margin-top: 5px;

    &-text {
      color: @colorTextContent;
      word-break: break-word;
      display: inline;
    }
    &-html {
      display: block;
      padding: 10px;
      margin-bottom: 10px;
      max-height: 500px;
      overflow: auto;
      // overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      /deep/ p {
        margin: 0 0 20px 0;
        line-height: 1.8;
        font-size: 1em;
        color: #111;
        font-family: Arial, Helvetica, sans-serif;
        word-wrap: break-word;
        white-space: pre-wrap;
      }
      /deep/ img {
        max-width: 100%;
      }
    }
  }
}
</style>
