import request from './request-douban'

export default {
  /**
   * @desc 搜索
   * @q 搜索关键字
   * @tag 标签
   * @start 起始位置
   * @count 数量
   */
  DoubanMovieSearchFull: (params, options) => request.get('/yushu/movie/search', params, options),

  DoubanMovieSearch: (params, options) => request.get('/doubanOld/j/subject_suggest', params, options),

  // 评论详情 全
  DoubanMovieFullReview: (params, options) => request.get(`/doubanOld/j/review/${params.id}/full`, params, options),

  // 获取 排行榜 Top250
  DoubanMovieRankingTop250: (params, options) => request.get('/yushu/movie/top250', params, options),

  // 正在上映
  DoubanMovieBeingShown: (params, options) => request.get('/yushu/movie/in_theaters', params, options),

  // 口碑榜
  DoubanMovieRankingWeekly: (params, options) => request.get('/douban/movie/weekly', params, options),

  // 北美票房榜
  DoubanMovieRankingUs: (params, options) => request.get('/douban/movie/us_box', params, options),

  // 新片榜
  DoubanMovieRankingNew: (params, options) => request.get('/douban/movie/new_movies', params, options),

  // 即将上映
  DoubanMovieRankingComing: (params, options) => request.get('/yushu/movie/coming_soon', params, options),

  // 电影条目信息
  DoubanMovieMovieDetail: (params, options) => request.get(`/yushu/movie/subject/${params.id}`, params, options),

  // 电影条目剧照
  DoubanMovieMovieDetailForPhotos: (params, options) => request.get('/douban/movie/subject/id/photos', params, options),

  // 电影条目影评列表
  DoubanMovieMovieDetailForReviews: (params, options) => request.get('/douban/movie/subject/id/reviews', params, options),

  // 电影条目短评列表
  DoubanMovieMovieDetailForComments: (params, options) => request.get('/douban/movie/subject/id/comments', params, options)
}
