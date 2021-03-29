<template>
  <div class="catecontainer">
    <div class="catetype">
      <div
        v-for="(item,index) in cateTreeList"
        :key="index"
        :class="showCateId===index?'catelist activecatelist':'catelist'"
        @mouseenter="entryCatry(index,item.id)"
      >
        <strong @click="levelOneClick(item.id,cateTreeList[index].goodsCategoryDtoList[0].goodsCategoryDtoList[0].id)">{{ getLanguage == 'zh' ? item.category : item.categoryJp }}</strong>
        <img v-show="showCateId!==index" src="@/assets/images/index/right.png" :alt="item.category">
        <img v-show="showCateId===index" src="@/assets/images/index/rightactive.png" :alt="item.category">
      </div>
    </div>
    <div class="cateselectbox">
      <div class="selectcontent">
        <div class="leveltitle">
          <section><span @click="levelOneClick(showCateLevelid,cateTreeList[showCateId].goodsCategoryDtoList[0].goodsCategoryDtoList[0].id)">{{ getLanguage == 'zh' ? cateTreeList[showCateId].category : cateTreeList[showCateId].categoryJp }}</span></section>
        </div>
        <div class="levelbox">
          <div class="selectleft">
            <div v-for="(prop,i) in cateTreeList[showCateId].goodsCategoryDtoList" :key="i" class="selectitem">
              <h5 class="selectitem-title" @click.stop="toSecondclass(prop.goodsCategoryDtoList[0].id)">
                {{ prop.categoryJp }}
              </h5>
              <section v-show="cateTreeList[showCateId].goodsCategoryDtoList && prop.goodsCategoryDtoList.length">
                <h6 v-for="(childrenitem,childrenindex) in prop.goodsCategoryDtoList" :key="childrenindex">
                  <a :href="getLOCATIONORIGIN + 'cate/'+childrenitem.id">
                    {{ childrenitem.categoryJp }}
                  </a>
                </h6>
              </section>
            </div>
          </div>
          <div class="selectright">
            <div v-for="item in cateImage" :key="item.id" @click="navClickHandle(item)">
              <img :src="getImageBasePath + item.imageUrl">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'default',
  name: 'Categoty',
  middleware: 'auth',
  async asyncData ({ $axios }) {
    // 获取所有分类
    const cateList = await $axios.post('/starday-goods/user/goods_category/list')
    const cateTreeList = cateList.data
    const cateInfoList = await $axios.get('starday-system/user/pc/info/getCateInfo')
    return {
      cateTreeList,
      cateInfoListimg: cateInfoList.data.cateImageMap,
      cateInfoList: cateInfoList.data.cateTreeList || []
    }
  },
  computed: {
    ...mapGetters(['getLanguage', 'getImageBasePath', 'getLanguageData', 'getLOCATIONORIGIN'])
  },
  head () {
    return {
      link: [
        {
          hid: 'canonical',
          ref: 'canonical',
          href: 'https://www.starday.jp/category'
        },
        {
          hid: 'alternate',
          ref: 'alternate',
          media: 'only screen and (max-width: 640px)',
          href: 'https://m.starday.jp/category'
        }
      ]
    }
  },
  data () {
    return {
      showCateId: 0,
      showCateLevelid: '',
      cateImage: []
    }
  },
  mounted () {
    const vm = this
    const _index = this.cateInfoListimg.findIndex(function (item) {
      return item[vm.cateTreeList[0].id] && item[vm.cateTreeList[0].id].length
    })
    if (_index > -1) {
      this.cateImage = this.cateInfoListimg[_index][vm.cateTreeList[0].id] || []
    } else {
      this.cateImage = []
    }
  },
  methods: {
    levelOneClick (id, levelid) {
      const _index = this.cateInfoList.findIndex(function (item) {
        return item.id === id
      })
      if (_index > -1) {
        this.$router.push('/secondclass?id=' + id)
      } else {
        if (!levelid) {
          return
        }
        this.$router.push('/cate/' + levelid)
      }
    },
    entryCatry (index, id) {
      this.showCateId = index
      this.showCateLevelid = id
      const _index = this.cateInfoListimg.findIndex(function (item) {
        return item[id] && item[id].length
      })
      if (_index > -1) {
        this.cateImage = this.cateInfoListimg[_index][id] || []
      } else {
        this.cateImage = []
      }
    },
    toSecondclass (id) {
      this.$router.push('/cate/' + id)
    },
    navClickHandle (item) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .catecontainer{
    display: flex;
    justify-content: space-between;
    .catetype {
      display: inline-block;
      background-color: #fff;
      padding: 9px 0;
      .catelist {
        padding: 0 13px 0 19px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        width: 250px;
        strong {
          font-weight: 400;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;

          a {
            font-weight: 400;
            color: #333333;
          }
        }

        img {
          width: 12px;
          height: 12px;
        }
      }

      .activecatelist strong {
        color: #FF5D19;
      }
    }
    .cateselectbox {
      width: 1139px;
      background-color: #F3F4F6;
      padding-left: 10px;
      margin-top: 20px;

      .selectcontent {
        section{
          span{
            height: 25px;
            font-size: 18px;
            font-weight: 600;
            text-align: left;
            color: #333333;
            line-height: 25px;
            padding: 20px 0;
            margin-bottom: 15px;
            cursor: pointer;
          }

        }
        background-color: #fff;
        width: 1150px;
        padding: 0px 26px 20px;
        .levelbox{
          display: flex;
          justify-content: space-between;

          .selectleft {
            width: 1020px;

            h5{
              font-weight: 600;
              color: #FF5D19;
              font-size: 16px;
              padding: 10px 0 15px 0;
              cursor: pointer;
            }
            h5 a {
              height: 22px;
              font-size: 16px;
              font-weight: 500;
              text-align: left;
              color: #ff5d19;
              line-height: 22px;
              margin-bottom: 10px;
            }

            section {
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;

              h6 {
                display: inline-block;
                width: 33%;
                overflow: hidden;
                text-overflow: ellipsis;

                a {
                  font-size: 14px;
                  font-weight: 400;
                  text-align: left;
                  color: #333333;
                  line-height: 30px;
                }

                a:hover {
                  color: #FF5D19;
                }
              }
            }

          }

          .selectright {
            width: 130px;
            img {
              width: 120px;
              height: 120px;
              cursor: pointer;
            }
          }
        }

      }
    }

  }
</style>
