<template>
  <div class="app-footer">
    <div class="z-container">
      <div class="footer-cont">
        <div class="footer-left">
          <a href="/" class="footer-logo">
            <img src="../../../assets/images/logo2.png" alt="Mingme" />
          </a>
          <div class="footer-text">坚持，终将收获更好的自己。</div>
          <div class="footer-decs">明么（Mingme），一位来自90后的前端程序员；在一个偶然的机会下接触到前端这个职业，沉醉其中，喜欢安安静静的写代码，在代码的世界里奔跑。</div>
          <div class="footer-copyright">
            <div>转载内容版权归作者及来源网站所有，本站原创内容转载请注明来源。</div>
            <div>
              <span>Copyright © 2020-2025 mingme.net All Rights Reserved.</span>
              <a target="_blank" href="https://beian.miit.gov.cn/">京ICP备 2020042020号.</a>
              <span class="gwab">
                <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802033443">
                  <img src="../../../assets/images/beian_icon.png" width="18" height="18" alt="京公网安备" />
                  <span>京公网安备 11010802033443号</span>
                </a>
              </span>
            </div>
          </div>
        </div>
        <div class="footer-right">
          <div class="contact">
            <div class="title">Contact us</div>
            <div class="list">
              <div class="cat">Email：<span>419654548@qq.com</span></div>
            </div>
          </div>
          <div class="social">
            <div class="title">Follow us</div>
            <div class="list">
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/zhangquanming"><i class="iconfont icongithub"></i></a>
              <a target="_blank" rel="noopener noreferrer" href="https://juejin.im/user/448256473565480"><i class="iconfont iconjuejin-logo"></i></a>
              <a target="_blank" rel="noopener noreferrer" href="https://segmentfault.com/u/mingme"><i class="iconfont iconsegmentfault"></i></a>
            </div>
          </div>
        </div>
      </div>
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
  position: relative;
  width: 100%;
  height: @heightFooter;
  background-color: #06060b;
  color: @colorFooterText;
  font-size: 12px;
  .footer-cont {
    position: relative;
    display: flex;
    padding-top: 45px;
    .footer-left {
      flex: 1;
      .footer-logo {
        display: inline-block;
        height: 38px;
        img {
          width: auto;
          height: 38px;
        }
      }
      .footer-text {
        margin-top: 25px;
        letter-spacing: 1px;
        line-height: 18px;
      }
      .footer-decs {
        letter-spacing: 1px;
        line-height: 18px;
        height: 36px;
      }
      .footer-copyright {
        margin-top: 2px;
        letter-spacing: 1px;
        a {
          &:hover {
            color: @colorTextLight;
          }
        }
        .gwab a {
          img {
            vertical-align: sub;
            width: 18px;
            height: 18px;
          }
        }
      }
    }
    .footer-right {
      margin-left: 100px;
      flex: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        color: @colorTextLight;
        font-size: 16px;
      }
      .list {
        padding-left: 10px;
        margin-top: 10px;
      }
      .contact {
        .list {
          font-size: 13px;
          span {
            &:hover {
              color: @colorTextLight;
            }
          }
        }
      }
      .social {
        margin-top: 20px;
        .list {
          display: flex;
          align-items: center;
          a {
            margin-right: 30px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            color: @colorFooterText;
            transition: all 0.3s;
            width: 36px;
            height: 36px;
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
              border: 1px solid @colorFooterText;
              -webkit-animation: pulse 2s infinite;
              animation: pulse 2s infinite;
            }
            &:hover {
              &:after {
                border-color: @colorTextWhite;
              }
              color: @colorTextWhite;
            }
            i {
              font-size: 24px;
              line-height: 1;
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: @containerMaxWidth-md) and (max-width: @containerMaxWidth-xl) {
  .app-footer {
    .footer-cont {
      .footer-left {
        .footer-text {
          display: none;
        }
        .footer-decs {
          margin-top: 25px;
        }
        .footer-copyright {
          margin-top: 20px;
        }
      }
    }
  }
}
@media only screen and (max-width: @containerMaxWidth-md) {
  .app-footer {
    padding: 0 10px;
    .footer-cont {
      padding-top: 20px;
      .footer-left {
        .footer-logo {
          img {
            height: 36px;
          }
        }
        .footer-text {
          display: none;
        }
        .footer-decs {
          margin-top: 20px;
          height: auto;
        }
        .footer-copyright {
          margin-top: 10px;
        }
      }
      .footer-right {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        .contact {
          display: none;
        }
        .social {
          .title {
            display: none;
          }
          .list {
            margin: 0;
            padding: 0;
            a {
              margin-left: 20px;
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
