export default {
  state: () => ({
    keywords: [],
    companyLink: [],
    navigaterData: [],
    platInfo: ''
  }),
  mutations: {
    setKeyWords (state, data) {
      state.keywords = data
    },
    setCompanyLink (state, data) {
      state.companyLink = data
    },
    setNavigater (state, data) {
      state.navigaterData = data
    },
    setPlat (state, data) {
      state.platInfo = data
    }
  },
  getters: {
    getKeyWords: state => state.keywords,
    getCompanyLink: state => state.companyLink,
    getNavigater: state => state.navigaterData,
    getPlatInfo: state => state.platInfo
  },
  actions: {
    async keyWordsHandle ({ commit }, dataObj) {
      const { data } = await dataObj.axios.get('/starday-system/seo/keyword/now')
      // const { data } = await dataObj.axios.post('/starday-elasticsearch/search/random/tags', { keywords: '', sortOrder: (new Date().getTime() / 1000) - [1, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000][Math.floor(Math.random() * 10)] })
      commit('setKeyWords', data)
    },
    async companyLinkHandle ({ commit }, dataObj) {
      const { data } = await dataObj.axios.get('starday-system/seo/company/display')
      commit('setCompanyLink', data)
    },
    async navigaterHandle ({ commit }, dataObj) {
      const { data } = await dataObj.axios.get('starday-system/user/pc/info/getNavigationList')
      commit('setNavigater', data)
    },
    async platintHandle ({ commit }, dataObj) {
      const { data } = await dataObj.axios.get('starday-goods/user/seo/goods_category/getPlatInt')
      commit('setPlat', data)
    }
  }
}
