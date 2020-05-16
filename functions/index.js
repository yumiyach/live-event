const functions = require('firebase-functions')
const axios = require('axios')
const cheerio = require('cheerio')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.getItemData = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', request.headers.origin)
  response.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')
  response.set('Access-Control-Allow-Headers', 'Content-Type, authorization')

  const url = request.query.url
  if (!url) {
    response.send('')
    return
  }
  const res = await axios.get(url)
  const html = res.data
  const $ = cheerio.load(html)

  const result = {
    title: $('title')
      .text()
      .replace(/^\s*|\s*$/gi, ''),
    imageUrl: $('meta[property="og:image"]').attr('content'),
    description: $('meta[property="og:description"]').attr('content'),
    siteName: $('meta[property="og:site_name"]').attr('content')
      ? $('meta[property="og:site_name"]').attr('content')
      : $('meta[name="twitter:site"]').attr('content')
      ? $('meta[name="twitter:site"]').attr('content')
      : 'リンク'
  }
  response.send(result)
  return result
})
