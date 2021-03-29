<template>
  <div class="container">
    <div class="breadbox">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.storeText.indexPage }}
        </BreadcrumbItem>
        <BreadcrumbItem>
          {{ getLanguageData.indexPage.flashGoods }}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="killheader">
      <div class="bothimg">
        <!--        展示秒杀场次-->
        <div class="carouselbox">
          <span class="left"><img src="~assets/images/killlist/left.png" alt="" @click="swiperAddHandle(-335)"></span>
          <div class="center">
            <div class="carousel-item noscroll">
              <div
                v-for="(item, index) in msactivity"
                :key="index"
                class="killitem"
                :class="active == index ? 'whitebg' : 'nowhite'"
                @click="flashgetData(index)"
              >
                <!--                正在进行中-->
                <div v-if="item.timeState === 1" class="activing">
                  <div class="activing-left">
                    <span class="time">{{ item.startTime }}</span>
                    <span class="time-title">{{ getLanguageData.indexPage.ongoing }}</span>
                  </div>
                  <div class="activing-right">
                    <span class="top">{{ getLanguageData.indexPage.Distanceendtime }}</span>
                    <span class="bottom">
                      <i>{{ time.hours }}</i>:
                      <i>{{ time.minutes }}</i>:
                      <i>{{ time.seconds }}</i>
                    </span>
                  </div>
                </div>
                <!--                未开始-->
                <div v-else class="activend">
                  <span class="time">{{ item.startTime }}</span>
                  <span v-if="item.timeState == 0" class="titme-title">{{ getLanguageData.indexPage.ontime }}</span>
                  <span v-else-if="item.timeState == 3" class="titme-title">{{ getLanguageData.indexPage.tomorrowontime }}</span>
                </div>
              </div>
            </div>
          </div>
          <span class="right"><img src="~assets/images/killlist/right.png" alt="" @click="swiperAddHandle(335)"></span>
        </div>
      </div>
    </div>
    <div class="active-list-box">
      <div v-for="(item,index) in msdata" :key="index" class="list-item" @click="toproductdetail(item)">
        <flashitem :goods-data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import flashitem from '@/components/flashgoods/flashitem'
import { mapGetters } from 'vuex'
import util from '@/util/index'

export default {
  layout: 'default',
  name: 'Flash',
  middleware: 'auth',
  comments: {
    flashitem
  },
  computed: {
    ...mapGetters(['getLanguage', 'getImageBasePath', 'getLanguageData', 'getLOCATIONORIGIN'])
  },
  watchQuery: ['index'],
  async asyncData ({ $axios, query }) {
    const list = await $axios.get('/starday-activity/flash_sale/list')
    // 未开始和已开始的秒杀活动列表
    const killlistdata = list.data.filter((item) => {
      if (item.timeState !== 2) {
        return item
      }
    })
    // 秒杀数据排序
    let msactivity = []
    const starting = killlistdata.filter(item => item.timeState === 1)
    const nostart = killlistdata.filter(item => item.timeState === 0)
    const tmstart = killlistdata.filter(item => item.timeState === 3)
    starting.sort((a, b) => {
      return util.timeToSec(a.startTime) - util.timeToSec(b.startTime)
    })
    nostart.sort((a, b) => {
      return util.timeToSec(a.startTime) - util.timeToSec(b.startTime)
    })
    tmstart.sort((a, b) => {
      return util.timeToSec(a.startTime) - util.timeToSec(b.startTime)
    })
    msactivity = [...starting, ...nostart, ...tmstart]
    // 活动列表
    let requestdata
    let timestate = 2
    if (!query.index) {
      requestdata = msactivity[0].flashSaleActivitys.map(item => item.goodsId)
      timestate = msactivity[0].timeState
    } else {
      requestdata = msactivity[query.index].flashSaleActivitys.map(item => item.goodsId)
      timestate = msactivity[query.index].timeState
    }
    const msdata = await $axios.post('/starday-elasticsearch/search/goodsId', requestdata)
    if (msdata.data && msdata.data.length) {
      msdata.data.forEach((item) => {
        item.timeState = timestate
        msactivity[query.index ? query.index : 0].flashSaleActivitys.forEach((prop, index) => {
          if (item.id === prop.goodsId) {
            item.discount = prop.discount
            item.buyNum = msactivity[query.index ? query.index : 0].flashSaleActivitys[index].buyNum
            item.leverNum = msactivity[query.index ? query.index : 0].flashSaleActivitys[index].leverNum
            item.stockNum = msactivity[query.index ? query.index : 0].flashSaleActivitys[index].stockNum
          }
        })
      })
    }
    return {
      active: query.index ? query.index : 0,
      msdata: msdata.data,
      msactivity
    }
  },
  data () {
    return {
      activeNum: 0,
      timer: null,
      time: {},
      n: 0,
      showIndex: 0
    }
  },
  beforeMount () {
    if (this.msactivity && this.msactivity.length > 0) {
      // 调用秒杀倒计时方法
      const startimes = this.msactivity[0].nowtimes
      const endtimes = this.msactivity[0].nowtimes.split(' ')[0] + ' ' + this.msactivity[0].endTimeString
      this.timer = setInterval(() => {
        this.n += 1
        this.time = this.countdown(startimes, endtimes, this.n)
      }, 1000)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    swiperAddHandle (str) {
      document.querySelector('.noscroll').scrollLeft = document.querySelector('.noscroll').scrollLeft + str
    },
    flashgetData (index) {
      this.$router.push({
        path: '/flash',
        query: {
          index
        }
      })
    },
    // 跳转到商品详情页
    toproductdetail (item) {
      // 商品详情页
      this.$router.push({ path: '/product/' + item.id })
    },
    countdown (start, end, n) {
      const startime = new Date(start).getTime()
      const endtime = new Date(end).getTime()
      // 2. 拿到当前时间和过期时间之间的时间差（毫秒）
      let deltaTime = (endtime - startime - (n * 1000)) / 1000 // 到期时间和当前时间相差的毫秒数
      // 如果超时了，就停止倒计时
      if (deltaTime <= 0) {
        this.n = 0
        // 停止计时器
        clearInterval(this.timer)
        // 停止执行下面的代码
        return {
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      }
      let hours = Math.floor(deltaTime / (60 * 60))
      deltaTime = deltaTime % (60 * 60)
      let minutes = Math.floor(deltaTime / 60)
      deltaTime = deltaTime % 60
      let seconds = Math.floor(deltaTime)
      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds
      return {
        hours,
        minutes,
        seconds
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: auto;

    .killheader {
      height: 160px;
      background: url("~assets/images/killlist/bg.png");
      background-size: cover;
      background-repeat: no-repeat;
      margin-top: 20px;

      .bothimg {
        height: 160px;
        margin: 0 auto;
        background: url("~assets/images/killlist/bgbox.png");
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;

        .carouselbox {
          position: absolute;
          width: 1400px;
          height: 40px;
          padding: 0 20px;
          bottom: 0;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;

          .left, .right {
            width: 10px;
            height: 21px;
            font-size: 0;
            cursor: pointer;

            img {
              width: 10px;
              height: 21px;
            }
          }

          .center {
            flex: 1;
            height: inherit;
            display: flex;
            overflow: hidden;

            .carousel-item {
              padding: 0 3px;
              white-space: nowrap;
              overflow-y: hidden;
              overflow-x: scroll;

              .killitem:nth-child(1) {
                margin: 0;
              }

              .killitem {
                cursor: pointer;
                width: 335px;
                display: inline-block;
                height: 40px;
                margin-left: 10px;
                padding: 0 25px;
                /*line-height: 40px;*/

                .activing {
                  display: flex;
                  flex-flow: row nowrap;
                  justify-content: space-between;
                  align-items: center;

                  .activing-left {
                    flex: 7;
                    display: flex;
                    align-items: center;
                    flex-flow: row nowrap;

                    .time {
                      font-size: 28px;
                      font-weight: bold;
                      color: #DE0F0F;
                    }

                    .time-title {
                      font-size: 16px;
                      font-weight: 400;
                      color: #DE0F0F;
                    }
                  }

                  .activing-right {
                    flex: 5;
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: space-around;
                    align-items: flex-start;
                    text-align: left;

                    .top {
                      font-size: 11px;
                      font-weight: 400;
                      color: #333333;
                      line-height: 16px;
                    }

                    .bottom {
                      font-size: 20px;
                      font-weight: bold;
                      color: #DE0F0F;
                      line-height: 24px;

                      i {
                        font-style: normal;
                      }
                    }
                  }
                }

                .activend {
                  display: flex;
                  flex-flow: row nowrap;
                  justify-content: center;
                  align-items: center;
                  height: inherit;

                  .time {
                    font-size: 28px;
                    font-weight: bold;
                    color: #DE0F0F;
                  }

                  .time-title {
                    font-size: 16px;
                    font-weight: 400;
                    color: #DE0F0F;
                  }
                }
              }

              .whitebg {
                background: url("~assets/images/killlist/select.png");
                background-size: 335px 40px;
                background-repeat: no-repeat;
              }

              .nowhite {
                font-size: 16px;
                font-weight: 400;
                color: #FFB275 !important;

                .time {
                  color: #FFB275 !important;
                }
              }
            }
          }
        }
      }
    }

    .active-list-box {
      margin-top: 20px;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: center;
      margin-left: -10px;
      margin-right: -10px;

      .list-item {
        margin-bottom: 12px;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
</style>
