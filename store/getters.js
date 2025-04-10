export const navList = (state) => state.navList

export const token = (state) => state.token

export const userInfo = (state) => state.userInfo

export const showSignInModal = (state) => state.showSignInModal

export const showSignUpModal = (state) => state.showSignUpModal

export const tagList = (state) => state.tagList

export const categoryList = (state) => state.categoryList

export const categoryIdByValue = (state) => (value) => {
  let categoryId = ''
  if (value) {
    const categoryIdFilter = state.categoryList.filter((item) => item.value === value)
    if (categoryIdFilter.length) {
      categoryId = categoryIdFilter[0]._id
    } else {
      categoryId = ''
    }
  } else {
    categoryId = ''
  }
  return categoryId
}

export const blogResult = (state) => state.blogResult

export const highLightIndex = (state) => state.highLightIndex

export const categoryIndex = (state) => state.categoryIndex

export const cacheArticleData = (state) => state.cacheArticleData

export const conversationsList = (state) => state.conversationsList

export const currentConversation = (state) => state.currentConversation
