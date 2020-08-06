<template>
  <div>
    <div class="z-container">
      <movie-home-list :title="beingShownData.title" :list="beingShownList" v-loading="isBeingShownLoading">
        <div style="width: 320px;float: right;">
          <search-movie />
        </div>
      </movie-home-list>
      <movie-home-list :title="rankingNewData.title" :list="rankingNewList" v-loading="isRankingNewLoading"></movie-home-list>
      <movie-home-list :title="rankingComingData.title" :list="rankingComingList" v-loading="isRankingComingLoading"></movie-home-list>
      <movie-home-list :title="ranking250Data.title" :list="ranking250List" v-loading="isRanking250Loading">
        <btn :to="{ path: '/movie/top250' }" theme="success" icon="icondanxuanfill">更多</btn>
      </movie-home-list>
    </div>
  </div>
</template>

<script>
import doubanApi from '@/assets/js/douban/api-douban'

import SearchMovie from '@/components/kit/SearchMovie/SearchMovie'
import MovieHomeList from '@/views/movie/MovieHome/MovieHomeList'
import Btn from '@/components/base/Btn/Btn'

export default {
  name: 'MovieHome',
  components: {
    SearchMovie,
    MovieHomeList,
    Btn
  },
  data() {
    return {
      isBeingShownLoading: false,
      isRankingNewLoading: false,
      isRankingComingLoading: false,
      isRanking250Loading: false,
      beingShownData: {},
      rankingNewData: {},
      rankingComingData: {},
      ranking250Data: {}
    }
  },
  computed: {
    beingShownList() {
      return this.beingShownData.subjects ? this.beingShownData.subjects.slice(0, 10) : []
    },
    rankingNewList() {
      return this.rankingNewData.subjects ? this.rankingNewData.subjects.slice(0, 10) : []
    },
    rankingComingList() {
      return this.rankingComingData.subjects ? this.rankingComingData.subjects.slice(0, 10) : []
    },
    ranking250List() {
      return this.ranking250Data.subjects ? this.ranking250Data.subjects.slice(0, 10) : []
    }
  },
  async mounted() {
    this.isBeingShownLoading = true
    this.isRankingNewLoading = true
    this.isRankingComingLoading = true
    this.isRanking250Loading = true

    const [res1, res2, res3, res4] = await Promise.all([
      doubanApi.DoubanMovieBeingShown({ count: 10 }),
      doubanApi.DoubanMovieRankingNew({ count: 10 }),
      doubanApi.DoubanMovieRankingComing({ count: 10 }),
      doubanApi.DoubanMovieRankingTop250({ count: 10 })
    ])
    this.beingShownData = res1
    this.rankingNewData = res2
    this.rankingComingData = res3
    this.ranking250Data = res4

    this.isBeingShownLoading = false
    this.isRankingNewLoading = false
    this.isRankingComingLoading = false
    this.isRanking250Loading = false
  },
  head() {
    return {
      title: '豆瓣电影',
      meta: [{ hid: 'movie-home referrer', name: 'referrer', content: 'never' }]
    }
  }
}
</script>
