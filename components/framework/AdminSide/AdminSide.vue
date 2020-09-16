<template>
  <div class="admin-side-wrap">
    <nuxt-link to="/" class="admin-side-brand">
      <logo :w="160" />
    </nuxt-link>
    <div class="admin-side-menu">
      <router-link v-for="(nav, index) in sideMenu" :key="index" :to="nav.path" active-class="current" class="menu-link">
        <icon :type="nav.icon" :size="20"></icon>
        <span class="text">{{ nav.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/base/Logo/Logo'
import Icon from '@/components/base/Icon/Icon'
export default {
  name: 'AdminSide',
  components: {
    Logo,
    Icon
  },
  data() {
    return {
      sideMenu: [
        {
          name: '写文章',
          path: '/admin/write',
          icon: 'iconwenzhang'
        },
        {
          name: '文章管理',
          path: '/admin/article',
          icon: 'iconwenzhangguanli'
        },
        {
          name: '文章分类管理',
          path: '/admin/category',
          icon: 'iconwenzhangfenlei'
        },
        {
          name: '文章标签管理',
          path: '/admin/tag',
          icon: 'iconbiaoqian'
        },
        {
          name: '前端资源类别管理',
          path: '/admin/resource-type',
          icon: 'iconfenleiguanli '
        },
        {
          name: '前端资源管理',
          path: '/admin/resource',
          icon: 'iconziyuanguanli'
        },
        {
          name: '评论管理',
          path: '/admin/comment',
          icon: 'iconpinglunguanli'
        },
        {
          name: '用户管理',
          path: '/admin/user',
          icon: 'iconyonghuguanli'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.admin-side-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .admin-side-brand {
    display: flex;
    justify-content: center;
    align-items: center;
    background: @colorBgSideMenu;
    color: #fff;
    height: @heightHeader;
    & > .iconfont {
      display: block;
      line-height: @heightHeader;
      text-align: center;
      &:before {
        display: block;
      }
    }
  }
  .admin-side-menu {
    background-color: @colorBgSideMenu;
    flex: 1;
  }
  .menu-link {
    position: relative;
    display: flex;
    align-items: center;
    padding: 15px 24px;
    color: @colorTextSilver;
    transition: background-color 0.2s ease;
    .text {
      margin-left: 10px;
    }
    &:after {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: 100%;
      background: transparent;
      transition: background 0.2s ease;
    }
    &:hover {
      color: #fff;
      background-color: @colorBgSideMenuItemActive;
    }
    &.current {
      color: #fff;
      background-color: @colorBgSideMenuItemActive;
      &:after {
        background: @colorCol;
      }
    }
  }
}
</style>
