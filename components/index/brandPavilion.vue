<template>
  <div class="brandpavilion">
    <section class="comtitle">
      <img src="@/assets/images/index/tleft.png" alt="">
      <strong style="font-size:24px;">{{ getLanguageData.indexPage.brandpava }}</strong>
      <img src="@/assets/images/index/tright.png" alt="">
    </section>
    <div class="brandpavilionbox">
      <div class="logoheadbox">
        <div class="prebtn btnbox" @click="swiperAddHandle(-227)">
          <Icon type="ios-arrow-back" color="#ffffff" size="26" />
        </div>
        <div class="fixbtn btnbox" @click="swiperAddHandle(227)">
          <Icon type="ios-arrow-forward" color="#ffffff" size="26" />
        </div>
        <div class="brandpavilionboxlogo noscroll">
          <a
            v-for="(brandItem,brandIndex) in brandData"
            :key="brandIndex"
            :href="getLOCATIONORIGIN+'?brandIndex=' + brandIndex"
            :class="activeBrandIndex*1===brandIndex?'activebrand':''"
          >
            <img :src="getImageBasePath + brandItem.brandLogo" alt="">
          </a>
        </div>
      </div>
      <Carousel arrow="always" dots="none" class="comcontent carousel">
        <CarouselItem v-for="(item, index) in swiperlist" :key="index" class="comcontent-item">
          <div class="demo-carousel">
            <recgood
              v-for="(prop, j) in item"
              :key="j"
              :title="prop.goodsTitle"
              :img-url="prop.goodsSearchImage"
              :activity-price="prop.activityPrice"
              :item="prop"
              type="3"
              :market-price="prop.marketPrice"
            />
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import recgood from '../goodscom/recgood'
import utils from '~/util/index'

export default {
  name: 'BrandPavilion',
  components: { recgood },
  props: ['brandData', 'activeBrandIndex'],
  computed: {
    ...mapGetters(['getLanguage', 'getLanguageData', 'getImageBasePath', 'getLOCATIONORIGIN']),
    swiperlist () {
      return utils.goodscalc(this.brandData[this.activeBrandIndex].list, 6)
    }
  },
  mounted () {
    if (this.activeBrandIndex > 5) {
      document.querySelector('.noscroll').scrollLeft = document.querySelector('.noscroll').scrollLeft + this.activeBrandIndex * 227
    }
  },
  methods: {
    swiperAddHandle (str) {
      document.querySelector('.noscroll').scrollLeft = document.querySelector('.noscroll').scrollLeft + str
    }
  }
}
</script>

<style scoped lang="scss">
  .brandpavilion {
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

    .brandpavilionbox {
      background-color: #fff;
      margin-top: 28px;

      .logoheadbox {
        position: relative;

        .btnbox {
          position: absolute;
          top: 14px;
          width: 28px;
          height: 82px;
          background: rgba(0, 0, 0, 0.2);
          line-height: 80px;
          text-align: center;
          cursor: pointer;
          z-index: 999;
        }

        .prebtn {
          left: 0;
        }

        .fixbtn {
          right: 0 !important;
        }

        .brandpavilionboxlogo {
          white-space: nowrap;
          overflow-x: scroll;

          a {
            display: inline-block;
            box-sizing: border-box;
            width: 227px;
            height: 110px;
            padding: 10px;
            text-align: center;

            img {
              max-width: 207px;
              height: 90px;
            }

            border-bottom: 1px solid #dcdcdc;
          }

          .activebrand {
            box-sizing: border-box;
            border-bottom: none;
            border-top: 6px solid #333333;
          }
        }
      }
      .comcontent{
        margin-top: 28px;
        padding: 20px 0 20px 20px;
        background-color: #fff;
        white-space: nowrap;
        box-sizing: border-box;
      }

    }
  }
</style>
