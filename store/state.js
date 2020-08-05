const state = {
  navList: [
    {
      name: '个人博客',
      path: '/blog'
    },
    {
      name: '前端资源',
      path: '/resource'
    },
    {
      name: '豆瓣电影',
      path: '/movie'
    },
    {
      name: '网络小说',
      path: '/ebook'
    },
    {
      name: '后台管理',
      path: '/admin'
    }
  ],
  token: '',
  userInfo: null,
  showSignInModal: false,
  showSignUpModal: false,
  categoryList: [],
  blogResult: {},
  highLightIndex: 0 // markdown 目录高亮索引
}

export default state
