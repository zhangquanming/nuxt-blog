<template>
  <div class="admin-write-wrap">
    <div>
      <input v-model="formData.title" class="title z-input" type="text" placeholder="标题: 月光下的奔跑" />
      <div class="z-row">
        <div class="z-col-xl-15 z-col-lg-30">
          <z-select v-model="formData.category" :options="categoryList.slice(1)" placeholder="请选择文章分类" label-key="name" value-key="_id"></z-select>
        </div>
        <div class="z-col-xl-15 z-col-lg-30">
          <z-select v-model="formData.tag" :options="tagList" placeholder="请填写文章标签" multiple label-key="name" value-key="_id"></z-select>
        </div>
        <div class="z-col-xl-30">
          <div class="z-row">
            <div class="z-col-45">
              <input v-model="formData.poster" class="poster z-input" type="text" placeholder="粘贴图片URL" />
            </div>
            <div class="z-col-15">
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
                <btn style="margin:5px 0;height: 38px;" long>选择文件</btn>
              </upload>
            </div>
          </div>
        </div>
      </div>
    </div>

    <md-editor v-model="formData.content">
      <div>
        <span>是否上架：</span>
        <z-switch v-model="formData.status" title="是否公开" style="margin-right: 20px;" />
        <btn :loading="isPostBlogLoading" @click="handleSubmit" theme="gradient" title="预览模式">确认发布</btn>
      </div>
    </md-editor>
  </div>
</template>

<script>
import ZSelect from '@/components/base/ZSelect/ZSelect'
import Btn from '@/components/base/Btn/Btn'
import Upload from '@/components/base/Upload/Upload'
import MdEditor from '@/components/kit/MdEditor/MdEditor'
import ZSwitch from '@/components/base/ZSwitch/ZSwitch'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdminWrite',
  layout: 'admin',
  components: {
    ZSelect,
    Btn,
    Upload,
    MdEditor,
    ZSwitch
  },
  data() {
    return {
      isPostBlogLoading: false,
      isBlogDetailLoading: false,
      formData: {
        poster: '',
        status: true
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
      this.formData = Object.assign({}, this.formData, this.cacheArticleData)
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
      this.$toast.error(`文件 ${file.name} 格式不对, 请选择 jpg or png.`, { duration: 4000 })
    },

    /**
     * @desc 上传 大小限制
     */
    handleMaxSize(file) {
      this.$toast.error(`文件 ${file.name} 太大, 不可超过2M`)
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
        this.$toast.info('请登录')
        this.toggleSignInModal(true)
      } else if (!title) {
        this.$toast.error('请填写文章标题')
      } else if (!category) {
        this.$toast.error('请选择文章分类')
      } else if (!tag) {
        this.$toast.error('请选择文章标签')
      }
      // else if (!poster) {
      //   this.$toast.error('请选择文章海报');
      // }
      else if (!content) {
        this.$toast.error('请填写文章内容')
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
     * @desc 请求 发布文章
     */
    requestArticle() {
      const params = {
        ...this.formData,
        author: this.userInfo._id
      }
      this.isPostBlogLoading = true
      this.$myApi.blogs
        .create(params)
        .then((res) => {
          this.isPostBlogLoading = false
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
        author: this.userInfo._id
      }
      this.isPostBlogLoading = true
      this.$myApi.blogs
        .update(params)
        .then((res) => {
          this.isPostBlogLoading = false
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

  .title {
    width: 100%;
    font-size: 18px;
  }
  .poster {
    width: 100%;
  }

  .z-input {
    outline: none;
    margin: 5px 0;
    padding: 0 10px;
    line-height: 40px;
    height: 40px;
    font-size: 14px;
    border: 1px solid @colorBorderLight;
    border-radius: 5px;
    background-color: #fff;
  }

  .z-input:focus {
    border-color: @colorInfo;
  }
}
</style>
