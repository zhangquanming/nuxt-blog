<template>
  <div>
    <z-panel title="文章标签管理">
      <template v-slot:headerRight>
        <btn @click="handleAddTag" theme="gradient">新增标签</btn>
      </template>
      <z-table :columns="columns" :data="tableData" :loading="isLoading" />
      <pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
    </z-panel>

    <modal v-show="isShowTagModal" @close="handleHideTagModal">
      <h3 slot="header">{{ editMode === 'edit' ? '修改标签' : '添加标签' }}</h3>
      <div slot="body">
        <input v-model="formData.name" class="common-input" type="text" placeholder="标签显示名称" />
        <input v-model="formData.value" class="common-input" type="text" placeholder="标签值" />
        <input v-model="formData.rank" class="common-input" type="number" placeholder="排序值，默认0" />
      </div>
      <div slot="footer">
        <btn :loading="isAddLoading || isEditLoading" @click="handleSubmitTag" theme="gradient" long>{{ editMode === 'edit' ? '确认修改' : '确认添加' }}</btn>
      </div>
    </modal>

    <modal v-show="isShowDeleteModal" @close="handleHideDeleteModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.name }} 的标签吗?</p>
      </div>
      <div slot="footer">
        <btn @click="requestDeleteTag" theme="error" long>确认删除</btn>
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
  name: 'AdminTag',
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
      isShowTagModal: false,
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
    this.requestTagList()
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal',
      handleGetTagList: 'getTagList'
    }),

    /**
     * @desc 请求 获取标签列表
     */
    requestTagList() {
      this.isLoading = true
      const params = {
        page: this.page,
        limit: this.limit
      }
      this.$myApi.tags
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
     * @desc 请求 新增标签
     */
    requestAddTag() {
      const params = {
        ...this.formData
      }
      this.isAddLoading = true
      this.$myApi.tags
        .create(params)
        .then(() => {
          this.isAddLoading = false
          this.$toast.success('添加成功！', { icon: 'iconfont toasted-icon iconsuccess' })
          this.handleHideTagModal()
          this.requestTagList()
          this.handleGetTagList()
        })
        .catch(() => {
          this.isAddLoading = false
        })
    },

    /**
     * @desc 请求 修改文章标签
     */
    requestEditTag() {
      const params = {
        ...this.formData,
        id: this.currentRow._id,
        tagId: this.currentRow._id
      }
      this.isEditLoading = true
      this.$myApi.tags
        .update(params)
        .then(() => {
          this.isEditLoading = false
          this.$toast.success('修改成功！', { icon: 'iconfont toasted-icon iconsuccess' })
          this.handleHideTagModal()
          this.requestTagList()
          this.handleGetTagList()
        })
        .catch(() => {
          this.isEditLoading = false
        })
    },

    /**
     * @desc 请求 删除文章标签
     */
    requestDeleteTag() {
      this.isDeleteLoading = true
      this.$myApi.tags
        .delete(this.currentRow._id)
        .then(() => {
          this.isDeleteLoading = false
          this.$toast.success('删除成功！', { icon: 'iconfont toasted-icon iconsuccess' })
          this.handleHideDeleteModal()
          this.requestTagList()
          this.handleGetTagList()
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
      this.requestTagList()
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
     * @desc 新增标签
     */
    handleAddTag() {
      this.editMode = 'add'
      this.handleShowTagModal()
    },

    /**
     * @desc 表格点击事件 编辑
     */
    handleRowEdit(row) {
      this.editMode = 'edit'
      this.currentRow = row
      if (this.handleValidateUserAuth()) {
        this.handleRecoveryFormData(row)
        this.handleShowTagModal()
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
        this.$toast.error('请填写标签名称', { icon: 'iconfont toasted-icon iconerror' })
        return false
      } else if (!this.formData.value) {
        this.$toast.error('请填写标签属性值', { icon: 'iconfont toasted-icon iconerror' })
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
     * @desc 提交标签表单
     */
    handleSubmitTag() {
      if (!this.handleCheckFormData()) {
        return
      }
      if (!this.handleValidateUserAuth()) {
        return
      }
      if (this.editMode === 'edit') {
        this.requestEditTag()
      } else {
        this.requestAddTag()
      }
    },

    /**
     * @desc 显示标签表单弹框
     */
    handleShowTagModal() {
      this.isShowTagModal = true
    },

    /**
     * @desc 隐藏标签表单弹框
     */
    handleHideTagModal() {
      this.isShowTagModal = false
      this.handleClearFormData()
    },

    /**
     * @desc 显示删除标签弹框
     */
    handleShowDeleteModal() {
      this.isShowDeleteModal = true
    },

    /**
     * @desc 隐藏删除标签弹框
     */
    handleHideDeleteModal() {
      this.isShowDeleteModal = false
    }
  }
}
</script>
