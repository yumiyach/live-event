import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      paths: ['account']
    })(store)
    store.dispatch('account/init')
  })
}
