<template>
  <div class="list-wrap">
    <title-bar :title="title">
      <template slot="titleRight">
        <slot></slot>
      </template>
    </title-bar>
    <template v-if="list && list.length > 0">
      <ul class="list z-row">
        <li v-for="item in list" :key="item.id" class="list-item z-col-xs-30 z-col-sm-20 z-col-md-15 z-col-lg-12">
          <card padding="0" hover>
            <router-link :to="{ path: `/movie/detail/${item.id}` }" class="list-item-poster-wrap" target="_blank">
              <z-image :src="item.images.large" class="list-item-poster" />
            </router-link>
            <div class="list-item-info">
              <h3 :title="item.title" class="list-item-info-title">
                {{ item.title }}
                <span class="list-item-info-average">{{ item.rating.average }}</span>
              </h3>
              <div class="list-item-info-genres">
                {{ item.genres.join(' / ') }}
                <span class="list-item-info-date">{{ item.year }}</span>
              </div>
            </div>
          </card>
        </li>
      </ul>
    </template>

    <card-no-data v-else padding="40px 0"></card-no-data>
  </div>
</template>

<script>
import Card from '@/components/base/Card/Card'
import ZImage from '@/components/base/ZImage/ZImage'
import TitleBar from '@/components/kit/TitleBar/TitleBar'
import CardNoData from '@/components/kit/CardNoData/CardNoData'

export default {
  name: 'MovieHomeListItem',
  components: {
    Card,
    ZImage,
    TitleBar,
    CardNoData
  },
  props: {
    title: String,
    list: {
      type: Array,
      default() {
        return {}
      }
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.list {
  &-wrap {
    margin-bottom: 8px;
  }
  &-item {
    list-style: none;
    // margin-bottom: @columns-padding * 2;
    &-poster-wrap {
      position: relative;
      display: block;
      // height: 315px;
      padding-top: 140%;
      width: 100%;
      overflow: hidden;
    }
    &-poster {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: auto;
    }

    &-info {
      position: relative;
      padding: 6px 8px;
      &-title {
        position: relative;
        padding-right: 25px;
        color: @colorTextTitle;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &-genres {
        position: relative;
        padding-right: 28px;

        margin-top: 4px;
        color: @colorTextContent;
        font-size: 12px;
      }
      &-average,
      &-date {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
      }
      &-average {
        font-size: 16px;
        font-weight: normal;
        color: @colorError;
      }
      s &-date {
        font-weight: normal;
      }
    }
  }
}
</style>
