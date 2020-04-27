import { pushObjectToList, getObjectFromList } from '~/plugins/functions'
import Booth from '~/plugins/firebase/store/booth'
import auth from '~/plugins/firebase/account/auth'

export const state = () => ({
  boothList: [
    {
      id: '1',
      data: {
        name: 'こぶんやさん',
        image:
          'https://intojapanwaraku.com/wp-content/uploads/2019/05/GMF0793ii0.png',
        itemList: [
          {
            name: 'とさにっき！',
            image:
              'https://images-na.ssl-images-amazon.com/images/I/51N8UiIo3EL._SX366_BO1,204,203,200_.jpg',
            description:
              '紀貫之女体化ドタバタギャグ。土佐旅行へ赴任した貫之が京都へ帰る途中、事件に巻き込まれます。',
            linkList: [
              {
                text: '通販',
                url: 'https://www.amazon.co.jp/dp/4043574207'
              },
              {
                text: 'サンプル',
                url:
                  'https://www.aozora.gr.jp/cards/000155/files/832_16016.html'
              }
            ]
          },
          {
            name: '源氏物語',
            image: 'https://m.media-amazon.com/images/I/61w4fOd-X3L.jpg',
            description:
              '光源氏×紫の上イチャラブNL。光源氏に過去の女がいたような描写があります注意。',
            linkList: [
              {
                text: '青空文庫',
                url:
                  'https://www.aozora.gr.jp/cards/000052/files/5016_9758.html'
              }
            ]
          }
        ],
        eventId: '1'
      }
    },
    {
      id: '2',
      data: {
        name: 'こぶんやさん2',
        image:
          'https://intojapanwaraku.com/wp-content/uploads/2019/05/GMF0793ii0.png',
        itemList: [],
        eventId: '1'
      }
    }
  ]
})

export const mutations = {
  addBooth(state, booth) {
    pushObjectToList(state.boothList, booth)
  }
}

export const getters = {
  boothListByEventId: state => eventId => {
    return state.boothList.filter(item => item.data.eventId === eventId)
  },
  boothById: state => boothId => {
    return getObjectFromList(state.boothList, boothId, {
      id: boothId,
      data: {},
      notFound: true
    })
  }
}

export const actions = {
  async getBooth({ getters, commit }, id) {
    let booth = getters.boothById(id)
    if (booth.notFound) {
      commit('addBooth', booth)
      booth = new Booth(id)
      await booth.ready
      commit('addBooth', booth)
    }
    return booth
  },
  async createBooth({ commit, dispatch }, data) {
    data.concluded.userId = auth.userId
    const booth = new Booth(data)
    await booth.ready
    commit('addBooth', booth)
    return booth
  }
}
