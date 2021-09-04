<template>
  <card :padding="20" style="height: 100%;">
    <user-page-title :title="`您已送出${totalEle}个赞`" title-sub="提示：赞美别人就是肯定自己。"></user-page-title>
    <div class="z-row">
      <div v-for="(item, index) in blogList" :key="index" class="z-col-15">
        <user-favorites-card :blog-data="item">
          <btn @click="handleUnLike(item)" icon="liked" theme="error" shape="rect" long>取消</btn>
        </user-favorites-card>
      </div>
    </div>
    <pagenation :total-ele="totalEle" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 30px;" />
    <modal v-if="isShowUnlikeModal" @close="handleHideUnlikeModal">
      <h3 slot="header">确认取消点赞?</h3>
      <div slot="footer">
        <btn :loading="isUnLikeLoading" @click="requestUnLike" theme="error" long>确认取消</btn>
      </div>
    </modal>
  </card>
</template>

<script>
import Card from '@/components/base/Card/Card'
import UserPageTitle from '@/components/page/user/UserPageTitle.vue'
import Pagenation from '@/components/base/Pagenation/Pagenation'
import Btn from '@/components/base/Btn/Btn'
import UserFavoritesCard from '@/components/page/user/UserFavoritesCard.vue'
import Modal from '@/components/base/Modal/Modal'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserFavorites',
  layout: 'user',
  components: {
    Card,
    UserPageTitle,
    Pagenation,
    Btn,
    UserFavoritesCard,
    Modal
  },
  data() {
    return {
      page: 1,
      limit: 10,
      pageTotal: 0,
      totalEle: 0,
      blogList: [],
      isLoading: false,
      isShowUnlikeModal: false,
      isUnLikeLoading: false,
      currentRow: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.requestblogList()
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal',
      handleChangeUserInfo: 'changeUserInfo'
    }),

    /**
     * @desc 分页点击
     */
    changePage(page) {
      this.page = page
      this.requestblogList()
    },

    /**
     * @desc 请求 文章列表
     */
    requestblogList() {
      const storeCacheStr = sessionStorage.getItem('storeCache') || '{}'
      const storeCache = JSON.parse(storeCacheStr)
      const cacheId = storeCache && storeCache.userInfo && storeCache.userInfo._id ? storeCache.userInfo._id : ''

      if ((this.userInfo && this.userInfo._id) || cacheId) {
        const params = {
          page: this.page,
          limit: this.limit,
          likes: this.userInfo && this.userInfo._id ? this.userInfo._id : cacheId
        }
        this.isLoading = true
        this.$myApi.blogs
          .index(params)
          .then((res) => {
            this.blogList = res.result.docs
            this.pageTotal = res.result.pages
            this.totalEle = res.result.total
            this.isLoading = false
          })
          .catch(() => {
            this.isLoading = false
          })
      } else {
        this.$toast.info('请登录', { icon: 'iconfont toasted-icon iconinfo' })
        this.toggleSignInModal(true)
      }
    },

    /**
     * @desc 请求 取消点赞
     */
    requestUnLike() {
      const params = {
        blogId: this.currentRow.id,
        userId: this.userInfo._id
      }
      this.isUnLikeLoading = true
      this.$myApi.blogs
        .PostBlogUnLike(params)
        .then(() => {
          this.$toast.error('已取消赞！', { icon: 'iconfont toasted-icon iconerror' })
          this.requestblogList()
          this.isUnLikeLoading = false
          this.handleHideUnlikeModal()
        })
        .catch(() => {
          this.isUnLikeLoading = false
        })
    },

    handleUnLike(row) {
      this.currentRow = row
      this.handleShowUnlikeModal()
    },

    /**
     * @desc 显示删除文章弹框
     */
    handleShowUnlikeModal() {
      this.isShowUnlikeModal = true
    },

    /**
     * @desc 隐藏删除文章弹框
     */
    handleHideUnlikeModal() {
      this.isShowUnlikeModal = false
    }
  }
}
</script>
