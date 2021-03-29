import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    reducer (val) {
      return {
        user: val.user,
        pay: val.pay
      }
    }
  })(store)
}
