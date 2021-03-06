import { store } from '~/plugins/firebase/app'

class SpaceList {
  collection
  constructor() {
    this.collection = store.collection('events')
  }
  async getRecently(callback) {
    const snapShot = await this.collection.where('isPrivate','==', false).orderBy('startDate', 'desc').get()
    snapShot.forEach(async doc => {
      callback({
        id: doc.id,
        data: doc.data()
      })
    })
  }
}
export default new SpaceList()
