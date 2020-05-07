import { store } from '~/plugins/firebase/app'
import Document from '~/plugins/firebase/store/_document'

export default class Comment extends Document {
  constructor(argument) {
    super()
    this.collection = store.collection('comments')
    this.ready = this.init(argument)
  }
}
