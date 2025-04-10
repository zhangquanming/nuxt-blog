<template>
  <div :style="styles" v-html="articleHtml" v-highlight :class="['markdown-body', { bg: isBgShow }]"></div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'

import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/atom-one-dark.css'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  breaks: true,
  headerPrefix: 'header-nav',
  highlight(code) {
    return highlight.highlightAuto(code).value
  },
  split: false
})

export default {
  name: 'MdPreview',
  directives: {
    highlight(el) {
      const blocks = el.querySelectorAll('pre code')
      blocks.forEach((block) => {
        highlight.highlightBlock(block)
      })
    }
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    padding: {
      type: [String, Number],
      default: '10px'
    },
    isBgShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    articleHtml() {
      const renderer = new marked.Renderer()
      let index = 0
      renderer.heading = function(text, level) {
        return `<h${level} id="titleAnchor-${index++}">${text}</h${level}>`
      }
      let safeContent = this.content
      // 自动补全未闭合的代码块
      const codeBlockCount = (safeContent.match(/```/g) || []).length
      if (codeBlockCount % 2 !== 0) {
        safeContent += '\n```'
      }

      return marked(safeContent || '', { renderer })
    },
    styles() {
      return {
        padding: typeof this.padding === 'number' ? `${this.padding}px` : this.padding
      }
    }
  }
}
</script>

<style lang="less" scoped>
.markdown-body {
  pre {
    transition: opacity 0.3s ease;
    &[data-loading] {
      opacity: 0.6;
    }
  }
  p {
    text-align: justify;
  }
}
</style>
