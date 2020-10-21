<template>
  <div>
    <z-panel title="文章资源管理">
      <template v-slot:headerRight>
        <btn @click="handleAddResource" theme="primary">新增资源</btn>
      </template>
      <z-table :columns="columns" :data="tableData" :loading="isLoading" />
      <pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
    </z-panel>

    <modal v-show="isShowResourceModal" @close="handleHideResourceModal">
      <h3 slot="header">{{ editMode === 'edit' ? '修改资源' : '添加资源' }}</h3>
      <div slot="body">
        <div class="uplaod-box">
          <div class="uplaod-preview-img">
            <img v-if="formData.poster" :src="formData.poster" />
          </div>
          <div class="uplaod-cont">
            <p class="upload-tip">SVG、JPG、GIF、JPEG、PNG格式，文件小于2M</p>
            <upload
              :format="['png', 'jpeg', 'jpg', 'gif', 'svg']"
              :data="uploadParams"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :on-success="handleUploadSuccess"
              :action="uploadUrl"
              class="upload-input"
              accept="image/*"
            >
              <btn long>上传海报</btn>
            </upload>
          </div>
        </div>
        <z-select v-model="formData.resourceTypeId" :options="resourceTypeList" placeholder="请选择文章分类" label-key="name" value-key="_id"></z-select>
        <input v-model="formData.name" class="common-input" type="text" placeholder="资源名称" />
        <input v-model="formData.url" class="common-input" type="text" placeholder="资源地址" />
        <textarea v-model="formData.desc" class="common-textarea" placeholder="资源描述" cols="30" rows="3"></textarea>
      </div>
      <div slot="footer">
        <btn :loading="isAddLoading || isEditLoading" @click="handleSubmitResource" theme="primary" long>{{ editMode === 'edit' ? '确认修改' : '确认添加' }}</btn>
      </div>
    </modal>

    <modal v-show="isShowDeleteModal" @close="handleHideDeleteModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.name }} 的资源吗?</p>
      </div>
      <div slot="footer">
        <btn @click="requestDeleteResource" theme="error" long>确认删除</btn>
      </div>
    </modal>

    <modal v-show="isShowPreviewModal" @close="handleHidePreviewModal" width="50%">
      <div slot="body">
        <div style="max-height:550px;overflow: auto;">
          <img :src="previewImgUrl" alt="" style="width:100%;" />
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import ZPanel from '@/components/base/ZPanel/ZPanel'
import ZTable from '@/components/base/Table/Table'
import Btn from '@/components/base/Btn/Btn'
import Pagenation from '@/components/base/Pagenation/Pagenation'
import Modal from '@/components/base/Modal/Modal'
import ZSelect from '@/components/base/ZSelect/ZSelect'
import Upload from '@/components/base/Upload/Upload'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdminResource',
  layout: 'admin',
  components: {
    ZPanel,
    ZTable,
    Pagenation,
    Modal,
    Btn,
    ZSelect,
    Upload
  },
  data() {
    return {
      page: 1,
      limit: 10,
      pageTotal: 0,
      tableData: [],
      isResourceTypeLoading: false,
      resourceTypeList: [],
      isLoading: false,
      isAddLoading: false,
      isEditLoading: false,
      isDeleteLoading: false,
      isShowPreviewModal: false,
      previewImgUrl: '',
      currentRow: {},
      isShowDeleteModal: false,
      isShowResourceModal: false,
      editMode: 'add',
      formData: {},
      uploadParams: { usedFor: 'poster' },
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60
        },
        {
          title: '海报',
          key: 'posterUrl',
          width: '80px',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.posterUrl
              },
              style: {
                width: '40px',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.handlePreviewImg(params.row.posterUrl)
                }
              }
            })
          }
        },
        {
          title: '名称',
          key: 'name',
          minWidth: '100px',
          align: 'left'
        },
        {
          title: '资源分类',
          minWidth: '100px',
          align: 'left',
          render: (h, params) => {
            return h('span', params.row.resourceTypeObj.name)
          }
        },
        {
          title: '地址',
          key: 'url',
          align: 'left',
          minWidth: '200px'
        },
        {
          title: '简介',
          key: 'desc',
          minWidth: '100px',
          maxWidth: '400px;',
          align: 'left',
          width: '300px',
          render: (h, params) => {
            return h('span', params.row.desc || params.row.metaDesc)
          }
        },
        {
          title: '时间',
          minWidth: '140px',
          render: (h, params) => {
            const createdAtFormat = this.$options.filters.dateFormatFilter(params.row.createdAt, 'YYYY-MM-DD HH:mm')
            const updatedAtFormat = this.$options.filters.dateFormatFilter(params.row.updatedAt, 'YYYY-MM-DD HH:mm')
            return h('div', [h('div', createdAtFormat), h('div', updatedAtFormat)])
          }
        },
        {
          title: '操作',
          minWidth: '120px',
          render: (h, params) => {
            return h('div', [
              h(
                Btn,
                {
                  props: {
                    theme: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleRowEdit(params.row)
                    }
                  }
                },
                '编辑'
              ),
              h(
                Btn,
                {
                  props: {
                    theme: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleRowDel(params.row)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    uploadUrl() {
      return process.env.NODE_ENV === 'development' ? '/api/api/upload' : '/api/upload'
    }
  },
  mounted() {
    this.requestResourceTypeList()
    this.requestResourceList()
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal'
    }),

    /**
     * @desc 请求 获取文章资源类别列表
     */
    requestResourceTypeList() {
      this.isResourceTypeLoading = true
      this.$myApi.resourceTypes
        .index()
        .then((res) => {
          this.resourceTypeList = res.result
          this.isResourceTypeLoading = false
        })
        .catch(() => {
          this.isResourceTypeLoading = false
        })
    },

    /**
     * @desc 请求 获取文章资源列表
     */
    requestResourceList() {
      this.isLoading = true
      const params = {
        page: this.page,
        limit: this.limit
      }
      this.$myApi.resources
        .index(params)
        .then((res) => {
          this.tableData = res.result.docs
          this.pageTotal = res.result.pages
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },

    /**
     * @desc 请求 新增文章资源列表
     */
    requestAddResource() {
      const params = {
        ...this.formData
      }
      this.isAddLoading = true
      this.$myApi.resources
        .create(params)
        .then(() => {
          this.isAddLoading = false
          this.$toast.success('添加成功！')
          this.handleHideResourceModal()
          this.requestResourceList()
        })
        .catch(() => {
          this.isAddLoading = false
        })
    },

    /**
     * @desc 请求 修改文章资源列表
     */
    requestEditResource() {
      const params = {
        ...this.formData,
        id: this.currentRow._id,
        resourceId: this.currentRow._id
      }
      this.isEditLoading = true
      this.$myApi.resources
        .update(params)
        .then(() => {
          this.isEditLoading = false
          this.$toast.success('修改成功！')
          this.handleHideResourceModal()
          this.requestResourceList()
        })
        .catch(() => {
          this.isEditLoading = false
        })
    },

    /**
     * @desc 请求 删除文章资源
     */
    requestDeleteResource() {
      this.isDeleteLoading = true
      this.$myApi.resources
        .delete(this.currentRow._id)
        .then(() => {
          this.isDeleteLoading = false
          this.$toast.success('删除成功！')
          this.handleHideDeleteModal()
          this.requestResourceList()
        })
        .catch(() => {
          this.isDeleteLoading = false
        })
    },

    /**
     * @desc 上传 格式出错
     */
    handleFormatError(file) {
      this.$toast.error(`文件 ${file.name} 格式不对, 请选择 JPG、GIF、SVG、JPEG or PNG.`, { duration: 4000 })
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
      this.$set(this.formData, 'poster', res.result.path)
    },

    /**
     * @desc 分页点击
     */
    handleChangePage(page) {
      this.page = page
      this.requestResourceList()
    },

    /**
     * @desc 清空表单值
     */
    handleClearFormData() {
      this.formData = {}
    },

    /**
     * @desc 回显表单值
     */
    handleRecoveryFormData(data) {
      this.formData = {
        name: data.name,
        url: data.url,
        poster: data.posterUrl,
        desc: data.desc,
        metaDesc: data.metaDesc,
        resourceTypeId: [data.resourceTypeId]
      }
    },

    /**
     * @desc 新增文章资源
     */
    handleAddResource() {
      this.editMode = 'add'
      this.handleShowResourceModal()
    },

    /**
     * @desc 表格点击事件 编辑
     */
    handleRowEdit(row) {
      this.editMode = 'edit'
      this.currentRow = row
      if (this.handleValidateUserAuth()) {
        this.handleRecoveryFormData(row)
        this.handleShowResourceModal()
      }
    },

    /**
     * @desc 表格点击事件 删除
     */
    handleRowDel(row) {
      this.currentRow = row
      if (this.handleValidateUserAuth()) {
        this.handleShowDeleteModal()
      }
    },

    /**
     * @desc 检查表单数据是否合格
     */
    handleCheckFormData() {
      if (!this.formData.resourceTypeId) {
        this.$toast.error('请选择资源类别')
        return false
      } else if (!this.formData.name) {
        this.$toast.error('请填写资源名称')
        return false
      }
      return true
    },

    /**
     * @desc 验证是否已登录，是否为 admin 用户
     */
    handleValidateUserAuth() {
      let isUserAuth = false
      if (this.userInfo) {
        if (this.userInfo.userName === 'admin') {
          isUserAuth = true
        } else {
          this.$toast.error('非admin，无权限！')
        }
      } else {
        this.$toast.info('请登录')
        this.toggleSignInModal(true)
      }
      return isUserAuth
    },

    /**
     * @desc 提交文章资源表单
     */
    handleSubmitResource() {
      if (!this.handleCheckFormData()) {
        return
      }
      if (!this.handleValidateUserAuth()) {
        return
      }
      if (this.editMode === 'edit') {
        this.requestEditResource()
      } else {
        this.requestAddResource()
      }
    },

    /**
     * @desc 预览资源首页截图
     */
    handlePreviewImg(url) {
      this.previewImgUrl = url
      this.handleShowPreviewModal()
    },

    /**
     * @desc 显示预览图片弹框
     */
    handleShowPreviewModal() {
      this.isShowPreviewModal = true
    },

    /**
     * @desc 隐藏预览图片弹框
     */
    handleHidePreviewModal() {
      this.isShowPreviewModal = false
      setTimeout(() => {
        this.previewImgUrl = ''
      }, 300)
    },

    /**
     * @desc 显示文章资源表单弹框
     */
    handleShowResourceModal() {
      this.isShowResourceModal = true
    },

    /**
     * @desc 隐藏文章资源表单弹框
     */
    handleHideResourceModal() {
      this.isShowResourceModal = false
      this.handleClearFormData()
    },

    /**
     * @desc 显示删除文章资源弹框
     */
    handleShowDeleteModal() {
      this.isShowDeleteModal = true
    },

    /**
     * @desc 隐藏删除文章资源弹框
     */
    handleHideDeleteModal() {
      this.isShowDeleteModal = false
    }
  }
}
</script>

<style lang="less" scoped>
.uplaod-box {
  overflow: visible;
  margin: 10px 0;
  display: flex;
  align-items: center;
  .uplaod-preview-img {
    flex: none;
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    margin: auto;
    display: block;
    border: 1px solid #dcdee2;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    text-align: center;
    img {
      max-width: 100%;
      height: 100%;
    }
  }
  .uplaod-cont {
    margin-left: 10px;
    .upload-tip {
      margin: 6px 0;
      font-size: 12px;
      color: @colorTextSub;
    }
  }
}
</style>
