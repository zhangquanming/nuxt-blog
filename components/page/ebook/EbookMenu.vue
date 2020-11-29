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
          path: '/ebook/category/xuanhuanxiaoshuo'
        },
        {
          title: '修真小说',
          path: '/ebook/category/xiuzhenxiaoshuo'
        },
        {
          title: '都市小说',
          path: '/ebook/category/dushixiaoshuo'
        },
        {
          title: '历史小说',
          path: '/ebook/category/lishixiaoshuo'
        },
        {
          title: '网游小说',
          path: '/ebook/category/wangyouxiaoshuo'
        },
        {
          title: '科幻小说',
          path: '/ebook/category/kehuanxiaoshuo'
        },
        {
          title: '女频小说',
          path: '/ebook/category/nvpinxiaoshuo'
        },
        {
          title: '排行榜单',
          path: '/ebook/ranking'
        },
        {
          title: '完本小说',
          path: '/ebook/category/wanbenxiaoshuo'
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
