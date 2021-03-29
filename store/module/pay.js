export default {
  state: () => ({
    checkCounter: {},
    buyNowGood: {}
  }),
  mutations: {
    setCheckCounter (state, data) {
      state.checkCounter = data
    },
    setBuyNowGood (state, data) {
      state.buyNowGood = data
    }
  },
  getters: {
    getCheckCounter: state => state.checkCounter,
    getBuyNowGood: state => state.buyNowGood
  },
  actions: {
    handleCheckCounter ({ commit }, data) {
      commit('setCheckCounter', data)
    },
    handleBuyNowGood ({ commit }, data) {
      commit('setBuyNowGood', data)
    }
  }
}
