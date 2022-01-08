<template>
  <div class="ebook-catgory-menu">
    <router-link v-for="item in category" :key="item.path" :to="{ path: item.path }" class="ebook-catgory-menu-item" active-class="active" exact>{{ item.title }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'EbookMenu',
  data() {
    return {
      category: [
        {
          title: '首页',
          path: '/ebook/'
        },
        {
          title: '玄幻小说',
          path: '/ebook/category/1_1'
        },
        {
          title: '武侠小说',
          path: '/ebook/category/2_1'
        },
        {
          title: '都市小说',
          path: '/ebook/category/3_1'
        },
        {
          title: '历史小说',
          path: '/ebook/category/4_1'
        },
        {
          title: '侦探小说',
          path: '/ebook/category/5_1'
        },
        {
          title: '网游小说',
          path: '/ebook/category/6_1'
        },
        {
          title: '科幻小说',
          path: '/ebook/category/7_1'
        },
        {
          title: '排行榜单',
          path: '/ebook/ranking'
        },
        {
          title: '完本小说',
          path: '/ebook/category/full'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.ebook-catgory-menu {
  margin-top: 15px;
  .ebook-catgory-menu-item {
    display: inline-block;
    padding: 10px 5px;
    margin: 0 5px;
    position: relative;
    color: @colorTextTitle;
    font-size: 15px;
    &:hover {
      color: @colorError;
    }
  }
  .ebook-catgory-menu-item + .ebook-catgory-menu-item {
    &:before {
      content: '';
      position: absolute;
      top: 12px;
      bottom: 12px;
      left: -5px;
      width: 1px;
      background-color: @colorTextLight;
    }
  }
  .ebook-catgory-menu-item.active {
    color: @colorError;
  }
}
</style>
