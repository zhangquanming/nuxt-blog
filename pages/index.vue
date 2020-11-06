<template>
  <div class="page">
    <billboard :poster="banneImg" poster-blue="0" height="640px" is-home-page>
      <div class="page-slogan"><rotating-text :words="words" width="2em" />，终将收获更好的自己</div>
      <div class="page-slogan-sub"><rotating-text :words="words2" width="3.8em" />, will eventually harvest better oneself.</div>
      <div class="banner-btn-wrap">
        <a @click="handleGoGithub" class="banner-btn bbtn1"><i class="iconfont icongithub"></i><span>Github</span></a>
        <a @click="handleGoBlog" class="banner-btn bbtn2"><span>进入博客</span></a>
      </div>
    </billboard>
    <div class="page-content">
      <section class="section-part section-part-module">
        <section-title title="网站介绍" decs="主要介绍网站各个模块用到了哪些技术"></section-title>

        <div class="z-container">
          <div class="section-module-cont">
            <div class="section-module-img"></div>
            <div class="section-module-card">
              <section-card title="个人文章" icon="iconwenzhang1" path="/article">
                采用 Nuxt.js 实现一套 ssr 博客系统，支持 macdown 边写作边预览。
              </section-card>
              <section-card title="前端资源" icon="iconlianjie" path="/resource">
                前端添加资源链接，通过 puppeteer 爬取网站介绍，图片上传 ali-oss 阿里云。
              </section-card>
              <section-card title="豆瓣电影" icon="icondianying" path="/movie">
                转发请求到豆瓣开源 api, 前台自定义播放器，实现播放。
              </section-card>
              <section-card title="电子书" icon="iconxiaoshuo" path="/ebook">
                通过 puppeteer 爬取笔趣阁网站内容，分析网页结构，提取数据，保存数据库。
              </section-card>
              <section-card title="后台api" icon="iconziyuan1" path="/admin">
                使用 node.js 的 koa 开发框架，mongodb 作为数据库，pm2 管理 node 进程。
              </section-card>
            </div>
          </div>
        </div>
      </section>

      <!-- <section class="section-part section-part-links">
        <section-title title="这是标题" decs="这是一段副标题"></section-title>

        <div class="z-container"></div>
      </section> -->

      <section class="section-part section-part-contact">
        <section-title title="你可以在这些场所找到我" theme="light"></section-title>
        <div class="z-container">
          <ul class="contact-list">
            <li class="contact-list-item">
              <a class="contact-list-item-link contact-list-item-link-github" target="_blank" rel="noopener noreferrer" href="https://github.com/zhangquanming/nuxt-blog">
                <icon :size="40" type="icongithub" class="contact-list-item-icon"></icon>
              </a>
            </li>
            <li class="contact-list-item">
              <a class="contact-list-item-link contact-list-item-link-juejin" target="_blank" rel="noopener noreferrer" href="https://juejin.im/user/448256473565480">
                <icon :size="40" type="iconjuejin-logo" class="contact-list-item-icon"></icon>
              </a>
            </li>
            <li class="contact-list-item">
              <a class="contact-list-item-link contact-list-item-link-sf" target="_blank" rel="noopener noreferrer" href="https://segmentfault.com/u/mingme">
                <icon :size="40" type="iconsegmentfault" class="contact-list-item-icon"></icon>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section class="section-part section-part-about">
        <section-title title="关于我的"></section-title>
        <div class="z-container">
          <div class="text">
            我叫张全明，你也可以称呼我为明么。<br />一位来自90后的前端程序员。<br />在一个偶然的机会下接触到前端这个职业，沉醉其中，直至...<br />喜欢安安静静的写代码，在代码的世界里奔跑。
          </div>
          <div class="bike"></div>
          <div class="text">如果你也喜欢前端，<br />让我们喝杯白酒，交个朋友吧！</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import SectionTitle from '@/components/page/home/section-title.vue'
import SectionCard from '@/components/page/home/section-card.vue'

import Billboard from '@/components/kit/Billboard/Billboard'
import RotatingText from '@/components/kit/RotatingText/RotatingText'
import Icon from '@/components/base/Icon/Icon'

const banneImg = require('@/assets/images/home/banner.jpg')

export default {
  name: 'Index',
  components: {
    Billboard,
    RotatingText,
    Icon,
    SectionTitle,
    SectionCard
  },
  data() {
    return {
      loading: true,
      banneImg,
      words: [
        {
          label: '坚持',
          color: '#2db7f5'
        },
        {
          label: '坚持',
          color: '#38B9CC'
        },
        {
          label: '坚持',
          color: '#49BC8D'
        },
        {
          label: '坚持',
          color: '#6bc30d'
        }
      ],
      words2: [
        {
          label: 'Insist',
          color: '#2db7f5'
        },
        {
          label: 'Insist',
          color: '#38B9CC'
        },
        {
          label: 'Insist',
          color: '#49BC8D'
        },
        {
          label: 'Insist',
          color: '#6bc30d'
        }
      ]
    }
  },
  methods: {
    handleGoGithub() {
      window.open('https://github.com/zhangquanming/nuxt-blog', '_blank')
    },
    handleGoBlog() {
      this.$router.push('/article')
    }
  },
  head() {
    return {
      title: '明么的博客',
      meta: [
        {
          hid: 'home description',
          name: 'description',
          content: '采用 nuxt 搭建的 ssr 个人博客。前端是 vue，后端是 node koa，数据库是 mongodb。'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  margin-top: -@heightHeader - 20;
}
.page-content {
  position: relative;
  min-height: 500px;
  background-color: @colorBgBody;
}
.page-slogan {
  padding: 0 30px;
  font-size: 40px;
  font-weight: normal;
  margin-bottom: 5px;
  color: #fff;
}
.page-slogan-sub {
  font-family: Roboto;
  font-size: 32px;
  color: #fff;
}
.banner-btn-wrap {
  margin-top: 60px;
}
.banner-btn {
  i {
    font-size: 26px;
    margin-right: 10px;
  }
  i,
  span {
    vertical-align: middle;
    line-height: 1;
  }
  display: inline-block;
  width: 240px;
  height: 50px;
  padding: 10px;
  border: none;
  line-height: 30px;
  font-size: 18px;
  margin: 20px;
  border: none;
  border-radius: 50px;
  color: #fff;
  background-color: transparent;
  cursor: pointer;
  &.bbtn1 {
    background-image: linear-gradient(90deg, rgba(45, 183, 245, 0.75), rgba(107, 195, 13, 0.75));
    &:hover {
      background-image: linear-gradient(90deg, #2db7f5, #6bc30d);
      color: #fff;
    }
  }
  &.bbtn2 {
    padding: 8px 10px;
    border: 2px solid @colorBorder;
    opacity: 0.75;
    &:hover {
      opacity: 1;
      background-color: transparent;
      border-color: @colorPrimary;
      span {
        background-image: @color;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
      }
    }
  }
}
.section-part {
  min-height: 400px;
  padding: 100px 20px;
}
.section-part-module {
  background: #fff;
  .section-module-cont {
    display: flex;
    justify-content: center;
    align-items: center;
    .section-module-img {
      flex: none;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 20px solid @colorTextDisable;
    }
    .section-module-card {
      position: relative;
      overflow: hidden;
      padding-left: 140px;
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: -360px;
        transform: translateY(-50%);
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 2px solid @colorTextSilver;
      }
    }
  }
}
.section-part-about {
  @keyframes changes {
    0% {
      background-position: 0 0;
    }
    20% {
      background-position: -190px 0;
    }
    40% {
      background-position: -380px 0;
    }
    60% {
      background-position: 0 -100px;
    }
    80% {
      background-position: -190px -100px;
    }
    100% {
      background-position: -380px -100px;
    }
  }
  .bike {
    margin: 50px auto;
    width: 190px;
    height: 100px;
    background: url(~assets/images/home/sprite-velo.png);
    animation: changes 0.5s steps(1, start) infinite;
  }
  .text {
    text-align: center;
    font-size: 18px;
    line-height: 32px;
    color: #282828;
  }
}
.section-part-contact {
  position: relative;
  background-image: url(~assets/images/home/bg1.jpg);
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  &::before {
    content: '';
    backdrop-filter: blur(7px);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }
}

.contact-list {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .contact-list-item {
    margin: 0 20px;
    list-style: none;
    text-align: center;
  }
  .contact-list-item-link {
    position: relative;
    display: block;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    border: 1px solid @colorTextDisable;
    color: @colorTextDisable;
  }
  .contact-list-item-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .contact-list-item-link-github {
    &:hover {
      border-color: #fff;
      color: #fff;
    }
  }
  .contact-list-item-link-juejin {
    &:hover {
      border-color: #fff;
      color: #3780f7;
    }
  }
  .contact-list-item-link-sf {
    &:hover {
      border-color: #fff;
      color: #009a61;
    }
  }
}
</style>
