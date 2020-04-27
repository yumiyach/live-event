import { storage } from '~/plugins/firebase/app'
import Ref from '~/plugins/firebase/storage/_ref'

export default class EventImage extends Ref {
  constructor(path, argument) {
    super()
    this.parentRef = storage.ref().child('event_image')
    this.ready = this.init(path, argument)
  }
}
