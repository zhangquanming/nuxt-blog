<template>
  <card :padding="20" style="height: 100%;">
    <user-page-title title="修改头像" title-sub="提示：有一个好的头像会有意想不到的收获哦。"></user-page-title>

    <div class="z-row">
      <div class="z-col-sm-30 z-col-md-26 z-col-lg-22 z-col-xl-18">
        <div class="avatar-preview">
          <p class="avatar-preview-title">--- 头像预览 ---</p>

          <div :style="{ 'background-image': 'url(' + previewImg + ')' }" class="avatar-preview-img avatar-preview-img-large"></div>
          <p class="avatar-preview-tip">大尺寸头像：100x100像素</p>

          <div :style="{ 'background-image': 'url(' + previewImg + ')' }" class="avatar-preview-img avatar-preview-img-middle"></div>
          <p class="avatar-preview-tip">中尺寸头像：50x50像素</p>

          <div :style="{ 'background-image': 'url(' + previewImg + ')' }" class="avatar-preview-img avatar-preview-img-small"></div>
          <p class="avatar-preview-tip">小尺寸头像：30x30像素</p>
        </div>
      </div>

      <div class="z-col-sm-30 z-col-md-34 z-col-lg-38 z-col-xl-32">
        <upload
          :format="['png', 'jpeg', 'jpg', 'gif']"
          :data="uploadParams"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :on-success="handleUploadSuccess"
          action="/api/upload"
          class="upload-input"
          accept="image/*"
        >
          <btn long>上传头像</btn>
        </upload>
        <p class="upload-tip">仅支持JPG、GIF、JPEG、PNG格式、文件小于2M</p>

        <btn :theme="formData.avatar ? 'gradient' : 'default'" @click="handleConfirm" style="margin-top: 30px;">确定</btn>
      </div>
    </div>
  </card>
</template>

<script>
import { mapGetters } from 'vuex'

import Card from '@/components/base/Card/Card'
import UserPageTitle from '@/components/page/user/UserPageTitle.vue'
import Btn from '@/components/base/Btn/Btn'
import Upload from '@/components/base/Upload/Upload'

export default {
  name: 'UserProfile',
  layout: 'user',
  components: {
    Card,
    Btn,
    Upload,
    UserPageTitle
  },
  data() {
    return {
      uploadParams: { usedFor: 'avatar' },
      formData: {
        avatar: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    previewImg() {
      if (this.formData.avatar) {
        return this.formData.avatar
      }
      if (this.userInfo && this.userInfo.avatar) {
        return this.userInfo.avatar
      }
      return ''
    }
  },
  methods: {
    /**
     * @desc 上传 格式出错
     */
    handleFormatError(file) {
      this.$toast.error(`文件 ${file.name} 格式不对, 请选择 JPG、GIF、JPEG or PNG.`, { icon: 'iconfont toasted-icon iconerror', duration: 4000 })
    },

    /**
     * @desc 上传 大小限制
     */
    handleMaxSize(file) {
      this.$toast.error(`文件 ${file.name} 太大, 不可超过2M`, { icon: 'iconfont toasted-icon iconerror' })
    },

    /**
     * @desc 上传 成功
     */
    handleUploadSuccess(res) {
      this.formData.avatar = res.result.path
    },

    /**
     * @desc 确认 保存头像
     */
    handleConfirm() {
      if (!this.formData.avatar) {
        this.$toast.info('请先上传图片', { icon: 'iconfont toasted-icon iconinfo' })
        return
      }
      const params = {
        ...this.formData,
        id: this.userInfo._id,
        userId: this.userInfo._id
      }
      this.isEditLoading = true
      this.$myApi.users
        .update(params)
        .then((res) => {
          this.isEditLoading = false
          this.$toast.success('修改成功！', { icon: 'iconfont toasted-icon iconsuccess' })
          this.$store.dispatch('changeUserInfo', res.result)
          // this.$store.dispatch('changeToken', res.result.token)
        })
        .catch(() => {
          this.isEditLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-preview {
  background-color: @colorBg;
  padding: 20px;
  text-align: center;
  color: @colorTextContent;
  border-radius: 3px;
  .avatar-preview-title {
    margin: 10px 0 20px 0;
  }
  .avatar-preview-tip {
    margin: 10px 0 20px 0;
  }
  .avatar-preview-img {
    position: relative;
    border-radius: 100%;
    box-sizing: border-box;
    margin: auto;
    display: block;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    &::before {
      content: ' ';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 100%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
  .avatar-preview-img-large {
    width: 100px;
    height: 100px;
  }
  .avatar-preview-img-middle {
    width: 50px;
    height: 50px;
  }
  .avatar-preview-img-small {
    width: 30px;
    height: 30px;
  }
}
.upload-input {
  width: 180px;
}
.upload-tip {
  font-size: 12px;
  color: @colorTextSub;
}
</style>
