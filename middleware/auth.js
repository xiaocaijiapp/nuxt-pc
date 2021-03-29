import utils from '@/assets/js/getCookie'
import { routerAuth } from './routerAuthConfig'
export default async function ({ route, req, store, redirect, app }) {
  if (!store.getters.getUserflashcommonTime || ((new Date().getTime() - store.getters.getUserflashcommonTime) / 1000 / 60 / 20) > 1) {
    await store.dispatch('keyWordsHandle', { axios: app.$axios })
    await store.dispatch('companyLinkHandle', { axios: app.$axios })
    await store.dispatch('navigaterHandle', { axios: app.$axios })
    await store.dispatch('platintHandle', { axios: app.$axios })
    await store.dispatch('handleUserflashcommonTime', new Date().getTime())
  }
  const isClient = process.client
  const isServer = process.server
  let redirectURL = '/login'
  let path = ''
  let token = ''
  if (isServer) {
    const cookies = utils.getcookiesInServer(req)
    path = req.originalUrl
    token = cookies.token ? cookies.token : ''
    app.$axios.defaults.headers.Authorization = token
  }
  if (isClient) {
    token = utils.getcookiesInClient('token')
    path = route.path
  }
  if (path) {
    redirectURL = '/login?ref=' + path
  }
  // 需要进行权限判断的页面开头
  // if (token && !storetoken) {
  //   utils.removeCookie('token')
  //   store.dispatch('handleLogin', '')
  //   redirect('/login')
  //   return
  // } else if (!token && storetoken) {
  //   utils.setCookie('token', storetoken)
  //   redirect('/')
  //   return
  // }
  if (!token && !routerAuth().includes(route.name)) {
    redirect('/login?ref=' + redirectURL)
  } else if (token && (route.name === 'login')) {
    redirect('/')
  }
}
