<template>
  <div class="thirdparty" />
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'Thirdparty',
  layout: 'common',
  mounted () {
    const vm = this
    if (this.$route.query && this.$route.query.code && this.$route.query.state) {
      const _url = location.origin + '/login/thirdparty'
      vm.$axios.post('/starday-auth/login/user/third/oauth/login.do', { code: vm.$route.query.code, oauthType: (location.href.includes('googleapis') ? '2' : '1'), redirectUri: _url, source: '1' }).then((res) => {
        if (res.code === 200) {
          vm.$store.dispatch('handleLogin', res.data)
          Cookie.set('token', res.data.token)
          vm.$router.push('/')
        }
      })
    } else {
      vm.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
  .thirdparty{
    height: 500px;
  }
</style>
