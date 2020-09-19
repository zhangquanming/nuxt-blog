<template>
  <card :padding="0" title="文章分类">
    <ul v-if="categoryList.length > 0" @mouseleave="checkPathname" class="card-category-list">
      <li v-for="(nav, index) in categoryList" :key="index" @mouseover="changeTop(index)" class="category-item">
        <router-link :to="`/${parentPath}${nav.value === '/' ? nav.value : '/' + nav.value}`" exact active-class="current" class="category-item-link">
          {{ nav.name }}
        </router-link>
      </li>
      <li :style="{ top: topIndex * 40 + 'px' }" class="category-item-slider"></li>
    </ul>
    <no-data v-else style="height: 260px;" />
  </card>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/components/base/Card/Card'
import NoData from '@/components/kit/NoData/NoData'
export default {
  name: 'CardCategory',
  components: {
    Card,
    NoData
  },
  props: {
    categoryList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    parentPath() {
      return this.$route.path.split('/')[1]
    },
    ...mapGetters({
      topIndex: 'categoryIndex'
    })
  },
  mounted() {
    this.checkPathname()
  },
  methods: {
    /**
     * @desc 获取当前路径
     */
    checkPathname() {
      const currentPath = this.$route.path
      const categoryPath = currentPath.split('/')[2]
      if (categoryPath) {
        this.categoryList.forEach((item, index) => {
          if (`/${this.parentPath}/${item.value}` === currentPath) {
            this.changeTop(index)
          }
        })
      } else {
        this.categoryList.forEach((item, index) => {
          if (item.value === '/') {
            this.changeTop(index)
          }
        })
      }
    },

    /**
     * @desc 改变当前聚焦的分类
     */
    changeTop(index) {
      this.$store.dispatch('changeCategoryIndex', index)
    }
  }
}
</script>

<style lang="less" scoped>
.card-category-list {
  position: relative;

  .category-item {
    position: relative;
    padding: 0 15px;
    z-index: 1;
  }

  .category-item-link {
    display: block;
    padding-left: 15px;
    height: 40px;
    color: @colorTextSub;
    line-height: 40px;
    text-decoration: none;
    border-bottom: 1px solid lighten(@colorBorderLight, 2%);
  }

  .category-item-link:hover {
    color: @colorTextTitle;
  }

  .current {
    color: @colorTextTitle;
  }

  .category-item-slider {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    height: 40px;
    width: 100%;
    border-right: 4px solid @colorTextTitle;
    background-color: lighten(@colorBorderLight, 2%);
    transition: top 0.2s;
  }
}
</style>
