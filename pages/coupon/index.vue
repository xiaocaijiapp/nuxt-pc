<template>
  <div>
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">{{getLanguageData.storeText.indexPage}}</BreadcrumbItem>
        <BreadcrumbItem>{{getLanguageData.receivecoupon.receiveCoupon}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="couponlist">
      <div v-if="!couponList.length" class="nonebox">
        <img src="@/assets/images/none/coupon.png" alt="">
        <p>{{ getLanguageData.receivecoupon.nonexoupon }}</p>
      </div>
      <div class="list">
        <coupon v-for="(item,index) in couponList" :key="index" :item="item" @receiveHandle="receiveHandle" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import coupon from '@/components/receivecoupon/coupon'
export default {
  name: 'Index',
  components: {
    coupon
  },
  data () {
    return {
      couponList: []
    }
  },
  mounted () {
    this.requestList()
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  },
  methods: {
    requestList () {
      const vm = this
      vm.$axios.get('starday-activity/coupon/list').then((res) => {
        if (res.code === 200) {
          vm.couponList = res.data || []
        }
      })
    },
    receiveHandle (id) {
      const vm = this
      vm.$axios.post('starday-activity/user/coupon/receive?couponId=' + id).then((res) => {
        if (res.code === 200) {
          vm.$Message.success(vm.getLanguageData.receivecoupon.receivesuccess)
          vm.requestList()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.couponlist{
  background-color: #fff;
  padding: 30px 46px;
  margin-top: 15px;
  .nonebox{
    text-align: center;
    font-size: 20px;
    color: #999999;
    img{
      width: 242px;
      height: 242px;
    }

  }
}
</style>
