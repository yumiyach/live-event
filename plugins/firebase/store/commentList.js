import { store } from '~/plugins/firebase/app'

class BoothList {
  collection
  constructor() {
    this.collection = store.collection('comments')
  }
  async getByBoothId(boothId, callback) {
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
  listenByBoothId(boothId, addCallback, deleteCallback) {
    this.collection
      .where('boothId', '==', boothId)
      .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          if (change.type === 'added') {
            addCallback({
              id: change.doc.id,
              data: change.doc.data()
            })
          }
          if (change.type === 'modified') {
            addCallback({
              id: change.doc.id,
              data: change.doc.data()
            })
          }
          if (change.type === 'removed') {
            deleteCallback(change.doc.id)
          }
        })
      })
  }
}
export default new BoothList()
