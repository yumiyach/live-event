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
    auth.onLogin(() => {
      commit('account/setAccount', auth, {
        root: true
      })
      commit('account/setUserId', auth.userId, {
        root: true
      })
    })
    commit('account/setAccount', auth, {
      root: true
    })
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
