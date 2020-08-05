<template>
  <div class="app-footer">
    <div class="app-footer-cont">
      <div class="social">
        <a target="_blank" href="#"><i class="iconfont icongithub"></i></a>
        <a target="_blank" href="#"><i class="iconfont iconjuejin-logo"></i></a>
        <a target="_blank" href="#"><i class="iconfont iconsegmentfault"></i></a>
      </div>

      <div class="contact">
        <span class="cat"> <i class="iconfont iconwangzhi"></i> <a target="_blank" href="#">hello {at} mingme.com</a></span>
        <span class="cat"> <i class="iconfont icontel"></i> 166 1975 2836</span>
        <span class="cat"> <i class="iconfont iconyouxiang"></i> <a target="_blank" href="#">419654548@qq.com</a></span>
      </div>

      <div class="copyright">© zhang quan ming</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="less" scoped>
@keyframes pulse {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.1);
    opacity: 0;
  }
}
.app-footer {
  width: 100%;
  height: @heightFooter;
  background-color: #ffd000;
  color: @colorTextTitle;
  .app-footer-cont {
    margin: 0 auto;
    text-align: center;
    .social {
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        color: @colorTextWhite;
        transition: all 0.3s;
        width: 40px;
        height: 40px;
        margin: 0 30px;
        border-radius: 50%;
        &:after {
          z-index: 1;
          content: '';
          position: absolute;
          top: 0px;
          bottom: 0px;
          left: 0px;
          right: 0px;
          border-radius: 100%;
          background: transparent;
          border: 1px solid @colorTextWhite;
          -webkit-animation: pulse 2s infinite;
          animation: pulse 2s infinite;
        }
        &:hover {
          &:after {
            border-color: @colorTextTitle;
          }
          color: @colorTextTitle;
        }
        i {
          font-size: 30px;
          line-height: 1;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .contact {
      .cat {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        i {
          display: inline-block;
          font-size: 18px;
          margin-right: 10px;
        }
      }
    }
    .copyright {
      text-align: center;
      letter-spacing: 1px;
      font-size: 12px;
      font-weight: 400;
    }
  }
}
@media only screen and (min-width: @breakpoints-lg) {
  .app-footer {
    padding: 50px 0;
    .app-footer-cont {
      width: 960px;
      .social {
        margin-bottom: 30px;
      }
      .contact {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 100px;
        margin-bottom: 30px;
      }
    }
  }
}
@media only screen and (min-width: @containerMaxWidth-md) and (max-width: @breakpoints-lg) {
  .app-footer {
    padding: 50px 0;
    .app-footer-cont {
      width: 100%;
      .social {
        margin-bottom: 30px;
      }
      .contact {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 100px;
        margin-bottom: 30px;
      }
    }
  }
}
@media only screen and (max-width: @containerMaxWidth-md) {
  .app-footer {
    padding-top: 30px;
    .app-footer-cont {
      width: 100%;
      .social {
        margin-bottom: 20px;
      }
      .contact {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 20px;
        overflow: hidden;
        width: 100%;
      }
    }
  }
}
</style>
