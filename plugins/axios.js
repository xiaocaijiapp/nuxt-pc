import { Message } from 'view-design'
import utils from '@/assets/js/getCookie'
export default function ({ $axios, store, next }) {
  $axios.onRequest((config) => {
    store.dispatch('handleLoading', true)
    config.headers[config.method].Authorization = store.getters.getLoginData ? store.getters.getLoginData.token : ''
    config.headers[config.method].platform = '1'
    if (store.getters.getShareObj) {
      config.headers[config.method].shareId = store.getters.getShareObj.shareId
      config.headers[config.method].shareTime = store.getters.getShareObj.shareTime
      config.headers[config.method].shareSource = store.getters.getShareObj.shareSource
    }
    if (store.getters.getLanguage && config.url !== '/starday-goods/user/goods_category/list') {
      config.headers[config.method].lang = (store.getters.getLanguage === 'zh') ? 'zh_CN' : 'ja_JP'
    }
    if (store.getters.getTgid) {
      config.headers[config.method].tgid = store.getters.getTgid
    }
  })
  $axios.onResponse((response) => {
    store.dispatch('handleLoading', false)
    if (response.data.code && response.data.code !== '200' && response.data.code !== 200) {
      Message.error({
        content: response.data.message,
        duration: 2
      })
    }
    return Promise.resolve(response.data)
  })

  $axios.onError((error) => {
    store.dispatch('handleLoading', false)
    if (error.response && (error.response.data.code === 401 || error.response.data.code === 403)) {
      Message.error({
        content: error.response.data.message,
        duration: 2
      })
      store.dispatch('handleLogin', '')
      utils.removeCookie('token')
      next('/login')
    } else {
      Message.error({
        content: error.response.data.message,
        duration: 2
      })
    }
    return Promise.reject(error)
  })
}
