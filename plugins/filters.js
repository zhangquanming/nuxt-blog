import Vue from 'vue'
import dayjs from 'dayjs'

// 时间格式化
export function dateFormatFilter(date, fmt) {
  if (!date) {
    return '-'
  } else {
    return dayjs(date).format(fmt)
  }
}
const filters = {
  dateFormatFilter
}

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
export default filters
