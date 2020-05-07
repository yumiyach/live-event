import { store } from '~/plugins/firebase/app'

class BoothList {
  collection
  constructor() {
    this.collection = store.collection('comments')
  }
  async getByEventId(boothId, callback) {
    const snapShot = await this.collection
      .where('boothId', '==', boothId)
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
