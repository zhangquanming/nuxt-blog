import Vue from 'vue'
const focus = Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})
export default focus
