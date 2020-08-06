<template>
  <card padding="0" border-radius="0">
    <z-image :src="poster"></z-image>
    <dl>
      <dt>评分</dt>
      <dd>
        <ScoreStart :value="average" />
      </dd>
      <dt>导演</dt>
      <dd>{{ directors }}</dd>
      <dt>主演</dt>
      <dd>{{ casts }}</dd>
      <dt>类型</dt>
      <dd>{{ genres }}</dd>
      <dt>地区</dt>
      <dd>{{ countries }}</dd>
      <dt>语言</dt>
      <dd>{{ languages }}</dd>
      <dt>片长</dt>
      <dd>{{ durations }}</dd>
      <dt>上映日期</dt>
      <dd>{{ movieDetail.pubdate }}</dd>
    </dl>
  </card>
</template>

<script>
import Card from '@/components/base/Card/Card'
import ZImage from '@/components/base/ZImage/ZImage'
import ScoreStart from '@/components/base/ScoreStart/ScoreStart'

export default {
  name: 'MovieInfoCard',
  components: {
    Card,
    ZImage,
    ScoreStart
  },
  props: {
    movieDetail: {
      type: Object,
      default() {
        return {
          images: {}
        }
      }
    }
  },
  computed: {
    poster() {
      return this.movieDetail.images && this.movieDetail.images.large ? this.movieDetail.images.large : ''
    },
    average() {
      return this.movieDetail.rating ? this.movieDetail.rating.average : 0
    },
    directors() {
      return this.movieDetail.directors ? this.movieDetail.directors.map((item) => item.name).join(' / ') : ' '
    },
    casts() {
      return this.movieDetail.casts ? this.movieDetail.casts.map((item) => item.name).join(' / ') : ' '
    },
    genres() {
      return this.movieDetail.genres ? this.movieDetail.genres.join(' / ') : ''
    },
    countries() {
      return this.movieDetail.countries ? this.movieDetail.countries.join(' / ') : ''
    },
    languages() {
      return this.movieDetail.languages ? this.movieDetail.languages.join(' / ') : ''
    },
    durations() {
      return this.movieDetail.durations ? this.movieDetail.durations.join(' / ') : ''
    }
  }
}
</script>

<style lang="less" scoped>
dl {
  padding: 10px 0;
}
dt {
  font-weight: normal;
  width: 80px;
  padding: 2px 5px 2px 0;
  float: left;
  text-align: right;
}
dt:after {
  content: ':';
}
dd {
  padding: 2px 10px 2px 80px;
  vertical-align: top;
}
</style>
