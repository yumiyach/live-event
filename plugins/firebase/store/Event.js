import { store } from '~/plugins/firebase/app'
import Document from '~/plugins/firebase/store/_document'
import EventImage from '~/plugins/firebase/storage/EventImage'

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

  async create(data) {
    if (this.id) {
      return
    }
    const snapShot = await this.collection.add(data.concluded)
    this.id = snapShot.id
    this.ref = this.collection.doc(this.id)
    await this.getData()
    const cardImage = new EventImage(this.id, data.imageFile)
    await cardImage.ready
    await this.ref.update({
      imageUrl: cardImage.imageUrl
    })
    await this.getData()
  }
  async update(data) {
    if (!this.id) {
      return
    }
    await this.ref.update(data.concluded)
    if (data.imageFile) {
      const cardImage = new EventImage(this.id, data.imageFile)
      await cardImage.ready
      await this.ref.update({
        imageUrl: cardImage.imageUrl
      })
    }
    await this.getData()
  }
}
