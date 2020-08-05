const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUserInfo(state, data) {
    state.userInfo = data
  },
  setSignInModal(state, isShow) {
    state.showSignInModal = isShow
  },
  setSignUpModal(state, isShow) {
    state.showSignUpModal = isShow
  },
  setCatgoryList(state, arr) {
    state.categoryList = arr
  },
  setBlogResult(state, data) {
    state.blogResult = data
  },
  setHighLightIndex(state, { index }) {
    state.highLightIndex = index
  }
}
export default mutations
