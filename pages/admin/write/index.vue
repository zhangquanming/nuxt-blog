<template>
  <div class="admin-write-wrap">
    <div class="z-input-wrap">
      <input v-model="formData.title" class="title-input" type="text" placeholder="输入文章标题..." />
      <btn :loading="isPostBlogLoading" @click="handleShowBlogAttrModal" class="submit-btn" theme="gradient" title="发布文章">发布文章</btn>
    </div>

    <modal v-show="isShowBlogAttrModal" @close="handleHideBlogAttrModal">
      <h3 slot="header">发布文章</h3>
      <div slot="body">
        <div class="uplaod-box">
          <p v-if="!formData.poster" class="upload-tip">推荐封面图比例 21:9 <br />SVG、JPG、GIF、JPEG、PNG格式<br />文件小于2M</p>
          <img v-if="formData.poster" :src="formData.poster" class="uplaod-preview-img" />
          <div class="uplaod-cont">
            <upload
              :format="['png', 'jpeg', 'jpg']"
              :data="uploadParams"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :on-success="handleUploadSuccess"
              action="/api/upload"
              accept="image/*"
            >
              <div class="btn-dark">设置封面</div>
            </upload>
            <div v-if="formData.poster" @click="handleDelPoster" class="btn-dark">删除</div>
          </div>
        </div>
        <z-select v-model="formData.category" :options="categoryList.slice(1)" placeholder="请选择文章分类" label-key="name" value-key="_id"></z-select>
        <z-select v-model="formData.tag" :options="tagList" placeholder="请填写文章标签" multiple label-key="name" value-key="_id"></z-select>
      </div>
      <div slot="footer">
        <btn :loading="isPostBlogLoading" @click="handleSubmit" style="height: 40px" theme="gradient" title="确认发布" long>确认发布</btn>
      </div>
    </modal>

    <md-editor v-model="formData.content"></md-editor>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Modal from '@/components/base/Modal/Modal'
import ZSelect from '@/components/base/ZSelect/ZSelect'
import Btn from '@/components/base/Btn/Btn'
import Upload from '@/components/base/Upload/Upload'
import MdEditor from '@/components/kit/MdEditor/MdEditor'

export default {
  name: 'AdminWrite',
  layout: 'admin',
  components: {
    Modal,
    ZSelect,
    Btn,
    Upload,
    MdEditor
  },
  data() {
    return {
      isPostBlogLoading: false,
      isBlogDetailLoading: false,
      isShowBlogAttrModal: false,
      formData: {
        poster: '',
        status: false
      },
      isTagLoading: false,
      articleId: this.$route.query.articleId,
      uploadParams: { usedFor: 'poster' }
    }
  },
  computed: {
    ...mapGetters(['categoryList', 'userInfo', 'tagList', 'cacheArticleData'])
  },
  mounted() {
    if (!this.tagList || !this.tagList.length) {
      this.$store.dispatch('getTagList')
    }
    if (!this.categoryList || !this.categoryList.length) {
      this.$store.dispatch('getCategoryList')
    }
    if (this.articleId) {
      this.requestBlogDetail()
    }

    if (this.cacheArticleData) {
      this.formData = Object.assign({}, this.cacheArticleData, this.formData)
    }
  },
  beforeDestroy() {
    const cacheData = {
      ...this.formData
      // author: this.userInfo && this.userInfo._id ? this.userInfo._id : '',
    }

    this.$store.dispatch('cacheArticleData', { ...cacheData })
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal'
    }),

    /**
     * @desc 请求 博客详情 编辑
     */
    requestBlogDetail() {
      const params = {
        id: this.articleId
      }
      this.isBlogDetailLoading = true
      this.$myApi.blogs
        .show(params)
        .then((res) => {
          this.isBlogDetailLoading = false
          this.handleRecoveryBlogDetail(res.result)
        })
        .catch(() => {
          this.isBlogDetailLoading = false
        })
    },

    /**
     * @desc 编辑的时候 博客详情回显
     */
    handleRecoveryBlogDetail(data) {
      const { title, category, tag, poster, content, status } = data
      this.formData = {
        title,
        category: [category],
        tag,
        poster,
        content,
        status
      }
    },

    /**
     * @desc 上传 格式出错
     */
    handleFormatError(file) {
      this.$toast.error(`文件 ${file.name} 格式不对, 请选择 jpg or png.`, { icon: 'iconfont toasted-icon iconerror', duration: 4000 })
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
      this.formData.poster = res.result.path
    },

    /**
     * @desc 检查表单填写是否合格
     */
    checkIsReadyPost() {
      const { title, category, tag, content } = this.formData
      if (!this.userInfo) {
        this.$toast.info('请登录', { icon: 'iconfont toasted-icon iconinfo' })
        this.toggleSignInModal(true)
      } else if (!title) {
        this.$toast.error('请填写文章标题', { icon: 'iconfont toasted-icon iconerror' })
      } else if (!category) {
        this.$toast.error('请选择文章分类', { icon: 'iconfont toasted-icon iconerror' })
      } else if (!tag) {
        this.$toast.error('请选择文章标签', { icon: 'iconfont toasted-icon iconerror' })
      }
      // else if (!poster) {
      //   this.$toast.error('请选择文章海报', { icon: 'iconfont toasted-icon iconerror' });
      // }
      else if (!content) {
        this.$toast.error('请填写文章内容', { icon: 'iconfont toasted-icon iconerror' })
      } else {
        return true
      }
      return false
    },

    /**
     * @desc 提交
     */
    handleSubmit() {
      if (!this.checkIsReadyPost()) {
        return
      }
      if (this.articleId) {
        this.requestEditArticle()
      } else {
        this.requestArticle()
      }
    },

    /**
     * @desc 删除封面图
     */
    handleDelPoster() {
      this.formData.poster = ''
    },

    /**
     * @desc 显示文章发布属性弹框
     */
    handleShowBlogAttrModal() {
      const { title, content } = this.formData
      if (!this.userInfo) {
        this.$toast.info('请登录', { icon: 'iconfont toasted-icon iconinfo' })
        this.toggleSignInModal(true)
      } else if (!title) {
        this.$toast.error('请填写文章标题', { icon: 'iconfont toasted-icon iconerror' })
      } else if (!content) {
        this.$toast.error('请填写文章内容', { icon: 'iconfont toasted-icon iconerror' })
      } else {
        this.isShowBlogAttrModal = true
      }
    },

    /**
     * @desc 隐藏文章发布属性弹框
     */
    handleHideBlogAttrModal(action) {
      if (action === 'mask') {
        return
      }
      this.isShowBlogAttrModal = false
    },

    /**
     * @desc 请求 发布文章
     */
    requestArticle() {
      const params = {
        ...this.formData,
        author: this.userInfo._id,
        status: false
      }
      this.isPostBlogLoading = true
      this.$myApi.blogs
        .create(params)
        .then((res) => {
          this.isPostBlogLoading = false
          this.$toast.success('发布成功，将在审核后公开展示...', { icon: 'iconfont toasted-icon iconsuccess' })
          this.$router.push({ path: `/article/detail/${res.result._id}` })
        })
        .catch(() => {
          this.isPostBlogLoading = false
        })
    },

    /**
     * @desc 请求 修改文章
     */
    requestEditArticle() {
      const params = {
        ...this.formData,
        id: this.articleId,
        blogId: this.articleId,
        author: this.userInfo._id,
        status: false
      }
      this.isPostBlogLoading = true
      this.$myApi.blogs
        .update(params)
        .then((res) => {
          this.isPostBlogLoading = false
          this.$toast.success('修改成功，将在审核后公开展示...', { icon: 'iconfont toasted-icon iconsuccess' })
          this.$router.push({ path: `/article/detail/${res.result._id}` })
        })
        .catch(() => {
          this.isPostBlogLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.admin-write-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .poster {
    width: 100%;
  }

  .z-input-wrap {
    display: flex;
    align-items: center;
    padding: 0 10px;
    border: 1px solid @colorBorder;
    background-color: #fff;
    .title-input {
      outline: none;
      padding: 0 10px;
      line-height: 50px;
      height: 50px;
      font-size: 18px;
      border: none;
      width: 100%;
    }
    .submit-btn {
      height: 40px;
    }
  }
  .uplaod-box {
    position: relative;
    width: 100%;
    padding-top: 50%;
    border: 1px solid @colorBorderLight;
    background-color: #efefee;
    border-radius: 2px;
    overflow: hidden;
    .uplaod-preview-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .upload-tip {
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px;
      font-size: 12px;
      color: @colorTextSub;
    }
    .uplaod-cont {
      position: absolute;
      right: 6px;
      bottom: 6px;
      display: flex;
      .btn-dark {
        margin-left: 4px;
        padding: 4px 10px;
        cursor: pointer;
        font-size: 13px;
        color: #fff;
        border-radius: 4px;
        background-color: #343a40;
        border-color: #343a40;
      }
    }
  }
}
</style>
