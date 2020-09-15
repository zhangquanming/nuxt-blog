const state = () => ({
  navList: [
    {
      name: '文章',
      path: '/article'
    },
    {
      name: 'WEB圈',
      path: '/resource'
    },
    {
      name: '电影',
      path: '/movie'
    },
    {
      name: '小说',
      path: '/ebook'
    },
    {
      name: '后台',
      path: '/admin'
    }
  ],
  token: '',
  userInfo: null,
  showSignInModal: false,
  showSignUpModal: false,
  tagList: [],
  categoryList: [],
  blogResult: {},
  highLightIndex: 0, // markdown 目录高亮索引
  categoryIndex: 0,
  cacheArticleData: null
})

export default state
