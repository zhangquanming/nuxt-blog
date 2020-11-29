<template>
  <div>
    <div class="z-container">
      <ebook-menu />
      <div v-loading="isLoading" class="z-row">
        <div class="hotlist">
          <div v-for="item in categoryData.hotList" :key="item.bookId" class="z-col-xs-30 z-col-sm-20 z-col-md-10">
            <div class="hotlist-item">
              <ebook-poster :data-source="item" />
              <h2 :title="item.name" class="hotlist-item-name">{{ item.name }}</h2>
              <p class="hotlist-item-author">
                {{ item.author }}
                <!-- <router-link :to="{ path: `/ebook/author/${item.authorId}` }">{{ item.author }}</router-link> -->
              </p>
              <p class="hotlist-item-brief">{{ item.brief }}</p>
            </div>
          </div>
        </div>
        <div class="z-col-md-40">
          <title-bar :title="categoryData.newListTitle" :bottom="0"></title-bar>
          <z-table :columns="columnsNewList" :data="categoryData.newList" :show-header="false" :border="false" size="small" />
        </div>
        <div class="z-col-md-20">
          <title-bar :title="categoryData.clickRankTitle" :bottom="0"></title-bar>
          <z-table :columns="columnsClickRank" :data="categoryData.clickRank" :show-header="false" :border="false" size="small" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EbookMenu from '@/components/page/ebook/EbookMenu'
import EbookPoster from '@/components/page/ebook/EbookPoster'
import TitleBar from '@/components/kit/TitleBar/TitleBar'
import ZTable from '@/components/base/Table/Table'

export default {
  name: 'EbookCategory',
  components: {
    EbookMenu,
    EbookPoster,
    TitleBar,
    ZTable
  },
  data() {
    return {
      isLoading: false,
      categoryData: {},
      columnsNewList: [
        {
          title: '序号',
          width: '45px',
          class: ['hidden-xs'],
          render: (h, params) => {
            return h(
              'span',
              {
                class: ['ebook-rank-index', params.index <= 2 ? `ebook-rank-index-${params.index}` : '']
              },
              params.index + 1
            )
          }
        },
        {
          title: '类别',
          key: 'category',
          align: 'left',
          class: ['visible-xl']
        },
        {
          title: '书名',
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
              'span',
              // {
              //   props: {
              //     to: {
              //       path: `/ebook/author/${params.row.authorId}`
              //     }
              //   },
              //   class: 'ebook-catalog-link'
              // },
              params.row.author
            )
          }
        },
        {
          title: '更新日期',
          key: 'updateTime',
          align: 'right',
          class: ['visible-xl']
        }
      ],
      columnsClickRank: [
        {
          title: '序号',
          width: '45px',
          class: ['hidden-xs'],
          render: (h, params) => {
            return h(
              'span',
              {
                class: ['ebook-rank-index', params.index <= 2 ? `ebook-rank-index-${params.index}` : '']
              },
              params.index + 1
            )
          }
        },
        {
          title: '类别',
          key: 'category',
          align: 'left',
          class: ['visible-xl']
        },
        {
          title: '书名',
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
          title: '作者',
          key: 'author',
          align: 'right',
          render: (h, params) => {
            return h(
              'span',
              // {
              //   props: {
              //     to: {
              //       path: `/ebook/author/${params.row.authorId}`
              //     }
              //   },
              //   class: 'ebook-catalog-link'
              // },
              params.row.author
            )
          }
        }
      ]
    }
  },
  mounted() {
    this.getCategoryBook()
  },
  methods: {
    /**
     * @desc 获取分类书籍
     */
    getCategoryBook(categoryName = this.$route.params.categoryName) {
      this.isLoading = true
      this.$myApi.ebooks
        .getCategoryBook({ categoryName })
        .then((res) => {
          this.isLoading = false
          this.categoryData = res.result
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.hotlist {
  overflow: hidden;
  margin: 10px 0 20px 0;
}
.hotlist-item {
  margin-top: 15px;
  &-name {
    margin-top: 15px;
    text-align: center;
    color: @colorTextTitle;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-author {
    margin-top: 3px;
    text-align: center;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-brief {
    font-size: 12px;
    text-indent: 2em;
    margin-top: 5px;
    color: @colorTextContent;
    text-align: justify;
    overflow: hidden;
    height: 4.5em;
    color: @colorTextSub;
  }
}
</style>
