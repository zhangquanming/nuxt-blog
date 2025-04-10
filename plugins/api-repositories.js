import createApiReposity from '~/assets/js/createApiReposity'

export default ({ $axios, store }, inject) => {
  const repositoryWithAxios = createApiReposity($axios, store)

  const repositories = {
    blogs: repositoryWithAxios('/api/blogs'),
    users: repositoryWithAxios('/api/users'),
    categories: repositoryWithAxios('/api/categories'),
    tags: repositoryWithAxios('/api/tags'),
    resourceTypes: repositoryWithAxios('/api/resourceTypes'),
    resources: repositoryWithAxios('/api/resources'),
    comments: repositoryWithAxios('/api/comments'),
    replys: repositoryWithAxios('/api/replys'),
    ebooks: repositoryWithAxios('/api/ebooks'),
    messages: repositoryWithAxios('/api/messages'),
    messageReplys: repositoryWithAxios('/api/messageReplys'),
    links: repositoryWithAxios('/api/links'),
    conversation: repositoryWithAxios('/api/conversation'),
    chat: repositoryWithAxios('/api/chat')
  }

  inject('myApi', repositories)
}
