import auth from '~/plugins/firebase/account/auth'

export const state = () => ({
  isLogin: false,
  loginUser: {},
  userId: null,
  isShowSensitive: true
})

export const mutations = {
  setAccount(state, payload) {
    state.isLogin = payload.isLogin
    state.loginUser = Object.assign({}, payload.user)
  },
  setUserId(state, userId) {
    state.userId = userId
  },
  setIsShowSensitive(state, isShowSensitive) {
    state.isShowSensitive = isShowSensitive
  }
}

export const actions = {
  init({ commit }) {
    console.log('init')
    auth.onLogin(() => {
      console.log('login')
      commit('setAccount', auth)
      commit('setUserId', auth.userId)
    })
    commit('setAccount', auth)
  },
  login({}, provider) {
    auth.showSignInPopup(provider)
  },
  onLogin({}, callback) {
    auth.onLogin(callback)
  },
  onLogout({}, callback) {
    auth.onLogout(callback)
  },
  async logout({ commit }) {
    await auth.logout()
    commit('setAccount', auth)
    commit('setUserId', null)
    location.href = '/'
  }
}
