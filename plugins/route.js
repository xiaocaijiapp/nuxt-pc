import { configuration } from '@/assets/js/routenamemeta'
import Cookie from 'js-cookie'
export default ({ app, store, $axios }) => {
  app.router.afterEach((to, from, next) => {
    const _inparams = {
      axios: $axios,
      elType: 0,
      pageName: configuration[to.name],
      goodsId: '',
      storeId: ''
    }
    const isClient = process.client
    const _outparams = {
      axios: $axios,
      elType: 1,
      pageName: configuration[from.name],
      goodsId: '',
      storeId: ''
    }
    if (to.name === 'product-goodsid') {
      _inparams.goodsId = to.params.goodsid
    }
    if (from.name === 'product-goodsid') {
      _outparams.goodsId = from.params.goodsid
    }
    if (to.name === 'store-storeid') {
      _inparams.storeId = to.params.storeid
    }
    if (from.name === 'store-storeid') {
      _outparams.storeId = from.params.storeid
    }
    if (to.name === 'promotionpage-promotiongoods-id') {
      _inparams.pageName = configuration[to.name] + '/' + to.params.id
    }
    if (from.name === 'promotionpage-promotiongoods-id') {
      _outparams.pageName = configuration[from.name] + '/' + from.params.id
    }
    if (to.name === 'promotionpage-promotionpicture-id') {
      _inparams.pageName = configuration[to.name] + '/' + to.params.id
    }
    if (from.name === 'promotionpage-promotionpicture-id') {
      _outparams.pageName = configuration[from.name] + '/' + from.params.id
    }
    if (isClient) {
      store.dispatch('handleCollection', _inparams)
      if (from.name) {
        store.dispatch('handleCollection', _outparams)
      }
    }
    if (store.getters.getLoginData && !Cookie.get('token')) {
      Cookie.set('token', store.getters.getLoginData.token)
      location.reload()
      return
    }
    if (!store.getters.getLoginData && Cookie.get('token')) {
      Cookie.remove('token')
    }
    if (to.name === 'login' && store.getters.getLoginData && Cookie.get('token')) {
      next('/')
    }
  })
}
