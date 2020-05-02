import { store } from '~/plugins/firebase/app'
import Document from '~/plugins/firebase/store/_document'
import BoothImage from '~/plugins/firebase/storage/BoothImage'

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

  async create(data) {
    console.log(data)
    if (this.id) {
      return
    }
    const snapShot = await this.collection.add(data.concluded)
    this.id = snapShot.id
    this.ref = this.collection.doc(this.id)
    await this.getData()
    if (data.headerImageFile) {
      const headerImage = new BoothImage(
        this.id + '/header',
        data.headerImageFile
      )
      await headerImage.ready
      this.ref.update({
        headerImageUrl: headerImage.imageUrl
      })
    }
    const itemListFunc = []
    for (const index in data.itemList) {
      itemListFunc.push(this.createItemData(data.itemList[index], index))
    }
    const itemList = await Promise.all(itemListFunc)
    console.log(itemList)
    await this.ref.update({
      itemList: itemList
    })
    await this.getData()
  }

  async createItemData(item, index) {
    if (!item.imageFile) {
      return {
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        linkList: item.linkList
      }
    } else {
      const itemImage = new BoothImage(
        this.id + '/itemList/' + index,
        item.imageFile
      )
      await itemImage.ready
      return {
        name: item.name,
        description: item.description,
        imageUrl: itemImage.imageUrl,
        linkList: item.linkList
      }
    }
  }
}
