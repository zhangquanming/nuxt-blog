
## Nuxt 开发搭建个人博客

众所周知，Vue SPA单页面应用对SEO不友好，当然也有相应的解决方案。 **服务端渲染 (SSR)** 就是常用的一种。 SSR 有利于 **搜索引擎优化(SEO, Search Engine Optimization)** ，并且 **内容到达时间(time-to-content)** （或称之为**首屏渲染时长**）也有很大的优化空间。

[Nuxt.js](https://www.nuxtjs.cn/) 是一个基于 `Vue.js` 的轻量级应用框架,可用来创建 `服务端渲染 (SSR)`  应用,也可充当静态站点引擎生成静态站点应用,具有优雅的代码结构分层和热加载等特性。

### 初始化项目

#### 运行 create-nuxt-app
通过 Nuxt 官方提供的脚手架工具 [create-nuxt-app](https://github.com/nuxt/create-nuxt-app) 初始化项目：
```bash
$ npx create-nuxt-app <项目名>
```
// 或者
```bash
$ yarn create nuxt-app <项目名>
```
#### 项目配置
项目创建的时候会让你进行一些配置的选择,可根据自己需要进行选择。

#### 项目运行
运行完后，它将安装所有依赖项，下一步是启动项目：
```bash
$ cd <project-name>
$ yarn dev
```众所周知，Vue SPA单页面应用对SEO不友好，当然也有相应的解决方案。 **服务端渲染 (SSR)** 就是常用的一种。 SSR 有利于 **搜索引擎优化(SEO, Search Engine Optimization)** ，并且 **内容到达时间(time-to-content)** （或称之为**首屏渲染时长**）也有很大的优化空间。

[Nuxt.js](https://www.nuxtjs.cn/) 是一个基于 `Vue.js` 的轻量级应用框架,可用来创建 `服务端渲染 (SSR)`  应用,也可充当静态站点引擎生成静态站点应用,具有优雅的代码结构分层和热加载等特性。

### 初始化项目

#### 运行 create-nuxt-app
通过 Nuxt 官方提供的脚手架工具 [create-nuxt-app](https://github.com/nuxt/create-nuxt-app) 初始化项目：
```bash
$ npx create-nuxt-app <项目名>
```
// 或者
```bash
$ yarn create nuxt-app <项目名>
```
#### 项目配置
项目创建的时候会让你进行一些配置的选择,可根据自己需要进行选择。

#### 项目运行
运行完后，它将安装所有依赖项，下一步是启动项目：
```bash
$ cd <project-name>
$ yarn dev
```
在浏览器中，打开 http://localhost:3000

#### 目录结构
```
.
├── assets        // 用于组织未编译的静态资源
├── components        // 用于组织应用的 Vue.js 组件
├── layouts        // 用于组织应用的布局组件
├── middleware        // 用于存放应用的中间件
├── node_modules
├── pages        // 用于组织应用的路由及视图
├── plugins        // 组织插件。
├── static        // 用于存放应用的静态文件
├── store        // 状态管理
├── nuxt.config.js        // 配置文件
├── package.json
├── jsconfig.json
├── stylelint.config.js
├── README.md
└── yarn.lock
```


### 项目开发
项目启动之后，我们就可以进行开发阶段了。

#### 创建页面
在`pages`创建页面文件：
```
pages/
└── article/
    ├── index.vue
    ├── _category/
    │   └── index.vue
    └── detail/
        └── _articleId.vue
```
Nuxt.js 预设了利用 Vue.js 开发服务端渲染的应用所需要的各种配置。所以不需要再安装 `vue-router` 了，他会依据 `pages` 目录结构自动生成 `vue-router` 模块的路由配置。页面之间使用路由，官方推荐使用 `<nuxt-link>` 标签，与 `<router-link>` 的使用方式是一样的。上面创建的目录结构将会生成对应的路由配置表：
```js
router: {
  routes: [
    {
      name: 'article',
      path: '/article',
      component: 'pages/article/index.vue'
    },
    {
      name: "article-category"
      path: "/article/:category",
      component: 'pages/article/_category/index.vue',
    },
    {
      name: "article-detail-articleId"
      path: "/article/detail/:articleId",
      component: 'pages/article/detail/_articleId.vue'
    }
  ]
}
```

#### 组件部分
组件这一块划分为`base`、`framework`、`page`三个目录：
```
components/
├── base    基本组件
├── framework    布局相关组件
└── page/    各个页面下的组件
    ├── home
    └── ...
```

这里需要注意在开发 `VUE SPA` 应用时我们有时候会把页面组件放在 `pages` 下，我将页面下的组件全部放到了`components`下，因为 `Nuxt.js` 框架会读取 `pages` 目录下所有的 `.vue` 文件并自动生成对应的路由配置。

#### 资源的存放

官方介绍的很详细，资源的存放有两个目录：`static`、`assets`

`static` : 用于存放应用的静态文件，此类文件不会调用 `Webpack` 进行构建编译处理。服务器启动的时候，该目录下的文件会映射至应用的根路径 `/` 下。
举个例子: `/static/banner.png` 映射至 `/banner.png`

`assets` : 用于组织未编译的静态资源如 `LESS`、`SASS` 或 `JS`。 

#### 别名

| 别名 | 目录 |
| --- | --- |
| ~ 或 @ | srcDir |
| ~~ 或 @@ | rootDir |

 为了方便引用，nuxt 提供了两个别名，如果你需要引入 `assets` 或者 `static` 目录, 使用 `~/assets/your_image.png` 和 `~/static/your_image.png` 方式。
 
#### 全局样式 

这里我选用 `LESS` 预处理语言，安装：
```bash
$ yarn add less less-loader -D
```
在 `assets/css/` 创建 `.less` 文件, 通过一个文件引入：
```
// assets/css/index.less

@import './normalize.less';
@import './reset.less';
@import './variables.less';
@import './common.less'
```
在 `nuxt.config.js` 中引入
```js
export default {
  ...
  css: ['~/assets/css/index.less'],
  ...
}
```

#### LESS 全局变量
在使用预处理语言的时候，我们肯定会使用到变量，以方便统一管理颜色、字体大小等。

首先定义好变量文件 `variables.less`
```less
/* ===== 主题色配置 ===== */
@colorPrimary: #6bc30d;
@colorAssist: #2db7f5;
@colorSuccess: #67c23a;
@colorWarning: #e6a23c;
@colorError: #f56c6c;
@colorInfo: #909399;
```

安装：
```bash
$ yarn add @nuxtjs/style-resources -D
```
在 `nuxt.config.js` 中增加配置：
```js
export default {
  ...
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    // your settings here
    // sass: [],
    // scss: [],
    // stylus: [],
    less: ['~/assets/css/variables.less'],
  },
  ...
}
```

#### 布局layouts
在这里我创建了三种布局组件：

```
layouts/
├── admin.vue // 上图第四个
├── default.vue // 上图第一个和第三个只包含nav和footer
└── user.vue //上图第二个
```

`admin.vue`: 后台管理模块的布局
`user.vue`: 个人中心模块的布局
`default.vue`: 默认的布局

拿 `default.vue` 举例，我把 **导航** 和 **页脚** 放到了一个组件 `AppLayout` 中：
```html
<!-- layouts/default.vue -->

<template>
  <app-layout>
    <nuxt />
  </app-layout>
</template>

<script>
import AppLayout from '@/components/framework/AppLayout/AppLayout'

export default {
  name: 'AppLayoutDefault',
  components: {
    AppLayout
  }
}
</script>
```
然后在页面中使用：
```html
<!-- pages/index.vue -->

<template>
  <!-- Your template -->
</template>
<script>
  export default {
    layout: 'default'
    // 指定布局,不指定的话将会使用默认布局： layouts/default.vue
    // 其实我这里指不指定都可以哈哈。
  }
</script>
```
关于页面上路由的跳转，官方推荐使用 `<nuxt-link>`，这里 `<nuxt-link>` 和 `<a>` 还是有区别的，`nuxt-link` 走的是 vue-router 的路由，即页面为单页面，浏览器不会重定向。而 `<a>`标签走的是 `window.location.href` ，每次点击`a`标签后页面，都会进行一次服务端渲染。

#### 全局过滤器
在 ` plugins/ ` 目录下，新建  `filters.js`，比如说我们要对时间进行一个格式化处理 :

[Day.js](https://www.npmjs.com/package/dayjs) ：一个轻量的处理时间和日期的 JavaScript 库

```bash
$ yarn add dayjs
```

```js
import Vue from 'vue'
import dayjs from 'dayjs'
// 时间格式化
export function dateFormatFilter(date, fmt) {
  if (!date) {
    return ''
  } else {
    return dayjs(date).format(fmt)
  }
}
const filters = {
  dateFormatFilter
}
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
export default filters
```

然后，在 ` nuxt.config.js`  中配置，

```js
export default {
  ...
  plugins: ['~/plugins/filters.js']
  ...
}
```

#### 自定义指令

在 `plugins/directive/focus`  目录下，添加 ` index.js` :

```js
import Vue from 'vue';
const focus = Vue.directive('focus', {
  inserted(el) {
    el.focus();
  },
});
export default focus;
```
自定义指令和全局过滤器一样，都需要在 `nuxt.config.js` 添加配置：

```js
export default {
  ...
  plugins: [
    '~/plugins/filters.js'，
    { src: '~/plugins/directive/focus/index.js', ssr: false },
  ],
  ...
}
```
#### head 配置SEO
通过使用 `head` 方法设置当前页面的头部标签。
```html

<template>
  <h1>{{ title }}</h1></template>

<script>
  export default {
    ...
    head() {
      return {
        title: '明么的博客',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    }
  }
</script>
```
> 注意：为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为 meta 标签配一个唯一的标识编号。

如果页面比较多的话，每个页面都需要写 head 对象，就会有些的繁琐。可以借助 `nuxt` 的 `plugin` 机制，将其封装成一个函数，并注入到每一个页面当中：

```js
// plugins/head.js
import Vue from 'vue'

Vue.mixin({
  methods: {
    $seo(title, content) {
      return {
        title,
        meta: [{
          hid: 'description',
          name: 'description',
          content
        }]
      }
    }
  }
})
```
在 `nuxt.config.js` 中增加配置：
```js
export default {
  ...
  plugins: [
    '~/plugins/filters.js'，
    { src: '~/plugins/directive/focus/index.js', ssr: false },
    '~/plugins/head.js'
  ],
  ...
}
```
在页面中使用：
```js
head() {
    return this.$seo(this.detail.title, this.detail.summary)
}
```
#### axios 请求数据
请求数据，在初始化项目的时候已经选择了Axios，就不需要再另行安装了，可以查看 `nuxt.config.js` 中已经配置好了：
```js
export default {
  ...
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ...
  ],
  ...
}
```
页面中通过 `this.$axios.$get` 来获取数据，不需要在每个页面都单独引入 `axios`.
但是一般来说我们会对 `axios` 做一下封装，集中处理一些数据或者是错误信息。
在 `plugins` 目录下新建 `axios.js` 和 `api-repositories.js`,下面是我的一些简单的配置：

```js
//  plugins/axios.js
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

    } else {
      app.$toast.show(error.message)
    }
  })
}
```

```js
// plugins/api-repositories.js
export default ({ $axios }, inject) => {
  const repositories = {
    GetCategory: (params, options) => $axios.get('/categories', params, options),
    PostCategory: (params, options) => $axios.post('/categories', params, options),
    PutCategory: (params, options) => $axios.put(`/categories/${params.categoryId}`, params, options),
    DeleteCategory: (params, options) => $axios.delete(`/categories/${params.categoryId}`, params, options)
    ...
  }

  inject('myApi', repositories)
}
```
然后在 `nuxt.config.js` 中增加配置：

```js
export default {
  ...
  plugins: [
    ...
    { src: '~/plugins/axios.js', ssr: true },
    { src: '~/plugins/api-repositories.js', ssr: true },
  ],
    /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost:5000/'
  },
}
```
这样就可以直接在页面中使用了：
```js
this.$myApi.GetCategory()
```
#### proxy 代理

使用 proxy 解决跨域问题：

```bash
$ yarn add @nuxtjs/proxy
```
在 `nuxt.config.js` 中增加配置,下面是我的配置：
```js
export default {
  ...
  modules: [
    ...
    '@nuxtjs/proxy',
    ...
  ],
  axios: {
    proxy: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    prefix: '/api',
    credentials: true
  },
  /*
   ** 配置代理
   */
  proxy: {
    '/api': {
      target: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/' : 'http://localhost:5000/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    },
    '/douban/': {
      target: 'http://api.douban.com/v2',
      changeOrigin: true,
      pathRewrite: {
        '^/douban': ''
      }
    },
    ...
  },
}
```
在单页面开发中，打包发布上线还需要 `nginx` 代理才能实现跨域，在 `nuxt` 中，打包发布上线之后，请求是在服务端发起的，不存在跨域问题，所以不需要在另外再做 `nginx` 代理。

#### asyncData

该方法是 `Nuxt` 一大卖点, `asyncData` 方法会在组件（限于页面组件）每次加载之前被调用。它可以在服务端或路由更新之前被调用，服务端渲染的能力就在这里。

> 注意：由于 `asyncData` 方法是在组件 初始化 前被调用的，所以在方法内是没有办法通过 `this` 来引用组件的实例对象。

另外提及一点，当 `asyncData` 在服务端执行时，是没有 `document` 和 `window` 对象的。

`asyncData` 第一个参数被设定为当前页面的上下文对象，可以利用 `asyncData` 方法来获取数据，`Nuxt.js` 会将 `asyncData` 返回的数据融合组件 `data` 方法返回的数据一并返回给当前组件。

```js
export default {
  asyncData (ctx) {
    ctx.app // 根实例
    ctx.route // 路由实例
    ctx.params  //路由参数
    ctx.query  // 路由问号后面的参数
    ctx.error   // 错误处理方法
  }
}
```
服务端渲染：
```js
export default {
  data () {
    return { categoryList: [] };
  },
  async asyncData({ app }) {
    const res = await app.$myApi.GetCategory();
    return {
      categoryList: res.result.list
    };
  },
}

```
#### asyncData渲染出错
在使用 `asyncData` 时可能由于服务器错误或api错误导致页面无法渲染，针对这种情况的出现，我们还需要做一下处理。`nuxt` 提供了 `context.error` 方法用于错误处理，在 `asyncData` 中调用该方法即可跳转到错误页面。

```js
export default {
    async asyncData({ app, error}) {
    app.$myApi.GetCategory()
      .then(res => {
        return { categoryList: res.result.list }
      })
      .catch(e => {
        error({ statusCode: 500, message: '服务器出错了啦~' })
      })
  },
}
```
当出现异常时会跳转到默认的错误页，错误页面可以通过 `/layout/error.vue` 自定义。

> `context.error`的参数必须是类似`{ statusCode: 500, message: '服务器开了个小差~' }`，`statusCode`必须是`http`状态码

为了方便，全局统一处理错误方法，在 `plugins` 目录下创建 `ctx-inject.js` ：
```js
// plugins/ctx-inject.js
export default (ctx, inject) => {
  ctx.$errorHandler = (err) => {
    try {
      const res = err.data
      if (res) {
        // 由于nuxt的错误页面只能识别http的状态码，因此statusCode统一传500，表示服务器异常。
        ctx.error({ statusCode: 500, message: res.resultInfo })
      } else {
        ctx.error({ statusCode: 500, message: '服务器出错了啦~' })
      }
    } catch {
      ctx.error({ statusCode: 500, message: '服务器出错了啦~' })
    }
  }
}
```
然后，在 `nuxt.config.js` 中增加配置：
```js
export default {
  ...
  plugins: [
    ...
    '~/plugins/ctx-inject.js',
    ...
  ],
  ...
}
```
在页面中使用：

```js
export default {
  data() {
    return { categoryList: [] }
  },
  async asyncData(ctx) {
    const { app } = ctx
    // 尽量使用try catch的写法，将所有异常都捕捉到
    try {
      const res = await app.$myApi.GetCategory()
      return {
        categoryList: res.result.list,
      }
    } catch (err) {
      ctx.$errorHandler(err)
    }
  },
}
```


#### fetch
`fetch` 方法用于在渲染页面前填充应用的状态树（store）数据， 与 `asyncData` 方法类似，不同的是它不会设置组件的数据。它会在组件每次加载前被调用（在服务端或切换至目标路由之前）。和 `asyncData` 一样，第一个参数也是页面的上下文对象，同样无法在内部使用 `this` 来获取组件实例。

```html
<template>
  ...
</template>

<script>
  export default {
    async fetch({ app, store, params }) {
      let res = await app.$myApi.GetCategory()
      store.commit('setCategory', res.result.list)
    }
  }
</script>
```

#### store
在 `nuxt` 中使用状态管理，只需要在 `store/` 目录下创建文件即可。
```
store/
├── actions.js
├── getters.js
├── index.js
├── mutations.js
└── state.js
```
```js
// store/actions.js
const actions = {
  changeToken({ commit }, token) {
    commit('setToken', token)
  },
  ...
}
export default actions



// store/getters.js
export const token = (state) => state.token
export const userInfo = (state) => state.userInfo
...




// store/mutations.js
const mutations = {
  setToken(state, token) {
    state.token = token
  },
  ...
}
export default mutations



// store/state.js
const state = () => ({
  token: '',
  userInfo: null,
  ...
})
export default state




// store/index.js
import state from './state'
import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default {
  state,
  getters,
  actions,
  mutations
}
```
> 无论使用那种模式，您的 `state` 的值应该始终是 `function`，为了避免返回引用类型，会导致多个实例相互影响。

### 构建部署

开发完毕后，就可以进行打包部署了，一般来说先在本地测试一下：
```js
$ yarn build
$ yarn start
```
然后，云服务器安装 `node` 环境 和 `pm2`。

增加`pm2`配置，在 `server/` 目录下，新建 `pm2.config.json` 文件：
```json
{
  "apps": [
    {
      "name": "my-blog",
      "script": "./server/index.js",
      "instances": 0,
      "watch": false,
      "exec_mode": "cluster_mode"
    }
  ]
}
```

然后，在 `package.json` 中 `scripts` 配置命令：
```json
{
  "scripts": {
    ...
    "pm2": "cross-env NODE_ENV=production pm2 start ./server/pm2.config.json",  
  }
}
```

把我们项目中 `.nuxt` , `static` , `package.json`  , `nuxt.config.js` , `yarn.lock` 或者是 `package.lock` 上传到服务器。进入上传的服务器目录，安装依赖：
```bash
$ yarn install
```
然后，运行：
```bash
$ npm run pm2
```

在设置服务器开放 3000 端口后，就可以通过端口访问了。后面加个端口号总归是不合适，还需要使用 `nginx` 代理到默认端口 80(http) 或 433(https)。

> 记录一个小问题：3000 端口没问题，项目启动也正常，通过 `http://60.***.***.110:3000` 就是访问不了。在 `nuxt.config.js` 增加：
```json
{
  ...
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
}
```
重新启动项目即可。



在浏览器中，打开 http://localhost:3000
![项目运行](http://mingme.oss-cn-beijing.aliyuncs.com/image/article/20201109/1604922054113_WX20201109-191943%402x.png)

#### 目录结构
```
.
├── assets        // 用于组织未编译的静态资源
├── components        // 用于组织应用的 Vue.js 组件
├── layouts        // 用于组织应用的布局组件
├── middleware        // 用于存放应用的中间件
├── node_modules
├── pages        // 用于组织应用的路由及视图
├── plugins        // 组织插件。
├── static        // 用于存放应用的静态文件
├── store        // 状态管理
├── nuxt.config.js        // 配置文件
├── package.json
├── jsconfig.json
├── stylelint.config.js
├── README.md
└── yarn.lock
```


### 项目开发
项目启动之后，我们就可以进行开发阶段了。

#### 创建页面
在`pages`创建页面文件：
```
pages/
└── article/
    ├── index.vue
    ├── _category/
    │   └── index.vue
    └── detail/
        └── _articleId.vue
```
Nuxt.js 预设了利用 Vue.js 开发服务端渲染的应用所需要的各种配置。所以不需要再安装 `vue-router` 了，他会依据 `pages` 目录结构自动生成 `vue-router` 模块的路由配置。页面之间使用路由，官方推荐使用 `<nuxt-link>` 标签，与 `<router-link>` 的使用方式是一样的。上面创建的目录结构将会生成对应的路由配置表：
```js
router: {
  routes: [
    {
      name: 'article',
      path: '/article',
      component: 'pages/article/index.vue'
    },
    {
      name: "article-category"
      path: "/article/:category",
      component: 'pages/article/_category/index.vue',
    },
    {
      name: "article-detail-articleId"
      path: "/article/detail/:articleId",
      component: 'pages/article/detail/_articleId.vue'
    }
  ]
}
```

#### 组件部分
组件这一块划分为`base`、`framework`、`page`三个目录：
```
components/
├── base    基本组件
├── framework    布局相关组件
└── page/    各个页面下的组件
    ├── home
    └── ...
```

这里需要注意在开发 `VUE SPA` 应用时我们有时候会把页面组件放在 `pages` 下，我将页面下的组件全部放到了`components`下，因为 `Nuxt.js` 框架会读取 `pages` 目录下所有的 `.vue` 文件并自动生成对应的路由配置。

#### 资源的存放

官方介绍的很详细，资源的存放有两个目录：`static`、`assets`

`static` : 用于存放应用的静态文件，此类文件不会调用 `Webpack` 进行构建编译处理。服务器启动的时候，该目录下的文件会映射至应用的根路径 `/` 下。
举个例子: `/static/banner.png` 映射至 `/banner.png`

`assets` : 用于组织未编译的静态资源如 `LESS`、`SASS` 或 `JS`。 

#### 别名

| 别名 | 目录 |
| --- | --- |
| ~ 或 @ | srcDir |
| ~~ 或 @@ | rootDir |

 为了方便引用，nuxt 提供了两个别名，如果你需要引入 `assets` 或者 `static` 目录, 使用 `~/assets/your_image.png` 和 `~/static/your_image.png` 方式。
 
#### 全局样式 

这里我选用 `LESS` 预处理语言，安装：
```bash
$ yarn add less less-loader -D
```
在 `assets/css/` 创建 `.less` 文件, 通过一个文件引入：
```
// assets/css/index.less

@import './normalize.less';
@import './reset.less';
@import './variables.less';
@import './common.less'
```
在 `nuxt.config.js` 中引入
```js
export default {
  ...
  css: ['~/assets/css/index.less'],
  ...
}
```

#### LESS 全局变量
在使用预处理语言的时候，我们肯定会使用到变量，以方便统一管理颜色、字体大小等。

首先定义好变量文件 `variables.less`
```less
/* ===== 主题色配置 ===== */
@colorPrimary: #6bc30d;
@colorAssist: #2db7f5;
@colorSuccess: #67c23a;
@colorWarning: #e6a23c;
@colorError: #f56c6c;
@colorInfo: #909399;
```

安装：
```bash
$ yarn add @nuxtjs/style-resources -D
```
在 `nuxt.config.js` 中增加配置：
```js
export default {
  ...
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    // your settings here
    // sass: [],
    // scss: [],
    // stylus: [],
    less: ['~/assets/css/variables.less'],
  },
  ...
}
```

#### 布局layouts
我的博客大概分为这几种布局方式：
![图片](http://mingme.oss-cn-beijing.aliyuncs.com/image/article/202011010/1605004237490_layouts.jpg)

在这里我创建了三种布局组件：

```
layouts/
├── admin.vue // 上图第四个
├── default.vue // 上图第一个和第三个只包含nav和footer
└── user.vue //上图第二个
```

`admin.vue`: 后台管理模块的布局
`user.vue`: 个人中心模块的布局
`default.vue`: 默认的布局

拿 `default.vue` 举例，我把 **导航** 和 **页脚** 放到了一个组件 `AppLayout` 中：
```html
<!-- layouts/default.vue -->

<template>
  <app-layout>
    <nuxt />
  </app-layout>
</template>

<script>
import AppLayout from '@/components/framework/AppLayout/AppLayout'

export default {
  name: 'AppLayoutDefault',
  components: {
    AppLayout
  }
}
</script>
```
然后在页面中使用：
```html
<!-- pages/index.vue -->

<template>
  <!-- Your template -->
</template>
<script>
  export default {
    layout: 'default'
    // 指定布局,不指定的话将会使用默认布局： layouts/default.vue
    // 其实我这里指不指定都可以哈哈。
  }
</script>
```
关于页面上路由的跳转，官方推荐使用 `<nuxt-link>`，这里 `<nuxt-link>` 和 `<a>` 还是有区别的，`nuxt-link` 走的是 vue-router 的路由，即页面为单页面，浏览器不会重定向。而 `<a>`标签走的是 `window.location.href` ，每次点击`a`标签后页面，都会进行一次服务端渲染。

#### 全局过滤器
在 ` plugins/ ` 目录下，新建  `filters.js`，比如说我们要对时间进行一个格式化处理 :

[Day.js](https://www.npmjs.com/package/dayjs) ：一个轻量的处理时间和日期的 JavaScript 库

```bash
$ yarn add dayjs
```

```js
import Vue from 'vue'
import dayjs from 'dayjs'
// 时间格式化
export function dateFormatFilter(date, fmt) {
  if (!date) {
    return ''
  } else {
    return dayjs(date).format(fmt)
  }
}
const filters = {
  dateFormatFilter
}
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
export default filters
```

然后，在 ` nuxt.config.js`  中配置，

```js
export default {
  ...
  plugins: ['~/plugins/filters.js']
  ...
}
```

#### 自定义指令

在 `plugins/directive/focus`  目录下，添加 ` index.js` :

```js
import Vue from 'vue';
const focus = Vue.directive('focus', {
  inserted(el) {
    el.focus();
  },
});
export default focus;
```
自定义指令和全局过滤器一样，都需要在 `nuxt.config.js` 添加配置：

```js
export default {
  ...
  plugins: [
    '~/plugins/filters.js'，
    { src: '~/plugins/directive/focus/index.js', ssr: false },
  ],
  ...
}
```
#### head 配置SEO
通过使用 `head` 方法设置当前页面的头部标签。
```html

<template>
  <h1>{{ title }}</h1></template>

<script>
  export default {
    ...
    head() {
      return {
        title: '明么的博客',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    }
  }
</script>
```
> 注意：为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为 meta 标签配一个唯一的标识编号。

如果页面比较多的话，每个页面都需要写 head 对象，就会有些的繁琐。可以借助 `nuxt` 的 `plugin` 机制，将其封装成一个函数，并注入到每一个页面当中：

```js
// plugins/head.js
import Vue from 'vue'

Vue.mixin({
  methods: {
    $seo(title, content) {
      return {
        title,
        meta: [{
          hid: 'description',
          name: 'description',
          content
        }]
      }
    }
  }
})
```
在 `nuxt.config.js` 中增加配置：
```js
export default {
  ...
  plugins: [
    '~/plugins/filters.js'，
    { src: '~/plugins/directive/focus/index.js', ssr: false },
    '~/plugins/head.js'
  ],
  ...
}
```
在页面中使用：
```js
head() {
    return this.$seo(this.detail.title, this.detail.summary)
}
```
#### axios 请求数据
请求数据，在初始化项目的时候已经选择了Axios，就不需要再另行安装了，可以查看 `nuxt.config.js` 中已经配置好了：
```js
export default {
  ...
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ...
  ],
  ...
}
```
页面中通过 `this.$axios.$get` 来获取数据，不需要在每个页面都单独引入 `axios`.
但是一般来说我们会对 `axios` 做一下封装，集中处理一些数据或者是错误信息。
在 `plugins` 目录下新建 `axios.js` 和 `api-repositories.js`,下面是我的一些简单的配置：

```js
//  plugins/axios.js
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

    } else {
      app.$toast.show(error.message)
    }
  })
}
```

```js
// plugins/api-repositories.js
export default ({ $axios }, inject) => {
  const repositories = {
    GetCategory: (params, options) => $axios.get('/categories', params, options),
    PostCategory: (params, options) => $axios.post('/categories', params, options),
    PutCategory: (params, options) => $axios.put(`/categories/${params.categoryId}`, params, options),
    DeleteCategory: (params, options) => $axios.delete(`/categories/${params.categoryId}`, params, options)
    ...
  }

  inject('myApi', repositories)
}
```
然后在 `nuxt.config.js` 中增加配置：

```js
export default {
  ...
  plugins: [
    ...
    { src: '~/plugins/axios.js', ssr: true },
    { src: '~/plugins/api-repositories.js', ssr: true },
  ],
    /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost:5000/'
  },
}
```
这样就可以直接在页面中使用了：
```js
this.$myApi.GetCategory()
```
#### proxy 代理

使用 proxy 解决跨域问题：

```bash
$ yarn add @nuxtjs/proxy
```
在 `nuxt.config.js` 中增加配置,下面是我的配置：
```js
export default {
  ...
  modules: [
    ...
    '@nuxtjs/proxy',
    ...
  ],
  axios: {
    proxy: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    prefix: '/api',
    credentials: true
  },
  /*
   ** 配置代理
   */
  proxy: {
    '/api': {
      target: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/' : 'http://localhost:5000/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    },
    '/douban/': {
      target: 'http://api.douban.com/v2',
      changeOrigin: true,
      pathRewrite: {
        '^/douban': ''
      }
    },
    ...
  },
}
```
在单页面开发中，打包发布上线还需要 `nginx` 代理才能实现跨域，在 `nuxt` 中，打包发布上线之后，请求是在服务端发起的，不存在跨域问题，所以不需要在另外再做 `nginx` 代理。

#### asyncData

该方法是 `Nuxt` 一大卖点, `asyncData` 方法会在组件（限于页面组件）每次加载之前被调用。它可以在服务端或路由更新之前被调用，服务端渲染的能力就在这里。

> 注意：由于 `asyncData` 方法是在组件 初始化 前被调用的，所以在方法内是没有办法通过 `this` 来引用组件的实例对象。

另外提及一点，当 `asyncData` 在服务端执行时，是没有 `document` 和 `window` 对象的。

`asyncData` 第一个参数被设定为当前页面的上下文对象，可以利用 `asyncData` 方法来获取数据，`Nuxt.js` 会将 `asyncData` 返回的数据融合组件 `data` 方法返回的数据一并返回给当前组件。

```js
export default {
  asyncData (ctx) {
    ctx.app // 根实例
    ctx.route // 路由实例
    ctx.params  //路由参数
    ctx.query  // 路由问号后面的参数
    ctx.error   // 错误处理方法
  }
}
```
服务端渲染：
```js
export default {
  data () {
    return { categoryList: [] };
  },
  async asyncData({ app }) {
    const res = await app.$myApi.GetCategory();
    return {
      categoryList: res.result.list
    };
  },
}

```
#### asyncData渲染出错
在使用 `asyncData` 时可能由于服务器错误或api错误导致页面无法渲染，针对这种情况的出现，我们还需要做一下处理。`nuxt` 提供了 `context.error` 方法用于错误处理，在 `asyncData` 中调用该方法即可跳转到错误页面。

```js
export default {
    async asyncData({ app, error}) {
    app.$myApi.GetCategory()
      .then(res => {
        return { categoryList: res.result.list }
      })
      .catch(e => {
        error({ statusCode: 500, message: '服务器出错了啦~' })
      })
  },
}
```
当出现异常时会跳转到默认的错误页，错误页面可以通过 `/layout/error.vue` 自定义。

> `context.error`的参数必须是类似`{ statusCode: 500, message: '服务器开了个小差~' }`，`statusCode`必须是`http`状态码

为了方便，全局统一处理错误方法，在 `plugins` 目录下创建 `ctx-inject.js` ：
```js
// plugins/ctx-inject.js
export default (ctx, inject) => {
  ctx.$errorHandler = (err) => {
    try {
      const res = err.data
      if (res) {
        // 由于nuxt的错误页面只能识别http的状态码，因此statusCode统一传500，表示服务器异常。
        ctx.error({ statusCode: 500, message: res.resultInfo })
      } else {
        ctx.error({ statusCode: 500, message: '服务器出错了啦~' })
      }
    } catch {
      ctx.error({ statusCode: 500, message: '服务器出错了啦~' })
    }
  }
}
```
然后，在 `nuxt.config.js` 中增加配置：
```js
export default {
  ...
  plugins: [
    ...
    '~/plugins/ctx-inject.js',
    ...
  ],
  ...
}
```
在页面中使用：

```js
export default {
  data() {
    return { categoryList: [] }
  },
  async asyncData(ctx) {
    const { app } = ctx
    // 尽量使用try catch的写法，将所有异常都捕捉到
    try {
      const res = await app.$myApi.GetCategory()
      return {
        categoryList: res.result.list,
      }
    } catch (err) {
      ctx.$errorHandler(err)
    }
  },
}
```


#### fetch
`fetch` 方法用于在渲染页面前填充应用的状态树（store）数据， 与 `asyncData` 方法类似，不同的是它不会设置组件的数据。它会在组件每次加载前被调用（在服务端或切换至目标路由之前）。和 `asyncData` 一样，第一个参数也是页面的上下文对象，同样无法在内部使用 `this` 来获取组件实例。

```html
<template>
  ...
</template>

<script>
  export default {
    async fetch({ app, store, params }) {
      let res = await app.$myApi.GetCategory()
      store.commit('setCategory', res.result.list)
    }
  }
</script>
```

#### store
在 `nuxt` 中使用状态管理，只需要在 `store/` 目录下创建文件即可。
```
store/
├── actions.js
├── getters.js
├── index.js
├── mutations.js
└── state.js
```
```js
// store/actions.js
const actions = {
  changeToken({ commit }, token) {
    commit('setToken', token)
  },
  ...
}
export default actions



// store/getters.js
export const token = (state) => state.token
export const userInfo = (state) => state.userInfo
...




// store/mutations.js
const mutations = {
  setToken(state, token) {
    state.token = token
  },
  ...
}
export default mutations



// store/state.js
const state = () => ({
  token: '',
  userInfo: null,
  ...
})
export default state




// store/index.js
import state from './state'
import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default {
  state,
  getters,
  actions,
  mutations
}
```
> 无论使用那种模式，您的 `state` 的值应该始终是 `function`，为了避免返回引用类型，会导致多个实例相互影响。

### 构建部署

开发完毕后，就可以进行打包部署了，一般来说先在本地测试一下：
```js
$ yarn build
$ yarn start
```
然后，云服务器安装 `node` 环境 和 `pm2`。

增加`pm2`配置，在 `server/` 目录下，新建 `pm2.config.json` 文件：
```json
{
  "apps": [
    {
      "name": "my-blog",
      "script": "./server/index.js",
      "instances": 0,
      "watch": false,
      "exec_mode": "cluster_mode"
    }
  ]
}
```

然后，在 `package.json` 中 `scripts` 配置命令：
```json
{
  "scripts": {
    ...
    "pm2": "cross-env NODE_ENV=production pm2 start ./server/pm2.config.json",  
  }
}
```

把我们项目中 `.nuxt` , `static` , `package.json`  , `nuxt.config.js` , `yarn.lock` 或者是 `package.lock` 上传到服务器。进入上传的服务器目录，安装依赖：
```bash
$ yarn install
```
然后，运行：
```bash
$ npm run pm2
```

在设置服务器开放 3000 端口后，就可以通过端口访问了。后面加个端口号总归是不合适，还需要使用 `nginx` 代理到默认端口 80(http) 或 433(https)。

> 记录一个小问题：3000 端口没问题，项目启动也正常，通过 `http://60.***.***.110:3000` 就是访问不了。在 `nuxt.config.js` 增加：
```json
{
  ...
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
}
```
重新启动项目即可。


