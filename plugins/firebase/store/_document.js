export default class Document {
  collection
  ref
  id
  data
  ready

  async init(argument) {
    if ((typeof argument).match(/string/i)) {
      this.id = argument
      this.ref = this.collection.doc(this.id)
      await this.getData()
    } else if ((typeof argument).match(/object/i)) {
      await this.create(argument)
    }
  }

  async create(data) {
    if (this.data || this.id) {
      return
    }
    const snapShot = await this.collection.add(data)
    this.id = snapShot.id
    this.ref = this.collection.doc(this.id)
    await this.getData()
  }

  async update(data) {
    if (!data || !this.id) {
      return
    }
    await this.ref.set(data)
    await this.getData()
  }

  async getData() {
    if (this.id) {
      const snapShot = await this.collection.doc(this.id).get()
      if (snapShot.exists) {
        this.data = snapShot.data()
      } else {
        this.data = this.data ? this.data : {}
        this.data.notFound = true
      }
    }
    return this.data
  }

  async delete() {
    await this.ref.delete()
  }
}
