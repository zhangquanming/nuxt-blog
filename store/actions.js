const actions = {
  async getCategoryList({ commit }) {
    const res = await this.$myApi.categories.index()
    commit('setCatgoryList', res && res.result ? res.result : [])
  },
  async getTagList({ commit }) {
    const res = await this.$myApi.tags.index()
    commit('setTagList', res && res.result ? res.result : [])
  },
  toggleSignInModal({ commit }, isShow) {
    commit('setSignInModal', isShow)
  },
  toggleSignUpModal({ commit }, isShow) {
    commit('setSignUpModal', isShow)
  },
  changeToken({ commit }, token) {
    commit('setToken', token)
  },
  changeUserInfo({ commit }, data) {
    commit('setUserInfo', data)
  },
  changeHighLightIndex({ commit }, data) {
    commit('setHighLightIndex', data)
  },
  changeCategoryIndex({ commit }, data) {
    commit('setCatgoryIndex', data)
  },
  cacheArticleData({ commit }, data) {
    commit('setCacheArticleData', data)
  }
}
export default actions
