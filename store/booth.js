import { pushObjectToList, getObjectFromList } from '~/plugins/functions'
import Booth from '~/plugins/firebase/store/Booth'
import boothList from '~/plugins/firebase/store/boothList'
import auth from '~/plugins/firebase/account/auth'

export const state = () => ({
  boothList: []
})

export const mutations = {
  addBooth(state, booth) {
    pushObjectToList(state.boothList, booth)
  }
}

export const getters = {
  boothListByEventId: state => eventId => {
    return state.boothList.filter(item => item.data.eventId === eventId)
  },
  boothById: state => boothId => {
    return getObjectFromList(state.boothList, boothId, {
      id: boothId,
      data: {},
      notFound: true
    })
  }
}

export const actions = {
  async getBooth({ getters, commit }, id) {
    let booth = getters.boothById(id)
    if (booth.notFound) {
      commit('addBooth', booth)
      booth = new Booth(id)
      await booth.ready
      commit('addBooth', booth)
    }
    return booth
  },
  async getBoothListByEventId({ dispatch, commit }, eventId) {
    await boothList.getByEventId(eventId, booth => {
      dispatch('user/getUser', booth.data.userId, { root: true })
      commit('addBooth', booth)
    })
  },
  async createBooth({ commit, dispatch }, data) {
    data.concluded.userId = auth.userId
    data.concluded.createdAt = new Date()
    const booth = new Booth(data)
    await booth.ready
    commit('addBooth', booth)
    return booth
  },
  async updateBooth({ commit, dispatch }, data) {
    const booth = new Booth(data.boothId)
    await booth.update(data)
    commit('addBooth', booth)
    return booth
  },
  async deleteBooth({ commit, dispatch }, boothId) {
    const booth = new Booth(boothId)
    await booth.delete()
  }
}
