export default {
    methods: {
      share(target, comment) {
        if (!comment) {
          comment = ''
        }
        let shareUrl = ''
        if (target === 'twitter') {
          const baseUrl = 'https://twitter.com/intent/tweet?'
          const text = ['text', comment]
          const url = ['url', location.href]
          const query = new URLSearchParams([text, url]).toString()
          shareUrl = `${baseUrl}${query}`
        } else if (target === 'facebook') {
          const baseUrl = 'https://www.facebook.com/sharer/sharer.php?'
          const url = ['u', location.href]
          const query = new URLSearchParams([url]).toString()
          shareUrl = `${baseUrl}${query}`
        } else if (target === 'line') {
          const baseUrl = 'https://social-plugins.line.me/lineit/share?url='
          const url = ['u', location.href]
          const query = new URLSearchParams([url]).toString()
          shareUrl = `${baseUrl}${query}`
        }
        window.open(
          shareUrl,
          'share',
          'width=600, height=400, personalbar=0, toolbar=0, scrollbars=1, sizable=1'
        )
      }
    }
  }