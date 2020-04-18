import { store } from '~/plugins/firebase/app'
import Document from '~/plugins/firebase/store/_document'

export default class User extends Document {
  constructor(argument) {
    super()
    this.data = {
      displayName: '',
      email: '',
      phoneNumber: '',
      photoURL: '',
      providerId: '',
      uid: ''
    }
    this.collection = store.collection('users')
    this.ready = this.init(argument)
  }
}
