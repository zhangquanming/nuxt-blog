const state = () => ({
  navList: [
    {
      name: '个人文章',
      path: '/article'
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
      name: '电子书',
      path: '/ebook'
    },
    {
      name: '留言板',
      path: '/message'
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
