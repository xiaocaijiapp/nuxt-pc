import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    storage: window.sessionStorage,
    reducer (val) {
      return {
        statistics: val.statistics
      }
    }
  })(store)
}
