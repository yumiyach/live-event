import { store } from '~/plugins/firebase/app'

class BoothList {
  collection
  constructor() {
    this.collection = store.collection('booths')
  }
  async getByEventId(eventId, callback) {
    const snapShot = await this.collection
      .where('eventId', '==', eventId)
      .orderBy('createdAt', 'desc')
      .get()
    snapShot.forEach(async doc => {
      callback({
        id: doc.id,
        data: doc.data()
      })
    })
  }
}
export default new BoothList()
