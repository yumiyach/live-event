import { store } from '~/plugins/firebase/app'

class BoothList {
  collection
  constructor() {
    this.collection = store.collection('events')
  }
  async getRecently(callback) {
    const snapShot = await this.collection.orderBy('startDate', 'desc').get()
    snapShot.forEach(async doc => {
      callback({
        id: doc.id,
        data: doc.data()
      })
    })
  }
}
export default new BoothList()
