export function pushObjectToList(list, add) {
  const index = list.findIndex(item => item.id === add.id)
  if (index !== -1) {
    list.splice(index, 1)
  }
  list.push({
    id: add.id,
    data: add.data
  })
}

export function getObjectFromList(list, id, notFound) {
  const item = list.find(item => item.id === id)
  if (item) {
    return item
  }
  return notFound
}

export function deleteFromList(list, id) {
  const index = list.findIndex(item => item.id === id)
  if (index !== -1) {
    list.splice(index, 1)
  }
}

var reRegExp = /[\\^$.*+?()[\]{}|]/g,
  reHasRegExp = new RegExp(reRegExp.source)

export function escapeRegExp(string) {
  return string && reHasRegExp.test(string)
    ? string.replace(reRegExp, '\\$&')
    : string
}

export function headTags({ title, description, imageUrl }) {
  return {
    title: title,
    meta: [
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: title
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: title
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      },
      {
        hid: 'description',
        name: 'description',
        content: description
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: description
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: imageUrl
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: imageUrl
      }
    ]
  }
}
