import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import pay from './module/pay'
import statistics from './module/statistics'
import modeCommon from './module/modeCommon'
Vue.use(Vuex)
const createStore = () => {
  return new Vuex.Store({
    state: {
      //
    },
    mutations: {
      //
    },
    actions: {

    },
    modules: {
      user, pay, statistics, modeCommon
    }
  })
}

export default createStore
