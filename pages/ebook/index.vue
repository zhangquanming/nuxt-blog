<template>
  <div>
    <ebook-search />
    <div class="z-container">
      <ebook-menu />
    </div>
    <div v-loading="isLoading" class="z-container">
      <div class="z-row">
        <div class="z-col-sm-40 rank-wrap">
          <div style="background-color: #fff;clear:both;">
            <div class="z-row">
              <div v-for="item in ebookHomeData.hotList" :key="item.bookId" class=" z-col-sm-30 hotlist-item">
                <div class="row">
                  <div class="z-col-20">
                    <ebook-poster :dataSource="item" />
                  </div>
                  <div class="z-col-40">
                    <h2 :title="item.name" class="hotlist-item-name">{{ item.name }}</h2>
                    <p class="hotlist-item-author">{{ item.author }}</p>
                    <p class="hotlist-item-brief">{{ item.brief.replace(/\s+/g, '') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="z-col-sm-20 rank-wrap">
          <title-bar :bottom="0" title="上期推荐" class="visible-xs"></title-bar>
          <z-table :columns="columnsLastRecord" :data="ebookHomeData.tjList" :showHeader="false" :border="false" size="small" />
        </div>
      </div>

      <div class="z-row">
        <div v-for="(rank, index) in ebookHomeData.rankList" :key="index" class="z-col-md-20 rank-wrap">
          <title-bar :title="rank.category" :bottom="0"></title-bar>
          <div class="rank-top clearfix">
            <div class="rank-top-info fl">
              <router-link :to="{ path: `/ebook/${rank.top.bookId}` }" class="rank-top-info-link">
                <span class="rank-top-label-tj">推荐</span>
                {{ rank.top.name }}
              </router-link>
              <p class="rank-top-info-brief">{{ rank.top.brief }}</p>
            </div>
            <div class="rank-top-poster fl">
              <router-link :to="{ path: `/ebook/${rank.top.bookId}` }" class="rank-top-poster-link no-img-placeholder-colorful no-img-placeholder-vertical">
                <img :src="rank.top.poster" :alt="rank.top.name" />
              </router-link>
              <span class="rank-top-poster-shadow"></span>
            </div>
          </div>
          <z-table :columns="rankColumns" :data="rank.list" :showHeader="false" :border="false" :stripe="false" size="small" />
        </div>
      </div>

      <div class="z-row">
        <div class="z-col-md-40 rank-wrap">
          <title-bar :title="ebookHomeData.lastUpdateTitle" :bottom="0"></title-bar>
          <z-table :columns="columnsLastUpdate" :data="ebookHomeData.lastUpdate" :showHeader="false" :border="false" size="small" />
        </div>
        <div class="z-col-md-20 rank-wrap">
          <title-bar :title="ebookHomeData.lastRecordTitle" :bottom="0"></title-bar>
          <z-table :columns="columnsLastRecord" :data="ebookHomeData.lastRecord" :showHeader="false" :border="false" size="small" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from '@/components/kit/TitleBar/TitleBar'
import ZTable from '@/components/base/Table/Table'
import EbookSearch from '@/components/page/ebook/EbookSearch'
import EbookMenu from '@/components/page/ebook/EbookMenu'
import EbookPoster from '@/components/page/ebook/EbookPoster'

export default {
  name: 'EbookHome',
  components: {
    EbookSearch,
    EbookMenu,
    EbookPoster,
    TitleBar,
    ZTable
  },
  data() {
    return {
      isLoading: false,
      ebookHomeData: {},
      rankColumns: [
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
          align: 'right'
        }
      ],
      columnsLastUpdate: [
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
          align: 'right'
        },
        {
          title: '更新日期',
          key: 'updateTime',
          align: 'right',
          class: ['visible-xl']
        }
      ],
      columnsLastRecord: [
        {
          title: '序号',
          width: '45px',
          // class: ['hidden-xs'],
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
                }
              },
              params.row.name
            )
          }
        },
        {
          title: '作者',
          key: 'author',
          align: 'right'
        }
      ]
    }
  },
  // async asyncData({ app }) {
  //   const res = await app.$myApi.ebooks.getHomeData()
  //   return { ebookHomeData: res.result }
  // },
  mounted() {
    this.getEbookHomeData()
  },
  methods: {
    /**
     * @desc 获取首页数据
     */
    getEbookHomeData() {
      this.isLoading = true
      this.$myApi.ebooks
        .getHomeData()
        .then((res) => {
          this.isLoading = false
          this.ebookHomeData = res.result
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  },
  head() {
    return {
      title: '电子书 - 明么的博客',
      meta: [{ hid: 'ebook-home referrer', name: 'referrer', content: 'never' }]
    }
  }
}
</script>

<style lang="less" scoped>
.hotlist-item {
  margin: 12px 0;
  padding-right: 20px;
  &-name {
    margin-top: 15px;
    color: @colorTextTitle;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-author {
    margin-top: 3px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-brief {
    font-size: 12px;
    margin-top: 5px;
    color: @colorTextContent;
    text-align: justify;
    overflow: hidden;
    height: 4.5em;
    color: @colorTextSub;
  }
}

.rank-wrap {
  margin-bottom: 15px;
}
.rank-top {
  background: #fff;
  padding: 15px 15px 20px;
  &-info {
    margin-right: 100px;
    &-link {
      font-size: 18px;
      color: @colorTextTitle;
    }
    &-brief {
      margin-top: 5px;
      text-align: justify;
      height: 6em;
      overflow: hidden;
    }
  }
  &-label-tj {
    background-color: #bf2c24;
    color: #fff;
    display: inline-block;
    padding: 4px 3px;
    font-size: 12px;
    vertical-align: text-bottom;
    line-height: 1;
  }
  &-poster {
    position: relative;
    transform: perspective(60px) rotateY(-10deg);
    margin-left: -90px;
    border: 1px solid @colorBorder;
    border-right: 0;
    &:after {
      position: absolute;
      z-index: 2;
      top: 2%;
      left: 100%;
      width: 10%;
      height: 97%;
      content: ' ';
      transform: perspective(60px) rotateY(30deg);
      box-shadow: inset 0 0 5px #888;
      background-color: #fff;
      background-image: linear-gradient(90deg, #bbb 0.5px, transparent 0.5px);
      background-size: 1.6px 100%;
    }
    &-link {
      position: relative;
      z-index: 10;
      display: inline-block;
      transform: translateZ(50px);
      height: 117px;
      width: 70px;

      img {
        width: 70px;
        height: 117px;
      }
    }
    &-shadow {
      position: absolute;
      z-index: 1;
      top: 86%;
      left: 7px;
      width: 25px;
      height: 17px;
      content: '';
      -webkit-transform: perspective(74px) rotateX(-70deg) rotateY(-5deg);
      transform: perspective(74px) rotateX(-70deg) rotateY(-5deg);
      -webkit-box-shadow: 38px 0 5px 5px #adadad;
      box-shadow: 39px 0 5px 5px #adadad;
    }
  }
}
</style>
