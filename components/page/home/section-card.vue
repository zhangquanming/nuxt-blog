<template>
  <div :class="['section-card', `section-card-${theme}`]">
    <div class="section-card-head">
      <icon :type="icon" :size="iconSize" :color="iconColor"></icon>
      <div class="section-card-triangle-wrap"></div>
    </div>
    <p class="section-card-title">{{ title }}</p>
    <div class="section-card-content">
      <slot></slot>
      <div class="section-card-btn">
        <Btn :theme="theme" :to="{ path: path }" shape="circle" icon="arrow-right" icon-on-right>点击进入</Btn>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/Icon/Icon'
import Btn from '@/components/base/Btn/Btn'

import { oneOf } from '@/assets/js/tools.js'

export default {
  name: 'SectionCard',
  components: {
    Icon,
    Btn
  },
  props: {
    title: String,
    icon: String,
    iconSize: {
      type: [Number, String],
      default: 36
    },
    iconColor: {
      type: String,
      default: '#fff'
    },
    theme: {
      type: String,
      validator(value) {
        return oneOf(value, ['primary', 'info', 'success', 'warning', 'error'])
      },
      default: 'primary'
    },
    path: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style lang="less" scoped>
.section-card {
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 16px;
  box-shadow: 0 3px 5px -2px rgba(0, 0, 0, 0.1);
  // transition: box-shadow ease 0.3s;
  // &:hover {
  //   box-shadow: 0 0.46875rem 2.1875rem rgba(90, 97, 105, 0.1), 0 0.9375rem 1.40625rem rgba(90, 97, 105, 0.1), 0 0.25rem 0.53125rem rgba(90, 97, 105, 0.12), 0 0.125rem 0.1875rem rgba(90, 97, 105, 0.1);
  // }
  &-head {
    position: relative;
    padding: 20px 0 10%;
    text-align: center;
    border-radius: 10px;

    .section-card-triangle-wrap {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      padding-top: 10%;
      padding-left: 50%;
      text-align: left;
      overflow: hidden;
      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        width: 0;
        height: 0;
        border-top: 200px solid transparent;
        border-right: 1000px solid #fff;
        border-bottom: 0px solid transparent;
        border-left: 1000px solid #fff;
        margin-left: -1000px;
      }
    }
  }
  &-title {
    font-size: 22px;
    margin-top: 10px;
    text-align: center;
  }
  &-content {
    position: relative;
    padding: 5px 10px 10px;
    font-size: 14px;
    color: @colorTextSub;
    min-height: 150px;
  }
  &-btn {
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
    text-align: center;
  }
  &-primary {
    .section-card-head {
      background-image: linear-gradient(to bottom, darken(@colorPrimary, 5%), lighten(@colorPrimary, 20%));
    }
    .section-card-title {
      color: @colorPrimary;
    }
  }
  &-info {
    .section-card-head {
      background-image: linear-gradient(to bottom, darken(@colorInfo, 5%), lighten(@colorInfo, 20%));
    }
    .section-card-title {
      color: @colorInfo;
    }
  }
  &-success {
    .section-card-head {
      background-image: linear-gradient(to bottom, darken(@colorSuccess, 5%), lighten(@colorSuccess, 20%));
    }
    .section-card-title {
      color: @colorSuccess;
    }
  }
  &-warning {
    .section-card-head {
      background-image: linear-gradient(to bottom, darken(@colorWarning, 5%), lighten(@colorWarning, 20%));
    }
    .section-card-title {
      color: @colorWarning;
    }
  }
  &-error {
    .section-card-head {
      background-image: linear-gradient(to bottom, darken(@colorError, 5%), lighten(@colorError, 20%));
    }
    .section-card-title {
      color: @colorError;
    }
  }
}
</style>
