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
  setTagList(state, data) {
    state.tagList = data
  },
  setCatgoryList(state, arr) {
    state.categoryList = arr
  },
  setBlogResult(state, data) {
    state.blogResult = data
  },
  setHighLightIndex(state, { index }) {
    state.highLightIndex = index
  },
  setCatgoryIndex(state, data) {
    state.categoryIndex = data
  },
  setCacheArticleData(state, data) {
    state.cacheArticleData = data
  },
  setConversationsList(state, arr) {
    state.conversationsList = arr
  },
  setCurrentConversation(state, data) {
    state.currentConversation = data
  }
}
export default mutations
