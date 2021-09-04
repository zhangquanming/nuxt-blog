<template>
  <div>
    <z-panel title="友情链接管理">
      <template v-slot:headerRight>
        <btn @click="handleAddResource" theme="gradient">新增友情链接</btn>
      </template>
      <z-table :columns="columns" :data="tableData" :loading="isLoading" />
      <pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
    </z-panel>

    <modal v-show="isShowLinkModal" @close="handleHideLinkModal">
      <h3 slot="header">{{ editMode === 'edit' ? '修改友情链接' : '添加友情链接' }}</h3>
      <div slot="body">
        <div class="uplaod-box">
          <div class="uplaod-preview-img">
            <img v-if="formData.logo" :src="formData.logo" alt="友情链接LOGO" />
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
              action="/api/upload"
              class="upload-input"
              accept="image/*"
            >
              <btn long>上传LOGO</btn>
            </upload>
          </div>
        </div>
        <input v-model="formData.logo" class="common-input" type="text" placeholder="友情链接LOGO" />
        <input v-model="formData.rank" class="common-input" type="number" placeholder="排序值，默认0" />
        <input v-model="formData.name" class="common-input" type="text" placeholder="友情链接名称" />
        <input v-model="formData.url" class="common-input" type="text" placeholder="友情链接地址" />
        <textarea v-model="formData.desc" class="common-textarea" placeholder="友情链接描述" cols="30" rows="3"></textarea>
      </div>
      <div slot="footer">
        <btn :loading="isAddLoading || isEditLoading" @click="handleSubmitLink" theme="gradient" long>{{ editMode === 'edit' ? '确认修改' : '确认添加' }}</btn>
      </div>
    </modal>

    <modal v-show="isShowDeleteModal" @close="handleHideDeleteModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.name }} 的友情链接吗?</p>
      </div>
      <div slot="footer">
        <btn @click="requestDeleteLink" theme="error" long>确认删除</btn>
      </div>
    </modal>

    <modal v-show="isShowPreviewModal" @close="handleHidePreviewModal" width="50%">
      <div slot="body">
        <div style="max-height:550px;overflow: auto;">
          <img :src="previewImgUrl" alt="友情链接logo" style="width:100%;" />
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
import Upload from '@/components/base/Upload/Upload'
import ZSwitch from '@/components/base/ZSwitch/ZSwitch'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdminLinks',
  layout: 'admin',
  components: {
    ZPanel,
    ZTable,
    Pagenation,
    Modal,
    Btn,
    Upload
  },
  data() {
    return {
      page: 1,
      limit: 10,
      pageTotal: 0,
      tableData: [],
      isLoading: false,
      isAddLoading: false,
      isEditLoading: false,
      isDeleteLoading: false,
      isShowPreviewModal: false,
      previewImgUrl: '',
      currentRow: {},
      isShowDeleteModal: false,
      isShowLinkModal: false,
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
          title: '排序',
          key: 'rank',
          width: 60
        },
        {
          title: 'LOGO',
          key: 'logo',
          width: '80px',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.logo
              },
              style: {
                width: '40px',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.handlePreviewImg(params.row.logo)
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
          width: '300px'
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
          title: '状态',
          minWidth: '100px',
          render: (h, parama) => {
            return h(ZSwitch, {
              props: {
                value: parama.row.status
              },
              on: {
                change: (value) => {
                  if (this.handleValidateUserAuth()) {
                    this.requestTogglelinkStatus(value, parama.row)
                  }
                }
              }
            })
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
                    theme: 'gradient',
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
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.requestLinkList()
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal'
    }),

    /**
     * @desc 请求 获取友情链接列表
     */
    requestLinkList() {
      this.isLoading = true
      const params = {
        status: 'all',
        page: this.page,
        limit: this.limit
      }
      this.$myApi.links
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
     * @desc 请求 新增友情链接
     */
    requestAddLink() {
      const params = {
        ...this.formData
      }
      this.isAddLoading = true
      this.$myApi.links
        .create(params)
        .then(() => {
          this.isAddLoading = false
          this.$toast.success('添加成功！', { icon: 'iconfont toasted-icon iconsuccess' })
          this.handleHideLinkModal()
          this.requestLinkList()
        })
        .catch(() => {
          this.isAddLoading = false
        })
    },

    /**
     * @desc 请求 修改友情链接列表
     */
    requestEditLink() {
      const params = {
        ...this.formData,
        id: this.currentRow._id
      }
      this.isEditLoading = true
      this.$myApi.links
        .update(params)
        .then(() => {
          this.isEditLoading = false
          this.$toast.success('修改成功！', { icon: 'iconfont toasted-icon iconsuccess' })
          this.handleHideLinkModal()
          this.requestLinkList()
        })
        .catch(() => {
          this.isEditLoading = false
        })
    },
    /**
     * @desc 请求 修改友情链接状态
     */
    requestTogglelinkStatus(value, row) {
      this.isToggleStatusLoading = true
      const params = {
        id: row._id,
        status: value
      }
      this.$myApi.links
        .update(params)
        .then(() => {
          this.isToggleStatusLoading = false
          this.$toast.success('操作成功！', { icon: 'iconfont toasted-icon iconsuccess' })
          row.status = value
        })
        .catch(() => {
          this.isToggleStatusLoading = false
        })
    },

    /**
     * @desc 请求 删除友情链接
     */
    requestDeleteLink() {
      this.isDeleteLoading = true
      this.$myApi.links
        .delete(this.currentRow._id)
        .then(() => {
          this.isDeleteLoading = false
          this.$toast.success('删除成功！', { icon: 'iconfont toasted-icon iconsuccess' })
          this.handleHideDeleteModal()
          this.requestLinkList()
        })
        .catch(() => {
          this.isDeleteLoading = false
        })
    },

    /**
     * @desc 上传 格式出错
     */
    handleFormatError(file) {
      this.$toast.error(`文件 ${file.name} 格式不对, 请选择 JPG、GIF、SVG、JPEG or PNG.`, { icon: 'iconfont toasted-icon iconerror', duration: 4000 })
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
      this.$set(this.formData, 'logo', res.result.path)
    },

    /**
     * @desc 分页点击
     */
    handleChangePage(page) {
      this.page = page
      this.requestLinkList()
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
        logo: data.logo,
        rank: data.rank,
        name: data.name,
        url: data.url,
        status: data.status,
        desc: data.desc
      }
    },

    /**
     * @desc 新增友情链接
     */
    handleAddResource() {
      this.editMode = 'add'
      this.handleShowLinkModal()
    },

    /**
     * @desc 表格点击事件 编辑
     */
    handleRowEdit(row) {
      this.editMode = 'edit'
      this.currentRow = row
      if (this.handleValidateUserAuth()) {
        this.handleRecoveryFormData(row)
        this.handleShowLinkModal()
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
      if (!this.formData.name) {
        this.$toast.error('请填写友情链接名称', { icon: 'iconfont toasted-icon iconerror' })
        return false
      } else if (!this.formData.url) {
        this.$toast.error('请填写友情链接url', { icon: 'iconfont toasted-icon iconerror' })
        return false
      }
      return true
    },

    /**
     * @desc 验证是否已登录，是否为 超级 用户
     */
    handleValidateUserAuth() {
      let isUserAuth = false
      if (this.userInfo) {
        if (this.userInfo.userName === 'Mingme') {
          isUserAuth = true
        } else {
          this.$toast.error('无操作权限！', { icon: 'iconfont toasted-icon iconerror' })
        }
      } else {
        this.$toast.info('请登录', { icon: 'iconfont toasted-icon iconinfo' })
        this.toggleSignInModal(true)
      }
      return isUserAuth
    },

    /**
     * @desc 提交友情链接表单
     */
    handleSubmitLink() {
      if (!this.handleCheckFormData()) {
        return
      }
      if (!this.handleValidateUserAuth()) {
        return
      }
      if (this.editMode === 'edit') {
        this.requestEditLink()
      } else {
        this.requestAddLink()
      }
    },

    /**
     * @desc 预览图片
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
     * @desc 显示友情链接表单弹框
     */
    handleShowLinkModal() {
      this.isShowLinkModal = true
    },

    /**
     * @desc 隐藏友情链接表单弹框
     */
    handleHideLinkModal() {
      this.isShowLinkModal = false
      this.handleClearFormData()
    },

    /**
     * @desc 显示删除友情链接弹框
     */
    handleShowDeleteModal() {
      this.isShowDeleteModal = true
    },

    /**
     * @desc 隐藏删除友情链接弹框
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
      object-fit: contain;
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
