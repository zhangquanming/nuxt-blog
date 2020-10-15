<template>
  <div>
    <ZPanel title="文章分类管理">
      <template v-slot:headerRight>
        <Btn @click="handleAddCategory" theme="primary">新增分类</Btn>
      </template>
      <ZTable :columns="columns" :data="tableData" :loading="isLoading" />
      <Pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
    </ZPanel>

    <Modal v-show="isShowCategoryModal" @close="handleHideCategoryModal">
      <h3 slot="header">{{ editMode === 'edit' ? '修改分类' : '添加分类' }}</h3>
      <div slot="body">
        <input v-model="formData.name" class="common-input" type="text" placeholder="分类显示名称" />
        <input v-model="formData.value" class="common-input" type="text" placeholder="分类值" />
      </div>
      <div slot="footer">
        <Btn :loading="isAddLoading || isEditLoading" @click="handleSubmitCategory" theme="primary" long>{{ editMode === 'edit' ? '确认修改' : '确认添加' }}</Btn>
      </div>
    </Modal>

    <Modal v-show="isShowDeleteModal" @close="handleHideDeleteModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.name }} 的分类吗?</p>
      </div>
      <div slot="footer">
        <Btn @click="requestDeleteCategory" theme="error" long>确认删除</Btn>
      </div>
    </Modal>
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
  name: 'AdminCategory',
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
      isShowCategoryModal: false,
      editMode: 'add',
      formData: {},
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60
        },
        {
          title: '名称',
          key: 'name',
          align: 'left'
        },
        {
          title: '属性值',
          key: 'value',
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
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.requestCategoryList()
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal',
      handleGetCategoryList: 'getCategoryList'
    }),

    /**
     * @desc 请求 获取文章分类列表
     */
    requestCategoryList() {
      this.isLoading = true
      const params = {
        page: this.page,
        limit: this.limit
      }
      this.$myApi.categories
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
     * @desc 请求 新增文章分类列表
     */
    requestAddCategory() {
      const params = {
        ...this.formData
      }
      this.isAddLoading = true
      this.$myApi.categories
        .create(params)
        .then(() => {
          this.isAddLoading = false
          this.$toast.success('添加成功！')
          this.handleHideCategoryModal()
          this.requestCategoryList()
          this.handleGetCategoryList()
        })
        .catch(() => {
          this.isAddLoading = false
        })
    },

    /**
     * @desc 请求 修改文章分类列表
     */
    requestEditCategory() {
      const params = {
        ...this.formData,
        id: this.currentRow._id,
        categoryId: this.currentRow._id
      }
      this.isEditLoading = true
      this.$myApi.categories
        .update(params)
        .then(() => {
          this.isEditLoading = false
          this.$toast.success('修改成功！')
          this.handleHideCategoryModal()
          this.requestCategoryList()
          this.handleGetCategoryList()
        })
        .catch(() => {
          this.isEditLoading = false
        })
    },

    /**
     * @desc 请求 删除文章分类
     */
    requestDeleteCategory() {
      this.isDeleteLoading = true
      this.$myApi.categories
        .delete(this.currentRow._id)
        .then(() => {
          this.isDeleteLoading = false
          this.$toast.success('删除成功！')
          this.handleHideDeleteModal()
          this.requestCategoryList()
          this.handleGetCategoryList()
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
      this.requestCategoryList()
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
        value: data.value
      }
    },

    /**
     * @desc 新增文章分类
     */
    handleAddCategory() {
      this.editMode = 'add'
      this.handleShowCategoryModal()
    },

    /**
     * @desc 表格点击事件 编辑
     */
    handleRowEdit(row) {
      this.editMode = 'edit'
      this.currentRow = row
      if (this.handleValidateUserAuth()) {
        this.handleRecoveryFormData(row)
        this.handleShowCategoryModal()
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
        this.$toast.error('请填写分类名称')
        return false
      } else if (!this.formData.value) {
        this.$toast.error('请填写分类属性值')
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
     * @desc 提交文章分类表单
     */
    handleSubmitCategory() {
      if (!this.handleCheckFormData()) {
        return
      }
      if (!this.handleValidateUserAuth()) {
        return
      }
      if (this.editMode === 'edit') {
        this.requestEditCategory()
      } else {
        this.requestAddCategory()
      }
    },

    /**
     * @desc 显示文章分类表单弹框
     */
    handleShowCategoryModal() {
      this.isShowCategoryModal = true
    },

    /**
     * @desc 隐藏文章分类表单弹框
     */
    handleHideCategoryModal() {
      this.isShowCategoryModal = false
      this.handleClearFormData()
    },

    /**
     * @desc 显示删除文章分类弹框
     */
    handleShowDeleteModal() {
      this.isShowDeleteModal = true
    },

    /**
     * @desc 隐藏删除文章分类弹框
     */
    handleHideDeleteModal() {
      this.isShowDeleteModal = false
    }
  }
}
</script>
