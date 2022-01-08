<template>
  <div>
    <z-panel title="文章资源类别管理">
      <template v-slot:headerRight>
        <btn @click="handleAddResourceType" theme="gradient">新增资源类别</btn>
      </template>
      <z-table :columns="columns" :data="tableData" :loading="isLoading" />
      <pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
    </z-panel>

    <modal v-show="isShowResourceTypeModal" @close="handleHideResourceTypeModal">
      <h3 slot="header">{{ editMode === 'edit' ? '修改资源类别' : '添加资源类别' }}</h3>
      <div slot="body">
        <input v-model="formData.name" class="common-input" type="text" placeholder="资源类别名称" />
        <input v-model="formData.rank" class="common-input" type="number" placeholder="排序值，默认0" />
      </div>
      <div slot="footer">
        <btn :loading="isEditLoading || isAddLoading" @click="handleSubmitResourceType" theme="gradient" long>{{ editMode === 'edit' ? '确认修改' : '确认添加' }}</btn>
      </div>
    </modal>

    <modal v-show="isShowDeleteModal" @close="handleHideDeleteModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.name }} 的资源类别吗?</p>
      </div>
      <div slot="footer">
        <btn @click="requestDeleteResourceType" theme="error" long>确认删除</btn>
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

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdminResourceType',
  layout: 'admin',
  components: {
    ZPanel,
    ZTable,
    Pagenation,
    Modal,
    Btn
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
      currentRow: {},
      isShowDeleteModal: false,
      isShowResourceTypeModal: false,
      editMode: 'add',
      formData: {},
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60
        },
        {
          title: '排序',
          key: 'rank'
        },
        {
          title: '名称',
          key: 'name',
          align: 'left'
        },
        {
          title: '创建时间',
          render: (h, params) => {
            return h('div', this.$options.filters.dateFormatFilter(params.row.createdAt, 'YYYY-MM-DD HH:mm'))
          }
        },
        {
          title: '修改时间',
          render: (h, params) => {
            return h('div', this.$options.filters.dateFormatFilter(params.row.updatedAt, 'YYYY-MM-DD HH:mm'))
          }
        },
        {
          title: '操作',
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
    this.requestResourceTypeList()
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal'
    }),

    /**
     * @desc 请求 获取文章资源类别列表
     */
    requestResourceTypeList() {
      this.isLoading = true
      const params = {
        page: this.page,
        limit: this.limit
      }
      this.$myApi.resourceTypes
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
     * @desc 请求 新增文章资源类别列表
     */
    requestAddResourceType() {
      const params = {
        ...this.formData
      }
      this.isAddLoading = true
      this.$myApi.resourceTypes
        .create(params)
        .then(() => {
          this.isAddLoading = false
          this.$toast.success('添加成功！', { icon: 'iconfont toasted-icon iconsuccess' })
          this.handleHideResourceTypeModal()
          this.requestResourceTypeList()
        })
        .catch(() => {
          this.isAddLoading = false
        })
    },

    /**
     * @desc 请求 修改文章资源类别列表
     */
    requestEditResourceType() {
      const params = {
        ...this.formData,
        id: this.currentRow._id,
        resourceTypeId: this.currentRow._id
      }
      this.isEditLoading = true
      this.$myApi.resourceTypes
        .update(params)
        .then(() => {
          this.isEditLoading = false
          this.$toast.success('修改成功！', { icon: 'iconfont toasted-icon iconsuccess' })
          this.handleHideResourceTypeModal()
          this.requestResourceTypeList()
        })
        .catch(() => {
          this.isEditLoading = false
        })
    },

    /**
     * @desc 请求 删除文章资源类别
     */
    requestDeleteResourceType() {
      this.isDeleteLoading = true
      this.$myApi.resourceTypes
        .delete(this.currentRow._id)
        .then(() => {
          this.isDeleteLoading = false
          this.$toast.success('删除成功！', { icon: 'iconfont toasted-icon iconsuccess' })
          this.handleHideDeleteModal()
          this.requestResourceTypeList()
        })
        .catch(() => {
          this.isDeleteLoading = false
        })
    },

    /**
     * @desc 分页点击
     */
    handleChangePage(page) {
      this.page = page
      this.requestResourceTypeList()
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
        value: data.value,
        rank: data.rank
      }
    },

    /**
     * @desc 新增文章资源类别
     */
    handleAddResourceType() {
      this.editMode = 'add'
      this.handleShowResourceTypeModal()
    },

    /**
     * @desc 表格点击事件 编辑
     */
    handleRowEdit(row) {
      this.editMode = 'edit'
      this.currentRow = row
      if (this.handleValidateUserAuth()) {
        this.handleRecoveryFormData(row)
        this.handleShowResourceTypeModal()
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
        this.$toast.error('请填写资源类别名称', { icon: 'iconfont toasted-icon iconerror' })
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
     * @desc 提交文章资源类别表单
     */
    handleSubmitResourceType() {
      if (!this.handleCheckFormData()) {
        return
      }
      if (!this.handleValidateUserAuth()) {
        return
      }
      if (this.editMode === 'edit') {
        this.requestEditResourceType()
      } else {
        this.requestAddResourceType()
      }
    },

    /**
     * @desc 显示文章资源类别表单弹框
     */
    handleShowResourceTypeModal() {
      this.isShowResourceTypeModal = true
    },

    /**
     * @desc 隐藏文章资源类别表单弹框
     */
    handleHideResourceTypeModal() {
      this.isShowResourceTypeModal = false
      this.handleClearFormData()
    },

    /**
     * @desc 显示删除文章资源类别弹框
     */
    handleShowDeleteModal() {
      this.isShowDeleteModal = true
    },

    /**
     * @desc 隐藏删除文章资源类别弹框
     */
    handleHideDeleteModal() {
      this.isShowDeleteModal = false
    }
  }
}
</script>
