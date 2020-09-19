<template>
  <ul class="md-anchor-nav">
    <li v-for="(nav, index) in list" :key="index">
      <a :id="nav.index | anchor" :class="{ active: highLightIndex === nav.index }" @click="scrollToEle(nav.index)" href="javascript:;">
        <span>{{ nav.title }}</span>
      </a>
      <md-anchor-nav :list="nav.children" :offsetTopList="offsetTopList" v-if="nav.children.length > 0" />
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

let vm = null
export default {
  name: 'MdAnchorNav',
  filters: {
    anchor(value) {
      return `#${vm.idPrefix}${value}`
    }
  },
  props: {
    list: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    offsetTopList: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    vm = this
    return {
      idPrefix: 'titleAnchor-'
    }
  },
  computed: {
    ...mapGetters({
      highLightIndex: 'highLightIndex'
    })
  },
  methods: {
    scrollToEle(eleIndex) {
      const targetOffsetTop = this.offsetTopList[eleIndex]
      // window.scrollTo(0, targetOffsetTop - 100);
      this.scrollMove(targetOffsetTop - 84, 200)
    },
    scrollMove(scrollTo, time) {
      const scrollFrom = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let count = 0
      const every = 10
      scrollTo = parseInt(scrollTo)
      time /= every

      const interval = setInterval(function() {
        count++
        document.documentElement.scrollTop = document.body.scrollTop = ((scrollTo - scrollFrom) / time) * count + scrollFrom
        if (count >= time) {
          clearInterval(interval)
        }
      }, every)
    }
  }
}
</script>

<style lang="less" scoped>
.md-anchor-nav {
  position: relative;
  z-index: 10;
  margin-left: 15px;
  list-style: square;
  padding-left: 10px;
}

.md-anchor-nav a {
  display: block;
  padding: 5px 0;
  line-height: 1.5;
  color: @colorTextContent;

  &:link,
  &:visited {
    text-decoration: none;
  }

  &:hover span {
    color: @colorSuccess;
    @colorActive();
    text-decoration: underline;
  }

  &.active span {
    color: @colorSuccess;
    @colorActive();
  }
}
</style>
