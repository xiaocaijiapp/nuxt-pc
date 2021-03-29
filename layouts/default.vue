<template>
  <div ref="layoutmain" class="appbox">
    <section class="pageheaderbox">
      <div class="pageheader">
        <!-- <p @click="openSettleHandle">
          {{ getLanguageData.layoutHeader.supplierSettle }}
        </p> -->
        <p @click="shareHandle">
          {{ getLanguageData.layoutHeader.share }}
        </p>
        <p class="leftcontentitem" @click="toggleLanguageHandle">
          {{ getLanguage==='zh'?getLanguageData.layoutHeader.jpLanguage:getLanguageData.layoutHeader.zhLanguage }}
        </p>
        <div class="leftcontentitem">
          <Tooltip placement="bottom" theme="light" style="margin: 0">
            <span> {{ getLanguageData.layoutHeader.downloadApp }}</span>
            <section slot="content" style="margin: 0;">
              <img
                style="width: 120px;height: 120px;"
                src="@/assets/images/layout/code.png"
                alt=""
              >
            </section>
          </Tooltip>
        </div>
        <p class="leftcontentitem downloadApp" style="line-height:12px;" @click="goMessageList">
          <Badge v-if="noReadNum > 0" dot>
            <a href="#" class="demo-badge">{{ getLanguageData.layoutHeader.message }}</a>
          </Badge>
          <span v-else>{{ getLanguageData.layoutHeader.message }}</span>
        </p>
        <p class="leftcontentitem">
          <nuxt-link to="/order/orderlist">
            {{ getLanguageData.layoutHeader.myorder }}
          </nuxt-link>
        </p>
        <p class="leftcontentitem" @click="routerToRegister">
          {{ (getLoginData && getLoginData.token)?getLanguageData.layoutHeader.hello +'：' +
            getLoginData.username:getLanguageData.loginpage.register }}
          <Icon v-show="getLoginData" type="md-log-out" color="#999999" size="18" @click.stop="logoutHandle" />
        </p>
      </div>
    </section>
    <section class="pagesearchbox">
      <div class="pagesearch">
        <div class="searchtop">
          <nuxt-link to="/">
            <img src="@/assets/images/layout/searchlogo.png" alt="">
          </nuxt-link>
        </div>
        <div class="searchbox changeivesearch">
          <Input
            :value="getSearchValue"
            search
            enter-button
            size="large"
            :placeholder="getLanguageData.layoutHeader.searchholder"
            @on-search="searchHandle"
          >
          <Select slot="prepend" v-model="selectType" style="width: 120px;">
            <Option value="1">
              {{ getLanguageData.layoutHeader.product }}
            </Option>
            <Option value="2">
              {{ getLanguageData.layoutHeader.store }}
            </Option>
          </Select>
          </Input>
          <section>
            <span
              v-for="(item,index) in getKeyWords"
              v-show="getKeyWords"
              :key="index"
              class="sectionitem"
              @click="routerToSearch(item)"
            >
              {{ item }}
            </span>
          </section>
        </div>
        <div class="menulist">
          <nuxt-link to="/personal/mycoupon" class="menulistitem">
            <img src="@/assets/images/layout/coupon.png" alt="">
            <b>{{ getLanguageData.layoutHeader.coupon }}</b>
          </nuxt-link>
          <nuxt-link to="/personal/attentiongoods" class="menulistitem">
            <img src="@/assets/images/layout/love.png" alt="">
            <b>{{ getLanguageData.layoutHeader.collect }}</b>
          </nuxt-link>
          <!-- <nuxt-link to="/shoppingcart" class="menulistitem">
            <img src="@/assets/images/layout/shopcar.png" alt="">
            <b>{{ getLanguageData.layoutHeader.shopcar }}</b>
          </nuxt-link> -->
          <div style="display:inline-block;" class="menulistitem" @click="goBuyCart">
            <img src="@/assets/images/layout/shopcar.png" alt="">
            <b>{{ getLanguageData.layoutHeader.shopcar }}</b>
          </div>
          <nuxt-link class="menulistitem" to="/personal">
            <img src="@/assets/images/layout/user.png" alt="">
            <b>{{ (getLoginData &&
              getLoginData.token)?getLanguageData.layoutHeader.my:getLanguageData.layoutHeader.login }}</b>
          </nuxt-link>
        </div>
      </div>
      <div class="pagetype">
        <b @click="routerToAllType">
          <img src="@/assets/images/layout/type.png" alt="">
          <strong>{{ getLanguageData.layoutHeader.alltype }}</strong>
        </b>
        <section
          v-show="getNavigater && getNavigater.length"
          :class="!getActiveNavId?'activenav':''"
          @click="handleActiveNavId('')"
        >
          <nuxt-link to="/">
            NEW
          </nuxt-link>
        </section>
        <section
          v-for="(item,index) in getNavigater"
          :key="index"
          :class="getActiveNavId===item.id?'activenav':''"
          @click="navClickHandle(item)"
        >
          {{ getLanguage==='zh'?item.title:item.titleJa }}
        </section>
      </div>
    </section>
    <div class="pagebox">
      <Nuxt />
    </div>
    <div class="pagefooterbox">
      <div class="pagefooter">
        <div v-if="getPlatInfo" class="intro">
          <b class="introtitle">
            {{ getLanguageData.pageFooter.stardayplat }}
          </b>
          <strong>
            {{ getPlatInfo }}
          </strong>
        </div>
        <div class="footbox">
          <div class="leftbox">
            <div class="topbox">
              <div class="topboxItem">
                <strong>{{ getLanguageData.pageFooter.newuser }}</strong>
                <p @click="$router.push('/artical/userGuidan')">
                  {{ getLanguageData.pageFooter.usemeth }}
                </p>
                <p @click="$router.push('/artical/delivery')">
                  {{ getLanguageData.pageFooter.abourSend }}
                </p>
                <p @click="$router.push('/artical/exchange')">
                  {{ getLanguageData.pageFooter.abouereturn }}
                </p>
                <p @click="$router.push('/artical/shoppinghelp')">
                  {{ getLanguageData.pageFooter.shopHelp }}
                </p>
              </div>
              <div class="topboxItem">
                <strong>{{ getLanguageData.pageFooter.service }}</strong>
                <p @click="$router.push('/artical/useprotol')">
                  {{ getLanguageData.pageFooter.limit }}
                </p>
                <p @click="$router.push('/artical/privacy')">
                  {{ getLanguageData.pageFooter.savePer }}
                </p>
                <p @click="companyHandle">
                  {{ getLanguageData.pageFooter.companyinfo }}
                </p>
                <p @click="$router.push('/artical/tradinglaw')">
                  {{ getLanguageData.pageFooter.law }}
                </p>
              </div>
              <div class="topboxItem">
                <strong>{{ getLanguageData.pageFooter.payMethod }}</strong>
                <p @click="$router.push('/artical/paymethod')">
                  {{ getLanguageData.pageFooter.canuseMethod }}
                </p>
                <p @click="$router.push('/artical/pointnum')">
                  {{ getLanguageData.pageFooter.integral }}
                </p>
              </div>
              <div class="topboxItem companyIcon">
                <section><img src="@/assets/images/layout/logo.png" alt=""></section>
                <strong style="width:270px;display:flex;justify-content: flex-start;">
                  <span>{{ getLanguageData.pageFooter.eamil }}：</span>
                  <div>
                    <div>
                      cs01@starday.jp
                    </div>
                    <div>
                      cs02@starday.jp
                    </div>
                  </div>
                </strong>
                <strong>{{ getLanguageData.pageFooter.receptionTime }}</strong>
                <strong>{{ getLanguageData.pageFooter.onlineOrder }}</strong>
              </div>
              <div class="rightbox">
                <p :class="getLanguage==='zh'? 'saoma1' : 'saoma'">{{ getLanguageData.pageFooter.scandown }}</p>
                <div class="flexbox">
                  <img src="@/assets/images/layout/code.png" alt="">
                  <div class="iosbox">
                    <img src="@/assets/images/layout/apple.png" alt="">
                    <img src="@/assets/images/layout/ar.png" alt="">
                  </div>
                </div>
              </div>
            </div>
            <div class="bodybox">
              <!-- <div>
                <p class="linktitle">
                  {{ getLanguageData.pageFooter.community }}
                </p>
                <div class="linkconcat">
                  <div class="linkconcatitem" @click="linkConcatHandle('https://facebook.com/Starday.jp')">
                    <img src="@/assets/images/layout/facebook.png" alt="">
                    <p>Facebook</p>
                  </div>
                  <div class="linkconcatitem" @click="linkConcatHandle()">
                    <img src="@/assets/images/layout/line.png" alt="">
                    <p>Line</p>
                  </div>
                  <div class="linkconcatitem" @click="linkConcatHandle('https://twitter.com/stardayjp')">
                    <img src="@/assets/images/layout/tt.png" alt="">
                    <p>Twitter </p>
                  </div>
                  <div class="linkconcatitem" @click="linkConcatHandle('https://www.instagram.com/starday.promotion/')">
                    <img src="@/assets/images/layout/ins.png" alt="">
                    <p> Instagram </p>
                  </div>
                </div>
              </div> -->
              <div>
                <p class="paymentbox">
                  {{getLanguageData.placeOrder.payType}}
                </p>
                <div class="payimgbox">
                  <div>
                    <img src="@/assets/images/personal/visa.png" alt="">
                  </div>
                  <div>
                    <img src="@/assets/images/personal/yinlian.png" alt="">
                  </div>
                  <div>
                    <img src="@/assets/images/personal/JCB.png" alt="">
                  </div>
                  <div>
                    <img src="@/assets/images/personal/america.png" alt="">
                  </div>
                  <div>
                    <img src="@/assets/images/personal/master.png" alt="">
                  </div>
                  <div>
                    <img src="@/assets/images/personal/dine.png" alt="">
                  </div>
                  <div>
                    <img src="@/assets/images/placeorder/paypal.png" alt="">
                  </div>
                  <div>
                    <img src="@/assets/images/placeorder/gmo.png" alt="">
                  </div>
                  <div>
                    <img src="@/assets/images/placeorder/paygent.png" alt="">
                  </div>
                  <div>
                    <img src="@/assets/images/placeorder/allin.png" alt="">
                  </div>
                  <div>
                    <img src="@/assets/images/placeorder/robot.png" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pagefootermiddlecopy">
          <p>{{ getLanguageData.pageFooter.copyright }}</p>
        </div>
        <div v-if="getCompanyLink" class="pagefootermiddlelink">
          <section v-show="getCompanyLink[0] && getCompanyLink[0].displayType === 1">
            <img
              v-for="(item,index) in getCompanyLink"
              :key="index"
              :src="getImageBasePath + item.companyPicture"
              alt=""
              @click="openCompanyLink(item.companyUrl)"
            >
          </section>
          <section v-show="getCompanyLink[0] && getCompanyLink[0].displayType === 2">
            <strong v-for="(item,index) in getCompanyLink" :key="index" @click="openCompanyLink(item.companyUrl)">{{
              item.companyName }} </strong>
          </section>
        </div>
      </div>
    </div>
    <BackTop @on-click="scrollToTop" />
    <emailModal
      style="z-index: 999;"
      :show-modal="showModal"
      :email-info="emailInfo"
      @closeEmail="closeEmail"
    />
    <receiveCoupon :coupon-show="couponShow" :coupon-list="couponList" @closeCoupon="closeCoupon" />
    <div v-show="getLoading" class="maskLoadingShow">
      <img src="@/assets/images/common/loading.gif" alt="">
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Cookie from 'js-cookie'
import emailModal from '@/components/common/emailModal.vue'
import receiveCoupon from '@/components/coupon/receiveCoupon.vue'

export default {
  components: {
    emailModal,
    receiveCoupon
  },
  data () {
    return {
      loopTime: null,
      setIntervalId: null,
      noReadNum: 0,
      showModal: false,
      emailInfo: {},
      selectType: '',
      emailId: '',
      couponShow: false,
      couponList: []
    }
  },
  watch: {
    getLoginData (val) {
      if (val && val.token) {
        this.getCycleTime()
        this.getNoReadNum()
      } else {
        clearInterval(this.setIntervalId)
        this.setIntervalId = null
        this.noReadNum = 0
        this.showModal = false
      }
    },
    $route (to, from) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      document.querySelector('.appbox').scrollTop = 0
      if (to.name !== 'search-product-productwd-productpageno' && to.name !== 'search-store-storewd-storepageno') {
        this.handleSearchValue('')
      }
    },
    selectType (newValue) {
      this.handlesearchselectType(newValue)
    },
    getsearchselectType (newValue) {
      this.selectType = newValue
    }
  },
  methods: {
    ...mapActions({
      handleLanguage: 'handleLanguage',
      handleLogout: 'handleLogout',
      handleActiveNavId: 'handleActiveNavId',
      handleShareObj: 'handleShareObj',
      handleTgid: 'handleTgid',
      handleSearchValue: 'handleSearchValue',
      handlesearchselectType: 'handlesearchselectType'
    }),
    goBuyCart () {
      if (this.getLoginData) {
        this.$router.push('/shoppingcart')
      } else {
        this.$router.push('/touristCart')
      }
    },
    // 获取优惠券内容
    getCouponList () {
      const vm = this
      vm.$axios({
        url: 'starday-activity/user/coupon/systemSend',
        method: 'post'
      }).then((res) => {
        if (res.code === 200) {
          if (res.data.length > 0) {
            vm.couponShow = true
            vm.couponList = res.data
          }
        }
      })
    },
    closeCoupon () {
      this.couponShow = false
    },
    closeEmail () {
      this.showModal = false
    },
    routerToAllType () {
      this.$router.push('/category')
    },
    linkConcatHandle (url) {
      if (url) {
        window.open(url)
      } else {
        this.$router.push('/artical/line')
      }
    },
    routerToSearch (wd) {
      if (!wd) {
        this.$Message.warning(this.getLanguageData.layoutHeader.searchholder)
        return
      }
      if (this.selectType === '1') {
        location.replace('/search/product/' + (wd.replace(/\//g, '')) + '/1')
      } else {
        location.replace('/search/store/' + (wd.replace(/\//g, '')) + '/1')
      }
    },
    shareHandle () {
      const vm = this
      let _url = location.origin + location.pathname
      const _str = []
      if (vm.getLoginData.id) {
        if (vm.$route.query) {
          for (const i in vm.$route.query) {
            if (i !== 'shareId' && i !== 'shareSource' && i !== 'shareTime') {
              _str.push(i + '=' + vm.$route.query[i])
            }
          }
        }
        if (_str.length) {
          _url = _url + '?' + _str.join('&') + '&shareId=' + vm.getLoginData.id + '&shareSource=1&shareTime=' + Math.floor(new Date().getTime() / 1000)
        } else {
          _url = _url + '?shareId=' + vm.getLoginData.id + '&shareSource=1&shareTime=' + Math.floor(new Date().getTime() / 1000)
        }
      }
      this.$copyText(_url).then(function (e) {
        vm.$Message.success(vm.getLanguageData.layoutHeader.copySuccess)
      }, function (e) {
        vm.$Message.success(vm.getLanguageData.layoutHeader.copyFail)
      })
    },
    // 获取轮询时间
    getCycleTime () {
      const vm = this
      const data = {
        code: 'MAIL_TIME_INTERVAL',
        groupCode: 'MAIL_SETTING'
      }
      vm.$axios({
        url: 'starday-system/dict/getValue',
        method: 'get',
        params: data
      }).then((res) => {
        if (res.code === 200) {
          // console.log('res----', res)
          vm.loopTime = res.data * 1
        }
        vm.setIntervalId = setInterval(() => {
          vm.getNoReadNum()
        }, vm.loopTime * 60 * 1000)
      })
    },
    // 获取未读邮件的数量
    getNoReadNum () {
      const vm = this
      this.$axios({
        url: 'starday-mail/mail/getMailCount',
        method: 'get'
      }).then((res) => {
        if (res.code === 200) {
          this.noReadNum = res.data.count
          // console.log('res----====', res)
          if (res.data.id) {
            if (vm.getLoginData) {
              const data = {
                id: res.data.id
              }
              vm.$axios({
                url: 'starday-mail/mail/getMailInfo',
                method: 'get',
                params: data
              }).then((res) => {
                if (res.code === 200) {
                  vm.showModal = true
                  // console.log('res----====', res)
                  vm.emailInfo = res.data
                }
              })
            }
          }
        }
      })
    },
    goMessageList () {
      if (this.getLoginData) {
        this.$router.push('/personal/emailList')
      } else {
        this.$router.push('/login?ref=personal/emailList')
      }
    },
    searchHandle (wd) {
      if (!wd) {
        this.$Message.warning(this.getLanguageData.layoutHeader.searchholder)
        return
      }
      if (this.selectType === '1') {
        location.replace('/search/product/' + (wd.replace(/\//g, '')) + '/1')
      } else {
        location.replace('/search/store/' + (wd.replace(/\//g, '')) + '/1')
      }
    },
    companyHandle () {
      window.open('http://www.stardaymart.jp/')
    },
    toggleLanguageHandle () {
      const vm = this
      vm.handleLanguage(vm.getLanguage === 'zh' ? 'jp' : 'zh')
    },
    openSettleHandle () {
      window.open('https://seller.starday.jp/#/register')
    },
    routerToRegister () {
      if (!this.getLoginData) {
        this.$router.push('/login/register')
        if (this.setIntervalId) {
          clearInterval(this.setIntervalId)
          this.setIntervalId = null
          this.noReadNum = 0
        }
      }
    },
    logoutHandle () {
      const vm = this
      this.$Modal.confirm({
        scrollable: true,
        render: (h) => {
          return h(
            'div',
            {
              props: {
                type: 'text'
              }
            },
            [
              h('Icon', {
                props: {
                  type: 'ios-alert',
                  size: '18',
                  color: '#f90'
                }
              }),
              h('span', this.getLanguageData.layoutHeader.surelogout)
            ]
          )
        },
        onOk: () => {
          vm.$axios.get('starday-auth/login/login/out').then((res) => {
            if (res.code === 200) {
              vm.$store.dispatch('handleLogout', res.data)
              Cookie.remove('token')
              vm.$router.push('/login')
            }
          })
        }
      })
    },
    openCompanyLink (url) {
      window.open(url)
    },
    navClickHandle (item) {
      this.handleActiveNavId(item.id)
      switch (item.linkType) {
        case 0:
          break
        case 1:
          if (item.linkPageType === 1) {
            this.$router.push('/promotionpage/promotionpicture/' + item.relateId)
          } else {
            this.$router.push('/promotionpage/promotiongoods/' + item.relateId)
          }
          break
        case 2:
          break
        case 3:
          this.$router.push('/product/' + item.relateId)
          break
      }
    },
    scrollToTop () {
      document.querySelector('.appbox').scrollTop = 0
    }
  },
  computed: {
    ...mapGetters({
      getLanguage: 'getLanguage',
      getLanguageData: 'getLanguageData',
      getLoginData: 'getLoginData',
      getKeyWords: 'getKeyWords',
      getCompanyLink: 'getCompanyLink',
      getImageBasePath: 'getImageBasePath',
      getNavigater: 'getNavigater',
      getPlatInfo: 'getPlatInfo',
      getActiveNavId: 'getActiveNavId',
      getLoading: 'getLoading',
      getSearchValue: 'getSearchValue',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN',
      getsearchselectType: 'getsearchselectType'
    })
  },
  mounted () {
    const vm = this
    this.selectType = vm.getsearchselectType
    if (this.getLoginData) {
      this.getCycleTime()
      this.getNoReadNum()
      this.getCouponList()
    }
    if (vm.$route.query && vm.$route.query.shareId && vm.$route.query.shareSource && vm.$route.query.shareTime) {
      vm.handleShareObj({
        shareId: vm.$route.query.shareId,
        shareSource: vm.$route.query.shareSource,
        shareTime: vm.$route.query.shareTime
      })
    }
    if (vm.$route.query && vm.$route.query.tgid) {
      vm.handleTgid(vm.$route.query.tgid)
    }
    document.querySelector('.appbox').onscroll = function (item) {
      const backDiv = document.querySelector('.ivu-back-top')
      if (document.querySelector('.appbox').scrollTop > 100) { // 大于滚动距离显示返回顶部图标
        backDiv.style.display = 'block'
      } else {
        backDiv.style.display = 'none'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .appbox {
    height: 100vh;
    background-color: #f3f4f6;
    overflow-y: scroll;

    .pageheaderbox {
      background-color: #dcdcdc;
      min-width: 1400px;

      .pageheader {
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        color: #666666;
        margin: 0 auto;
        text-align: right;
        width: 1400px;

        p, div {
          display: inline-block;
          margin: 0 20px;
          position: relative;
          cursor: pointer;
        }

        .leftcontentitem {
          a {
            color: #666666;
          }
        }

        .leftcontentitem:last-child {
          margin-right: 0;
        }

        .leftcontentitem::before {
          content: "";
          position: absolute;
          left: -20px;
          top: 6px;
          width: 1px;
          height: 13px;
          background-color: #c9c9c9;

        }

        .downloadApp::before {
          top: 0px;
        }
      }
    }

    .pagebox {
      width: 1400px;
      margin: 0 auto 40px;
    }

    .pagesearchbox {
      background-color: #ffffff;

      .pagesearch {
        width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        padding: 27px 0;
        align-items: flex-start;

        .searchtop {
          width: 280px;
          text-align: left;

          img {
            width: 179px;
            height: 56px;
          }
        }

        .searchbox {
          width: 727px;

          section {
            margin-top: 12px;

            .sectionitem {
              display: inline-block;
              font-size: 14px;
              font-weight: 400;
              color: #666666;
              padding-right: 13px;
              cursor: pointer;
            }
          }
        }

        .menulist {
          width: 258px;
          display: flex;
          justify-content: space-between;

          .menulistitem {
            text-align: center;
            margin: 0 3px;
            cursor: pointer;

            img {
              width: 24px;
              height: 24px;
            }

            b {
              display: block;
              font-size: 10px;
              font-weight: 400;
              color: #333333;

              a {
                color: #333333;
              }

              a:hover {
                color: #333333;
              }
            }
          }
        }
      }

      .pagetype {
        width: 1400px;
        margin: 0 auto;

        b {
          display: inline-block;
          width: 250px;
          height: 37px;
          padding: 0 19px;
          line-height: 37px;
          background-color: #ff5d19;
          cursor: pointer;

          img {
            width: 20px;
            height: 20px;
            vertical-align: middle;
            margin-right: 10px;
          }

          strong {
            display: inline-block;
            vertical-align: middle;
            font-size: 18px;
            font-weight: 500;
            color: #ffffff;
          }
        }

        section {
          display: inline-block;
          height: 25px;
          font-size: 18px;
          font-weight: 500;
          color: #333333;
          margin-left: 50px;
          cursor: pointer;

          a {
            color: #333333;
          }
        }

        .activenav {
          color: #ff5d19;

          a {
            color: #ff5d19;
          }
        }
      }
    }

    .pagefooterbox {
      background-color: #fff;

      .pagefooter {
        background-color: #fff;
        width: 1400px;
        padding: 36px 0;
        margin: 0 auto;

        .intro {
          margin: 0 0 32px 0;

          .introtitle {
            display: block;
            height: 25px;
            font-size: 18px;
            font-weight: 500;
            text-align: left;
            color: #333333;
            line-height: 25px;
          }

          strong {
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #666666;
            line-height: 30px;
          }
        }
        .footbox{
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #dcdcdc;
          padding-bottom: 10px;
          .leftbox{
            flex: 1;
            .topbox{
              display: flex;
              justify-content: flex-start;
              padding-bottom:15px;
              border-bottom: 1px solid #dcdcdc;
              .topboxItem{
                flex: 1;
                strong{
                  display: block;
                  margin-bottom: 26px;
                  font-size: 18px;
                  font-weight: 500;
                  color: #333333;
                }
                p{
                  margin-bottom: 10px;
                  font-size: 14px;
                  color: #666666;
                  line-height: 20px;
                  cursor: pointer;
                }
                p:hover {
                  color: #ff1f4e;
                }
              }
              .companyIcon {
                img{
                  width: 108px;
                  height: 31px;
                  margin-bottom: 16px;
                }
                strong{
                  margin-bottom:10px;
                  font-size: 14px;
                  color: #666666;
                  line-height: 20px;
                }
              }
              .rightbox{
                width: 400px;
                // padding:0 62px;
                text-align: center;
                .saoma1{
                  padding-right: 60px;
                  font-size: 18px;
                  font-weight: 500;
                  color: #333333;
                  text-align: right;
                }
                .saoma{
                  width: 432px;
                  margin-left: -40px;
                  font-size: 18px;
                  font-weight: 500;
                  color: #333333;
                  text-align: center;
                }
                .flexbox{
                  margin-top: 26px;
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  >img {
                    width: 140px;
                    height: 140px;
                    margin:0 40px 0 0;
                  }
                  .iosbox{
                    margin-right: 30px;
                    img{
                      display: block;
                      width: 42px;
                      height: 42px;
                    }
                    img:nth-of-type(1){
                      margin-bottom: 18px;
                    }
                  }
                }
              }
            }
            .bodybox{
              display: flex;
              justify-content: flex-start;
              // >div:nth-of-type(2){
              //   flex:1;
              // }
              >div{
                flex: 1;
                .linktitle {
                  margin: 14px 0 20px 0;
                  font-size: 18px;
                  font-weight: 500;
                  color: #333333;
                }

                .linkconcat {
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  text-align: center;

                  .linkconcatitem {
                    margin-right: 60px;
                    cursor: pointer;
                  }

                  img {
                    width: 42px;
                    height: 42px;
                  }
                }
                .paymentbox{
                  margin: 14px 0 16px 0;
                  font-size: 18px;
                  font-weight: 500;
                  color: #333333;
                }
                .payimgbox{
                  display: flex;
                  justify-content: flex-start;
                  >div{
                    flex: 1;
                    text-align: left;
                  }
                }
              }
            }
          }
        }
        .pagefootermiddlecopy {
          text-align: center;
          font-size: 14px;
          color: #666666;
          margin: 32px 0 29px 0;
        }

        .pagefootermiddlelink {
          section {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin: 0 -15px;

            strong {
              display: inline-block;
              width: 209px;
              margin: 14px;
              cursor: pointer;
            }

            img {
              width: 209px;
              height: 92px;
              margin: 14px;
              cursor: pointer;
            }
          }
        }
      }
    }

    .maskLoadingShow {
      position: fixed;
      width: 100%;
      height: 100vh;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999999;

      img {
        width: 260px;
        height: 260px;
      }
    }
  }
</style>
