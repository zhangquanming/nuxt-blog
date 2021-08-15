<template>
  <div class="md-editor-wrap">
    <div class="md-editor-toolbar">
      <div>
        <btn :theme="editorMode === 'editMode' ? 'info' : 'text'" :ghost="editorMode === 'editMode'" @click="setEditorMode('editMode')" size="small" title="写作模式">写作</btn>
        <btn :theme="editorMode === 'liveMode' ? 'info' : 'text'" :ghost="editorMode === 'liveMode'" @click="setEditorMode('liveMode')" size="small" title="实时模式">实时</btn>
        <btn :theme="editorMode === 'previewMode' ? 'info' : 'text'" :ghost="editorMode === 'previewMode'" @click="setEditorMode('previewMode')" size="small" title="预览模式"
          >预览</btn
        >
        <upload
          :format="['png', 'jpeg', 'jpg', 'gif']"
          :data="uploadParams"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :on-success="handleUploadSuccess"
          style="display: inline-block"
          action="/api/upload"
          accept="image/*"
        >
          <btn theme="primary" ghost size="small">添加图片</btn>
        </upload>
        <span v-if="imgUrl" style="margin-left: 20px;"> ![图片]({{ imgUrl }}) </span>
      </div>
      <slot></slot>
    </div>

    <div :class="`md-editor md-editor-${editorMode}`">
      <div class="md-editor-write">
        <textarea v-model="mdText" @input="handleInput"></textarea>
      </div>
      <div class="md-editor-preview">
        <md-preview :content="value" :isBgShow="true" />
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/base/Btn/Btn'
import MdPreview from '@/components/kit/MdPreview/MdPreview'
import Upload from '@/components/base/Upload/Upload'

let timer = ''

export default {
  name: 'MdEditor',
  components: {
    Btn,
    MdPreview,
    Upload
  },
  props: ['value'],
  data() {
    return {
      mdText: this.value || '',
      editorMode: 'liveMode',
      uploadParams: {
        usedFor: 'article'
      },
      imgUrl: ''
    }
  },
  watch: {
    value(value, oldValue) {
      if (!oldValue) {
        this.mdText = value
      }
    }
  },
  methods: {
    setEditorMode(mode) {
      this.editorMode = mode
    },
    handleInput(e) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.$emit('input', e.target.value)
      }, 300)
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
      this.imgUrl = res.result.path
    }
  }
}
</script>
<style lang="less" scoped>
@mdToolBarHeight: 30px;

.md-editor {
  display: flex;
  flex: 1;
  overflow: auto;
  position: relative;

  // wrap
  &-wrap {
    position: relative;
    border: 1px solid @colorBorder;
    margin-top: 5px;
    border-radius: 5px;
    background: #fff;
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
  }

  // toolbar
  &-toolbar {
    padding: 5px;
    border-bottom: 1px solid @colorBorder;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  // editer
  &-write,
  &-preview {
    transition: width 0.3s ease;
    overflow-x: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
  }
  &-write {
    border-right: 1px solid @colorBorder;
    left: 0;
  }
  &-preview {
    padding: 10px;
    right: 0;
  }

  .markdown-body {
    padding: 10px;
  }

  textarea {
    width: 100%;
    height: 99%;
    padding: 10px;
    outline: none;
    border: 0;
    font-size: 15px;
    line-height: 1.5;
    resize: none;
    color: darken(@colorTextContent, 5%);
  }

  // mode
  &-editMode &-preview {
    width: 0%;
  }
  &-editMode &-write {
    width: 100%;
  }

  &-previewMode &-write {
    width: 0%;
    border: 0;
  }
  &-previewMode &-preview {
    width: 100%;
  }
}
</style>
