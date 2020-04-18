import { store } from '~/plugins/firebase/app'
import Document from '~/plugins/firebase/store/_document'

export default class Event extends Document {
  constructor(argument) {
    super()
    this.data = {
      name: '',
      description: '',
      userId: ''
    }
    this.collection = store.collection('events')
    this.ready = this.init(argument)
  }
}
