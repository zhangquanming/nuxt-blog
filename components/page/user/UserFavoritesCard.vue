<template>
  <div class="favorites-card">
    <div class="cart-btn">
      <slot></slot>
    </div>
    <router-link
      :to="{ path: `/article/detail/${blogData._id}` }"
      :style="{ 'background-image': blogData.poster ? 'url(' + blogData.poster + ')' : '' }"
      class="blog-poster"
    ></router-link>
    <div class="card-body">
      <p class="blog-title">{{ blogData.title }}</p>
      <p class="blog-category">{{ blogData.categoryObj ? blogData.categoryObj.name : '' }}</p>
    </div>
    <div class="card-footer">
      <div class="blog-author">
        <div :style="{ 'background-image': blogData.authorObj.avatar ? 'url(' + blogData.authorObj.avatar + ')' : '' }" class="blog-author-avatar"></div>
        <span class="blog-author-name">{{ blogData.authorObj ? blogData.authorObj.nicName || blogData.authorObj.userName : '' }}</span>
      </div>
      <div class="blog-time">{{ blogData.createdAt | relativeTime }}</div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export default {
  name: 'UserFavoritesCard',
  filters: {
    relativeTime(value) {
      return dayjs(value).fromNow()
    }
  },
  props: {
    blogData: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.favorites-card {
  position: relative;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid @colorBorder;
  overflow: hidden;
  .cart-btn {
    position: absolute;
    top: -20%;
    width: 100%;
    opacity: 0;
    transition: all 0.3s ease;
  }
  &:hover .cart-btn {
    top: 0;
    opacity: 1;
  }
  .card-body {
    padding: 8px;
  }
  .blog-poster {
    display: block;
    padding-top: 60%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .blog-title {
    color: @colorTextTitle;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .blog-category {
    color: @colorTextLight;
    font-size: 12px;
  }
  .blog-author-avatar {
    display: inline-block;
    height: 24px;
    width: 24px;
    margin-right: 5px;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-top: 1px solid @colorBorder;
  }
  .blog-author-name {
    line-height: 24px;
  }
  .blog-time {
    line-height: 24px;
    color: @colorTextLight;
    font-size: 12px;
  }
}
</style>
