<template>
  <ul class="user-menu">
    <router-link v-for="(nav, index) in menus" :key="index" :to="nav.path" tag="li" exact active-class="active" class="menu-link">{{ nav.name }}</router-link>
  </ul>
</template>

<script>
export default {
  name: 'UserMenu',
  data() {
    return {
      menus: [
        {
          name: '个人中心',
          path: '/user'
        },
        {
          name: '编辑资料',
          path: '/user/profile'
        },
        {
          name: '修改头像',
          path: '/user/avatar'
        },
        {
          name: '修改密码',
          path: '/user/password'
        },
        {
          name: '发布文章',
          path: '/user/write'
        },
        {
          name: '我的作品',
          path: '/user/article'
        },
        {
          name: '我的点赞',
          path: '/user/favorites'
        },
        {
          name: '我的评论',
          path: '/user/comment'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.user-menu {
  .menu-link {
    text-align: center;
    padding: 10px;
    cursor: pointer;
    &:hover {
      @colorActive();
    }
  }
  .menu-link + .menu-link {
    border-top: 1px dashed @colorBorder;
  }
  .active {
    font-weight: 700;
    @colorActive();
  }
}
</style>
