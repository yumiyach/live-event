export default class Ref {
  path
  imageUrl
  parentRef
  ref
  ready

  async init(path, imageDataUrl) {
    if (!imageDataUrl) {
      this.path = path
      this.ref = this.parentRef.child(path)
      this.imageUrl = await this.ref.getDownloadURL()
    } else {
      await this.create(path, imageDataUrl)
    }
  }

  async create(path, imageDataUrl) {
    try {
      if (typeof imageDataUrl.match(/string/i)) {
        const imageBlob = this.toBlob(imageDataUrl)
        await this.parentRef.child(path).put(imageBlob)
        this.path = path
        this.ref = this.parentRef.child(path)
        this.imageUrl = await this.ref.getDownloadURL()
      }
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
