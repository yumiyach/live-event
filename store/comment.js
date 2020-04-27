import { pushObjectToList, getObjectFromList } from '~/plugins/functions'
import Comment from '~/plugins/firebase/store/comment'
import auth from '~/plugins/firebase/account/auth'

export const state = () => ({
  commentList: [
    {
      id: '1',
      data: {
        eventId: '1',
        boothId: '1',
        userId: '1',
        user: {
          name: 'テストユーザ'
        },
        comment: 'テスト',
        date: new Date(),
        isAnonymous: false
      }
    }
  ]
})

export const mutations = {
  addComment(state, comment) {
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
  async createComment({ commit, dispatch }, data) {
    data.concluded.userId = auth.userId
    const comment = new Comment(data)
    await comment.ready
    commit('addComment', comment)
    return comment
  }
}
