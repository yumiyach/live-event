import firebaseApp from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'
import '@firebase/functions'
import '@firebase/storage'
import { appConfig } from '~/plugins/firebase/config'

if (!firebaseApp.apps.length) {
  firebaseApp.initializeApp(appConfig)
}

export const firebase = firebaseApp
export const auth = firebaseApp.auth()
export const store = firebaseApp.firestore()
export const storage = firebaseApp.storage()
export default firebaseApp
