import { store } from '~/plugins/firebase/app'
import Document from '~/plugins/firebase/store/_document'

export default class Booth extends Document {
  constructor(argument) {
    super()
    this.data = {
      name: '',
      description: '',
      imageUrl: '',
      userId: '',
      itemList: [],
      isOnline: false
    }
    this.collection = store.collection('booths')
    this.ready = this.init(argument)
  }
}
