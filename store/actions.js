const actions = {
  async getCategoryList({ commit }) {
    const res = await this.$myApi.categories.index()
    commit('setCatgoryList', res && res.result ? res.result : [])
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
  }
}
export default actions
