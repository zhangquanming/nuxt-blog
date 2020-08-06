import axios from 'axios'

// 创建实例
const instance = axios.create({})

const { CancelToken } = axios
const pending = []

const apikey = '0b2bdeda43b5688921839c8ecb20399b'

// 全局设置项
// instance.defaults.baseURL = '';
// instance.defaults.baseURL = 'http://api.douban.com/v2/';
instance.defaults.timeout = 20000
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
instance.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded charset=utf-8'
instance.defaults.headers.get['Cache-Control'] = 'no-cache'
instance.defaults.headers.get.Pragma = 'no-cache'
instance.defaults.headers.common.Accept = 'application/json, text/plain, */*'

const ignoreUrlList = []

const cancelPending = (config) => {
  const isIgnoreUrl = ignoreUrlList.filter((item) => config.url.includes(item)).length > 0
  pending.forEach((item, index) => {
    if (!isIgnoreUrl) {
      if (config) {
        if (item.UrlPath === config.url) {
          item.Cancel() // 取消请求
          pending.splice(index, 1) // 移除当前请求记录
        }
      } else {
        item.Cancel() // 取消请求
        pending.splice(index, 1) // 移除当前请求记录
      }
    }
  })
}

// 请求发送之前的拦截处理
instance.interceptors.request.use(
  (config) => {
    cancelPending(config)
    config.cancelToken = new CancelToken((res) => {
      pending.push({ UrlPath: config.url, Cancel: res })
    })
    return config
  },
  (error) => Promise.reject(error)
)

// 请求完成之后的拦截处理
instance.interceptors.response.use(
  (response) => {
    cancelPending(response.config)
    return response
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.msg = '请求超时'
    }
    return Promise.reject(error)
  }
)

export default {
  get(url, params, options) {
    return instance({
      method: 'get',
      url,
      params: {
        ...params,
        apikey
      }, // get 请求时带的参数 叫 'params'
      customHeaders: { ...options }
    })
      .then((response) => response.data)
      .catch((err) => {
        // window.$toast.error(err.message);
        return Promise.reject(err)
      })
  },
  post(url, data, options) {
    return instance({
      method: 'post',
      url,
      data, // post 请求时带的参数 叫 'data'
      customHeaders: { ...options }
    })
      .then((response) => response.data)
      .catch((err) => {
        // window.$toast.error(err.message);
        return Promise.reject(err)
      })
  }
}
