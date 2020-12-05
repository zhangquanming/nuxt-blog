<template>
  <div>
    <div class="z-row form-box">
      <div>
        <form-item :labelWidth="80" label="用户名">
          <input v-model.trim="formData.userName" class="form-item-input" type="text" />
        </form-item>
      </div>
      <div>
        <form-item :label-width="80" label="评论内容">
          <input v-model.trim="formData.content" class="form-item-input" type="text" />
        </form-item>
      </div>
      <div>
        <form-item :label-width="80" label="状态">
          <zbtn-group>
            <btn v-for="(item, index) in statusList" :key="index" :theme="formData.status === item.value ? 'success' : 'default'" @click="handleChangeStatus(item.value)">
              {{ item.label }}
            </btn>
          </zbtn-group>
        </form-item>
      </div>
      <!-- <div class="z-col-15">
        <form-item :labelWidth="80" label="文章标题">
          <input v-model.trim="formData.blogTitle" class="form-item-input" type="text" />
        </form-item>
      </div> -->
      <div>
        <form-item :label-width="80">
          <slot :formData="formData"></slot>
        </form-item>
      </div>
    </div>
  </div>
</template>

<script>
import FormItem from '@/components/base/FormItem/FormItem'
import Btn from '@/components/base/Btn/Btn'
import ZbtnGroup from '@/components/base/BtnGroup/BtnGroup'

export default {
  name: 'AdminCommentFilter',
  components: {
    FormItem,
    Btn,
    ZbtnGroup
  },
  data() {
    return {
      formData: {
        status: 'all'
      }
    }
  },
  computed: {
    statusList() {
      return [
        {
          label: '全部',
          value: 'all'
        },
        {
          label: '审核通过',
          value: true
        },
        {
          label: '未审核',
          value: false
        }
      ]
    }
  },
  methods: {
    /**
     * @desc
     */
    handleChangeStatus(value) {
      this.$set(this.formData, 'status', value)
    }
  }
}
</script>

<style lang="less" scoped>
.form-box {
  display: flex;
}
.form-item-input {
  padding: 8px 10px;
  font-size: 12px;
  color: @colorTextContent;
  outline: none;
  vertical-align: middle;
  border: 1px solid @colorBorder;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) inset;
}
</style>
