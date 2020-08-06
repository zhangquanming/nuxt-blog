<template>
  <div>
    <div class="z-container">
      <z-table :columns="columns" :data="searchData" :border="false" :loading="isLoading" size="small" />
    </div>
    <div ref="searchEle" v-show="false" v-html="searchDataHtml"></div>
  </div>
</template>

<script>
import qs from 'qs'
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
                    path: `/ebook/catalog/${params.row.bookId}`
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
                    path: `/ebook/catalog/${params.row.bookId}/chapter/${params.row.chapterId}`
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
      const params = qs.stringify({
        searchkey: this.$route.query.wd,
        s: '6445266503022880974'
      })

      this.$myApi.ebooks
        .postSearch(params)
        .then((res) => {
          this.isLoading = false
          this.searchDataHtml = res

          this.$nextTick(() => {
            const element = this.$refs.searchEle
            const books = [...element.querySelectorAll('.bookbox')]

            const searchData = books.map((ele) => {
              const categoryEle = ele.querySelector('.cat')
              const bookEle = ele.querySelector('.bookname a')
              const chapterEle = ele.querySelector('.update a')
              const authorEle = ele.querySelector('.author')

              const bookA = bookEle.href.split('.')
              const bookAA = bookA[bookA.length - 2]
              const bookAAA = bookAA.split('/')
              const bookAAAA = bookAAA[bookAAA.length - 2]

              const chapterA = chapterEle.href.split('.')
              const chapterAA = chapterA[chapterA.length - 2]
              const chapterAAA = chapterAA.split('/')
              const chapterAAAA = chapterAAA[chapterAAA.length - 1]

              return {
                category: categoryEle.textContent,
                author: authorEle.textContent,
                name: bookEle.textContent,
                bookId: bookAAAA,
                lastChapter: chapterEle.textContent,
                chapterId: chapterAAAA
              }
            })
            this.searchData = searchData
          })
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped></style>
