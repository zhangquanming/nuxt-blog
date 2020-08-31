<template>
  <div :class="['section-title', `section-title-${theme}`]">
    <div>
      <span class="section-title-arrow"></span>
    </div>
    <div class="section-title-title">
      <h2>{{ title }}</h2>
      <h4>{{ titleSub }}</h4>
    </div>
    <p class="section-title-desc">{{ desc }}</p>
  </div>
</template>

<style lang="less" scoped>
.section-title {
  position: relative;
  margin-bottom: 30px;
  text-align: center;
  &-arrow {
    // position: absolute;
    display: inline-block;
    position: relative;
    width: 50px;
    height: 25px;
    // border: 1px solid red;
    text-align: left;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      height: 200%;
      width: 100%;
      border: 6px solid @colorWarning;
      box-sizing: border-box;
      margin-top: -12px;
      transform: translate(0, -50%) rotate(45deg);
    }
  }
  &-title {
    position: relative;
    text-align: center;
    padding: 15px 0;
    margin-top: 10px;
    &::after,
    &::before {
      content: '';
      position: absolute;
      width: 150px;
      height: 0;
      left: 50%;
      margin-left: -75px;
    }
    &::before {
      border-top: 4px solid #222;
      top: 0;
    }
    &::after {
      border-bottom: 4px solid #222;
      bottom: 0;
    }
    h2 {
      font-size: 28px;
      color: #222;
      line-height: 1;
    }
    h4 {
      font-size: 18px;
      color: @colorTextSub;
      line-height: 1;
      font-weight: bold;
      margin-top: 4px;
    }
  }
  &-desc {
    max-width: 150px;
    margin: 10px auto 0;
    line-height: 1.2;
    color: @colorTextSub;
  }

  &-light {
    .section-title-title {
      &::before {
        border-top: 4px solid #fff;
      }
      &::after {
        border-bottom: 4px solid #fff;
      }
      h2 {
        color: #fff;
      }
      h4 {
        color: #fff;
      }
    }
    .section-title-desc {
      color: @colorTextSilver;
    }
  }
}
</style>

<script>
export default {
  name: 'SectionTitle',
  props: {
    title: String,
    titleSub: String,
    desc: String,
    theme: {
      type: String,
      default: 'dark'
    }
  }
}
</script>
