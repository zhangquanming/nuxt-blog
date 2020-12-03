<template>
  <div class="ranking z-container">
    <title-bar title="豆瓣电影TOP250" />
    <div v-loading="isLoading" class="z-row">
      <template v-if="tableData.length > 0">
        <div v-for="(item, index) in tableData" :key="item.id" class="z-col-sm-30">
          <card padding="0" border-radius="5px">
            <div class="z-row">
              <div class="z-col-23">
                <router-link :to="{ path: `/movie/detail/${item.id}` }" class="ranking-link" target="_blank">
                  <img :src="item.images.large" class="ranking-poster" alt="电影海报" />
                </router-link>
              </div>
              <div class="z-col-37">
                <div class="ranking-info">
                  <div :class="`ranking-order ${page <= 1 && index <= 2 ? 'ranking-order-bg-error' : 'ranking-order-bg-info'}`">
                    <span class="ranking-order-number">{{ (page - 1) * limit + index + 1 }}</span>
                  </div>
                  <router-link :to="{ path: `/movie/detail/${item.id}` }" target="_blank" class="ranking-info-title">{{ item.title }}</router-link>
                  <p class="ranking-info-item ranking-info-actor">
                    <label for="">导演</label>
                    <span>{{ item.directors | arrayFormat }}</span>
                  </p>
                  <p class="ranking-info-item ranking-info-actor">
                    <label for="">原名</label>
                    <span>{{ item.original_title }}</span>
                  </p>
                  <p class="ranking-info-item ranking-info-actor">
                    <label for="">年代</label>
                    <span>{{ item.year }}</span>
                  </p>
                  <p class="ranking-info-item ranking-info-actor">
                    <label for="">片长</label>
                    <span>{{ item.durations.join(' / ') }}</span>
                  </p>
                  <p class="ranking-info-item ranking-info-actor">
                    <label for="">类型</label>
                    <span>{{ item.genres.join(' / ') }}</span>
                  </p>
                  <p class="ranking-info-item ranking-info-actor">
                    <label for="">主演</label>
                    <span>{{ item.casts | arrayFormat }}</span>
                  </p>
                  <p class="ranking-info-item ranking-info-actor">
                    <label for="">上映日期</label>
                    <span>{{ item.pubdates.join(' / ') }}</span>
                  </p>
                  <p class="ranking-info-item ranking-info-score">
                    <label for="">评分</label>
                    <score-start :value="item.rating ? item.rating.average : 0" />
                    <span class="ranking-info-score-amount">（{{ item.collect_count }}人评价）</span>
                  </p>
                </div>
              </div>
            </div>
          </card>
        </div>
      </template>
      <card-no-data v-else />
    </div>
    <pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
  </div>
</template>

<script>
import doubanApi from '@/assets/js/douban/api-douban'

import TitleBar from '@/components/kit/TitleBar/TitleBar'
import Card from '@/components/base/Card/Card'
import Pagenation from '@/components/base/Pagenation/Pagenation'
import ScoreStart from '@/components/base/ScoreStart/ScoreStart'
import CardNoData from '@/components/kit/CardNoData/CardNoData'

export default {
  name: 'MovieTop250',
  components: {
    TitleBar,
    Card,
    Pagenation,
    ScoreStart,
    CardNoData
  },
  filters: {
    arrayFormat(array) {
      return array.map((item) => item.name).join(' / ')
    }
  },
  data() {
    return {
      page: 1,
      limit: 20,
      pageTotal: 0,
      isLoading: false,
      tableData: []
    }
  },
  mounted() {
    this.requestTop250()
  },
  methods: {
    /**
     * @desc 请求top250
     */
    requestTop250() {
      const params = {
        count: this.limit,
        start: (this.page - 1) * this.limit
      }
      this.isLoading = true
      doubanApi
        .DoubanMovieRankingTop250(params)
        .then((res) => {
          this.isLoading = false
          this.tableData = res.subjects
          this.pageTotal = Math.ceil(res.total / res.count)
        })
        .catch(() => {
          this.isLoading = false
        })
    },

    /**
     * @desc 分页
     */
    handleChangePage(page) {
      this.page = page
      this.requestTop250()
    }
  },
  head() {
    return {
      title: '豆瓣电影TOP250',
      meta: [{ hid: 'movie-top250 referrer', name: 'referrer', content: 'never' }]
    }
  }
}
</script>

<style lang="less" scoped>
.ranking {
  position: relative;

  &-order {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
    width: 50px;
    height: 52px;
    border-radius: 25px 4px 25px 25px;
    background: #fff;
    &-bg-error {
      background-color: @colorError;
    }
    &-bg-info {
      background-color: @colorInfo;
    }
    &-number {
      color: #fff;
      display: block;
      padding-top: 10px;
      text-align: center;
      font: bold 26px 'Impact';
    }
  }
  &-link {
    display: block;
  }
  &-poster {
    height: 295px;
    width: 100%;
    overflow: hidden;
    border-radius: 5px 0 0 5px;
  }
  &-info {
    padding: 15px 20px 0 0;
    position: relative;
    &-title {
      font-size: 18px;
      color: @colorTextTitle;
    }
    &-item {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      color: @colorTextSub;
      margin-top: 6px;
      label {
        color: @colorTextContent;
        font-weight: bold;
        margin-right: 5px;
        &:after {
          content: ':';
        }
      }
    }
    &-actor {
      text-align: justify;
    }
    &-score-amount {
      font-size: 14px;
    }
  }
}
</style>
