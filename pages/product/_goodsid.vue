<template>
  <div class="goodsid">
    <div class="breadbox">
      <!-- {{ listData }} -->
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="getLOCATIONORIGIN">
          {{ getLanguageData.indexPage.page }}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'category'">
          {{ getLanguage === 'zh' ? listData.breadCrumbs.firstCateName : listData.breadCrumbs.firstCateNameJp }}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'cate/' + listData.breadCrumbs.thirdCateId">
          {{ getLanguage === 'zh' ? listData.breadCrumbs.secCateName : listData.breadCrumbs.secCateNameJp }}
        </BreadcrumbItem>
        <BreadcrumbItem :to="getLOCATIONORIGIN + 'cate/' + listData.breadCrumbs.thirdCateId">
          {{ getLanguage === 'zh' ? listData.breadCrumbs.thirdCateName : listData.breadCrumbs.thirdCateNameJp }}
        </BreadcrumbItem>
        <BreadcrumbItem>{{ getLanguageData.goodsText.goodDetiPage }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!-- 轮播图区域 -->
    <div class="gooddetial">
      <div class="bannerleft">
        <div class="bannerHead">
          <div class="headLeft">
            <img src="@/assets/images/goods/shang.png" class="icon" @click="onMoveImg">
            <div class="leftlun">
              <div v-for="(e, i) in listData.imageListCopy[activePage]" :key="i" @click="checkImg(i)">
                <!-- <video
                  v-if="listData.videoFlag === 1 && i === 0 && activePage === 0"
                  :class="leftImgIndex === i? 'activeNumStyle' : ''"
                  :src="getImageBasePath + e"
                  height="84px;"
                  width="84px;"
                /> -->
                <img :src="getImageBasePath + e + '?x-oss-process=image/resize,w_1000/format,webp'" :alt="listData.goodsTitle" :class="leftImgIndex === i? 'activeNumStyle' : ''">
              </div>
            </div>
            <img src="@/assets/images/goods/xia.png" class="icon" @click="underMoveImg">
          </div>
          <div class="headRight">
            <div
              class="zhubox"
              >
              <Carousel v-model="carouselList" dots="none" @on-change="changeCarousel">
                <CarouselItem v-for="(item,index) in listData.imageList1" :key="index">
                  <div
                    v-if="!showVideo"
                    style="text-align: center"
                    class="carBox"
                    >
                    <img :src="getImageBasePath + item + '?x-oss-process=image/resize,w_1000/format,webp'" :alt="listData.goodsTitle" style="max-width:460px;max-height:460px;">
                    <img
                      v-if="!showVideo && listData.videoFlag === 1"
                      src="@/assets/images/goods/play.png"
                      alt=""
                      class="iconbox"
                      style="margin-left: 10px;margin-bottom: 10px"
                      @click="viewVideo"
                    >
                  </div>

                  <div v-if="showVideo">
                    <video
                      :src="getImageBasePath + listData.imageList[0]"
                      autoplay
                      controls
                      muted
                      height="460px;"
                      width="460px;"
                    />
                  </div>
                </CarouselItem>
              </Carousel>
              <!-- <div id="move" v-if="!showVideo">
              </div> -->
            </div>
            <!-- <div id="bimg" v-if="!showVideo">
              123
            </div> -->
            <div class="foot">
              <div
                v-clipboard:copy="copyUrl"
                v-clipboard:success="copy"
                v-clipboard:error="onError"
                @click="shareGood"
              >
                <img src="@/assets/images/goods/fenxiang.png" alt="">
                <span>{{ getLanguageData.goodsText.share }}</span>
              </div>
              <div @click="attentionGood">
                <img v-if="isFollow" src="@/assets/images/goods/redxin.png" alt="">
                <img v-if="!isFollow" src="@/assets/images/goods/xin.png" alt="">
                <span v-if="!isFollow">{{ getLanguageData.goodsText.attention }}</span>
                <span v-if="isFollow">{{ getLanguageData.goodsText.alreadyAttention }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bannerBody">
          <div class="intelligence">
            {{ getLanguageData.goodsText.storeInfo }}
          </div>
          <div class="intelligenceFoot">
            <div class="imabox">
              <img v-if="storeInfo.logo" :src="getImageBasePath + storeInfo.logo + '?x-oss-process=image/resize,w_1000/format,webp'" alt="">
              <img v-else src="@/assets/images/goods/defstore.png" alt="">
            </div>

            <div class="boxright">
              <div class="textbox">
                <div class="firstbox">
                  <span>{{ storeInfo.storeName }}</span>
                  <img src="@/assets/images/goods/email.png" alt="" @click="replyStore">
                </div>
                <div class="twobox">
                  <span>{{ getLanguageData.goodsText.starGrade }}:</span>
                  <img v-for="i in Math.floor(storeInfo.evaluate || 0)" :key="i" src="@/assets/images/goods/star.png" alt="">
                  <img v-if="Math.floor(storeInfo.evaluate || 0) != storeInfo.evaluate && storeInfo.evaluate > 0" src="@/assets/images/goods/half.png" alt="">
                  <img v-for="i in (5 - Math.ceil(storeInfo.evaluate || 0))" :key="'un'+i" src="@/assets/images/goods/unstar.png" alt="">
                </div>
                <div class="threebox">
                  <span>{{ getLanguageData.goodsText.alreadSale }}：</span>
                  <span>{{ storeInfo.salesCount || 0 }}{{ getLanguageData.goodsText.pieces }}</span>
                  <span>{{ getLanguageData.goodsText.evaluation }}：</span>
                  <span>{{ storeInfo.commentCount || 0 }}{{ getLanguageData.goodsText.article }}</span>
                </div>
              </div>
              <div class="favorites">
                <div v-if="storeInfo.follow === 0" class="btnbox" @click="favoritesStore">
                  {{ getLanguageData.goodsText.collectionStore }}
                </div>
                <div v-if="storeInfo.follow === 1" class="btnbox" @click="favoritesStore">
                  {{ getLanguageData.goodsText.alreadyAttention }}
                </div>
                <div class="btnbox" @click="goStorePage">
                  {{ getLanguageData.goodsText.storeCheckout }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bannerRight">
        <h1>{{ listData.goodsTitle }}</h1>
        <p v-if="listData.goodsSubtitle">
          {{ listData.goodsSubtitle }}
        </p>
        <div v-if="activityType === 1 || activityType === 0" class="spikeBox">
          <div class="leftSpike">
            <img src="@/assets/images/goods/time.png" alt="">
            <span>{{ getLanguageData.goodsText.limitedTime }}</span>
          </div>
          <div v-if="activityType === 1" class="rightSpike">
            <div class="timeItem">
              {{ activeTime.hours }}
            </div>
            <span style="color:#fff;">:</span>
            <div class="timeItem">
              {{ activeTime.minutes }}
            </div>
            <span style="color:#fff;">:</span>
            <div class="timeItem">
              {{ activeTime.seconds }}
            </div>
            <span>{{ getLanguageData.goodsText.afterEnd }}</span>
          </div>
          <div v-if="activityType === 0" class="rightSpike">
            <span style="color:#fff;font-size: 12px;font-weight: 600;">{{ active0start }}</span>
            <span style="color:#fff;font-size: 12px;font-weight: 600;">{{ getLanguageData.goodsText.afterStartMm1 }}</span>
          </div>
        </div>
        <div class="rightbox">
          <!-- <div class="firstrightbox">
            <span>优惠券</span>
            <span>满100减10</span>
            <span>满300减50</span>
          </div> -->
          <div v-if="activityType === 3" class="tworightbox">
            <span>{{ getLanguageData.goodsText.promotion }}</span>
            <div class="rulebox">
              <div v-for="(item, index) in ruleList" :key="index">
                <span>{{ getLanguageData.goodsText.full }}{{ item.ruleRequirement }}{{ getLanguageData.goodsText.less }}{{ item.ruleDiscount }}</span>
                <span v-if="index !== (ruleList.length - 1)">、</span>
              </div>
            </div>
          </div>
          <div class="threerightbox">
            <span>{{ currentPrice - (currentPrice * discount).toFixed(0) || 0 }}</span>
            <span style="font-size:20px;">円</span>
            <span v-if="activityType === 0" class="active0">{{ getLanguageData.goodsText.mmPrice }} <span style="margin:0;">{{ currentPrice - (currentPrice * discount1).toFixed(0) || 0 }}円</span></span>
            <!-- <span>({{ getLanguageData.goodsText.taxAfter }})</span> -->
            <span v-if="activityType === 1 || activityType === 2" class="deline">{{ oldPrice || 0 }}<span style="font-size:12px;color:#999;">円</span></span>
            <span v-if="isPODStore && (listData.goodsCashOnDelivery === 1)" style="font-size:14px;color:#ff5d19;margin-left:10px;">{{ getLanguageData.goodsText.deliveryCash }}</span>
          </div>
        </div>

        <div class="specbox">
          <div v-for="(item,index) in listData.specList" :key="index">
            <div class="title">
              {{ item.specName }}
            </div>
            <div v-if="item.specSort === 0 && index === 0" class="specval">
              <div v-for="(e,i) in item.specValueList" :key="i" :class="e.checkout ?'specImgBox activeNumStyle':'specImgBox'" @click="changeImg(e,i)">
                <img :src="getImageBasePath + e.valueImage + '?x-oss-process=image/resize,w_1000/format,webp'" alt="" :title="e.specValueName">
              </div>
            </div>
            <div v-else class="specvalbox">
              <div v-for="(v,j) in item.specValueList" :key="j" class="numbox">
                <div :class="v.checkout?'activeNumStyle':''" @click="changeSpe(v,j,index)">
                  <span>{{ v.specValueName }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="shipping">
            <span v-if="listData.freightTemplate.freightFreeFlag === 0">{{ getLanguageData.goodsText.shipping }}（{{ getLanguageData.goodsText.needShipping }}）</span>
            <span v-if="listData.freightTemplate.freightFreeFlag === 1">{{ getLanguageData.goodsText.shipping }}（{{ getLanguageData.goodsText.noShipping }}）</span>
          </div>
          <div v-if="listData.goodsDisplayTimeType === 0" class="sendtime">
            <span>{{ getLanguageData.goodsText.sameDay }}</span>
          </div>
          <div class="sendtime">
            <span>{{getLanguageData.storeText.sendAdress}}</span>
            <!-- <span style="color:#333;">{{listData.goodsInventoryLocation === 1 || listData.goodsInventoryLocation === 3 ? getLanguageData.storeText.zhCountry : getLanguageData.storeText.jpCountry}}</span> -->
            <span style="color:#333;" v-if="listData.goodsInventoryLocation === 1">{{getLanguageData.storeText.stardayZh}}</span>
            <span style="color:#333;" v-if="listData.goodsInventoryLocation === 2">{{getLanguageData.storeText.stardayJpC}}</span>
            <span style="color:#333;" v-if="listData.goodsInventoryLocation === 3">{{getLanguageData.storeText.stardayCn}}</span>
            <span style="color:#333;" v-if="listData.goodsInventoryLocation === 4">{{getLanguageData.storeText.stardayJp}}</span>
          </div>
          <!-- <div v-if="listData.goodsDisplayTimeType === 1 && listData.goodsDisplayTimeStart" class="sendtime">
            <span>{{ getLanguageData.goodsText.sendDay }}</span>
            <span>({{ getLanguageData.goodsText.sendDayStart }}{{ goodsDisplayTimeStart }}<span v-if="goodsDisplayTimeEnd">~</span> {{ goodsDisplayTimeEnd }}{{ getLanguageData.goodsText.sendDayEnd }})</span>
          </div>
          <div v-if="listData.goodsDisplayTimeType === 2 && listData.goodsPreSaleTimeStart" class="sendtime">
            <span>{{ getLanguageData.goodsText.proSaleTime }}</span>
            <span>({{ getLanguageData.goodsText.sendDayStart }}{{ listData.goodsPreSaleTimeStart.split(' ')[0] }}<span style="margin:0 10px;" v-if="listData.goodsPreSaleTimeEnd">~</span>{{ listData.goodsPreSaleTimeEnd.split(' ')[0] }})</span>
          </div> -->
          <div class="score">
            <span>{{ getLanguageData.goodsText.userAssess }}</span>
<!--            <span>({{ listData.commentCount }})</span>-->
            <span>({{ total }})</span>
          </div>
          <div class="quantity">
            <span>{{ getLanguageData.goodsText.stockNum }}</span>
            <span>({{ getLanguageData.goodsText.existing }}：{{ listData.totalInventory }})</span>
          </div>
          <div class="shopcart">
            <div class="counter">
              <div class="input">
                <input v-model="inputval" type="text">
              </div>
              <div class="addbtn">
                <div class="iconbox">
                  <Icon type="md-arrow-dropup" class="icon" @click="addNum" />
                </div>
                <div class="iconbox">
                  <Icon v-if="inputval === '1'" type="md-arrow-dropdown" style="color:#ccc;cursor:not-allowed;" />
                  <Icon v-else type="md-arrow-dropdown" class="icon" @click="reduceNum" />
                </div>
              </div>
            </div>
            <div v-if="listData.totalInventory === 0" class="overBtn">
              {{ getLanguageData.goodsText.alreadOver }}
            </div>
            <div v-if="listData.totalInventory > 0 && listData.isSelling === 1" class="addcart" @click="buyNowHandle">
              {{ getLanguageData.goodsText.immediatelyBuy }}
            </div>
            <div v-if="listData.isSelling !== 1" class="addcart" style="background-color:#ccc;">
              {{ getLanguageData.goodsText.immediatelyBuy }}
            </div>

            <div v-if="listData.totalInventory > 0 && listData.isSelling === 1" class="cardbox" @click="addShopCarHandle">
              <img src="@/assets/images/goods/card.png" alt="">
              <span>{{ getLanguageData.goodsText.addCart }}</span>
            </div>

            <div v-if="listData.isSelling !== 1" class="cardbox" style="background-color:#ccc;color:#fff;">
              <img src="@/assets/images/goods/card.png" alt="">
              <span>{{ getLanguageData.goodsText.addCart }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐部分 -->
    <div class="recommendbox">
      <img src="@/assets/images/goods/leftbtn.png" alt="">
      <img src="@/assets/images/goods/rightbtn.png" alt="">
      <div class="titlehead">
        <img src="@/assets/images/goods/left.png" alt="">
        <span>{{ getLanguageData.goodsText.recommend }}</span>
        <img src="@/assets/images/goods/right.png" alt="">
      </div>
      <Carousel loop arrow="always" dots="none" class="comcontent carousel">
        <CarouselItem v-for="(item,index) in recommendArr" :key="index">
          <div class="demo-carousel">
            <recgood
              v-for="(e,j) in item"
              :key="j"
              style="cursor:pointer;"
              :item="e"
              :img-url="e.goodsSearchImage"
              :title="e.goodsTitle"
              :activity-price="e.activityPrice"
              :market-price="e.marketPrice"
              @getRecgood="getRecgood"
            />
          </div>
        </CarouselItem>
      </Carousel>
    </div>

    <div class="detialshow">
      <div class="leftadsi">
        <div class="firstadsi">
          <div class="firsttitle">
            {{ getLanguageData.goodsText.storeSort }}
          </div>
          <div class="twobox">
            <p>{{ getLanguageData.goodsText.storeSort }}</p>
            <div v-if="showbtn" class="lastbox">
              <p>{{ getLanguageData.goodsText.firstSort }}</p>
              <p v-for="(item,index) in storeList" :key="index" style="cursor:pointer;">
                <span @click="goClassPage(item)">{{ item.category }}</span>
              </p>
            </div>
            <div v-if="storeList.length >= 10" class="showbox">
              <p class="lasttitle" @click="handShow">
                <span>{{ showbtn ? getLanguageData.goodsText.putAway : getLanguageData.goodsText.showOff }}</span><img v-if="showbtn" src="@/assets/images/goods/show.png" alt="">
                <img v-else src="@/assets/images/goods/down.png" alt="">
              </p>
            </div>
          </div>
        </div>
        <div class="twoadsi">
          <div class="firsttitle">
            {{ getLanguageData.goodsText.storeRecommend }}
          </div>
          <div class="storebox">
            <div v-for="(item,index) in storeGoodsList" :key="index" class="storeitem" @click="goGoodDetial(item)">
              <img :src="getImageBasePath + item.goodsSearchImage + '?x-oss-process=image/resize,w_1000/format,webp'" :alt="item.goodsTitle">
              <!-- <p>{{ item.goodsTitle }}</p> -->
              <h3><a :href="getLOCATIONORIGIN + 'product/' + item.id" :title="item.goodsTitle"><p>{{ item.goodsTitle }}</p></a></h3>
              <p><span>{{ item.activityPrice }}<span style="font-size:12px;">円</span></span><span v-if="item.marketPrice > item.activityPrice">{{ item.marketPrice }}<span style="font-size:12px;">円</span></span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="rightdetial">
        <div class="tabs">
          <div :class="activeTab === '1'?'activeStyle':''" @click="changeTab('1')">
            {{ getLanguageData.goodsText.goodDetial }}
          </div>
          <div :class="activeTab === '2'?'activeStyle':''" @click="changeTab('2')">
            {{ getLanguageData.goodsText.userAssess }}({{ total || 0 }})
          </div>
          <div />
        </div>
        <div v-if="activeTab === '1'" class="detialimgbox">
          <div class="ptitle ql-container ql-snow">
            <p class="ql-editor" v-html="listData.textDescription" />
          </div>
          <!-- <img v-for="(item,index) in listData.descriptionList" :key="index" :src="getImageBasePath + item + '?x-oss-process=image/resize,w_1000/format,webp'"> -->
          <div v-for="(item,index) in listData.descriptionList" :key="index">
            <img :src="getImageBasePath + item + '?x-oss-process=image/resize,w_1000/format,webp'" :alt="listData.goodsTitle">
          </div>
          <!-- <div>
            <img :src="getImageBasePath + listData.goodsService " :alt="listData.goodsTitle">
          </div>
          <div>
            <img :src="getImageBasePath + listData.goodsPackage " :alt="listData.goodsTitle">
          </div> -->
        </div>
        <div v-if="activeTab === '2'" class="evaluateBox"  id="scrollbox">
          <div class="headbox">
            <div class="totalStar">
              <img v-for="i in Math.floor(storeAverageScore || 0)" :key="i" src="@/assets/images/goods/star.png" alt="">
              <img v-if="Math.floor(storeAverageScore || 0) != storeAverageScore && storeAverageScore > 0" src="@/assets/images/goods/half.png" alt="">
              <img v-for="i in (5 - Math.ceil(storeAverageScore || 0))" :key="'un'+i" src="@/assets/images/goods/unstar.png" alt="">
              <!-- <Rate v-model="storeAverageScore" allow-half disabled/> -->
              <span>{{ storeAverageScore }}{{ getLanguageData.goodsText.star }}</span>
            </div>
            <!-- <div class="publishbox" @click="goComment">
              {{ getLanguageData.goodsText.publishAssess }}
            </div> -->
          </div>

          <div class="evaluateContent">
            <div v-for="(item,index) in averageList" :key="index" class="evaluateItem">
              <div class="evaluateHead">
                <img v-if="item.userHeardImg" :src="getImageBasePath + item.userHeardImg + '?x-oss-process=image/resize,w_1000/format,webp'" alt="">
                <img v-else src="@/assets/images/personal/defaultimg.png?x-oss-process=image/resize,w_1000/format,webp'" alt="">
                <span>{{ item.userName }}</span>
              </div>
              <div class="evaluateBody">
                <div class="avareHead">
                  <div>
                    <img v-for="i in Math.floor(item.goodsSore || 0)" :key="i" src="@/assets/images/goods/star.png" alt="">
                    <img v-if="Math.floor(item.goodsSore || 0) != item.goodsSore && item.goodsSore > 0" src="@/assets/images/goods/half.png" alt="">
                    <img v-for="i in (5 - Math.ceil(item.goodsSore || 0))" :key="'un'+i" src="@/assets/images/goods/unstar.png" alt="">
                    <!-- <Rate v-model="item.expressSore" allow-half disabled/> -->
                    <div class="evaluateTwo">
                      <span>{{ item.createTime.substring(0, 10) }}</span>
                      <div>
                        <span>{{ item.specValue }}</span>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="fourRightBtn">
                    <div @click="greatClick(item.id)">
                      役に立った({{item.favoriteNum}})
                    </div>
                  </div> -->
                </div>
                <div class="evaluateThree">
                  <p>{{ item.commentContent }}</p>
                </div>
                <div class="evaluateFour">
                  <div v-for="(m,n) in item.commentImgs" :key="n" class="fourItem">
                    <img :src="getImageBasePath + m.imgUrl + '?x-oss-process=image/resize,w_1000/format,webp'" alt="">
                  </div>
                </div>
              </div>

              <div v-if="item.replyFlag === 1" class="storeReply">
                <P>{{ item.evaluateAnswerAccountName }}{{ getLanguageData.goodsText.merchantReply }}:</P>
                <p>{{ item.evaluateAnswer }}</p>
              </div>
            </div>
          </div>

          <div class="pagebox">
            <Page
              :total="total"
              :current="pageNo"
              :page-size="pageSize"
              :prev-text="getLanguageData.goodsText.upPage"
              :next-text="getLanguageData.goodsText.downPage"
              @on-change="changepage"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="recommendbox">
      <img src="@/assets/images/goods/leftbtn.png" alt="">
      <img src="@/assets/images/goods/rightbtn.png" alt="">
      <div class="titlehead">
        <img src="@/assets/images/goods/left.png" alt="">
        <span>{{ getLanguageData.goodsText.interestedOther }}</span>
        <img src="@/assets/images/goods/right.png" alt="">
      </div>
      <Carousel loop arrow="always" dots="none" class="comcontent carousel">
        <CarouselItem v-for="(item,index) in interestData" :key="index">
          <div class="demo-carousel">
            <recgood
              v-for="(e,j) in item"
              :key="j"
              style="cursor:pointer;"
              :item="e"
              :img-url="e.goodsSearchImage"
              :title="e.goodsTitle"
              :activity-price="e.activityPrice"
              :market-price="e.marketPrice"
              @getRecgood="getRecgood"
            />
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <sendStoreMail
      :mail-adress="mailAdress"
      :send-modal="sendModal"
      :user-info="userInfo"
      :is-pla="isPla"
      :modal-header="modalHeader"
      :is-reply="isReply"
      @closeMail="closeMail"
    />

    <div class="related">
      <p>{{ getLanguageData.goodsText.related }}</p>
      <div class="classification">
        <div v-for="(item,index) in classList" :key="index">
          <span class="relatedClass" @click="goRelatedClass(item)">{{ item.introduceCategory }}</span>
        </div>
      </div>
    </div>

    <div class="hotwordbox">
      <p>{{ getLanguageData.indexPage.hotword }}</p>
      <a v-for="(item,index) in hotworddata" :key="index" :href="getLOCATIONORIGIN + 'search/product/'+item+'/1'">{{ item }}</a>
    </div>
    <!--     购物车提交弹窗  -->
    <Modal v-model="showAddShopCar" width="360" :mask-closable="false" :closable="false">
      <div style="text-align: center">
        <img src="@/assets/images/shopcar/addsuccess.png" alt="" style="width: 22px;height: 22px;vertical-align: middle">
        <span style="display: inline-block;vertical-align: middle;margin-left: 10px;">{{ getLanguageData.operate.addsuccess }}</span>
      </div>
      <div slot="footer" style="text-align: center">
        <Button @click="showAddShopCar=false">
          {{ getLanguageData.operate.cancle }}
        </Button>
        <Button type="primary" @click="$router.push('/shoppingcart')">
          {{ getLanguageData.operate.gopay }}
        </Button>
      </div>
    </Modal>

    <Modal
      v-model="emailModal"
      :footer-hide="true"
    >
      <div style="text-align:center;font-size:20px;">
        {{ getLanguageData.storeText.storeService }}
      </div>
      <div v-for="(item, index) in storeInfo.mails" :key="index" style="margin:10px 0 0 20px;cursor:pointer;" @click="submit(item)">
        {{ getLanguageData.storeText.servicer }}&nbsp;{{ index + 1 }}
      </div>
    </Modal>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { mapActions, mapGetters } from 'vuex'
import recgood from '@/components/goodscom/recgood'
import { turnDateType, getNewData1 } from '@/assets/js/util.js'
import sendStoreMail from '@/components/mail/sendStoreMail.vue'
export default {
  name: 'Goodsid',
  layout: 'default',
  middleware: 'auth',
  // scrollToTop: true,
  async asyncData ({ $axios, params, query, error }) {
    try {
      // console.log('id=====', params.goodsid)
      const { data } = await $axios.get('starday-goods/user/goods/details/' + params.goodsid)
      data.specList.forEach((item) => {
        item.specValueList.forEach((e) => {
          e.checkout = false
        })
      })
      data.imageListCopy = []
      if (data.videoFlag === 1) {
        const _imgarr = data.imageList.slice(1)
        data.imageList1 = _imgarr
        // console.log('data.imageList----', data.imageList)
        // console.log('_imgarr----', _imgarr)
        for (let i = 0; i < Math.ceil(_imgarr.length / 5); i++) {
          const _goodArr = _imgarr.slice(i * 5, i * 5 + 5)
          data.imageListCopy.push(_goodArr)
        }
      } else {
        data.imageList1 = data.imageList
        for (let i = 0; i < Math.ceil(data.imageList.length / 5); i++) {
          const _goodArr = data.imageList.slice(i * 5, i * 5 + 5)
          data.imageListCopy.push(_goodArr)
        }
      }
      if (data.goodsPreSaleTimeStart === data.goodsPreSaleTimeEnd) {
        data.goodsPreSaleTimeEnd = ''
      }
      // console.log('data-----', data.specList[0].specValueList)
      // const res = await $axios.get('starday-supplier/supplier/getStoreAppInfo?storeId=' + data.storeId)
      // res.data.evaluate = res.data.evaluate * 1
      // const sotre = res.data
      // console.log('sotre----', sotre)
      const storeCategory = await $axios.post('starday-goods/user/store_category/list', {
        storeId: data.storeId
      })
      // console.log('storeInfo---', sotre)
      const storeGoods = await $axios.post('starday-elasticsearch/search/goods', {
        pageNo: 1,
        pageSize: 5,
        sortOrder: 'desc',
        sorted: 0,
        storeId: data.storeId,
        exclude: [params.goodsid]
      })
      // console.log('storeGoods------', storeGoods.data.rows)
      const seoData = await $axios.get('starday-system/user/seo/info/' + params.goodsid + '/1/2')
      if (!seoData.data || !seoData.data.title) {
        seoData.data = {
          title: data.goodsTitle + '｜Starday市場',
          keyWords: data.goodsTitle + ',' + data.goodsTitle + '通贩,starday,starday市場,starday mart,通販,インターネットショッピング,オンラインショッピング',
          des: data.goodsTitle + '通販のページ、人気の' + data.breadCrumbs.thirdCateNameJp + 'がお得な価格で登場！' + data.goodsTitle + 'の商品詳細ページです。商品の概要や素材、 カラーバリエーションなどをご覧いただけます。',
          id: params.goodsid
        }
      }

      const recommendRes = await $axios.post('starday-elasticsearch/search/goods', {
        pageNo: 1,
        pageSize: 20,
        categoryId: data.categoryId,
        sortOrder: (new Date().getTime() / 1000) - [1, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000][Math.floor(Math.random() * 10)],
        sorted: 6
      })
      const recommendArr = []
      if (recommendRes.data.rows.length) {
        for (let i = 0; i < Math.ceil(recommendRes.data.rows.length / 5); i++) {
          const _goodArr = recommendRes.data.rows.slice(i * 5, i * 5 + 6)
          recommendArr.push(_goodArr)
        }
      }

      const interestGoods = await $axios.post('starday-elasticsearch/search/goods', {
        pageNo: 1,
        pageSize: 20,
        sortOrder: (new Date().getTime() / 1000) - [1, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000][Math.floor(Math.random() * 10)],
        sorted: 6
      })
      const interestData = []
      if (interestGoods.data.rows.length) {
        for (let i = 0; i < Math.ceil(interestGoods.data.rows.length / 5); i++) {
          const _goodArr = interestGoods.data.rows.slice(i * 5, i * 5 + 6)
          interestData.push(_goodArr)
        }
      }
      const hotworddata = await $axios.post('/starday-elasticsearch/search/random/tags', { keywords: '', sortOrder: (new Date().getTime() / 1000) - [1, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000][Math.floor(Math.random() * 10)] })
      return {
        listData: data,
        // storeInfo: sotre,
        storeList: storeCategory.data,
        storeGoodsList: storeGoods.data.rows,
        seoData: seoData.data,
        recommendArr,
        interestData,
        hotworddata: hotworddata.data || []
      }
    } catch (err) {
      err.reqUrl = 'starday-goods/user/goods/details'
      error(err)
    }
  },
  head () {
    const vm = this
    return {
      title: vm.seoData.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: vm.seoData.des
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: vm.seoData.keyWords
        }
      ],
      link: [
        {
          hid: 'canonical',
          ref: 'canonical',
          href: 'https://www.starday.jp/product/' + vm.$route.params.goodsid
        },
        {
          hid: 'alternate',
          ref: 'alternate',
          media: 'only screen and (max-width: 640px)',
          href: 'https://m.starday.jp/product/' + vm.$route.params.goodsid
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      getLanguage: 'getLanguage',
      getLanguageData: 'getLanguageData',
      getImageBasePath: 'getImageBasePath',
      getLoginData: 'getLoginData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN',
      getAddBuyCart: 'getAddBuyCart'
    })
  },
  data () {
    return {
      storeInfo: {},
      locationGoodId: '',
      carouselList: null,
      // carouselListCopy: null,
      inputval: '1',
      activeTab: '1',
      // imgurl: '',
      showAddShopCar: false,
      showbtn: true,
      // disable: true,
      interestData: [],
      classList: [],
      goodsDisplayTimeStart: null,
      goodsDisplayTimeEnd: null,
      pageNo: 1,
      pageSize: 10,
      storeAverageScore: '',
      total: 0,
      // recommendArr: [],
      // 选中规格值的数组
      checkSpecArr: [],
      // 选中规格值的数组名字
      checkSpecArrName: [],
      // 选中规格值的sku图片
      checkskuImage: '',
      // 选中规格的skuID
      checkSkuId: '',
      oldPrice: '',
      currentPrice: '',
      activityType: null,
      discount: 0,
      discount1: 0,
      ruleList: [],
      isFollow: false,
      copyUrl: '',
      leftImgIndex: 0,
      activePage: 0,
      sendModal: false,
      userInfo: {},
      isPla: false,
      modalHeader: '',
      isReply: false,
      emailModal: false,
      mailAdress: '',
      // 秒杀活动结束时间
      endTimeString: '',
      activeTime: {},
      timer: null,
      isPODStore: false,
      nowtimes: '',
      timeN: 0,
      active0start: '',
      averageList: [],
      showVideo: false,
      addcount: 0
    }
  },
  components: {
    recgood, sendStoreMail
  },
  mounted () {
    // console.log('thisiiiiii', this.$route.params)
    this.judgment()
    this.locationGoodId = this.$route.params.goodsid
    if (this.$route.query.shareIntegralId && this.$route.query.shareIntegralId !== 'null' && this.$route.query.shareIntegralId !== 'undefined') {
      this.appModel = true
    }
    const currentDate = turnDateType(new Date())
    if (this.listData.goodsDisplayTimeStart) {
      this.goodsDisplayTimeStart = getNewData1(currentDate, this.listData.goodsDisplayTimeStart)
      this.goodsDisplayTimeEnd = getNewData1(currentDate, this.listData.goodsDisplayTimeEnd)
      if (this.goodsDisplayTimeStart === this.goodsDisplayTimeEnd) {
        this.goodsDisplayTimeEnd = ''
      }
    }
    this.getStoreInfo()
    this.getGoodFollow()
    this.getFreightFlag()
    this.getCommentList()
    this.getRelatedClass()
    // this.getRecommendGood()
    // this.getOtherGoods()
    this.getGoodActive()
    this.getMinPrice()
    this.timer = setInterval(() => {
      this.timeN += 1
      this.activeTime = this.timestamp()
    }, 1000)
    // document.body.scrollTop = document.documentElement.scrollTop = 0
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    ...mapActions({
      handlePlaceData: 'handlePlaceData',
      handleBuyNowGood: 'handleBuyNowGood',
      handleAddBuyCart: 'handleAddBuyCart'
    }),
    // enterBox () {
    //   if (!this.showVideo) {
    //     document.getElementById('move').style.display = 'block'
    //     document.getElementById('bimg').style.display = 'block'
    //   }
    // },
    // leaveBox () {
    //   if (!this.showVideo) {
    //     document.getElementById('move').style.display = 'none'
    //     document.getElementById('bimg').style.display = 'none'
    //   }
    // },
    // moveMouse (e) {
    //   document.getElementById('move').style.display = 'block'
    //   document.getElementById('bimg').style.display = 'block'
    //   const bbox = document.getElementsByClassName('zhubox')
    //   let _left = e.layerX - document.getElementById('move').offsetWidth / 2
    //   let _top = e.layerY - document.getElementById('move').offsetHeight / 2
    //   if (_top <= 0) {
    //     _top = 0
    //   } else if (_top >= bbox.offsetHeight - document.getElementById('move').offsetHeight) {
    //     _top = bbox.offsetHeight - document.getElementById('move').offsetHeight
    //   }
    //   if (_left <= 0) {
    //     _left = 0
    //   } else if (_left >= bbox.offsetWidth - document.getElementById('move').offsetWidth) {
    //     _left = bbox.offsetWidth - document.getElementById('move').offsetWidth
    //   }
    //   document.getElementById('move').style.top = _top + 'px'
    //   document.getElementById('move').style.left = _left + 'px'
    //   // const bbox = document.getElementsByClassName('zhubox')
    //   // const bmove = document.getElementById('move')
    //   // const bbimg = document.getElementById('bimg');
    //   // const b_bimg = document.getElementById('b_bimg')
    // },
    judgment () {
      const vm = this
      if (this.listData.isSelling !== 1) {
        this.$Message.error({
          content: vm.getLanguageData.storeText.currentGoodNoSale,
          duration: 5
        })
      }
    },
    sureAppModel () {
      this.appModel = false
    },
    closeAppModel () {
      this.appModel = false
    },
    // 播放视频
    viewVideo () {
      this.showVideo = true
    },
    // 获取店铺信息
    getStoreInfo () {
      const vm = this
      vm.$axios({
        url: 'starday-supplier/supplier/getStoreAppInfo?storeId=' + this.listData.storeId,
        method: 'get'
      }).then((res) => {
        if (res.code === 200) {
          res.data.evaluate = res.data.evaluate * 1
          vm.storeInfo = res.data
        }
      })
    },
    // 获取系统字典中运费判断
    getFreightFlag () {
      const vm = this
      let _show = true
      vm.$axios.get('starday-system/dict/getValue?groupCode=PAY_SETTING&code=COD_STORE').then((res) => {
        if (res.code === 200) {
          if (res.data !== vm.storeInfo.storeType) {
            _show = false
          } else {
            _show = true
          }
          vm.isPODStore = _show
        }
      })
    },
    goClassPage (item) {
      this.$router.push('/store/' + this.listData.storeId + '?categoryId=' + item.id)
    },
    // 活动倒计时
    timestamp () {
      const vm = this
      const endtime = vm.nowtimes.split(' ')[0] + ' ' + vm.endTimeString
      // console.log('new Date(endtime)---------', new Date(endtime).getTime())
      let deltaTime = (new Date(endtime).getTime() - new Date(vm.nowtimes).getTime() - (this.timeN * 1000)) / 1000
      if (deltaTime <= 0) {
        vm.timeN = 0
        clearInterval(this.timer)
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
    },
    getRecgood ({ item }) {
      this.$router.push('/product/' + item.id)
    },
    goStorePage () {
      // console.log('this.storeInfo', this.listData.storeId)
      this.$router.push('/store/' + this.listData.storeId)
    },
    goGoodDetial (item) {
      this.$router.push('/product/' + item.id)
    },
    replyStore () {
      if (this.getLoginData) {
        this.emailModal = true
        // this.userInfo = this.storeInfo
        // console.log('this.storeInfo----', this.storeInfo)
      } else {
        this.$router.push('/login?ref=' + this.$route.path)
      }
    },
    submit (item) {
      this.emailModal = false
      this.sendModal = true
      this.userInfo = this.storeInfo
      this.modalHeader = this.getLanguageData.goodsText.contactMerchant
      this.mailAdress = item
    },
    closeModal () {
      this.emailModal = false
    },
    closeMail () {
      this.sendModal = false
    },
    onMoveImg () {
      this.showVideo = false
      if (this.activePage !== 0) {
        this.activePage -= 1
        this.leftImgIndex = 0
        this.carouselList = this.activePage * 5 - this.leftImgIndex
      }
    },
    underMoveImg () {
      this.showVideo = false
      if ((this.listData.imageList.length / 5) > 1 && this.activePage < (Math.ceil((this.listData.imageList.length / 5)) - 1)) {
        this.activePage += 1
        this.leftImgIndex = 0
        this.carouselList = this.activePage * 5 + this.leftImgIndex
      }
    },
    changeCarousel (oldIndex, newIndex) {
      this.showVideo = false
      if (newIndex > 4) {
        this.activePage = newIndex % 5 === 0 ? Math.ceil((newIndex / 5)) : Math.floor(newIndex / 5)
        this.leftImgIndex = (newIndex - (this.activePage) * 5) === 5 ? 0 : newIndex - this.activePage * 5
      } else {
        this.activePage = 0
        this.leftImgIndex = newIndex
      }
    },
    checkImg (i) {
      this.showVideo = false
      if (this.activePage > 0) {
        this.leftImgIndex = i
        this.carouselList = i + this.activePage * 5
      } else {
        this.leftImgIndex = i
        this.carouselList = i
      }
    },
    // 分享商品
    shareGood () {
      this.copyUrl = location.href
    },
    copy (e) {
      // console.log(e.text)
      this.$Message.success(this.getLanguageData.goodsText.copySuccess)
    },
    onError (e) {
      // console.log(e)
      this.$Message.error(this.getLanguageData.goodsText.copyFail)
    },
    // 关注商品
    attentionGood () {
      const vm = this
      const data = {
        spuId: vm.locationGoodId,
        state: !vm.isFollow
      }
      if (vm.getLoginData) {
        vm.$axios({
          url: 'starday-goods/user/goods_collection/follow',
          method: 'post',
          data
        }).then((res) => {
          if (res.code === 200) {
            vm.isFollow = !vm.isFollow
          }
        })
      } else {
        vm.$router.push('/login?ref=' + this.$route.path)
      }
    },
    // 获取商品是否关注
    getGoodFollow () {
      const vm = this
      const data = {
        spuId: vm.locationGoodId
      }
      if (vm.getLoginData) {
        vm.$axios({
          url: 'starday-goods/user/goods_collection/isFollow',
          method: 'post',
          data
        }).then((res) => {
          vm.isFollow = res.data[0].isFollow
        })
      } else {
        vm.isFollow = false
      }
    },
    // 获取商品规格值中的最小值
    getMinPrice () {
      const vm = this
      vm.listData.goodsSkuDetailsList = vm.listData.goodsSkuDetailsList.sort((a, b) => {
        return a.skuInfo.skuMarketPrice - b.skuInfo.skuMarketPrice
      })
      vm.currentPrice = vm.listData.goodsSkuDetailsList[0].skuInfo.skuMarketPrice
      vm.oldPrice = vm.listData.goodsSkuDetailsList[0].skuInfo.skuMarketPrice
    },
    // 点击规格切换价格
    changePrice () {
      const vm = this
      if (vm.checkSpecArr.length === vm.listData.specList.length) {
        vm.listData.goodsSkuDetailsList.forEach((item, index) => {
          if (item.valueKey === vm.checkSpecArr.join(',')) {
            // console.log('item------000', item)
            vm.listData.imageListCopy = []
            if (vm.listData.videoFlag === 1) {
              vm.listData.imageList1 = vm.listData.imageList.slice(1)
              const _imgarr = [...vm.listData.imageList.slice(1), item.skuInfo.skuImage]
              for (let i = 0; i < Math.ceil(_imgarr.length / 5); i++) {
                const _goodArr = _imgarr.slice(i * 5, i * 5 + 5)
                vm.listData.imageListCopy.push(_goodArr)
              }
            } else {
              vm.listData.imageList1 = vm.listData.imageList
              const _imgarr = [...vm.listData.imageList, item.skuInfo.skuImage]
              // console.log('_imgarr------', _imgarr)
              for (let i = 0; i < Math.ceil(_imgarr.length / 5); i++) {
                const _goodArr = _imgarr.slice(i * 5, i * 5 + 5)
                vm.listData.imageListCopy.push(_goodArr)
              }
            }
            vm.checkskuImage = item.skuInfo.skuImage
            vm.checkSkuId = item.skuInfo.id
            // console.log('item------', vm.listData.imageListCopy)
            // console.log('vm.activePage------', vm.activePage)
            vm.listData.imageList1 = [...vm.listData.imageList1, item.skuInfo.skuImage]
            vm.carouselList = vm.listData.imageList1.length - 1
            vm.activePage = vm.carouselList % 5 === 0 ? Math.ceil((vm.carouselList / 5)) : Math.floor(vm.carouselList / 5)
            vm.leftImgIndex = (vm.carouselList - (vm.activePage) * 5) === 5 ? 0 : vm.carouselList - vm.activePage * 5
            // console.log('vm.listData.imageList1 ----', vm.listData.imageList1)
            vm.currentPrice = item.skuInfo.skuMarketPrice
            vm.oldPrice = item.skuInfo.skuMarketPrice
            if (vm.activityType === 4 || vm.activityType === 0) {
              vm.listData.totalInventory = item.skuInfo.skuInventory
            }
          }
        })
      } else {
        this.getMinPrice()
      }
    },
    // 获取选中规格值的skuid
    getCheckSkuId () {
      const vm = this
      for (let i = 0; i < vm.listData.goodsSkuDetailsList.length; i++) {
        if (vm.listData.goodsSkuDetailsList[i].valueKey === vm.checkSpecArr.join(',')) {
          return vm.listData.goodsSkuDetailsList[i].skuInfo.id
        }
      }
    },
    // 选出选中的规格值数组
    getCheckSpeArr () {
      const vm = this
      vm.checkSpecArr = []
      vm.checkSpecArrName = []
      vm.listData.specList.forEach((item, index) => {
        item.specValueList.forEach((m, n) => {
          if (m.checkout) {
            // console.log('m------m', m)
            vm.checkSpecArr.push(m.id)
            vm.checkSpecArrName.push(m.specValueName)
          }
        })
      })
    },
    // 活动接口
    getGoodActive () {
      const vm = this
      vm.$axios({
        url: 'starday-activity/user/activity/goods/' + vm.locationGoodId,
        method: 'post'
      }).then((res) => {
        if (res.code === 200) {
          if (res.data.activityId) {
            let _arr = []
            if (res.data.activityType === 1) {
              res.data.flashList.forEach((item, index) => {
                if (item.timeState === 0) {
                  _arr.push(item)
                }
              })
              const _index = res.data.flashList.findIndex((item, index) => {
                return item.timeState === 1
              })
              if (_index > -1) {
                // console.log('_index----', _index)
                if (res.data.flashList[_index].timeState === 1) {
                  vm.activityType = 1
                  vm.nowtimes = res.data.flashList[_index].nowtimes
                  vm.discount = res.data.flashList[_index].discount / 100
                  if (res.data.flashList[_index].leverNum === res.data.flashList[_index].stockNum) {
                    vm.listData.totalInventory = 0
                  } else {
                    vm.listData.totalInventory = res.data.flashList[_index].stockNum - res.data.flashList[_index].buyNum
                  }
                  vm.endTimeString = res.data.flashList[_index].endTimeString
                }
              } else if (_index < 0) {
                if (_arr) {
                  vm.activityType = 0
                  _arr.forEach((item, index) => {
                    const _year = item.nowtimes.split(' ')[0]
                    item.times = new Date(_year + ' ' + item.startTimeString).getTime() / 1000
                  })
                  _arr = _arr.sort((a, b) => {
                    return a.times - b.times
                  })
                  vm.active0start = _arr[0].startTimeString
                  vm.discount1 = _arr[0].discount / 100
                }
              }
            } else if (res.data.activityType === 2) {
              vm.activityType = 2
              vm.discount = res.data.discount.rate / 100
              vm.listData.totalInventory = res.data.discount.discountActivityGoodsDto.stock - res.data.discount.discountActivityGoodsDto.buyNum
            } else {
              vm.activityType = 3
              vm.discount = 0
              vm.ruleList = res.data.reduction.ruleList.sort((a, b) => {
                return a.ruleSort - b.ruleSort
              })
              vm.listData.totalInventory = res.data.reduction.goodsInventory
            }
          } else {
            vm.activityType = 4
            vm.discount = 0
          }
        }
      })
    },
    // 去相关分类
    goRelatedClass (item) {
      this.$router.push('/cate/' + item.id)
    },
    // 获取相关分类
    getRelatedClass () {
      const vm = this
      this.$axios.get('starday-goods/user/seo/goods_category/getCate?cateId=' + this.listData.categoryId).then((res) => {
        if (res.code === 200) {
          vm.classList = res.data
        }
      })
    },
    // 评论切换页数
    changepage (page) {
      this.pageNo = page
      this.getCommentList()
      document.getElementById('scrollbox').scrollIntoView()
    },
    // 点赞
    // greatClick (avareid) {
    //   const vm = this
    //   vm.$axios.post('starday-goods/user/goods_comment_favorites/favorites?commentId=' + avareid).then((res) => {
    //     if (res.code === 200) {
    //       vm.getCommentList()
    //     }
    //   })
    // },
    // 去评论
    goComment () {
      const vm = this
      if (vm.getLoginData) {
        vm.$router.push('/order/evaluate')
      } else {
        vm.$router.push('/login?ref=' + this.$route.path)
      }
    },
    // 获取评论列表
    getCommentList () {
      const vm = this
      vm.$axios.get('starday-goods/goods_comment/list?goodsId=' + vm.locationGoodId + '&pageNo=' + vm.pageNo + '&pageSize=' + vm.pageSize).then((res) => {
        // console.log('res-----', res)
        if (res.code === 200) {
          vm.storeAverageScore = res.data.averageScore + ''
          // console.log('res.data.averageScore----', Math.floor(vm.storeAverageScore))
          vm.averageList = res.data.comment
          vm.pageNo = res.data.pageNo
          vm.pageSize = res.data.pageSize
          vm.total = res.data.totalNum
        }
      })
    },
    // 收藏店铺
    favoritesStore () {
      const vm = this
      if (vm.getLoginData) {
        const _state = vm.storeInfo.follow === 0 ? 'true' : 'false'
        const _data = {
          storeId: vm.listData.storeId,
          state: _state
        }
        vm.$axios.post('/starday-goods/user/store_collection/follow', _data).then((res) => {
          if (res.code === 200) {
            vm.storeInfo.follow = res.data
          }
        })
      } else {
        vm.$router.push('/login?ref=' + this.$route.path)
      }
    },
    // 数量加
    addNum () {
      this.inputval = this.inputval * 1 + 1 + ''
      // if (this.inputval > 1) {
      //   this.disable = false
      // }
    },
    // 数量减
    reduceNum () {
      this.inputval = this.inputval * 1 - 1 + ''
      // if (this.inputval <= 1) {
      //   this.disable = true
      // } else {
      //   this.disable = false
      //   this.inputval = this.inputval * 1 - 1 + ''
      // }
    },
    // 规格图片切换
    changeImg (e, i) {
      // this.activeImg = i
      this.listData.specList[0].specValueList.forEach((item, index) => {
        if (index === i) {
          item.checkout = true
        } else {
          item.checkout = false
        }
      })
      this.getCheckSpeArr()
      this.changePrice()
    },
    // 规格值切换
    changeSpe (v, i, index) {
      // console.log('item00000', v)
      this.listData.specList[index].specValueList.forEach((item, m) => {
        if (i === m) {
          item.checkout = true
        } else {
          item.checkout = false
        }
      })
      this.getCheckSpeArr(index)
      this.changePrice()
    },
    // 收起展示
    handShow () {
      this.showbtn = !this.showbtn
    },
    // 商品详情和评价切换
    changeTab (str) {
      this.activeTab = str
    },
    buyNowHandle () {
      const vm = this
      // console.log('vm.listData.totalInventory----', vm.listData.totalInventory)
      if (vm.listData.totalInventory === 0) {
        return vm.$Message.error(vm.getLanguageData.goodsText.goodOutStock)
      }
      if (vm.inputval > vm.listData.totalInventory) {
        return vm.$Message.error(vm.getLanguageData.goodsText.noStock)
      }
      if (vm.getLoginData) {
        if (vm.checkSpecArr.length === vm.listData.specList.length) {
          const _id = vm.getCheckSkuId()
          vm.$axios.post('starday-order/order/buyImmediately', {
            buyCount: vm.inputval * 1,
            skuId: _id
          }).then((res) => {
            if (res.code === 200) {
              vm.handlePlaceData(res.data)
              vm.$router.push('/placeorder')
            }
          })
        } else {
          this.$Message.warning(vm.getLanguageData.goodsText.placeSelectSpec)
        }
      } else {
        if (vm.checkSpecArr.length !== vm.listData.specList.length) {
          return vm.$Message.warning(vm.getLanguageData.goodsText.placeSelectSpec)
        }
        if (vm.listData.totalInventory <= 0) {
          return vm.$Message.warning(vm.getLanguageData.goodsText.noStock)
        }
        const _id = vm.getCheckSkuId()
        vm.handleBuyNowGood({
          buyCount: vm.inputval * 1,
          skuId: _id
        })
        // vm.$router.push('/login?ref=' + this.$route.path)
        vm.$router.push('/shipInfo')
      }
    },
    addShopCarHandle () {
      const vm = this
      const _id = vm.getCheckSkuId()
      if (vm.listData.totalInventory === 0) {
        return vm.$Message.error(vm.getLanguageData.goodsText.goodOutStock)
      }
      if (vm.inputval > vm.listData.totalInventory) {
        return vm.$Message.error(vm.getLanguageData.goodsText.noStock)
      }
      if (vm.getLoginData) {
        if (vm.checkSpecArr.length === vm.listData.specList.length) {
          vm.$axios.post('starday-order/shopCart/add', {
            num: vm.inputval * 1,
            skuId: _id,
            spuId: vm.listData.id,
            storeId: vm.listData.storeId
          }).then((res) => {
            if (res.code === 200) {
              vm.showAddShopCar = true
            }
          })
        } else {
          this.$Message.warning(vm.getLanguageData.goodsText.placeSelectSpec)
        }
      } else {
        // vm.$router.push('/login?ref=' + this.$route.path)
        if (vm.checkSpecArr.length !== vm.listData.specList.length) {
          return vm.$Message.warning(vm.getLanguageData.goodsText.placeSelectSpec)
        }
        if (vm.listData.totalInventory <= 0) {
          return vm.$Message.warning(vm.getLanguageData.goodsText.noStock)
        }
        if (vm.addcount >= vm.listData.totalInventory) {
          return vm.$Message.warning(vm.getLanguageData.goodsText.noStock)
        }
        const _data = {
          shopItems: [
            {
              checked: true,
              goodsTitle: vm.listData.goodsTitle,
              num: vm.inputval * 1,
              price: vm.currentPrice - (vm.currentPrice * vm.discount).toFixed(0),
              skuId: vm.checkSkuId,
              // goodsSkuDetailsList: vm.listData.goodsSkuDetailsList,
              skuValue: vm.checkSpecArrName.join(';'),
              skuImage: vm.checkskuImage,
              spuId: vm.listData.id,
              skuInventory: vm.listData.totalInventory
            }
          ],
          storeId: vm.listData.storeId,
          storeName: vm.storeInfo.storeName,
          checked: true
        }
        if (vm.getAddBuyCart && vm.getAddBuyCart.length === 0) {
          vm.handleAddBuyCart([_data])
        } else {
          const _index = vm.getAddBuyCart.findIndex((item) => {
            return item.storeId === vm.listData.storeId
          })
          if (_index > -1) {
            const _spuId = vm.getAddBuyCart[_index].shopItems.findIndex((chItem) => {
              return chItem.spuId === vm.listData.id
            })
            if (_spuId > -1) {
              const _skuId = vm.getAddBuyCart[_index].shopItems.findIndex((skuItem) => {
                return skuItem.skuId === vm.checkSkuId
              })
              if (_skuId > -1) {
                vm.getAddBuyCart[_index].shopItems[_skuId].num += vm.inputval * 1
              } else {
                vm.getAddBuyCart[_index].shopItems.push(_data.shopItems[0])
              }
            } else {
              vm.getAddBuyCart[_index].shopItems.push(_data.shopItems[0])
            }
          } else {
            vm.handleAddBuyCart([...vm.getAddBuyCart, _data])
          }
        }
        vm.addcount++
        this.$Message.success(this.getLanguageData.receiptText.addSuccess)
        // console.log('vm.getAddBuyCart-----', vm.getAddBuyCart)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.goodsid {
  .breadbox {
    margin: 12px 0;
  }
  .gooddetial {
    display: flex;
    justify-content: flex-start;
    padding: 0 30px 21px 20px;
    background-color: #fff;
    .bannerleft {
      margin-top: 10px;
      .bannerHead {
        display: flex;
        justify-content: flex-start;
        .headLeft {
          .icon {
            width: 84px;
            height: 20px;
            cursor: pointer;
          }
          .leftlun {
            height: 450px;
            width: 84px;
            overflow: hidden;
            >div {
              cursor: pointer;
            }
            img {
              width: 84px;
              height: 84px;
              cursor: pointer;
            }
          }
        }
        .headRight {
          position: relative;
          margin: 26px 0 0 31px;
          .zhubox {
            position: relative;
            width: 460px;
            height: 460px;
            .carBox{
              position: relative;
              width: 460px;
              height: 460px;
              display: flex;
              align-items: center;
              justify-content: center;
              .iconbox{
                position: absolute;
                bottom: 10px;
                right: 4px;
                width: 40px;
                height: 40px;
                z-index: 66;
                cursor: pointer;
              }
            }
            // #move{
            //   width:100px;
            //   height:100px;
            //   position:absolute;
            //   display:none;
            //   background-color: #ccc;
            //   opacity: 0.6;
            // }
          }
          .foot {
            margin-top: 14px;
            display: flex;
            justify-content: flex-start;
            div {
              cursor: pointer;
              img {
                width: 26px;
                height: 26px;
                vertical-align: middle;
                margin-right: 6px;
              }
              span {
                margin-right: 16px;
                font-size: 14px;
                vertical-align: middle;
                color: #999;
              }
            }
          }
          // #bimg{
          //   position: absolute;
          //   left: 480px;
          //   top: -40px;
          //   width:600px;
          //   height:600px;
          //   z-index: 9999;
          //   background-color: #fff;
          //   display: none;
          // }
        }
      }
      .bannerBody {
        margin-top: 20px;
        border: 1px solid #e0e0e0;
        background-color: #fff;
        .intelligence {
          height: 44px;
          border-bottom: 1px solid #e0e0e0;
          background-color: #f5f5f5;
          font-size: 14px;
          text-align: center;
          line-height: 44px;
          color: #333;
        }
        .intelligenceFoot {
          padding: 20px;
          display: flex;
          justify-content: flex-start;
          .imabox {
            width: 80px;
            height: 80px;
            img {
              width: 80px;
              height: 80px;
            }
          }
          .boxright {
            flex: 1;
            margin-left: 16px;
            display: flex;
            justify-content: space-between;
            .textbox {
              .firstbox {
                span {
                  font-size: 16px;
                  color: #333;
                  font-weight: 500;
                }
                img {
                  width: 26px;
                  vertical-align: middle;
                  cursor: pointer;
                }
              }
              .twobox {
                margin: 6px 0 8px 0;
                span {
                  vertical-align: middle;
                }
                img {
                  width: 20px;
                  margin-right: 6px;
                  vertical-align: middle;
                }
                // > div {
                //   display: inline-block;
                // }
              }
              .twobox,
              .threebox {
                font-size: 14px;
                color: #333;
                span:nth-of-type(3) {
                  margin-left: 20px;
                }
              }
            }
            .favorites {
              .btnbox {
                width: 100px;
                height: 34px;
                border: 1px solid #dcdcdc;
                color: #ff5d19;
                border-radius: 2px;
                font-size: 14px;
                text-align: center;
                line-height: 34px;
                cursor: pointer;
              }
              .btnbox:nth-child(2) {
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
    .bannerRight {
      flex: 1;
      margin: 30px 0 0 30px;
      >h1 {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
      }
      >p:nth-of-type(1) {
        margin-top: 10px;
        font-size: 14px;
        color: #3c5eb7;
      }
      .spikeBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 32px;
        margin-top: 20px;
        padding: 0 10px;
        // line-height: 32px;
        background: -webkit-linear-gradient(left, #FE3C3B 0%,#FF8031 100%);
        .leftSpike{
          img{
            width: 18px;
            vertical-align: middle;
            margin-right: 4px;
          }
          span {
            vertical-align: middle;
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;
          }
        }
        .rightSpike{
          .timeItem{
            display: inline-block;
            width: 20px;
            height: 20px;
            background-color: #fff;
            border-radius: 2px;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            font-weight: 600;
            color: #c91c1c;
          }
          span{
            font-size: 12px;
            color: #fff;
            font-weight: 600;
          }
        }
      }
      .rightbox {
        // margin-top: 19px;
        padding: 14px 0 11px 10px;
        background-color: #f3f4f6;
        .firstrightbox {
          span:nth-of-type(1) {
            font-size: 14px;
            color: #333333;
          }
          span:nth-of-type(2),
          span:nth-of-type(3) {
            display: inline-block;
            width: 71px;
            height: 22px;
            margin: 0 8px 0 10px;
            font-size: 12px;
            background: #f7ded1;
            border: 1px solid #f5ad81;
            border-radius: 2px;
            color: #f5ad81;
            text-align: center;
            line-height: 22px;
          }
        }
        .tworightbox {
          display: flex;
          justify-content: flex-start;
          margin: 13px 0 16px;
          font-size: 14px;
          >span {
            width: 50px;
            color: #333333;
            margin-right: 10px;
          }
          .rulebox{
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            span{
              color: #ff5d19;
            }
          }
        }
        .threerightbox {
          // margin-top: 16px;
          >span:nth-of-type(2) {
            color: #f26936;
            font-size: 24px;
            font-weight: 700;
          }
          >span:nth-of-type(1) {
            color: #f26936;
            font-size: 30px;
            font-weight: 700;
          }
          // span:nth-of-type(3) {
          //   color: #333;
          //   font-size: 14px;
          // }
          .active0 {
            font-size: 14px;
            font-weight: 500;
            color: #ff5d19;
            margin-left: 20px;
          }
          .deline {
            color: #999;
            font-size: 18px;
            font-weight: 700;
            text-decoration: line-through;
          }
        }
      }
      .specbox {
        .title {
          margin: 20px 0 11px;
          font-size: 14px;
          color: #333;
        }
        .specval {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          .specImgBox {
            width: 68px;
            height: 68px;
            margin: 0 12px 10px 0;
            cursor: pointer;
            img {
              width: 64px;
              height: 64px;
            }
          }
        }
        .specvalbox {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          .numbox {
            // width: 67px;
            height: 32px;
            margin: 0 10px 10px 0;
            text-align: center;
            line-height: 32px;
            cursor: pointer;
            > div {
              width: 100%;
              height: 100%;
              padding: 0 10px;
              border: 1px solid #d8d8d8;
            }
          }
        }
        .shipping,
        .quantity {
          margin-top: 20px;
          font-size: 14px;
          color: #333333;
        }
        .shipping{
          margin-bottom: 20px;
        }
        .sendtime {
          margin-bottom: 20px;
          font-size: 14px;
          span:nth-of-type(1) {
            color: #333333;
          }
          span:nth-of-type(2) {
            color: #ff5d19;
          }
        }
        .score {
          font-size: 14px;
          span:nth-of-type(1) {
            color: #333333;
          }
          span:nth-of-type(2) {
            color: #ff5d19;
          }
        }
        .shopcart {
          margin-top: 20px;
          display: flex;
          justify-content: flex-start;
          .counter {
            width: 100px;
            height: 50px;
            border: 1px solid #cccccc;
            border-radius: 2px;
            display: flex;
            justify-content: flex-start;
            .input {
              flex: 1;
              input {
                width: 100%;
                height: 100%;
                padding-left: 10px;
                border: none;
                outline: none;
              }
            }
            .addbtn {
              width: 35px;
              border-left: 1px solid #d8d8d8;
              .iconbox {
                font-size: 18px;
                text-align: center;
                color: #666;
                // box-sizing: border-box;
                .icon{
                  width: 18px;
                  height: 18px;
                  cursor: pointer;
                }
              }
              .iconbox:nth-of-type(1){
                height: 25px;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
              }
              .iconbox:nth-of-type(2){
                height: 25px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
              }
            }
          }
          .addcart {
            width: 194px;
            height: 50px;
            margin: 0 10px;
            background: #e76636;
            border-radius: 2px;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            color: #ffffff;
            cursor: pointer;
          }
          .overBtn{
            width: 194px;
            height: 50px;
            margin-left: 10px;
            background-color: #ccc;
            border-radius: 2px;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            color: #ffffff;
          }
          .cardbox {
            width: 194px;
            height: 50px;
            background: rgba(231, 102, 54, 0.37);
            border-radius: 2px;
            text-align: center;
            line-height: 50px;
            color: #e76636;
            cursor: pointer;
            img {
              width: 22px;
              height: 22px;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }

  .recommendbox {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    margin-top: 20px;
    padding-top: 32px;
    background-color: #fff;
    > img:nth-of-type(1) {
      position: absolute;
      left: -1px;
      top: 50%;
      transform: translateY(-50%);
      width: 26px;
      cursor: pointer;
    }
    > img:nth-of-type(2) {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 26px;
      cursor: pointer;
    }
    .titlehead {
      text-align: center;
      img {
        width: 34px;
        vertical-align: middle;
      }
      span {
        margin: 0 18px;
        font-size: 24px;
        font-weight: 500;
        color: #333333;
      }
    }
    .comcontent {
      padding: 20px 0 20px 20px;
      background-color: #fff;
      white-space: nowrap;
    }
  }

  .detialshow {
    display: flex;
    justify-content: flex-start;
    margin-top: 21px;
    .leftadsi {
      width: 250px;
      margin-right: 20px;
      .firstadsi {
        width: 100%;
        padding-bottom: 14px;
        background-color: #fff;
        box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.1);
        .firsttitle {
          width: 100%;
          height: 44px;
          border-bottom: 1px solid #e0e0e0;
          font-size: 14px;
          font-weight: 500;
          color: #333333;
          text-align: center;
          line-height: 44px;
        }
        .twobox {
          > p:nth-of-type(1) {
            margin: 19px 0 0 32px;
            font-size: 14px;
            font-weight: 500;
            color: #333333;
          }
          .lastbox {
            margin: 12px 0 0 46px;
            p {
              margin-bottom: 12px;
              font-size: 14px;
              color: #333333;
            }
          }
          .showbox {
            margin: 12px 0 0 46px;
            .lasttitle {
              color: #1491ff;
              cursor: pointer;
              span {
                vertical-align: middle;
              }
              img {
                width: 16px;
                vertical-align: middle;
                margin-left: 10px;
              }
            }
          }
        }
      }
      .twoadsi {
        margin-top: 20px;
        width: 100%;
        padding-bottom: 16px;
        background-color: #fff;
        box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.1);
        .firsttitle {
          width: 100%;
          height: 44px;
          border-bottom: 1px solid #e0e0e0;
          font-size: 14px;
          font-weight: 500;
          color: #333333;
          text-align: center;
          line-height: 44px;
        }
        .storebox {
          .storeitem {
            margin-top: 26px;
            padding: 0 20px;
            box-sizing: border-box;
            cursor: pointer;
            >img {
              width: 210px;
            }
            >h3{
              p {
                margin: 10px 0 6px 0;
                font-size: 13px;
                color: #333333;
              }
            }
            >p:nth-of-type(1) {
              >span:nth-of-type(1) {
                font-size: 18px;
                color: #f26936;
                font-weight: 700;
              }
              >span:nth-of-type(2) {
                margin-left: 6px;
                font-size: 13px;
                color: #999;
                font-weight: 700;
              }
            }
          }
        }
      }
    }
    .rightdetial {
      flex: 1;
      background-color: #fff;
      .tabs {
        height: 40px;
        // border-bottom: 1px solid #e0e0e0;
        display: flex;
        justify-content: flex-start;
        > div {
          width: 200px;
          text-align: center;
          font-size: 14px;
          line-height: 40px;
          color: #333;
          cursor: pointer;
          border-bottom: 1px solid #e0e0e0;
          box-sizing: border-box;
        }
        > div:nth-of-type(1) {
          border-right: 1px solid #e0e0e0;
        }
        > div:nth-of-type(3) {
          flex: 1;
          border-bottom: 1px solid #e0e0e0;
        }
      }
      .detialimgbox {
        margin-top: 20px;
        padding: 0 20px;
        text-align: center;
        .ptitle{
          margin-bottom: 20px;
          > p {
            width: 800px;
            text-indent: 2em;
            text-align: left;
            margin: 0 auto;
            word-break: break-word;
          }
        }
        img {
          width: 800px;
          vertical-align: middle;
        }
      }
      .evaluateBox {
        padding: 20px 32px 0;
        .headbox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 32px 30px 32px 20px;
          background-color: #fbfbfb;
          border: 1px solid #e0e0e0;
          .totalStar {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span {
              margin-left: 10px;
              font-size: 14px;
              color: #333333;
              vertical-align: middle;
            }
            img {
              width: 26px;
              margin-right: 6px;
              vertical-align: middle;
            }
          }
          .publishbox {
            padding: 7px 20px;
            border: 1px solid #51b8f1;
            color: #51b8f1;
            font-size: 14px;
            border-radius: 2px;
            cursor: pointer;
          }
        }

        .evaluateContent {
          padding-left: 10px;
          .evaluateItem {
            margin-top: 20px;
            .evaluateHead {
              margin-bottom: 10px;
              img {
                width: 36px;
                vertical-align: middle;
                border-radius: 50%;
              }
              span {
                margin-left: 12px;
                font-size: 14px;
                color: #333;
              }
            }
            .evaluateBody {
              // margin-top: 10px;
              margin: 0 0 0 48px;
              padding-bottom: 20px;
              border-bottom: 1px solid #eee;
              .avareHead{
                display: flex;
                justify-content: space-between;
                align-items: center;
                img {
                  width: 20px;
                  vertical-align: middle;
                  margin-right: 10px;
                }
                .evaluateTwo {
                  margin-top: 10px;
                  display: flex;
                  justify-content: flex-start;
                  font-size: 14px;
                  color: #999;
                  span:nth-of-type(1){
                    margin-right: 10px;
                  }
                }
                .fourRightBtn {
                   > div {
                      // display: inline-block;
                      margin-left: 20px;
                      padding: 3px 12px;
                      font-size: 12px;
                      color: #333;
                      border: 1px solid #979797;
                      border-radius: 12px;
                      cursor: pointer;
                    }
                }
              }
              .evaluateThree {
                margin-top: 10px;
                font-size: 14px;
                color: #333;
              }
              .evaluateFour {
                display: flex;
                justify-content: flex-start;
                margin-top: 10px;
                .fourItem {
                  img {
                    width: 100px;
                    margin-right: 10px;
                  }
                }
              }
            }
            .storeReply{
              margin: 20px 0 0 48px;
              padding: 20px;
              background: #f3f4f6;
              p:nth-of-type(1){
                font-size: 14px;
                font-weight: 500;
                color: #333333;
              }
              p:nth-of-type(2){
                margin-top: 15px;
                font-size: 14px;
                color: #666;
              }
            }
          }
        }
        .pagebox {
          margin: 20px 0 30px;
          text-align: right;
        }
      }
    }
  }
  .related {
    margin-top: 36px;
    p {
      // margin-bottom: 14px;
      font-size: 16px;
      color: #333333;
      font-weight: 500;
    }
    .classification {
      display: flex;
      justify-content: flex-start;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      > div {
        margin-top: 14px;
        width: 200px;
      }
    }
  }
  .activeStyle {
    border-bottom: 0 !important;
    border-top: 2px solid #ff5d19;
    color: #ff5d19 !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    border-right: 1px solid #e0e0e0;
  }
  .activeNumStyle {
    border: 2px solid #f26936 !important;
  }
  .notAlow {
    cursor: not-allowed !important;
  }
  .relatedClass:hover {
    color: #f26936 !important;
    cursor: pointer;
  }
   /deep/.ivu-rate-star:before, .ivu-rate-star-content:before {
    font-size: 26px;
  }
  /deep/.ivu-rate-star-half .ivu-rate-star-content:before, .ivu-rate-star-full:before {
    font-size: 26px;
  }
  /deep/.ivu-rate-star{
    margin-right: 0;
  }
  /deep/.ivu-carousel-dots {
    z-index: 0;
  }
  /deep/.ql-container.ql-snow {
    border: none;
  }
  .hotwordbox{
    margin-top:20px;
    p{
      height: 40px;
      line-height: 40px;
    }
    a{
      color: #999999;
      font-size: 12px;
      margin-right: 15px;
    }
  }
}
</style>
