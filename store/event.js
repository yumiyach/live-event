import {
  pushObjectToList,
  getObjectFromList,
  deleteFromList
} from '~/plugins/functions'
import Event from '~/plugins/firebase/store/Event'
import eventList from '~/plugins/firebase/store/eventList'
import auth from '~/plugins/firebase/account/auth'

export const state = () => ({
  eventList: []
})

export const mutations = {
  addEvent(state, event) {
    if (event.data.startDate) {
      event.data.startDate = event.data.startDate.toDate()
    }
    if (event.data.endDate) {
      event.data.endDate = event.data.endDate.toDate()
    }
    pushObjectToList(state.eventList, event)
  },
  deleteEvent(state, eventId) {
    deleteFromList(state.eventList, eventId)
  }
}

export const getters = {
  eventById: state => eventId => {
    return getObjectFromList(state.eventList, eventId, {
      id: eventId,
      data: {},
      notFound: true
    })
  }
}

export const actions = {
  async getEvent({ getters, commit }, id) {
    let event = getters.eventById(id)
    if (event.notFound) {
      commit('addEvent', event)
      event = new Event(id)
      await event.ready
      commit('addEvent', event)
    }
    return event
  },
  async getRecentlyEventList({ commit }) {
    await eventList.getRecently(event => {
      commit('addEvent', event)
    })
  },
  async reloadEvent({ getters, commit }, id) {
    const event = new Event(id)
    await event.ready
    commit('addEvent', event)
    return event
  },
  async createEvent({ commit, dispatch }, data) {
    data.concluded.userId = auth.userId
    const event = new Event(data)
    await event.ready
    commit('addEvent', event)
    return event
  },
  async updateEvent({ commit, dispatch }, data) {
    data.concluded.userId = auth.userId
    const event = new Event(data.eventId)
    await event.ready
    await event.update(data)
    commit('addEvent', event)
    await dispatch('reloadEvent', data.eventId)
    return event
  },
  async deleteEvent({ commit, dispatch }, eventId) {
    const event = new Event(eventId)
    commit('deleteEvent', eventId)
    await event.delete()
  }
}
