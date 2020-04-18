import { auth, store, firebase } from '~/plugins/firebase/app'
class Account {
  auth
  user
  userId
  isLogin
  profileImage
  loginCallback
  logoutCallback
  isShowPopup

  constructor() {
    this.loginCallback = []
    this.logoutCallback = []
    this.isLogin = false
    this.isShowPopup = false
    auth.onAuthStateChanged(async authData => {
      if (!authData) {
        for (const func of this.logoutCallback) {
          func()
        }
        return
      }
      if (await this.login(authData)) {
        for (const func of this.loginCallback) {
          func()
        }
      }
    })
  }

  showSignInPopup(providerName) {
    this.isShowPopup = true
    if (providerName === 'anonymous') {
      auth.signInAnonymously()
      return
    }
    let provider = {}
    switch (providerName) {
      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider()
        break
      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider()
        break
      default:
        provider = new firebase.auth.GoogleAuthProvider()
        break
    }
    auth.signInWithPopup(provider)
  }

  async login(authData) {
    this.auth = authData
    this.userId = this.auth.uid
    this.user = this.auth.providerData[0]

    if (this.user) {
      this.isLogin = true
    }
    if (this.isShowPopup) {
      await this.setUserData()
    }
    this.isShowPopup = false
    return true
  }

  onLogin(callback) {
    if (this.isLogin) {
      callback()
    } else {
      this.loginCallback.push(callback)
    }
  }

  onLogout(callback) {
    this.logoutCallback.push(callback)
  }

  async logout() {
    await auth.signOut()
    this.isLogin = false
    this.auth = {}
    this.userId = false
    this.user = {}
  }

  async setUserData() {
    if (this.auth.providerData && this.user) {
      const user = {}
      for (const prop in this.user) {
        if (this.user[prop]) {
          user[prop] = this.user[prop]
        }
      }
      user.authUserId = this.auth.uid
      store
        .collection('users')
        .doc(this.userId)
        .set(user)
    }
  }
}

export default new Account()
