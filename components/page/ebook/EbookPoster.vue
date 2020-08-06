<template>
  <div class="book-poster-wrap">
    <div class="book-poster">
      <router-link v-if="dataSource.bookId" :to="{ path: `/ebook/${dataSource.bookId}` }" class="book-poster-link no-img-placeholder-colorful no-img-placeholder-vertical">
        <img :src="dataSource.poster" class="hotlist-item-poster" alt="" />
      </router-link>
      <div v-else class="book-poster-link no-img-placeholder-colorful no-img-placeholder-vertical">
        <img :src="dataSource.poster" class="hotlist-item-poster" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EbookPoster',
  props: {
    dataSource: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.book-poster {
  position: relative;
  background-image: url(~assets/images/book-bottom.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-top: 2.3%;
  padding-right: 6.2%;

  &-wrap {
    position: relative;
    padding: 0 5%;
    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 10%;
      right: 10%;
      height: 5px;
      box-shadow: 0px 0px 20px 8px rgba(0, 0, 0, 0.15), 0px 0px 15px 5px rgba(0, 0, 0, 0.15), 0px 0px 10px 3px rgba(0, 0, 0, 0.15), 0px 0px 5px 1px rgba(0, 0, 0, 0.15);
    }
  }
  &-link {
    display: block;
    position: relative;
    font-size: 0;
    display: block;
    padding-top: 133.33%;
    perspective: 800px;
    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform-origin: 0 0;
      transition: transform 0.3s ease 0s;
    }
  }
  &:hover img {
    transform: rotateY(-25deg);
  }
}
</style>
