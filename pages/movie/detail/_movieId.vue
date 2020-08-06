<template>
  <div class="z-container">
    <div class="z-row">
      <div class="z-col-sm-45">
        <z-video :src="videoUrl" :poster="videoPoster" />
        <div v-loading="isLoading" class="movie-brief">
          <h2 class="movie-brief-title">
            {{ movieDetail.original_title }} <span class="movie-brief-year">({{ movieDetail.year }})</span>
          </h2>
          <p class="movie-brief-introduce">{{ movieDetail.summary }}</p>
        </div>
        <ul v-loading="isLoading" class="movie-reviews-wrap">
          <movie-reviews-item v-for="review in movieDetail.popular_reviews" :key="review.id" :review="review" />
        </ul>
      </div>

      <div v-loading="isLoading" class="z-col-sm-15">
        <movie-info-card :movieDetail="movieDetail" />
      </div>
    </div>
  </div>
</template>

<script>
import doubanApi from '@/assets/js/douban/api-douban'

import ZVideo from '@/components/base/ZVideo/ZVideo'
import MovieInfoCard from '@/components/page/movie/MovieInfoCard'
import MovieReviewsItem from '@/components/page/movie/MovieReviewsItem'

export default {
  name: 'MovieDetail',
  components: {
    ZVideo,
    MovieReviewsItem,
    MovieInfoCard
  },
  data() {
    return {
      isLoading: false,
      movieDetail: {
        original_title: '电影名称',
        year: '年份',
        summary: '一部好的电影，一般都会有个不错的故事。一部好的电影，一般都会有个不错的故事。一部好的电影，一般都会有个不错的故事。一部好的电影，一般都会有个不错的故事。',
        popular_reviews: [
          {
            alt: '',
            author: {
              uid: 'xxx',
              avatar: 'xxx',
              id: '37142357',
              name: 'xx',
              signature: 'xxxxxxx'
            },
            id: '10269983',
            rating: { max: 5, value: 5, min: 0 },
            subject_id: 'xx',
            summary: '这是我的评论',
            title: '评论'
          }
        ]
      }
    }
  },
  computed: {
    videoUrl() {
      const trailerUrls = this.movieDetail.trailer_urls
      if (trailerUrls && trailerUrls.length > 0) {
        return trailerUrls[0]
      }
      return ''
    },
    videoPoster() {
      const trailers = this.movieDetail.trailers
      if (trailers && trailers.length > 0) {
        return trailers[0].medium
      }
      return ''
    }
  },
  mounted() {
    this.requestMovieDetail()
  },
  methods: {
    /**
     * @desc 请求详情
     */
    requestMovieDetail() {
      this.isLoading = true
      doubanApi
        .DoubanMovieMovieDetail({ id: this.$route.params.movieId })
        .then((res) => {
          this.isLoading = false
          this.movieDetail = res
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  },
  head() {
    return {
      title: `豆瓣电影-${this.movieDetail.original_title}`,
      meta: [{ hid: 'movie-detail referrer', name: 'referrer', content: 'never' }]
    }
  }
}
</script>

<style lang="less" scoped>
.movie-reviews-wrap {
  margin-top: 20px;
  padding: 0 15px;
  background-color: #fff;
}
.movie-brief {
  padding: 15px;
  background-color: #fff;
  &-title {
    font-size: 30px;
    font-weight: 400;
  }
  &-year {
    margin: 0 5px;
    color: @colorTextContent;
  }
  &-introduce {
    color: @colorTextContent;
    text-align: justify;
  }
}
</style>
