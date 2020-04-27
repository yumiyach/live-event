export default class Ref {
  path
  imageUrl
  parentRef
  ref
  ready

  async init(path, imageFile) {
    if (!imageFile) {
      this.path = path
      this.ref = this.parentRef.child(path)
      this.imageUrl = await this.ref.getDownloadURL()
    } else {
      await this.create(path, imageFile)
    }
  }

  async create(path, imageFile) {
    try {
      await this.parentRef.child(path).put(imageFile)
      this.path = path
      this.ref = this.parentRef.child(path)
      this.imageUrl = await this.ref.getDownloadURL()
    } catch (err) {
      console.error(err)
    }
  }

  async delete() {
    await this.ref.delete()
  }

  toBlob(base64) {
    const bin = atob(base64.replace(/^.*,/, ''))
    const buffer = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i)
    }
    // Blobを作成
    const blob = new Blob([buffer.buffer], {
      type: 'image/png'
    })
    return blob
  }
}
