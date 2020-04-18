import { storage } from '~/plugins/firebase/app'
import Ref from '~/plugins/firebase/storage/_ref'
import { collectionName } from '~/plugins/firebase/config'

export default class ContentImage extends Ref {
  constructor(path, argument) {
    super()
    this.parentRef = storage.ref().child(collectionName.contentImage)
    this.ready = this.init(path, argument)
  }
}
