<template>
  <div>
    <z-panel title="文章用户管理">
      <template v-slot:headerRight>
        <btn @click="handleAddUser" theme="gradient">新增用户</btn>
      </template>
      <z-table :columns="columns" :data="tableData" :loading="isLoading" />
      <pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
    </z-panel>

    <modal v-show="isShowUserModal" @close="handleHideUserModal">
      <h3 slot="header">{{ editMode === 'edit' ? '修改用户' : '添加用户' }}</h3>
      <div slot="body">
        <input v-model="formData.userName" class="common-input" type="text" placeholder="用户名" />
        <input v-model="formData.phone" class="common-input" type="text" placeholder="手机号" />
        <input v-model="formData.email" class="common-input" type="text" placeholder="邮箱" />
        <input v-model="formData.password" :placeholder="editMode === 'edit' ? '新密码' : '密码'" class="common-input" type="password" />
        <input v-if="editMode === 'add'" v-model="formData.confirmPassword" class="common-input" type="password" placeholder="确认密码" />
      </div>
      <div slot="footer">
        <btn :loading="isAddLoading || isEditLoading" @click="handleSubmitUser" theme="gradient" long>{{ editMode === 'edit' ? '确认修改' : '确认添加' }}</btn>
      </div>
    </modal>

    <modal v-show="isShowDeleteModal" @close="handleHideDeleteModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.userName }} 的用户吗?</p>
      </div>
      <div slot="footer">
        <btn @click="requestDeleteUser" theme="error" long>确认删除</btn>
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
import { validatorsExp } from '@/assets/js/validate'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdminUser',
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
      isShowUserModal: false,
      editMode: 'add',
      formData: {},
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60
        },
        {
          title: '头像',
          key: 'poster',
          width: '80px',
          render: (h, parama) => {
            return h('img', {
              attrs: {
                src: parama.row.avatarUrl
              },
              style: {
                width: '80px'
              }
            })
          }
        },
        {
          title: '用户名',
          key: 'userName',
          align: 'left'
        },
        {
          title: '昵称',
          key: 'nickName',
          align: 'left'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '邮箱',
          key: 'email',
          align: 'left'
        },
        {
          title: '创建时间',
          render: (h, parama) => {
            return h('div', this.$options.filters.dateFormatFilter(parama.row.createdAt, 'YYYY-MM-DD HH:mm'))
          }
        },
        {
          title: '修改时间',
          render: (h, parama) => {
            return h('div', this.$options.filters.dateFormatFilter(parama.row.updatedAt, 'YYYY-MM-DD HH:mm'))
          }
        },
        {
          name: '操作',
          render: (h, parama) => {
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
                      this.handleRowEdit(parama.row)
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
                      this.handleRowDel(parama.row)
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
    this.requestUserList()
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'toggleSignInModal'
    }),

    /**
     * @desc 请求 获取用户列表
     */
    requestUserList() {
      this.isLoading = true
      const params = {
        page: this.page,
        limit: this.limit
      }
      this.$myApi.users
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
    requestAddUser() {
      const { phone, ...data } = this.formData
      const params = {
        ...data
      }
      if (phone) {
        params.phone = phone
      }
      this.isAddLoading = true
      this.$myApi.users
        .create(params)
        .then(() => {
          this.isAddLoading = false
          this.$toast.success('添加成功！')
          this.handleHideUserModal()
          this.requestUserList()
        })
        .catch(() => {
          this.isAddLoading = false
        })
    },

    /**
     * @desc 请求 修改文章标签
     */
    requestEditUser() {
      const params = {
        ...this.formData,
        id: this.currentRow._id,
        userId: this.currentRow._id
      }
      this.isEditLoading = true
      this.$myApi.users
        .update(params)
        .then(() => {
          this.isEditLoading = false
          this.$toast.success('修改成功！')
          this.handleHideUserModal()
          this.requestUserList()
        })
        .catch(() => {
          this.isEditLoading = false
        })
    },

    /**
     * @desc 请求 删除文章标签
     */
    requestDeleteUser() {
      this.isDeleteLoading = true
      this.$myApi.users
        .delete(this.currentRow._id)
        .then(() => {
          this.isDeleteLoading = false
          this.$toast.success('删除成功！')
          this.handleHideDeleteModal()
          this.requestUserList()
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
      this.requestUserList()
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
        userName: data.userName,
        phone: data.phone,
        email: data.email
      }
    },

    /**
     * @desc 新增标签
     */
    handleAddUser() {
      this.editMode = 'add'
      this.handleShowUserModal()
    },

    /**
     * @desc 表格点击事件 编辑
     */
    handleRowEdit(row) {
      this.editMode = 'edit'
      this.currentRow = row
      if (this.handleValidateUserAuth()) {
        this.handleRecoveryFormData(row)
        this.handleShowUserModal()
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
      const { userName, phone, email, password, confirmPassword } = this.formData
      const isAddMode = this.editMode === 'add'
      if (!userName) {
        this.$toast.error('请填写用户名！')
        return false
      }
      if (phone && !validatorsExp.phone.test(phone)) {
        this.$toast.error('请正确填写手机号！')
        return false
      }
      if (!validatorsExp.email.test(email)) {
        this.$toast.error('请正确填写邮箱！')
        return false
      }
      if (isAddMode && !password) {
        this.$toast.error('请填写密码！')
        return false
      }
      if (password && password.length < 6) {
        this.$toast.error('密码至少为 6 位')
        return false
      }
      if (isAddMode && !confirmPassword) {
        this.$toast.error('请再次确认密码')
        return false
      }
      if (isAddMode && password !== confirmPassword) {
        this.$toast.error('密码不一致')
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
          this.$toast.error('无操作权限！')
        }
      } else {
        this.$toast.info('请登录')
        this.toggleSignInModal(true)
      }
      return isUserAuth
    },

    /**
     * @desc 提交标签表单
     */
    handleSubmitUser() {
      if (!this.handleCheckFormData()) {
        return
      }
      if (!this.handleValidateUserAuth()) {
        return
      }
      if (this.editMode === 'edit') {
        this.requestEditUser()
      } else {
        this.requestAddUser()
      }
    },

    /**
     * @desc 显示标签表单弹框
     */
    handleShowUserModal() {
      this.isShowUserModal = true
    },

    /**
     * @desc 隐藏标签表单弹框
     */
    handleHideUserModal() {
      this.isShowUserModal = false
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
