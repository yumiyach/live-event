import { pushObjectToList, getObjectFromList } from '~/plugins/functions'
import Comment from '~/plugins/firebase/store/Comment'
import auth from '~/plugins/firebase/account/auth'

export const state = () => ({
  commentList: []
})

export const mutations = {
  addComment(state, comment) {
    if (comment.data.createdAt && comment.data.createdAt.toDate) {
      comment.data.createdAt = comment.data.createdAt.toDate()
    }
    pushObjectToList(state.commentList, comment)
  }
}

export const getters = {
  commentListByBoothId: state => boothId => {
    return state.commentList.filter(item => item.data.boothId === boothId)
  },
  commentById: state => commentId => {
    return getObjectFromList(state.commentList, commentId, {
      id: commentId,
      data: {},
      notFound: true
    })
  }
}

export const actions = {
  async getComment({ getters, commit }, id) {
    let comment = getters.commentById(id)
    if (comment.notFound) {
      commit('addComment', comment)
      comment = new Comment(id)
      await comment.ready
      commit('addComment', comment)
    }
    return comment
  },
  async createComment({ commit }, data) {
    data.userId = auth.userId
    data.createdAt = new Date()
    const comment = new Comment(data)
    await comment.ready
    commit('addComment', comment)
    return comment
  }
}
