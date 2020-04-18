import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      paths: ['account', 'sort.myPlayList']
    })(store)
    store.dispatch('account/init')
  })
}
