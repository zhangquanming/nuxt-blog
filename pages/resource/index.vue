<template>
  <div class="page">
    <billboard :poster="banneImg" title="WEB前端资源" title-sub="前端学习不用愁，我来给你加加油！" is-page poster-blue="0" height="300px"> </billboard>
    <div class="z-container cont-list">
      <template v-if="resourceList && resourceList.length > 0">
        <div v-for="resource in resourceList" :key="resource._id">
          <title-bar :title="resource.name"></title-bar>
          <div v-if="resource.resource && resource.resource.length > 0" class="z-row" style="margin-bottom: 20px;">
            <div v-for="resourceItem in resource.resource" :key="resourceItem._id" class="resource-item-wrap z-col-xl-12 z-col-lg-15 z-col-md-20 z-col-sm-30 z-col-xs-30">
              <div class="resource-item">
                <a :href="resourceItem.url" class="resource-item-link" target="_blank">
                  <div class="resource-info-title">
                    <div class="resource-item-poster no-img-placeholder-colorful no-img-placeholder-horizon">
                      <img :src="resourceItem.posterUrl" alt="" />
                    </div>
                    <h4 class="resource-header">{{ resourceItem.name }}</h4>
                  </div>
                  <p :title="resourceItem.desc || resourceItem.metaDesc" class="resource-dis">{{ resourceItem.desc || resourceItem.metaDesc }}</p>
                </a>
              </div>
            </div>
          </div>
          <no-data v-else style="height: 220px;" />
        </div>
      </template>

      <template v-else style="height: 300px;">
        <card>
          <no-data />
        </card>
      </template>
    </div>
  </div>
</template>

<script>
import Billboard from '@/components/kit/Billboard/Billboard'
import TitleBar from '@/components/kit/TitleBar/TitleBar'
import Card from '@/components/base/Card/Card'
import NoData from '@/components/kit/NoData/NoData'

const banneImg = require('@/assets/images/home/banner.jpg')

export default {
  name: 'Resource',
  components: {
    Billboard,
    TitleBar,
    Card,
    NoData
  },
  data() {
    return {
      banneImg,
      isLoading: false,
      resourceList: []
    }
  },
  async asyncData({ app }) {
    const res = await app.$myApi.resourceTypes.index()
    return {
      resourceList: res.result
    }
  },
  head() {
    return {
      title: '前端资源-明么的博客'
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  margin-top: -@heightHeader - 20;
  .cont-list {
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    .resource-item-wrap {
      position: relative;
      .resource-item {
        position: relative;
        margin-bottom: 30px;
        &::before {
          content: '';
          background-color: #fff;
          height: 3px;
          margin-left: auto;
          margin-right: auto;
          position: absolute;
          left: 0.25rem;
          right: 0.5rem;
          bottom: -4px;
          border: 1px solid @colorBorder;
          border-top: none;
          box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
          z-index: 2;
        }
        &::after {
          content: '';
          background-color: #fff;
          height: 8px;
          margin-left: auto;
          margin-right: auto;
          position: absolute;
          bottom: -8px;
          left: 0.5rem;
          right: 0.25rem;
          border: 1px solid @colorBorder;
          border-top: none;
          box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
          z-index: 1;
        }
        &:hover .resource-item-link {
          transform: translateY(10px);
          box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
        }
        .resource-item-link {
          position: relative;
          display: block;
          padding: 10px;
          border: 1px solid @colorBorder;
          transform: translate(0);
          transition: transform 0.26s, box-shadow 0.26s;
          z-index: 10;
          background: #fff;
          .resource-info-title {
            display: flex;
            align-items: center;
            .resource-item-poster {
              flex: none;
              width: 38px;
              height: 38px;
              overflow: hidden;
              border-radius: 50%;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .resource-header {
              flex: 1;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-left: 10px;
              font-size: 16px;
              font-weight: normal;
            }
          }
          .resource-dis {
            margin-top: 10px;
            height: 4.5em;
            width: 100%;
            overflow: hidden;
            font-size: 12px;
            line-height: 1.5;
            color: @colorTextSub;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
        }
      }
    }
  }
}
</style>
