import { pushObjectToList, getObjectFromList } from '~/plugins/functions'
import User from '~/plugins/firebase/store/User'

export const state = () => ({
  userList: []
})

export const mutations = {
  addUser(state, user) {
    pushObjectToList(state.userList, user)
  }
}

export const getters = {
  userById: state => userId => {
    return getObjectFromList(state.userList, userId, {
      id: userId,
      data: {},
      notFound: true
    })
  }
}

export const actions = {
  async getUser({ getters, commit }, id) {
    let user = getters.userById(id)
    if (user.notFound) {
      commit('addUser', { ...user, notFound: false })
      user = new User(id)
      await user.ready
      console.log(user)
      commit('addUser', user)
    }
    return user
  }
}
