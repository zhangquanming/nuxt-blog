<template>
  <card :padding="20" style="height: 100%;">
    <user-page-title :title="`您已发表 ${totalEle} 条评论。`" title-sub="提示：认真填写的点评会帮助到别人哦。"></user-page-title>
    <template v-if="commentsList && commentsList.length">
      <user-comment-item v-for="(item, index) in commentsList" :key="index" :comment="item"></user-comment-item>
      <pagenation :total-ele="totalEle" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
    </template>

    <template v-else>
      <no-data style="height: 300px;"></no-data>
    </template>
  </card>
</template>

<script>
import Card from '@/components/base/Card/Card'
import NoData from '@/components/kit/NoData/NoData'
import UserPageTitle from '@/components/page/user/UserPageTitle.vue'
import UserCommentItem from '@/components/page/user/UserCommentItem.vue'
import Pagenation from '@/components/base/Pagenation/Pagenation'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserComment',
  layout: 'user',
  components: {
    Card,
    NoData,
    UserPageTitle,
    UserCommentItem,
    Pagenation
  },
  data() {
    return {
      commentsList: [],
      page: 1,
      limit: 10,
      pageTotal: 0,
      totalEle: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.requestCommentList()
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal'
    }),

    /**
     * @desc 分页点击
     */
    changePage(page) {
      this.page = page
      this.requestCommentsList()
    },

    /**
     * @desc 请求 评论列表
     */
    requestCommentList() {
      const storeCacheStr = sessionStorage.getItem('storeCache') || '{}'
      const storeCache = JSON.parse(storeCacheStr)
      const cacheId = storeCache && storeCache.userInfo && storeCache.userInfo._id ? storeCache.userInfo._id : ''

      if ((this.userInfo && this.userInfo._id) || cacheId) {
        const params = {
          from: this.userInfo && this.userInfo._id ? this.userInfo._id : cacheId,
          page: this.page,
          limit: this.limit
        }
        this.isCommentsListLoading = true
        this.$myApi.comments
          .index(params)
          .then((res) => {
            this.isCommentsListLoading = false
            this.commentsList = res.result.docs
            this.pageTotal = res.result.pages
            this.totalEle = res.result.total
          })
          .catch(() => {
            this.isCommentsListLoading = false
          })
      } else {
        this.$toast.info('请登录')
        this.toggleSignInModal(true)
      }
    }
  }
}
</script>
