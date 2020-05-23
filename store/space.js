import {
  pushObjectToList,
  getObjectFromList,
  deleteFromList
} from '~/plugins/functions'
import Space from '~/plugins/firebase/store/Space'
import spaceList from '~/plugins/firebase/store/spaceList'
import auth from '~/plugins/firebase/account/auth'

export const state = () => ({
  spaceList: []
})

export const mutations = {
  addSpace(state, space) {
    pushObjectToList(state.spaceList, space)
  },
  deleteSpace(state, spaceId) {
    deleteFromList(state.spaceList, spaceId)
  }
}

export const getters = {
  spaceListByEventId: state => eventId => {
    return state.spaceList.filter(item => item.data.eventId === eventId)
  },
  spaceById: state => spaceId => {
    return getObjectFromList(state.spaceList, spaceId, {
      id: spaceId,
      data: {},
      notFound: true
    })
  }
}

export const actions = {
  async getSpace({ getters, commit, dispatch }, id) {
    let space = getters.spaceById(id)
    if (space.notFound) {
      commit('addSpace', space)
      space = new Space(id)
      await space.ready
      dispatch('user/getUser', space.data.userId, { root: true })
      commit('addSpace', space)
    }
    return space
  },
  async getSpaceListByEventId({ dispatch, commit }, eventId) {
    await spaceList.getByEventId(eventId, space => {
      dispatch('user/getUser', space.data.userId, { root: true })
      commit('addSpace', space)
    })
  },
  async createSpace({ commit, dispatch }, data) {
    data.concluded.userId = auth.userId
    data.concluded.createdAt = new Date()
    const space = new Space(data)
    await space.ready
    commit('addSpace', space)
    return space
  },
  async updateSpace({ commit, dispatch }, data) {
    const space = new Space(data.spaceId)
    await space.update(data)
    commit('addSpace', space)
    return space
  },
  async deleteSpace({ commit, dispatch }, spaceId) {
    const space = new Space(spaceId)
    await space.delete()
    commit('deleteSpace', spaceId)
  }
}
