export default ($axios) => (resource) => {
  let api = {
    create(payload) {
      return $axios.$post(resource, payload)
    },
    index(payload) {
      return $axios.$get(`${resource}`, {
        params: payload
      })
    },
    show(payload) {
      return $axios.$get(`${resource}/${payload.id}`)
    },
    update(payload) {
      return $axios.$put(`${resource}/${payload.id}`, payload)
    },
    delete(id) {
      return $axios.$delete(`${resource}/${id}`)
    }
  }
  if (resource.indexOf('blogs') > 0) {
    api.PostBlogLike = (payload) => $axios.$post(`${resource}/like`, payload)
    api.PostBlogUnLike = (payload) => $axios.$post(`${resource}/unlike`, payload)
  }
  if (resource.indexOf('users') > 0) {
    api.PostUserLogin = (payload) => $axios.$post(`${resource}/signin`, payload)
    api.PostUserSignout = (payload) => $axios.$post(`${resource}/signout`, payload)
    api.PostUserSignup = (payload) => $axios.$post(`${resource}/signup`, payload)
    api.PostForgetPwd = (payload) => $axios.$post(`${resource}/forgetPwd`, payload)
    api.PostChangePwd = (payload) => $axios.$post(`${resource}/changePwd`, payload)
  }
  if (resource.indexOf('ebooks') > 0) {
    api = {
      // 获取首页数据
      getHomeData: (params, options) => $axios.$get(`${resource}`, params, options),

      // 获取分类书籍
      getCategoryBook: (params, options) => $axios.$get(`${resource}/category/${params.categoryName}`, null, options),

      // 关键字查询书籍
      getBookByWd: (params, options) => $axios.$post(`${resource}/search`, params, options),

      // 获取排行榜书籍
      getRankingBook: (params, options) => $axios.$get(`${resource}/rank/${params.rankType === 'all' ? '' : params.rankType}`, null, options),

      // 获取书籍信息
      getBookInfo: (params, options) => $axios.$get(`${resource}/info/${params.bookId}`, null, options),

      // 获取作者作品信息
      getAuthorWorks: (params, options) => $axios.$get(`${resource}/author/${params.authorId}`, params, options),

      // 获取章节内容
      getChapter: (params, options) => $axios.$get(`${resource}/chapter/${params.bookId}/${params.chapterId}`, null, options)
    }
  }
  return api
}
