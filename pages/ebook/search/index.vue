<template>
  <div>
    <ebook-search />
    <div class="z-container">
      <ebook-menu />
    </div>
    <div v-loading="isLoading" class="z-container" style="margin-top: 15px;">
      <div class="z-row">
        <div class="z-col-sm-60">
          <div style="background-color: #fff;clear:both;">
            <title-bar :title="`搜索“${searchkey}”相关小说`" :bottom="0"></title-bar>
            <div v-if="searchData && searchData.length > 0" class="z-row">
              <div v-for="item in searchData" :key="item.bookId" class="z-col-sm-30 z-col-lg-20 hotlist-item">
                <div class="row">
                  <div class="z-col-20">
                    <ebook-poster :dataSource="item" />
                  </div>
                  <div class="z-col-40">
                    <h2 :title="item.name" class="hotlist-item-name">{{ item.name }}</h2>
                    <p class="hotlist-item-author">{{ item.category }}</p>
                    <p class="hotlist-item-author">{{ item.author }}</p>
                    <p class="hotlist-item-brief">{{ item.brief }}</p>
                  </div>
                </div>
              </div>
            </div>
            <no-data v-else style="height: 220px;" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from '@/components/kit/TitleBar/TitleBar'
import EbookSearch from '@/components/page/ebook/EbookSearch'
import EbookMenu from '@/components/page/ebook/EbookMenu'
import EbookPoster from '@/components/page/ebook/EbookPoster'
import NoData from '@/components/kit/NoData/NoData'

export default {
  name: 'EbooksSearch',
  components: {
    TitleBar,
    EbookSearch,
    EbookMenu,
    EbookPoster,
    NoData
  },
  data() {
    return {
      searchkey: '',
      isLoading: false,
      searchData: []
    }
  },
  mounted() {
    if (this.$route.query.wd) {
      this.searchkey = this.$route.query.wd
      this.getBookByWd()
    }
  },
  methods: {
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

<style lang="less" scoped>
.hotlist-item {
  margin: 12px 0;
  padding-right: 20px;
  &-name {
    margin-top: 10px;
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
</style>
