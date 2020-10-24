<template>
  <div>
    <div class="z-container">
      <z-table :columns="columns" :data="searchData" :border="false" :loading="isLoading" size="small" />
    </div>
    <div ref="searchEle" v-show="false" v-html="searchDataHtml"></div>
  </div>
</template>

<script>
import ZTable from '@/components/base/Table/Table'

export default {
  name: 'EbookSearch',
  components: {
    ZTable
  },
  data() {
    return {
      searchDataHtml: '',
      wd: '',
      isLoading: false,
      searchData: [],
      columns: [
        {
          title: '序号',
          width: '45px',
          class: ['hidden-sm'],
          render: (h, params) => {
            return h(
              'span',
              {
                class: ['ebook-rank-index']
              },
              params.index + 1
            )
          }
        },
        // {
        //   title: '作品分类',
        //   key: 'category',
        //   align: 'left',
        //   class: ['hidden-xs']
        // },
        {
          title: '作品名称',
          key: 'name',
          align: 'left',
          render: (h, params) => {
            return h(
              'router-link',
              {
                props: {
                  to: {
                    path: `/ebook/${params.row.bookId}`
                  }
                },
                class: 'ebook-catalog-link'
              },
              params.row.name
            )
          }
        },
        {
          title: '最新章节',
          key: 'lastChapter',
          align: 'left',
          render: (h, params) => {
            return h(
              'router-link',
              {
                props: {
                  to: {
                    path: `/ebook/${params.row.bookId}/${params.row.chapterId}`
                  }
                },
                class: 'ebook-chapter-link'
              },
              params.row.lastChapter
            )
          }
        },
        {
          title: '作者',
          key: 'author',
          align: 'right',
          render: (h, params) => {
            return h(
              'router-link',
              {
                props: {
                  to: {
                    path: `/ebook/author/${params.row.authorId}`
                  }
                },
                class: 'ebook-catalog-link'
              },
              params.row.author
            )
          }
        }
        // {
        //   title: '更新时间',
        //   key: 'updateTime',
        //   align: 'center',
        //   class: ['hidden-xs'],
        //   render: (h, params) => {
        //     return h('span', params.row.updateTime.split(' ')[0])
        //   }
        // },
        // {
        //   title: '状态',
        //   key: 'status',
        //   align: 'center',
        //   minWidth: '45px',
        //   class: ['hidden-xs']
        // }
      ]
    }
  },
  mounted() {
    if (this.$route.query.wd) {
      this.getBookByWd()
    }
  },
  methods: {
    /**
     * @desc 查询按钮点击
     */
    handleSearch() {
      this.getBookByWd()
    },

    /**
     * @desc 关键字查询书籍
     */
    getBookByWd() {
      const params = {
        searchkey: this.$route.query.wd,
        s: '6445266503022880974'
      }
      this.isLoading = true
      this.$myApi.ebooks
        .getBookByWd(params)
        .then((res) => {
          this.isLoading = false
          this.searchData = res.result
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped></style>
