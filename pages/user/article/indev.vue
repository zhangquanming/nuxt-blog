<template>
  <Card :padding="20" style="height: 100%;">
    <user-page-title :title="`您已发布${totalEle}篇文章作品`" title-sub="提示：删除后不可恢复，请谨慎操作。"></user-page-title>
    <z-table :columns="columns" :data="blogList" :loading="isLoading" />
    <pagenation :total-ele="totalEle" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
    <modal v-if="isShowDeleteModal" @close="handleHideDeleteBlogModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.title }} 的文章吗?</p>
      </div>
      <div slot="footer">
        <btn @click="requestDeleteBlog" theme="error" long>确认删除</btn>
      </div>
    </modal>
  </Card>
</template>

<script>
import Card from '@/components/base/Card/Card'
import UserPageTitle from '@/components/page/user/UserPageTitle.vue'
import ZTable from '@/components/base/Table/Table'
import Pagenation from '@/components/base/Pagenation/Pagenation'
import Btn from '@/components/base/Btn/Btn'
import ZSwitch from '@/components/base/ZSwitch/ZSwitch'
import Modal from '@/components/base/Modal/Modal'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserBlog',
  layout: 'user',
  components: {
    Card,
    UserPageTitle,
    ZTable,
    Pagenation,
    Btn,
    // eslint-disable-next-line vue/no-unused-components
    ZSwitch,
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
      isShowDeleteModal: false,
      currentRow: {},
      columns: [
        {
          title: '海报',
          key: 'poster',
          class: 'hidden-xs hidden-sm',
          width: '80px',
          render: (h, parama) => {
            return h(
              'router-link',
              {
                attrs: {
                  target: '_blank'
                },
                props: {
                  to: {
                    path: `/article/detail/${parama.row._id}`
                  }
                }
              },
              [
                h('img', {
                  attrs: {
                    src: parama.row.poster
                  },
                  style: {
                    width: '80px'
                  }
                })
              ]
            )
          }
        },
        {
          title: '标题',
          key: 'title',
          align: 'left',
          render: (h, parama) => {
            return h(
              'router-link',
              {
                attrs: {
                  target: '_blank'
                },
                props: {
                  to: {
                    path: `/article/detail/${parama.row._id}`
                  }
                }
              },
              parama.row.title
            )
          }
        },
        {
          title: '分类',
          key: 'category',
          align: 'left',
          render: (h, parama) => {
            return h('span', parama.row.categoryObj.name)
          }
        },
        {
          title: '标签',
          key: 'tagArr',
          width: '',
          align: 'left',
          class: 'hidden-xs',
          type: 'array',
          render: (h, parama) => {
            return h('span', parama.row.tagArray.map((item) => item.name).join(','))
          }
        },
        {
          title: '时间',
          key: 'createAt',
          class: 'visible-lg visible-xl',
          render: (h, parama) => {
            const createdAtFormat = this.$options.filters.dateFormatFilter(parama.row.createdAt, 'YYYY-MM-DD HH:mm:ss')
            const updatedAtFormat = this.$options.filters.dateFormatFilter(parama.row.updatedAt, 'YYYY-MM-DD HH:mm:ss')
            return h('div', [h('div', createdAtFormat), h('div', updatedAtFormat)])
          }
        },
        // {
        //   title: '浏览',
        //   key: 'viewed',
        // },
        // {
        //   title: '赞',
        //   key: 'liked',
        // },
        // {
        //   title: '评论',
        //   key: 'comment',
        // },
        {
          title: '状态',
          class: 'hidden-xs',
          render: (h, parama) => {
            return h(ZSwitch, {
              props: {
                value: parama.row.status
              },
              on: {
                change: (value) => {
                  this.requestToggleBlogStatus(value, parama.row)
                }
              }
            })
          }
        },
        {
          title: '操作',
          render: (h, parama) => {
            return h('div', [
              h(
                Btn,
                {
                  props: {
                    to: { path: `/user/write/?articleId=${parama.row._id}` },
                    theme: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  }
                },
                '编辑'
              ),
              h(
                Btn,
                {
                  props: {
                    theme: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.currentRow = parama.row
                      this.handleShowDeleteBlogModal()
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.$nextTick(() => {
      this.requestblogList()
    })
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
          status: 'all',
          author: this.userInfo && this.userInfo._id ? this.userInfo._id : cacheId
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
        this.$toast.info('请登录')
        this.toggleSignInModal(true)
      }
    },

    /**
     * @desc 请求 上下架文章
     */
    requestToggleBlogStatus(value, row) {
      this.isToggleStatusLoading = true
      const params = {
        id: row.id,
        blogId: row.id,
        status: value
      }
      this.$myApi.blogs
        .update(params)
        .then(() => {
          this.isToggleStatusLoading = false
          this.$toast.success('操作成功！')
          row.status = value
        })
        .catch(() => {
          this.isToggleStatusLoading = false
        })
    },

    /**
     * @desc 请求 删除文章
     */
    requestDeleteBlog() {
      this.isDeleteLoading = true
      this.$myApi.blogs
        .delete(this.currentRow._id)
        .then(() => {
          this.isDeleteLoading = false
          this.handleHideDeleteBlogModal()
          this.$toast.success('删除成功！')
          this.requestblogList()
        })
        .catch(() => {
          this.isDeleteLoading = false
        })
    },

    /**
     * @desc 显示删除文章弹框
     */
    handleShowDeleteBlogModal() {
      this.isShowDeleteModal = true
    },

    /**
     * @desc 隐藏删除文章弹框
     */
    handleHideDeleteBlogModal() {
      this.isShowDeleteModal = false
    }
  }
}
</script>
