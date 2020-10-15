import qs from 'qs'

export default function(ctx) {
  const { $axios, store, app } = ctx
  // $axios.defaults.timeout = 0;
  $axios.transformRequest = [
    (data, header) => {
      if (header['Content-Type'] && header['Content-Type'].includes('json')) {
        return JSON.stringify(data)
      }
      return qs.stringify(data, { arrayFormat: 'repeat' })
    }
  ]

  $axios.onRequest((config) => {
    const token = store.getters.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // 如果是 get 请求，参数序列化
    if (config.method === 'get') {
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' }) // params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
      }
    }
    return config
  })

  $axios.onRequestError((error) => {
    console.log('onRequestError', error)
  })

  $axios.onResponse((res) => {
    // ["data", "status", "statusText", "headers", "config", "request"]
    // 如果 后端返回的码正常 则 将 res.data 返回
    if (res && res.data) {
      if (res.headers['content-type'] === 'text/html') {
        return res
      }
      if (res.data.code === 'success') {
        return res
      } else {
        return Promise.reject(res.data)
      }
    }
  })

  $axios.onResponseError((error) => {
    console.log('onResponseError', error)
  })

  $axios.onError((error) => {
    console.log('onError', error)

    if (error && error.message.indexOf('401') > 1) {
      app.$toast.error('登录过期了，请重新登录！')
      sessionStorage.clear()
      store.dispatch('changeUserInfo', null)
      store.dispatch('changeToken', '')

      // store.dispatch('toggleSignInModal', true);
    } else {
      app.$toast.show(error.message)
    }
  })
}
