import { store } from '~/plugins/firebase/app'
import Document from '~/plugins/firebase/store/_document'
import SpaceImage from '~/plugins/firebase/storage/SpaceImage'

export default class Space extends Document {
  constructor(argument) {
    super()
    this.data = {
      name: '',
      description: '',
      headerImageUrl: '',
      userId: '',
      itemList: [],
      isOnline: false
    }
    this.collection = store.collection('spaces')
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
    if (data.headerImageFile) {
      const headerImage = new SpaceImage(
        this.id + '/header',
        data.headerImageFile
      )
      await headerImage.ready
      await this.ref.update({
        headerImageUrl: headerImage.imageUrl
      })
    }
    const itemListFunc = []
    for (const index in data.itemList) {
      itemListFunc.push(this.createItemData(data.itemList[index], index))
    }
    const itemList = await Promise.all(itemListFunc)
    await this.ref.update({
      itemList: itemList
    })
    await this.getData()
  }

  async update(data) {
    if (!this.id) {
      return
    }
    const itemListFunc = []
    for (const index in data.itemList) {
      itemListFunc.push(this.createItemData(data.itemList[index], index))
    }
    const itemList = await Promise.all(itemListFunc)
    if (data.headerImageFile) {
      const headerImage = new SpaceImage(
        this.id + '/header',
        data.headerImageFile
      )
      await headerImage.ready
      await this.ref.update({
        ...data.concluded,
        itemList: itemList,
        headerImageUrl: headerImage.imageUrl
      })
    } else {
      await this.ref.update({
        ...data.concluded,
        itemList: itemList
      })
    }
    await this.ref.update({})
    await this.getData()
  }

  async createItemData(item, index) {
    if (!item.imageFile) {
      return {
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        sampleUrl: item.sampleUrl,
        linkList: item.linkList
      }
    } else {
      const itemImage = new SpaceImage(
        this.id + '/itemList/' + index,
        item.imageFile
      )
      await itemImage.ready
      return {
        name: item.name,
        description: item.description,
        imageUrl: itemImage.imageUrl,
        sampleUrl: item.sampleUrl,
        linkList: item.linkList
      }
    }
  }
}
