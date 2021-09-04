<template>
  <card :padding="20" style="height: 100%;">
    <user-page-title title="个人资料" title-sub="请如实填写以下内容，让大家更好的交流互动。"></user-page-title>
    <form-item required label="用户名" tip="用户名不可更改">
      <input v-model.trim="formData.userName" class="form-item-input form-item-input-readonly" type="text" readonly />
    </form-item>
    <form-item label="昵称">
      <input v-model.trim="formData.nickName" class="form-item-input" type="text" placeholder="请填写昵称" />
    </form-item>
    <form-item required label="邮箱">
      <input v-model.trim="formData.email" class="form-item-input" type="text" placeholder="请填写邮箱" />
    </form-item>
    <form-item label="手机号">
      <input v-model.trim="formData.phone" class="form-item-input" type="text" placeholder="请输入手机号" />
    </form-item>
    <form-item label="个人说明">
      <textarea v-model.trim="formData.briefDesc" class="form-item-textarea" cols="60" rows="5" placeholder="介绍下自己吧"></textarea>
      <div style="color: #999;">{{ formData.briefDesc ? formData.briefDesc.length : 0 }} / 100</div>
    </form-item>
    <form-item>
      <btn :loading="isEditLoading" @click="handleUpdate" theme="gradient">更新个人资料</btn>
    </form-item>
  </card>
</template>

<script>
import Card from '@/components/base/Card/Card'
import UserPageTitle from '@/components/page/user/UserPageTitle.vue'
import FormItem from '@/components/base/FormItem/FormItem'
import Btn from '@/components/base/Btn/Btn'
import { validatorsExp } from '@/assets/js/validate'

import { mapGetters } from 'vuex'

export default {
  name: 'UserProfile',
  layout: 'user',
  components: {
    Card,
    Btn,
    FormItem,
    UserPageTitle
  },
  data() {
    return {
      formData: {},
      isEditLoading: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    userInfo() {
      const { userInfo = {} } = this
      if (userInfo && userInfo.userName) {
        this.$set(this.formData, 'userName', userInfo.userName)
      }
      if (userInfo && userInfo.nickName) {
        this.$set(this.formData, 'nickName', userInfo.nickName)
      }
      if (userInfo && userInfo.phone) {
        this.$set(this.formData, 'phone', userInfo.phone)
      }
      if (userInfo && userInfo.email) {
        this.$set(this.formData, 'email', userInfo.email)
      }
      if (userInfo && userInfo.briefDesc) {
        this.$set(this.formData, 'briefDesc', userInfo.briefDesc)
      }
    }
  },
  mounted() {
    const { userInfo = {} } = this
    if (userInfo && userInfo.userName) {
      this.$set(this.formData, 'userName', userInfo.userName)
    }
    if (userInfo && userInfo.nickName) {
      this.$set(this.formData, 'nickName', userInfo.nickName)
    }
    if (userInfo && userInfo.phone) {
      this.$set(this.formData, 'phone', userInfo.phone)
    }
    if (userInfo && userInfo.email) {
      this.$set(this.formData, 'email', userInfo.email)
    }
    if (userInfo && userInfo.briefDesc) {
      this.$set(this.formData, 'briefDesc', userInfo.briefDesc)
    }
  },
  methods: {
    /**
     * @desc 更新个人资料
     */
    handleUpdate() {
      if (!this.handleValidete()) {
        return
      }
      this.requestUpdateUserInfo()
    },

    /**
     * @desc 校验参数
     */
    handleValidete() {
      const { userName, phone, email, briefDesc } = this.formData
      if (!userName) {
        this.$toast.error('请填写用户名！', { icon: 'iconfont toasted-icon iconerror' })
        return false
      }
      if (phone && !validatorsExp.phone.test(phone)) {
        this.$toast.error('请正确填写手机号！', { icon: 'iconfont toasted-icon iconerror' })
        return false
      }
      if (!email) {
        this.$toast.error('请填写邮箱！', { icon: 'iconfont toasted-icon iconerror' })
        return false
      }
      if (!validatorsExp.email.test(email)) {
        this.$toast.error('请正确填写邮箱！', { icon: 'iconfont toasted-icon iconerror' })
        return false
      }
      if (briefDesc && briefDesc.length > 100) {
        this.$toast.error('请用不超过100个字介绍自己', { icon: 'iconfont toasted-icon iconerror' })
        return false
      }
      return true
    },

    /**
     * @desc 请求 更新个人信息
     */
    requestUpdateUserInfo() {
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
.form-item-input {
  padding: 8px 10px;
  width: 250px;
  font-size: 12px;
  color: @colorTextContent;
  outline: none;
  vertical-align: middle;
  border: 1px solid @colorBorder;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) inset;
}
.form-item-input-readonly {
  background-color: @colorTextSilver;
  color: @colorTextLight;
}
.form-item-textarea {
  padding: 8px 10px;
  font-size: 14px;
  line-height: 1.5;
  color: @colorTextContent;
  outline: none;
  vertical-align: middle;
  border: 1px solid @colorBorder;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) inset;
}
</style>
