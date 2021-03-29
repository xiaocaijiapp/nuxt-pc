<template>
  <div class="shoppingcart">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.storeText.indexPage }}
        </BreadcrumbItem>
        <BreadcrumbItem>{{ getLanguageData.shoppingcart.shoppingcart }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="contentbox">
      <div class="pagetitle">
        {{ getLanguageData.shoppingcart.shoppingcart }}
      </div>
      <div v-if="dataList.length" class="tablebox">
        <div class="tableHead">
          <div class="first">
            <Checkbox v-model="checkAll" @on-change="changeAll"></Checkbox>
          </div>
          <div class="two">
            {{getLanguageData.shoppingcart.goodsName}}
          </div>
          <div class="three">
            {{getLanguageData.shoppingcart.rule}}
          </div>
          <div class="three">
            {{getLanguageData.storeText.price}}
          </div>
          <div class="three">
            {{getLanguageData.goodsText.stockNum}}
          </div>
          <div class="three">
            {{getLanguageData.shoppingcart.smalltotal}}
          </div>
          <div class="three">
            {{getLanguageData.operate.operate}}
          </div>
        </div>
        <div v-for="(item, index) in dataList" :key="index" class="tableBody">
          <div class="storeBox">
            <div class="checkbox">
              <Checkbox v-model="item.checked" @on-change="storeCheck($event, index)"></Checkbox>
            </div>
            <span>{{item.storeName}}</span>
          </div>
          <div class="goodbox" v-for="(shipItem, k) in item.shopItems" :key="k">
            <div class="goodFirst">
              <Checkbox v-model="shipItem.checked" class="checkbox" @on-change="goodCheck($event, index)"></Checkbox>
            </div>
            <div class="goodTwo">
              <img :src="getImageBasePath + shipItem.skuImage" alt="" @click="goDetail(shipItem.spuId)">
              <div class="rightbox">
                <p @click="goDetail(shipItem.spuId)">{{shipItem.goodsTitle}}</p>
                <p>{{shipItem.skuValue}}</p>
              </div>
            </div>
            <div class="goodThree">
              {{shipItem.skuValue}}
            </div>
            <div class="goodThree font">
              {{shipItem.price}}円
            </div>
            <div class="goodThree">
              <InputNumber :min="1" :max="shipItem.skuInventory" v-model="shipItem.num" @on-change="inputChange"></InputNumber>
            </div>
            <div class="goodThree fontColor">
              {{ shipItem.price * shipItem.num }}円
            </div>
            <div class="goodThree">
              <span style="cursor:pointer;" @click="deleteGood(index, k)">{{getLanguageData.operate.delete}}</span>
            </div>
          </div>
        </div>
        <div class="footbox">
          <div @click="clearCart">
            {{getLanguageData.shoppingcart.clearshoppcar}}
          </div>
          <div>
            <span>
              {{getLanguageData.shoppingcart.selectGoods.replace('N', checkPieces)}}
            </span>
            <span style="margin:0 20px;">
              {{getLanguageData.shoppingcart.total}}
            </span>
            <span class="noSame">
              {{totalPrice}}円
            </span>
          </div>
        </div>
      </div>

      <div class="paybox" v-if="dataList.length">
        <div class="btnbox" @click="goPayHandle">
          {{getLanguageData.shoppingcart.gopay}}
        </div>
      </div>
      <div v-if="!dataList.length" class="nonebox">
        <img src="@/assets/images/shopcar/none.png" alt="">
        <p>{{ getLanguageData.shoppingcart.noneshop }} </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Index',
  data () {
    return {
      dataList: [],
      checkAll: false,
      totalPrice: 0,
      checkPieces: 0
    }
  },
  mounted () {
    // console.log('getAddBuyCart00000', this.getAddBuyCart)
    this.dataList = this.getAddBuyCart
    this.getCheckAllFlag()
    this.getTotalPrice()
    this.getCount()
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getImageBasePath: 'getImageBasePath',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN',
      getAddBuyCart: 'getAddBuyCart'
    })
  },
  methods: {
    ...mapActions({
      handlePlaceData: 'handlePlaceData',
      handleAddBuyCart: 'handleAddBuyCart'
    }),
    changeAll (flag) {
      const vm = this
      // console.log('flag---', flag)
      if (flag) {
        vm.dataList.forEach((item, index) => {
          item.checked = true
          item.shopItems.forEach((chItem, chIndex) => {
            chItem.checked = true
          })
        })
      } else {
        vm.dataList.forEach((item, index) => {
          item.checked = false
          item.shopItems.forEach((chItem, chIndex) => {
            chItem.checked = false
          })
        })
      }
      this.getTotalPrice()
      this.getCount()
    },
    storeCheck (flag, index) {
      if (flag) {
        this.dataList[index].shopItems.forEach((item, i) => {
          item.checked = true
        })
      } else {
        this.dataList[index].shopItems.forEach((item, i) => {
          item.checked = false
        })
      }
      this.getCheckAllFlag()
      this.getTotalPrice()
      this.getCount()
    },
    goodCheck (flag, index) {
      const _index = this.dataList[index].shopItems.findIndex((item) => {
        return item.checked === false
      })
      if (_index > -1) {
        this.dataList[index].checked = false
      } else {
        this.dataList[index].checked = true
      }
      this.getCheckAllFlag()
      this.getTotalPrice()
      this.getCount()
    },
    inputChange () {
      this.getTotalPrice()
      this.getCount()
    },
    clearCart () {
      this.dataList = []
      this.handleAddBuyCart(this.dataList || [])
    },
    // 判断是否取消全选按钮
    getCheckAllFlag () {
      const _index = this.dataList.findIndex((item) => {
        return item.checked === false
      })
      if (_index > -1) {
        this.checkAll = false
      } else {
        this.dataList.forEach((item, index) => {
          const _chindex = item.shopItems.findIndex((chitem) => {
            return chitem.checked === false
          })
          if (_chindex > -1) {
            this.checkAll = false
          } else {
            this.checkAll = true
          }
        })
      }
    },
    goDetail (id) {
      this.$router.push('/product/' + id)
    },
    // 获取选中的件数
    getCount () {
      const vm = this
      vm.checkPieces = 0
      vm.dataList.forEach((item, index) => {
        item.shopItems.forEach((chItem, chIndex) => {
          if (chItem.checked) {
            vm.checkPieces = vm.checkPieces + chItem.num * 1
          }
        })
      })
    },
    // 小计的金额
    getTotalPrice () {
      const vm = this
      vm.totalPrice = 0
      vm.dataList.forEach((item, index) => {
        item.shopItems.forEach((chItem, chIndex) => {
          if (chItem.checked) {
            vm.totalPrice = vm.totalPrice + (chItem.price * chItem.num)
          }
        })
      })
    },
    deleteGood (index, i) {
      this.dataList[index].shopItems.splice(i, 1)
      this.handleAddBuyCart(this.dataList || [])
    },
    goPayHandle () {
      if (!this.checkPieces) {
        return this.$Message.warning(this.getLanguageData.shoppingcart.selectGoodNOne)
      }
      this.handleAddBuyCart(this.dataList || [])
      this.$router.push('/shipInfo?type=1')
    }
  }
}
</script>

<style scoped lang="scss">
  .shoppingcart {
    .breadcrumb {
      height: 46px;
      line-height: 46px;
    }

    .contentbox {
      background-color: #fff;
      padding: 20px 28px;

      .pagetitle {
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        margin-bottom: 28px;
      }
      .tablebox{
        width: 100%;
        .tableHead{
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height:40px;
          font-size:14px;
          // line-height: 164px;
          color: #515A6E;
          background-color: #f8f8f9;
          .first{
            width: 4%;
            text-align: center;
          }
          .two{
            width: 31%;
          }
          .three{
            width: 13%;
            text-align: center;
          }
        }
        .tableBody{
          .storeBox{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            height: 48px;
            background-color: #fff;
            font-size: 14px;
            font-weight: 600;
            // line-height: 48px;
            border-top:1px solid #e8eaec;
            border-bottom: 1px solid #e8eaec;
            color: #515A6E;
            .checkbox{
              width: 4%;
              text-align: center;
            }
            span{
              flex: 1;
            }
          }
          .goodbox{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 15px 0;
            .goodFirst{
              width: 4%;
              text-align: center;
            }
            .goodTwo{
              width: 31%;
              display: flex;
              justify-content: flex-start;
              img{
                width: 100px;
                height: 100px;
                cursor: pointer;
              }
              .rightbox{
                flex: 1;
                margin-left: 10px;
                p:nth-of-type(1){
                  width: 300px;
                  line-height: 36px;
                  font-size: 12px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  cursor: pointer;
                }
                p:nth-of-type(2){
                  display: inline-block;
                  margin-top: 6px;
                  padding: 4px 12px;
                  background: rgb(244, 244, 244);
                  font-size: 12px;
                }
              }
            }
            .goodThree{
              width: 13%;
              text-align: center;
            }
            .font{
              font-size: 18px;
              font-weight: 700;
              color:#515A6E;
            }
            .fontColor{
              font-size: 18px;
              font-weight: 700;
              color: rgb(242, 105, 54);
            }
          }
        }
        .footbox{
            height: 60px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 50px;
            background-color: #e0e0e0;
            >div:nth-of-type(1){
              font-size: 14px;
              color: #515A6E;
              cursor: pointer;
            }
            >div:nth-of-type(2){
              font-size: 14px;
              color: #515A6E;
              .noSame{
                color: rgb(242, 105, 54);
              }
            }
          }
      }
      .paybox{
        width: 100%;
        margin-top: 40px;
        .btnbox{
          margin:0 auto;
          width: 416px;
          background-color: #e76636;
          height: 54px;
          text-align: center;
          color: #fff;
          border-radius: 2px;
          cursor: pointer;
          font-size: 14px;
          line-height: 54px;
        }
      }
      .nonebox {
        text-align: center;
        font-size: 20px;
        color: #999999;

        img {
          width: 200px;
          height: 200px;
        }

      }
    }
  }
</style>
