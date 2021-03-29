<template>
  <div class="payresult">
    <div class="breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.storeText.indexPage }}
        </BreadcrumbItem>
        <BreadcrumbItem>
          {{ getLanguageData.placeOrder.submitOrder }}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="resultbox">
      <div v-show="payResult==='success'" class="successbox">
        <img src="@/assets/images/placeorder/paysuccess.png" alt="">
        <p class="result">
          {{ getLanguageData.checkoutcounter.paysuccess }}
        </p>
        <div v-if="isPayOnDe" class="podbox">
          <p>{{ getLanguageData.checkoutcounter.needpay }} <span>{{ getCheckCounter.totalPayAmount }}<span style="font-size:12px;">円</span></span> <span class="tip">{{ getLanguageData.placeOrder.cod }}</span></p>
          <p>{{ getLanguageData.checkoutcounter.needpaypod }} <span>{{ codefee }}<span style="font-size:12px;">円</span></span></p>
        </div>
        <div class="btnbox">
          <p class="backindex">
            <nuxt-link to="/">
              {{ getLanguageData.checkoutcounter.backindex }}
            </nuxt-link>
          </p>
          <p class="lookorder">
            <nuxt-link to="/order/orderlist">
              {{ getLanguageData.checkoutcounter.lookorder }}
            </nuxt-link>
          </p>
        </div>
      </div>
      <div v-show="payResult==='error'" class="successbox">
        <img src="@/assets/images/placeorder/payerror.png" alt="">
        <p class="result">
          {{ getLanguageData.checkoutcounter.payerror }}
        </p>
        <div class="btnbox">
          <p class="lookorder">
            <nuxt-link to="/order/orderlist">
              {{ getLanguageData.checkoutcounter.lookorder }}
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
    <div class="maylikebox">
      <!--    猜你喜欢-->
      <section class="likebox">
        <section class="comtitle">
          <img src="@/assets/images/index/tleft.png" alt="">
          <strong>{{ getLanguageData.indexPage.mayalsolike }}</strong>
          <img src="@/assets/images/index/tright.png" alt="">
        </section>
        <section class="likecontent">
          <likegood v-for="(item,index) in dataList" :key="index" :goods-item="item" />
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import likegood from '@/components/goodscom/likegood'

export default {
  name: 'Index',
  data () {
    return {
      payResult: '',
      isPayOnDe: false,
      codefee: 0,
      searchForm: {
        pageNo: 1,
        pageSize: 30,
        sortOrder: 'desc',
        sorted: 0
      },
      dataList: [],
      total: 1,
      isLoading: false
    }
  },
  mounted () {
    // const vm = this
    if (this.$route.query.Status && this.$route.query.TransactionId) {
      this.payResult = this.$route.query.Status === 'Failure' ? 'error' : 'success'
      return
    }
    const _type = this.$route.query.type || 'success'
    this.payResult = _type
    if (this.$route.query.codefee) {
      this.isPayOnDe = true
      this.codefee = this.$route.query.codefee
    }
    this.requestLikeList()
    // document.querySelector('.appbox').onscroll = function (item) {
    //   if (vm.total > 30) {
    //     const _scrollTop = document.documentElement.scrollTop
    //     const _clientHeight = document.documentElement.clientHeight
    //     const _scrollHeight = document.documentElement.scrollHeight
    //     if (_scrollTop + _clientHeight > _scrollHeight - 1492 && vm.total > vm.dataList.length && !vm.isLoading) {
    //       vm.searchForm.pageNo = vm.searchForm.pageNo + 1
    //       vm.requestLikeList(true)
    //     }
    //   }
    // }
  },
  methods: {
    requestLikeList (bool) {
      const vm = this
      vm.$axios.post('starday-elasticsearch/search/goods', vm.searchForm).then((res) => {
        if (res.code === 200) {
          vm.total = res.data.totalRows
          if (bool) {
            vm.dataList = [...vm.dataList, ...res.data.rows]
          } else {
            vm.dataList = res.data.rows
          }
          vm.isLoading = false
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getCheckCounter: 'getCheckCounter',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  },
  beforeDestroy () {
    // document.querySelector('.appbox').onscroll = ''
  },
  components: {
    likegood
  }
}
</script>

<style scoped lang="scss">
  .payresult {
    .breadcrumb {
      height: 64px;
      line-height: 64px;

      a {
        color: #333333;
      }
    }

    .resultbox {
      background-color: #fff;
      padding: 40px 0;
      text-align: center;
      img{
        width: 124px;
        height: 124px;
      }
      .result{
        font-size: 22px;
        font-weight: 400;
        color: #20232c;
      }
      .podbox{
        padding: 10px 0;
        line-height: 30px;
        span{
          color: #FF5D19;
          padding: 0 15px;
        }
        .tip{
          color: #FFFFFF;
          display: inline-block;
          font-size: 12px;
          height: 22px;
          line-height: 22px;
          background-color: #FF5D19;
        }
      }
      .btnbox{
        margin-top: 40px;
        p{
          display: inline-block;
          width: 168px;
          height: 46px;
          line-height: 46px;
          cursor: pointer;
        }
        .backindex{
          border: 1px solid #999999;
          border-radius: 33px;
          margin-right: 76px;
          a{
            color: #999999;
          }
        }
        .lookorder{
          border: 1px solid #FF5D19;
          border-radius: 33px;
          a{
            color: #FF5D19;
          }
        }
      }
    }
    .maylikebox{
      .likebox {
        margin-top: 37px;

        .comtitle {
          text-align: center;

          img {
            width: 35px;
            height: 35px;
            vertical-align: middle;
          }

          strong {
            display: inline-block;
            vertical-align: middle;
            margin: 0 24px;
          }
        }

        .likecontent {
          margin-top: 28px;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          margin-left: -10px;
          margin-right: -10px;
        }

      }

    }
  }
</style>
