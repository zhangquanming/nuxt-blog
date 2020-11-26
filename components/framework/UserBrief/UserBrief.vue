<template>
  <card :padding="0">
    <div class="card-brief-blog-wrap">
      <div :style="{ 'background-image': 'url(' + avatar + ')' }" class="brief-poster"></div>
      <div class="author-avatar">
        <div :style="{ 'background-image': 'url(' + avatar + ')' }" class="author-avatar-box"></div>
      </div>
      <h3 class="brief-title">{{ userInfo ? userInfo.nicName || userInfo.userName : '' }}</h3>
    </div>
  </card>
</template>

<script>
import Card from '@/components/base/Card/Card'
import defaultAvatar from '@/assets/images/no-data-bg-colorful.png'

import { mapGetters } from 'vuex'

export default {
  name: 'CardBriefBlog',
  components: {
    Card
  },
  computed: {
    ...mapGetters(['userInfo']),
    avatar() {
      return this.userInfo && this.userInfo.avatar ? this.userInfo.avatar + '?x-oss-process=image/resize,m_fill,h_110,w_110' : defaultAvatar
    }
  }
}
</script>

<style lang="less" scoped>
.card-brief-blog-wrap {
  text-align: center;
  .brief-poster {
    padding-top: 61.8%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: @colorTextDisable;
  }
  .author-avatar {
    position: relative;
    padding-top: 38.2%;
    width: 38.2%;
    margin: -19% auto 0;
    border-radius: 100%;
    border: 5px solid @colorBorderLight;
    box-sizing: content-box;
  }
  .author-avatar-box {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .brief-title {
    margin-top: 15px;
    padding-bottom: 20px;
    color: @colorTextTitle;
  }
}
</style>
