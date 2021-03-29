export default {
  state: () => ({
    shareObj: '',
    tgid: '',
    addBuyCart: []
  }),
  mutations: {
    setShareObj (state, data) {
      state.shareObj = data
    },
    setTgid (state, data) {
      state.tgid = data
    },
    setAddBuyCart (state, data) {
      state.addBuyCart = data
    }
  },
  getters: {
    getShareObj: state => state.shareObj,
    getTgid: state => state.tgid,
    getAddBuyCart: state => state.addBuyCart
  },
  actions: {
    handleShareObj ({ commit }, data) {
      commit('setShareObj', data)
    },
    handleTgid ({ commit }, data) {
      commit('setTgid', data)
    },
    handleCollection ({ commin }, dataObj) {
      dataObj.axios.post('starday-info/user/dataCollection', {
        elType: dataObj.elType,
        pageName: dataObj.pageName,
        goodsId: dataObj.goodsId,
        storeId: dataObj.storeId
      })
    },
    handleAddBuyCart ({ commit }, data) {
      commit('setAddBuyCart', data)
    }
  }
}
