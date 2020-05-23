import {
  pushObjectToList,
  getObjectFromList,
  deleteFromList
} from '~/plugins/functions'
import Comment from '~/plugins/firebase/store/Comment'
import commentList from '~/plugins/firebase/store/commentList'
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
  },
  deleteComment(state, commentId) {
    deleteFromList(state.commentList, commentId)
  }
}

export const getters = {
  commentListBySpaceId: state => spaceId => {
    return state.commentList
      .filter(item => item.data.spaceId === spaceId)
      .sort((a, b) => {
        return a.data.createdAt.getTime() < b.data.createdAt.getTime() ? 1 : -1
      })
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
  async getComment({ getters, commit, dispatch }, id) {
    let comment = getters.commentById(id)
    if (comment.notFound) {
      commit('addComment', comment)
      comment = new Comment(id)
      await comment.ready
      dispatch('user/getUser', comment.data.userId, { root: true })
      commit('addComment', comment)
    }
    return comment
  },
  async listenCommentBySpaceId({ dispatch, commit }, spaceId) {
    console.log('listenCommentBySpaceId')
    await commentList.listenBySpaceId(
      spaceId,
      comment => {
        commit('addComment', comment)
        dispatch('user/getUser', comment.data.userId, { root: true })
      },
      commentId => {
        commit('deleteComment', commentId)
      }
    )
  },
  async createComment({ commit }, data) {
    data.userId = auth.userId
    data.createdAt = new Date()
    const comment = new Comment(data)
    await comment.ready
    commit('addComment', comment)
    return comment
  },
  async deleteComment({ commit, dispatch }, commentId) {
    const comment = new Comment(commentId)
    await comment.delete()
  }
}
