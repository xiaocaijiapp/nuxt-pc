<template>
  <div class="page-error">
    <img src="@/assets/images/common/fail.png" alt="">
    <section>
      <p>{{ getLanguageData.common.datafail }}</p>
      <p>{{ error.reqUrl }}</p>
      <p>{{ error.message }}</p>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Error',
  props: ['error'],
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData'
    })
  },
  beforeMount () {
    if (this.error && this.error.statusCode === 404 && this.error.message === 'This page could not be found') {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.page-error{
  margin: 20px 0;
  padding: 20px;
  background-color: #fff;
  text-align: center;
  img{
    width: 242px;
    height: 242px;
  }
  section{
    p{
      height: 40px;
      line-height: 40px;
    }
    p:nth-of-type(2),p:nth-of-type(3){
      visibility: hidden;
    }
  }
}
</style>
