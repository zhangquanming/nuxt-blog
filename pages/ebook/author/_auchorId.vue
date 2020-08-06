<template>
  <div class="z-container">
    <div v-for="item in authorWorks" :key="item.bookId + item.name" class=" z-col-xs-30">
      <div v-loading="isLoading" class="works-item">
        <div class="works-item-poster">
          <ebook-poster :data-source="item" />
        </div>
        <div class="works-item-info">
          <h2 :title="item.name" class="works-item-name">{{ item.name }}</h2>
          <p class="works-item-author">{{ item.author }}</p>
          <p class="works-item-brief">{{ item.brief }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EbookPoster from '@/components/page/ebook/EbookPoster'

export default {
  name: 'EbookArthorWorks',
  components: {
    EbookPoster
  },
  data() {
    return {
      isLoading: false,
      authorWorks: [
        {
          poster: '',
          bookId: '',
          name: '书名1',
          author: '作者',
          brief:
            '作品介绍，作品介绍作品介绍作品介绍作品介绍，作品介绍作品介绍作品介绍作品介绍作品介绍。作品介绍，作品介绍作品介绍作品介绍作品介绍，作品介绍作品介绍作品介绍作品介绍作品介绍。'
        },
        {
          poster: '',
          bookId: '',
          name: '书名2',
          author: '作者',
          brief:
            '作品介绍，作品介绍作品介绍作品介绍作品介绍，作品介绍作品介绍作品介绍作品介绍作品介绍。作品介绍，作品介绍作品介绍作品介绍作品介绍，作品介绍作品介绍作品介绍作品介绍作品介绍。'
        }
      ]
    }
  },
  mounted() {
    // this.getAuthorWorksList();
    this.$toast.info('暂不支持关联作者, 可在搜索中搜索')
  },
  methods: {
    /**
     * @desc 关键字查询书籍
     */
    getAuthorWorksList() {
      this.isLoading = true
      this.$myApi.ebooks
        .getAuthorWorks({ authorId: this.$route.params.authorId })
        .then((res) => {
          this.isLoading = false
          this.authorWorks = res.result
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.works-item {
  display: flex;
  padding: 10px;
  .works-item-poster {
    width: 24%;
    margin-right: 10px;
  }
  .works-item-info {
    flex: 1;
  }
  .works-item-name {
    color: @colorTextTitle;
    font-size: 20px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .works-item-author {
    margin-top: 6px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .works-item-brief {
    margin-top: 8px;

    font-size: 14px;
    color: @colorTextContent;
    text-align: justify;
    overflow: hidden;
    height: 4.5em;
    color: @colorTextSub;
  }
}
</style>
