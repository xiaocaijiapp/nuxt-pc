import zhLanguage from '@/assets/lang/zh'
import jpLanguage from '@/assets/lang/jp'

export default {
  state: () => ({
    loginData: '',
    selectLanguage: 'jp',
    languageData: jpLanguage,
    placeData: '',
    // imageBasePath: 'https://image.stardaymart.com/',
    imageBasePath: 'https://image.stardaymart.com/',
    activeNavId: '',
    userflashcommonTime: '',
    specvalues: [],
    LOCATIONORIGIN: process.env.custom_mode === 'dev' ? 'http://localhost:9000/' : (process.env.custom_mode === 'test' ? 'http://192.168.0.242:8000/' : (process.env.custom_mode === 'pre' ? 'https://wwwpre.starday.jp' : 'https://www.starday.jp/')),
    showLoading: false,
    searchValue: '',
    searchselectType: '1'
  }),
  mutations: {
    setLoginData (state, data) {
      state.loginData = data
    },
    setLanguage (state, data) {
      state.selectLanguage = data
      if (data === 'zh') {
        state.languageData = zhLanguage
      } else {
        state.languageData = jpLanguage
      }
    },
    setPlaceData (state, data) {
      state.placeData = data
    },
    setActiveNavId (state, data) {
      state.activeNavId = data
    },
    setUserflashcommonTime (state, data) {
      state.userflashcommonTime = data
    },
    setSpecValues (state, data) {
      state.specvalues = data
    },
    setLoading (state, data) {
      state.showLoading = data
    },
    setSearchValue (state, data) {
      state.searchValue = data
    },
    setsearchselectType (state, data) {
      state.searchselectType = data
    }

  },
  getters: {
    getLoginData: state => state.loginData,
    getLanguageData: state => state.languageData,
    getLanguage: state => state.selectLanguage,
    getPlaceData: state => state.placeData,
    getImageBasePath: state => state.imageBasePath,
    getActiveNavId: state => state.activeNavId,
    getUserflashcommonTime: state => state.userflashcommonTime,
    specvalues: state => state.specvalues,
    getLOCATIONORIGIN: state => state.LOCATIONORIGIN,
    getLoading: state => state.showLoading,
    getSearchValue: state => state.searchValue,
    getsearchselectType: state => state.searchselectType
  },
  actions: {
    handleLogin ({ commit }, data) {
      commit('setLoginData', data)
    },
    handleLanguage ({ commit }, data) {
      commit('setLanguage', data)
    },
    handleLogout ({ commit }) {
      commit('setLoginData', '')
    },
    handlePlaceData ({ commit }, data) {
      commit('setPlaceData', data)
    },
    handleActiveNavId ({ commit }, data) {
      commit('setActiveNavId', data)
    },
    handleUserflashcommonTime ({ commit }, data) {
      commit('setUserflashcommonTime', data)
    },
    handleLoading ({ commit }, data) {
      commit('setLoading', data)
    },
    handleSearchValue ({ commit }, data) {
      commit('setSearchValue', data)
    },
    handlesearchselectType ({ commit }, data) {
      commit('setsearchselectType', data)
    }
  }
}
