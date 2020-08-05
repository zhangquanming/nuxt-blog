<template>
  <div class="topic-content">
    <div class="topic-head">
      <div class="topic-head-title">
        <router-link :to="{ path: `/article/detail/${topic._id}` }" class="head-title" tag="h1">{{ topic.title }}</router-link>
        <div class="topic-article-info">
          <div class="info-author">
            <Icon type="iconuser" title="作者"></Icon>
            <router-link :to="{ path: `/article/search/?author=${topic.authorObj._id}` }" v-if="topic.authorObj" class="topic-info-link">
              {{ topic.authorObj.userName }}
            </router-link>
          </div>
          <div class="info-category">
            <Icon type="iconcategory" title="分类"></Icon>
            <router-link :to="{ path: `/${parentPath}/${topic.categoryObj.value}` }" class="topic-info-link">
              {{ topic.categoryObj.name }}
            </router-link>
          </div>
          <div class="info-tag">
            <Icon type="icontag" title="标签"></Icon>
            <router-link v-for="(item, index) in topic.tagArray" :key="index" :to="{ path: `/article/search/?tag=${item._id}` }" class="topic-info-link">
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="topic-head-time">
        <div class="time-day">{{ topic.createdAt | dateFormatFilter('DD') }}</div>
        <div class="time-month-year">
          <div class="time-month">{{ topic.createdAt | dateFormatFilter('MM') }}月</div>
          <div class="time-year">{{ topic.createdAt | dateFormatFilter('YYYY') }}</div>
        </div>
      </div>
    </div>
    <div class="topic-body clearfix">
      <div class="topic-img-wrap">
        <router-link :to="{ path: `/article/detail/${topic._id}` }" class="topic-img-link no-img-placeholder-colorful no-img-placeholder-horizon">
          <img :src="topic.poster" class="topic-img" alt="" />
        </router-link>
      </div>
      <md-preview :content="firstParagraph" :padding="0" />
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon/Icon'
import MdPreview from '@/components/kit/MdPreview/MdPreview'
export default {
  name: 'TopicItem',
  components: {
    Icon,
    MdPreview
  },
  props: {
    topic: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  computed: {
    parentPath() {
      return this.$route.path.split('/')[1]
    },
    firstParagraphIndex() {
      return this.topic.content.search(/\n/)
    },
    firstParagraph() {
      return this.topic.content.substring(0, this.firstParagraphIndex)
    }
  }
}
</script>

<style lang="less" scoped>
.topic-content {
  .topic-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    margin-right: -15px;
    margin-left: -15px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid @colorBorderLight;

    .topic-head-title {
      .head-title {
        font-size: 24px;
        font-weight: 400;
        line-height: 1.1;
        color: @colorTextTitle;
        margin-bottom: 5px;
        cursor: pointer;
      }

      .topic-article-info {
        display: flex;
        color: @colorTextSub;
        font-size: 14px;
        .info-author,
        .info-category,
        .info-tag {
          display: flex;
          align-items: center;
          margin-right: 20px;
          * {
            white-space: nowrap;
          }
          i {
            margin-right: 2px;
          }
        }
      }
      .topic-info-link {
        vertical-align: middle;
        &:hover {
          color: @colorPrimary;
        }
      }
      .topic-info-link + .topic-info-link {
        margin-left: 3px;
        padding-left: 4px;
        border-left: 1px solid @colorBorder;
      }
    }

    .topic-head-time {
      position: relative;
      display: flex;

      .time-day {
        font-size: 40px;
        color: @colorSuccess;
        line-height: 1;
        margin-right: 3px;
      }
      .time-month-year {
        display: flex;
        flex-direction: column;
      }
      .time-month {
        font-size: 15px;
        text-transform: uppercase;
        word-break: keep-all;
      }
      .time-year {
        line-height: 1.1;
        font-size: 14px;
      }
    }
  }

  .topic-body {
    .topic-img-wrap {
      float: left;
      width: 300px;
      margin-right: 15px;
      // margin-bottom: 5px;
      overflow: hidden;
      background-color: @colorBg;
    }

    .topic-img-link {
      display: block;
      position: relative;
      padding-top: 60%;
    }

    .topic-img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }

    .topic-text {
      font-size: 15px;
      line-height: 27px;
      text-align: justify;
      color: @colorTextContent;
    }

    @media screen and (max-width: @breakpoints-sm) {
      .topic-img-wrap {
        width: 100%;
        height: auto;
        float: none;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
