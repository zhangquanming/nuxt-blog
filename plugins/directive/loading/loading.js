import Vue from 'vue'
import Loading from './loading.vue'

const Mask = Vue.extend(Loading)

const toggleLoading = (el, binding) => {
  if (binding.value) {
    Vue.nextTick(() => {
      // 控制loading组件显示
      el.instance.visible = true
      // 插入到目标元素
      insertDom(el, el, binding)
    })
  } else {
    el.instance.visible = false
  }
}

const insertDom = (parent, el) => {
  parent.appendChild(el.mask)
}

export default {
  bind(el, binding) {
    const mask = new Mask({
      el: document.createElement('div'),
      data() {}
    })
    el.instance = mask
    el.mask = mask.$el
    el.maskStyle = {}

    const curStyle = window.getComputedStyle(el)
    const position = curStyle.position
    if (position === 'absolute' || position === 'relative') {
      el.style.position = position
    } else {
      el.style.position = 'relative'
    }

    binding.value && toggleLoading(el, binding)
  },
  update(el, binding) {
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding)
    }
  },
  unbind(el) {
    el.instance && el.instance.$destroy()
  }
}
