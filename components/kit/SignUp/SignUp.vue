<template>
  <modal v-if="showSignUpModal" @close="handleCloseModel">
    <h3 slot="header">注册</h3>
    <div slot="body">
      <input v-model="formData.userName" class="common-input" type="text" placeholder="用户名" autocomplete="off" />
      <!-- <input class="common-input" v-model="formData.phone" type="text" placeholder="手机号" /> -->
      <input v-model="formData.email" class="common-input" name="userName" type="text" value=" " placeholder="邮箱" autocomplete="off" />
      <input v-model="formData.password" class="common-input" type="password" placeholder="密码" autocomplete="off" />
      <input v-model="formData.confirmPassword" class="common-input" type="password" placeholder="确认密码" autocomplete="off" />
    </div>
    <div slot="footer">
      <btn @click="singUp" :loading="isSignUpLoading" theme="gradient" long>确定注册</btn>
      <btn @click="goToLogIn" long style="margin-top: 10px;">直接登录</btn>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/base/Modal/Modal'
import Btn from '@/components/base/Btn/Btn'

import { validatorsExp } from '@/assets/js/validate'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SignUp',
  components: {
    Modal,
    Btn
  },
  data() {
    return {
      formData: {},
      isSignUpLoading: false
    }
  },
  computed: {
    ...mapGetters(['showSignUpModal'])
  },
  methods: {
    ...mapActions({
      toggleSignUpModal: 'toggleSignUpModal'
    }),

    /**
     * @desc 请求 去注册
     */
    requestSingUp() {
      const { userName, email, password } = this.formData
      const params = {
        userName,
        email,
        password
      }
      this.isSignUpLoading = true
      this.$myApi.users
        .PostUserSignup(params)
        .then((res) => {
          this.$store.dispatch('changeUserInfo', res.result)
          this.$store.dispatch('changeToken', res.result.token)
          this.isSignUpLoading = false
          this.$toast.success('注册成功')
          this.handleCloseModel()
        })
        .catch(() => {
          this.isSignUpLoading = false
        })
    },

    /**
     * @desc 按钮点击事件 注册
     */
    singUp() {
      this.validateFormData().then((isvalid) => {
        if (isvalid) {
          this.requestSingUp()
        }
      })
    },

    /**
     * @desc 按钮点击事件 去登陆
     */
    goToLogIn() {
      this.$store.dispatch('toggleSignUpModal', false)
      this.$store.dispatch('toggleSignInModal', true)
    },

    /**
     * @desc 校验表单数据是否符合要求
     */
    validateFormData() {
      const { userName, email, password, confirmPassword } = this.formData
      return new Promise((resolve) => {
        if (!userName) {
          this.$toast.error('请填写昵称！')
          return resolve(false)
        }
        if (!validatorsExp.email.test(email)) {
          this.$toast.error('请正确填写邮箱！')
          return resolve(false)
        }
        if (!password) {
          this.$toast.error('请填写密码！')
          return resolve(false)
        }
        if (password.length < 6) {
          this.$toast.error('密码至少为 6 位')
          return resolve(false)
        }
        if (!confirmPassword) {
          this.$toast.error('请再次确认密码')
          return resolve(false)
        }
        if (password !== confirmPassword) {
          this.$toast.error('密码不一致')
          return resolve(false)
        }
        return resolve(true)
      })
    },

    /**
     * @desc 关闭弹框
     */
    handleCloseModel() {
      this.toggleSignUpModal(false)
    }
  }
}
</script>

<style lang="less" scoped></style>
