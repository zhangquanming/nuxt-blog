<template>
  <div v-loading="isLoading" style="min-height: 300px;">
    <div class="z-container">
      <ebook-menu />
      <div class="z-row">
        <div v-for="part in rankData" :key="`${part.title}-${$route.params.rankType}`" class="z-col-xl-15 z-col-lg-20 z-col-sm-30">
          <ebook-rank-part :data-source="part"></ebook-rank-part>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EbookMenu from '@/components/page/ebook/EbookMenu'
import EbookRankPart from '@/components/page/ebook/EbookRankingPart'

export default {
  name: 'EbookRanking',
  components: {
    EbookMenu,
    EbookRankPart
  },
  data() {
    return {
      isLoading: false,
      rankData: []
    }
  },
  async asyncData({ app }) {
    const res = await app.$myApi.ebooks.getRankingBook({ rankType: 'all' })
    return { rankData: res.result.list }
  },
  mounted() {},
  methods: {
    /**
     * @desc 获取排行榜书籍
     */
    getRankingBook() {
      this.isLoading = true
      this.$myApi.ebooks
        .getRankingBook({ rankType: 'all' })
        .then((res) => {
          this.isLoading = false
          this.rankData = res.result.list
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped></style>
