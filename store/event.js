import { pushObjectToList, getObjectFromList } from '~/plugins/functions'
import Event from '~/plugins/firebase/store/event'

export const state = () => ({
  eventList: []
})

export const mutations = {
  addEvent(state, event) {
    pushObjectToList(state.eventList, event)
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
  }
}
