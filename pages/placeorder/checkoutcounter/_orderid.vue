<template>
  <div class="checkoutcounter">
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
    <div class="paytypebox">
      <h5>{{ getLanguageData.checkoutcounter.paytype }}</h5>
      <div class="typecontent">
        <section v-for="(item,index) in typeListData" :key="index" :class="'paytypemethod' + index" @click="changeSelectType(item)">
          <img
            v-if="paytypeCcode===item.paytypeCode"
            src="@/assets/images/placeorder/selectedtype.png"
            alt=""
            class="radioimg"
          >
          <img v-else src="@/assets/images/placeorder/select.png" alt="" class="radioimg">
          <span class="paytypenaem">{{ getLanguage==='zh'?item.paytypeName.split('|')[0]:item.paytypeName.split('|')[1] }}</span>
          <span v-if="item.paytypeCode==='01'" class="label">{{ getLanguageData.checkoutcounter.balance }} <strong>{{ balanceTotal }}</strong> <span style="font-size:12px;">円</span> <strong
            v-show="getCheckCounter.totalPayAmount>balanceTotal"
          >{{ getLanguageData.checkoutcounter.needfix }}</strong></span>
          <span v-if="item.paytypeCode==='03'" class="label">{{ getLanguageData.checkoutcounter.banli }}</span>
          <span v-if="item.paytypeCode==='04'" class="label">{{ getLanguageData.checkoutcounter.paypal }}</span>
          <span v-if="item.imgUrlList && item.imgUrlList.length" class="label">
            <img v-for="(imgitem,imgindex) in item.imgUrlList" :key="imgindex" :src="getImageBasePath + imgitem" alt="">
          </span>
          <span v-if="item.paytypeCode === '07'" class="label protocolbox" @click.stop="showModel">
            《{{getLanguageData.nextText.nextPayAgreement}}》
          </span>
        </section>
      </div>
      <div v-if="paytypeCcode === '07' && formVal.mobile" class="tableBox">
        <Table :columns="columns" :data="tableData">
          <template slot="opcting">
            <span style="font-size: 12px;color: #1491ff;cursor:pointer;" @click="veriModelFlag = true">{{getLanguageData.nextText.nextPaymodify}}</span>
          </template>
        </Table>
      </div>
      <div class="btnbox">
        <p @click="submitPayHandle">
          {{ getLanguageData.checkoutcounter.paynow }}
        </p>
      </div>
    </div>
    <form
      v-if="paymentForm"
      name="Payment"
      :action="paymentForm.url"
      method="post"
      style="visibility: hidden;height: 0"
    >
      <input type="hidden" name="aid" :value="paymentForm.aid">
      <input type="hidden" name="pt" :value="paymentForm.pt">
      <input type="hidden" name="cmd" :value="paymentForm.cmd">
      <input type="hidden" name="jb" :value="paymentForm.jb">
      <input type="hidden" name="am" :value="paymentForm.am">
      <input type="hidden" name="cod" :value="paymentForm.cod">
      <input type="hidden" name="tx" :value="paymentForm.tx">
      <input type="hidden" name="sf" :value="paymentForm.sf">
      <input type="hidden" name="ut" :value="paymentForm.ut">
      <input type="hidden" name="hak" :value="paymentForm.hak">
      <noscript>
        <input
        type="submit"
        ref="paymentsubmit"
        name="submit"
        value="wangguan購入"
        />
      </noscript>
    </form>
    <!--    通联支付-->
    <form v-if="tonglianForm" :action="tonglianForm.hostUrl + '/payment'" method="post" style="visibility: hidden;height: 0">
      <input id="paymerchantid" type="text" name="paymerchantid" :value="tonglianForm.PaymerchantID">
      <input id="OrderId" type="text" name="OrderId" :value="tonglianForm.OrderId">
      <input id="Email" type="text" name="Email" :value="tonglianForm.Email">
      <input id="CurrencyType" type="text" name="CurrencyType" :value="tonglianForm.CurrencyType">
      <input id="Amount" type="text" name="Amount" :value="tonglianForm.Amount">
      <input id="Signature" type="text" name="Signature" :value="tonglianForm.sign">
      <input id="ReturnUrl" type="text" name="ReturnUrl" :value="tonglianForm.ReturnUrl">
      <input id="NotifyUrl" type="text" name="NotifyUrl" :value="tonglianForm.NotifyUrl">
      <input id="Language" type="text" name="Language" :value="tonglianForm.Language">
      <input id="PayPageStyle" type="text" name="PayPageStyle" value="Tiny">
      <input id="Sku1" type="text" name="Sku1" :value="tonglianForm.Sku1">
      <input id="ProductName1" type="text" name="ProductName1" :value="tonglianForm.ProductName1">
      <input id="Price1" type="text" name="Price1" :value="tonglianForm.Price1">
      <input id="Quantity1" type="text" name="Quantity1" :value="tonglianForm.Quantity1">
      <input id="ShippingFirstName" type="text" name="ShippingFirstName" :value="tonglianForm.ShippingFirstName">
      <input id="ShippingLastName" type="text" name="ShippingLastName" :value="tonglianForm.ShippingLastName">
      <input id="ShippingAddress1" type="text" name="ShippingAddress1" :value="tonglianForm.ShippingAddress1">
      <!--      <input type="text" id="ShippingAddress2" name="ShippingAddress2" value="" />-->
      <input id="ShippingCity" type="text" name="ShippingCity" :value="tonglianForm.ShippingCity">
      <input id="ShippingCountry" type="text" name="ShippingCountry" :value="tonglianForm.ShippingCountry">
      <input id="ShippingState" type="text" name="ShippingState" :value="tonglianForm.ShippingState">
      <input id="ShippingZipcode" type="text" name="ShippingZipcode" :value="tonglianForm.ShippingZipcode">
      <input id="ShippingTelephone" type="text" name="ShippingTelephone" :value="tonglianForm.ShippingTelephone">
      <input id="BillingFirstName" type="text" name="BillingFirstName" :value="tonglianForm.BillingFirstName">
      <input id="BillingLastName" type="text" name="BillingLastName" :value="tonglianForm.BillingLastName">
      <input id="BillingAddress1" type="text" name="BillingAddress1" :value="tonglianForm.BillingAddress1">
      <!--      <input type="text" id="BillingAddress2" name="BillingAddress2" :value="tonglianForm.BillingAddress1" />-->
      <input id="BillingCity" type="text" name="BillingCity" :value="tonglianForm.BillingCity">
      <input id="BillingCountry" type="text" name="BillingCountry" :value="tonglianForm.BillingCountry">
      <input id="BillingState" type="text" name="BillingState" :value="tonglianForm.BillingState">
      <input id="BillingZipcode" type="text" name="BillingZipcode" :value="tonglianForm.BillingZipCode">
      <input id="BillingTelephone" type="text" name="BillingTelephone" :value="tonglianForm.BillingTelephone">
      <input ref="tongliansubmit" type="submit">
    </form>

    <Modal
      v-model="showBanliModel"
      :title="getLanguageData.checkoutcounter.banlipay"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem :label="getLanguageData.checkoutcounter.convenience" prop="convenience">
          <Select v-model="formValidate.convenience" :placeholder="getLanguageData.checkoutcounter.wrconvenience">
            <Option value="00006">
              デイリーヤマザキ
            </Option>
            <Option value="10001">
              ローソンローソン・スリーエフ
            </Option>
            <Option value="10002">
              ファミリーマート
            </Option>
            <Option value="10003">
              サンクス
            </Option>
            <Option value="10004">
              サークルＫ
            </Option>
            <Option value="10005">
              ミニストップ
            </Option>
            <Option value="10008">
              セイコーマート
            </Option>
          </Select>
        </FormItem>
        <FormItem :label="getLanguageData.checkoutcounter.customerName" prop="customerName">
          <Input
            v-model="formValidate.customerName"
            :placeholder="getLanguageData.checkoutcounter.wrcustomerName"
          />
        </FormItem>
        <FormItem :label="getLanguageData.checkoutcounter.customerKana" prop="customerKana">
          <Input
            v-model="formValidate.customerKana"
            :placeholder="getLanguageData.checkoutcounter.wrcustomerKana"
          />
        </FormItem>
        <FormItem :label="getLanguageData.checkoutcounter.telNo" prop="telNo">
          <Input v-model="formValidate.telNo" :placeholder="getLanguageData.checkoutcounter.wrtelNo" />
        </FormItem>
        <FormItem :label="getLanguageData.checkoutcounter.mailAddress" prop="mailAddress">
          <Input
            v-model="formValidate.mailAddress"
            :placeholder="getLanguageData.checkoutcounter.wrmailAddress"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="showBanliModel=false">
          {{ getLanguageData.operate.cancle }}
        </Button>
        <Button type="primary" @click="sureBanliHandle">
          {{ getLanguageData.operate.sure }}
        </Button>
      </div>
    </Modal>
    <Modal
      v-model="showCombinePayModel"
      width="660"
      :title="getLanguageData.checkoutcounter.combinepay"
    >
      <div class="payinfo">
        <ul>
          <li>
            <span class="label">{{ getLanguageData.checkoutcounter.balancededu }}:</span>
            <span>{{ balanceTotal }} </span><span style="font-size:12px;">円</span>
          </li>
          <li>
            <span class="label">{{ getLanguageData.checkoutcounter.otherpay }}:</span>
            <span class="thirdpay">{{ getCheckCounter.totalPayAmount - balanceTotal }} </span><span style="font-size:12px;">円</span>
          </li>
        </ul>
        <div class="typecontent">
          <section v-for="(item,index) in typeListData" :key="index" @click="changeCombineSelectType(item)">
            <section v-if="item.paytypeCode !=='01' && item.paytypeCode !=='07'">
              <img
                v-if="combinePaytypeCode===item.paytypeCode"
                src="@/assets/images/placeorder/selectedtype.png"
                alt=""
                class="radioimg"
              >
              <img v-else src="@/assets/images/placeorder/select.png" alt="" class="radioimg">
              <span class="paytypenaem">{{ getLanguage==='zh'?item.paytypeName.split('|')[0]:item.paytypeName.split('|')[1] }}</span>
              <span v-if="item.paytypeCode==='03'" class="label">{{ getLanguageData.checkoutcounter.banli }}</span>
              <span v-if="item.paytypeCode==='04'" class="label">{{ getLanguageData.checkoutcounter.paypal }}</span>
              <span v-if="item.imgUrlList && item.imgUrlList.length" class="label">
                <img v-for="(imgitem,imgindex) in item.imgUrlList" :key="imgindex" :src="getImageBasePath + imgitem" alt="">
              </span>
            </section>
          </section>
        </div>
      </div>
      <div slot="footer">
        <Button @click="showCombinePayModel=false">
          {{ getLanguageData.operate.cancle }}
        </Button>
        <Button type="primary" @click="sureCombineHandle">
          {{ getLanguageData.operate.sure }}
        </Button>
      </div>
    </Modal>

    <Modal
    class="modelbox"
        :footer-hide="true"
        v-model="protocol">
        <!-- <p class="modeltitle">次月付协议</p> -->
        <div class="protocolcontent">
          <div class="text">
           <h1>翌月支払い利用規約</h1>

           <h2>内容確認のお願い</h2>

           <p>お申し込み時にご入力頂いた内容に関して、各々の入力画面にてお取引の内容をよくご確認の上、ご契約下さいますようお願い致します。</p>

           <h2>個人情報の取り扱い</h2>

           <p>株式会社翌月支払い（以下「当社」といいます。）は、第1条に定める本サービスの提供に必要な限度で、お客様が発注にあたり販売店に登録された個人情報（氏名·住所·電話番号·電子メールアドレス等）及び当該お取引情報を当該販売店から提供を受け、あるいは、当社に上記の個人情報の一部または全部を登録いただき、「個人情報保護に関する基本方針（プライバシーポリシー）」及び末尾の「個人情報の取扱い関する同意条項（債権譲渡方式による一括払い）」に従った利用を行い、当社の委託先又はご同意頂いた提供先に提供するものとします。本サービスの利用者は、販売店に登録された上記個人情報の利用について予めご同意いただくものとします。なお、当社の「個人情報保護に関する基本方針（プライバシーポリシー）」に関しては当社ホームページに掲載しております。</p>

           <h2>電磁的交付の承諾</h2>

           <p>当社は、利用規約等を電磁的方法にて交付いたします。なお、電磁的方法にて交付する書面に関しては当社ホームページに掲載しております。利用者は必要に応じて各規約等の書面を印刷いただけます。また、印刷できない場合は当社に申出るものとします。</p>

           <h3>ご利用に際して</h3>

           <p>利用者は、当社の加盟店で商品等をご購入頂く際に請求先としてご登録いただく個人の方となります。代理人または法人名義によるお申込みはお受け出来ませんのでご了承ください。また、未成年の方は親権者の同意を取得の上お申込みください。なお、各お取引に関しては、都度の審査がございますので、あらかじめご了承ください。</p>

           <h3>第１条（本サービスの内容）</h3>

           <p>１．当社が提供するサービスは、本サービス利用者（以下「利用者」といいます。）が当社と加盟店契約を締結した販売店（以下「販売店」といいます。）との間で締結する売買契約または役務提供契約等（以下「売買契約等」といいます。）に基づき購入する商品、または提供を受ける役務等（以下、これらを総称して「商品等」といいます。）の代金債権（送料、売買契約等に基づくキャンセル料、その他費用、消費税等一切の費用を含みます。以下「代金等債権」といいます。）を当社が販売店より譲り受け、当社から利用者に対して譲り受けた債権をご請求させていただき、利用者が「クレジットカード」で当社請求額をお支払いいただく「翌月支払い（債権譲渡方式による一括払い）サービス」（以下「本サービス」といいます。）です。</p>

           <p>２．当社が利用者に対して提供する本サービスの決済方法は、ご利用の翌月に商品等の代金を一括払いでお支払い頂く方法です。本サービスをご利用頂く場合、利用者と販売店との間の商品等に係る契約成立後、販売店から当社に対して、当社所定の方法により売上データが送信された時点をもって、販売店の利用者に対する代金等債権が当社に譲渡されるものとし、利用者は、上記債権譲渡を異議なく承諾するものとします。</p>

           <p>３．当社は、他に本サービス以外の「翌月支払い」による取引がある場合には、同取引の支払いを合算して利用者に請求することとし、利用者は１か月分の翌月支払いサービスご利用分の代金等債権をまとめて当社にお支払いいただきます。</p>

           <h3>第２条（本サービスのご利用）</h3>

           <p>１．利用者は、販売店における商品等の購入に際して、当社所定の方法により、本サービスの利用を都度お申込みいただきます。ただし、当社が指定する一部の商品等については、ご利用できない場合がございます。</p>

           <p>２．売買契約等の契約日は販売店と利用者が合意した日となります。あらかじめ販売店との利用規約等をご確認ください。</p>

           <p>３．利用金額、利用履歴、その他の事情を踏まえた当社の与信審査の結果によっては、本サービスのご利用をお断りすることがございます。与信審査結果の内容については利用者に開示いたしませんので、あらかじめご了承ください。</p>

           <p>４．高額ならびに短期間に繰り返し複数の申込をされた場合等、当社の判断により、ご本人様確認のため、ご連絡させていただくことがございます。</p>

           <h3>第３条（支払方法等）</h3>

           <p>１．毎月の15日に（当該日が土·日·祝祭日、当社休業日の場合は翌営業日となる場合がございます。）ご請求をお知らせするＳＭＳメッセージ（以下「請求書」といいます。）を送信いたします。なお、残高の有無に関係なく前月末時点での利用明細をＥメールで送信する場合がございます。</p>

           <p>２．お支払いは、毎月月末日に締切り、締切日の属する月の翌月23日に支払うものとします。</p>

           <p>３．お支払いは、クレジットカードをご利用いただけます。なお、利用者があらかじめ指定する金融機関の預貯金口座から口座振替等の方法でお支払いを希望される場合は別途当社所定の申込手続きを行うものとします。</p>

           <p>４．販売店の事務処理の遅延等の事由により、販売店から当社に対して請求が翌月以降になった場合は、当社から利用者に対するご請求も、販売店から当社に対して請求があった翌月になる場合がございますので、あらかじめご了承ください。</p>

           <p>５．ご請求内容はアカウントページにてご確認いただけます。</p>

           <p>６．利用者が支払った金額が、本サービスに関する本規約及び当社とのその他の契約に基づき利用者が当社に対して負担する一切の債務を完済させるに不足するときは、利用者は、当社の利用者に対する通知なくして、当社の裁量による順序·方法によって債務に充当しても異議のないものとします。なお、当社は、充当の結果を別途当社が適当と認める方法</p>

           <h3>によって利用者に告知するものとし、利用者は適宜、充当内容の確認を行うものとします。</h3>

           <p>７．利用者は、当社が必要な範囲で請求回収業務を第三者に委託することにあらかじめ同意いただくものとします。</p>

            <h3>第4条（商品等の引渡し）</h3>

           <p>商品等は、当社が販売店に対して、販売店の利用者に対する販売承認を行った後、商品購入の申込み時または契約成立時の配送確認メール等に指定された時期に販売店から利用者に引渡し、または提供されるものとします。</p>

           <h3>第5条（費用等の負担）</h3>

           <p>利用者が負担する費用は次のとおりです。</p>

           <p>（１）利用者がお支払いを遅滞した際の回収にかかる下記費用</p>

           <p>①当社が債権の保全実行のために要した費用：実費</p>

           <p>（2）本規約に基づく費用·手数料等について公租公課が課せられる場合の当該公租公課相当額（消費税等を含みます。）、及び当該公租公課が変更される場合は、当該変更後の公租公課相当額</p>

           <h3>第6条（遅延損害金）</h3>

           <p>利用者が代金等債権のお支払いを遅滞した場合には、当社は利用者に対し、約定返済期日の翌日より支払いに至るまで、年１４．６％の割合による遅延損害金をご請求させていただきますので、あらかじめご了承ください。</p>

           <h3>第７条（禁止事項）</h3>

           <p>１．利用者はご自身または第三者を利用して、以下の(1)～(8)の行為を行ってはならないものとします。</p>

           <p style="text-indent: 2em">（１）申込みに際して虚偽の申告をする行為</p>

           <p style="text-indent: 2em">（２）意図的な未払い等の詐欺的な行為</p>

           <p style="text-indent: 2em">（３）架空もしくは虚偽の内容の取引</p>

           <p style="text-indent: 2em">（4）合理性に欠き、著しく不自然な取引</p>

           <p style="text-indent: 2em">（5）換金を目的とした商品購入等または犯罪による収益を対象とする商品購入等、本サービスの利用が不適当もしくは不審な行為</p>

           <p style="text-indent: 2em">（6）その他の違法行為や当社または販売店に対する法的な限度を超えた不当要求行為</p>

           <p style="text-indent: 2em">（7）本規約に違反する行為</p>

           <p>２．利用者が、上記の（１）～（８）の行為を行った場合、もしくは行うおそれがあると当社が判断した場合、当社は、本サービスのご利用をお断りできるものとします。この場合、利用者は、当然に期限の利益を失うとともに、当社に対する一切の未払債務を直ちに支払うものとします。</p>

           <p>３．利用者は、本サービスのご利用による債務の完済までに当該商品が犯罪による収益であると判明した場合、速やかに当社に通知するものとします。</p>

           <h3>第8条（免責）</h3>

           <p>当社は、利用者と販売店間の契約に基づく販売店の債務履行につき、一切の責任を負いません。発注いただいた商品ならびに配送及びサービスの提供等の問題についての問い合わせ·苦情等は販売店にご連絡ください。</p>

           <h3>第9条（届出事項の変更・解約等）</h3>

           <p>１．利用者が当社に届け出た氏名、住所、携帯電話番号、電子メールアドレス、その他当社所定の事項に変更が生じた場合、利用者は、遅滞なく当社所定（変更手続き）の方法により変更事項を届け出るものとします。</p>

           <p>２．前項に定める届出がないために、当社からの通知または送付書類その他の物が延着または不着となった場合には、通常到着すべきときに利用者に到着したものとみなします。</p>

           <p>３．利用者が本サービスの利用について解約を希望する場合には、当社所定の方法により届け出るものとします。</p>

           <p>４．利用者は、解約を申し出た際に未払債務（他の翌月支払いサービスのご利用分及び支払期限が到来していないものを含みます。）がある場合は、その債務を支払った後に解約するものとします。</p>

           <h3>第10条（担保差入等）</h3>

           <p>利用者は、当社が利用者に対する代金支払請求債権を第三者に担保差入、譲渡、買戻し、その他の処分をすることがあることをあらかじめ異議なく承諾するものとします。</p>

           <h3>第１1条（反社会的勢力の排除）</h3>

           <p>１．利用者は、利用者が、現在、次のいずれにも該当しないことを表明し、かつ将来にわたっても該当しないことを確約するものとします。</p>

           <p style="text-indent: 2em">（１）暴力団</p>

           <p style="text-indent: 2em">（２）暴力団員及び暴力団員でなくなったときから５年を経過しない者</p>

           <p style="text-indent: 2em">（３）暴力団準構成員</p>

           <p style="text-indent: 2em">（４）暴力団関係企業</p>

           <p style="text-indent: 2em">（５）総会屋等</p>

           <p style="text-indent: 2em">（６）社会運動等標ぼうゴロ</p>

           <p style="text-indent: 2em">（７）特殊知能暴力集団等</p>

           <p style="text-indent: 2em">（８）前各号の共生者</p>

           <p style="text-indent: 2em">（９）その他前各号に準ずる者</p>

           <p>２．利用者は、自らまたは第三者を利用して次の各号のいずれかに該当する行為を行わないことを確約いたします。</p>

           <p style="text-indent: 2em">（１）暴力的な要求行為</p>

           <p style="text-indent: 2em">（２）法的な責任を超えた不当な要求行為</p>

           <p style="text-indent: 2em">（３）取引に関して、脅迫的な言動をし、または暴力を用いる行為</p>

           <p style="text-indent: 2em">（４）風説を流布し、偽計を用いまたは威力を用いて当社の信用を毀損し、または当社の業務を妨害する行為</p>

           <p style="text-indent: 2em">（５）その他前各号に準ずる行為</p>

           <p>３．利用者が前項に定める事項に反すると具体的に疑われる場合には、当社は利用者に対し当該事項に関する調査を行い、また必要に応じて資料の提供を求めることができ、利用者はこれに応じるものとします。</p>

           <p>４．利用者が本条１項もしくは本条２項のいずれかに該当した場合、本条１項もしくは本条２項の規定に基づく確約に関して虚偽の申告をしたことが判明した場合、または前項の調査等に応じない場合や虚偽の回答をした場合のいずれかであって、契約を締結すること、または契約を継続することが不適切であると当社が認める場合には、当社は、利用者との契約の締結を拒絶し、または本契約を解除することができるものとします。本契約が解除された場合、利用者は、当社からの通知または請求により、期限の利益を失い、当社に対する一切の未払債務を直ちに支払うものとします。また、この場合、当社に生じた損害を利用者が賠償するものとします。</p>

           <p>５．前項の規定により本契約が解除された場合でも、利用者の当社に対する未払い債務があるときは、それが完済されるまでは本契約の各条項が適用されるものとします。</p>

           <h3>第１2条（合意管轄裁判所）</h3>

           <p>利用者は、本サービスについて紛争が生じた場合、訴額のいかんに拘わらず、当社の本社、各支店、営業所を管轄する簡易裁判所及び地方裁判所を第一審の専属的合意管轄裁判所とすることに同意するものとします。</p>

           <h3>第１3条（準拠法）</h3>

           <p>利用者と当社との契約に関する準拠法は、すべて日本法とします。</p>

           <p>改定：2020年4月1日</p>

           <p>【問合せ・相談窓口等】</p>

           <p>１．販売契約等（商品等）についてのお問い合わせ、ご相談は販売店にご連絡くださいください。</p>

           <p>２．お支払についてのお問い合わせ、ご相談は下記株式会社翌月支払いにご確認ください。</p>

           <p>株式会社翌月支払いお客様相談室</p>

           <p>〒3550352 埼玉県 比企郡 ときがわ町 別所147番地</p>

           <p>tel:049-381-6689</p>

           <p>【個人間インターネットショッピングサービスを利用する際の注意事項 】</p>

           <p>当社所定の個人間インターネットショッピングサービスをご利用の場合、以下の特則が適用されますので、あらかじめご同意いただくものとします。</p>

           <h2>個人情報の取り扱い</h2>

           <p>当社は、本サービスの提供に必要な限度で、個人間インターネットショッピングモールの運営会社（以下「運営会社」といいます。）から、利用者が運営会社に登録された個人情報（氏名·住所·電話番号·電子メールアドレス等）及び発注されたお取引情報の提供を受け、当社「個人情報保護に関する基本方針（プライバシーポリシー）」及び末尾の「個人情報の取扱いに関する同意条項（債権譲渡方式による一括払い）」に従って取り扱うものとします。利用者は、運営会社に登録された上記個人情報を当社が利用することを、あらかじめご同意いただくものとします。</p>

           <h2>本サービスの内容</h2>

           <p>本サービスは、運営会社が譲り受けた出品者の利用者に対する債権（送料、その他費用、消費税等の費用を含みます。）を当社が運営会社より譲り受け、当社から利用者に対して譲り受けた債権をご請求させていただき、利用者クレジットカードにより当社にお支払いいただくサービスです。当社は、利用者と出品者との間の商品等に係る契約成立後、運営会社から当社に対して売上データが送信された時点をもって、上記の債権を運営会社より譲り受けるものとし、利用者は、当社の債権譲受けについてあらかじめ異議なく承諾するものとします。</p>

           <p>支払方法は、一括払い（債権譲渡方式）のみとなりますので、あらかじめご了承ください。</p>

           <h2>免責</h2>

           <p>当社は、利用者と出品者、利用者と運営会社との間の契約に基づく債務の履行につき、一切の責任を負いません。発注いただいた商品·サービスの問題についての問い合わせ·苦情等は出品者または運営会社にご連絡下さい。</p>

         </div>
        </div>
        <div class="modelbtn" v-if="JSON.stringify(formVal) == '{}'">
          <Button @click="protocol = false">{{getLanguageData.goodsText.clostBtn}}</Button>
          <Button v-if="formVal.mobile" type="primary" @click="protocol = false">{{getLanguageData.nextText.agree}}</Button>
          <Button v-else type="primary" style="margin-left:20px;" @click="showVeriModel">{{getLanguageData.nextText.agreeAndValid}}</Button>
        </div>
    </Modal>

    <Modal
        width="700"
        :mask-closable="false"
        :footer-hide="true"
        v-model="veriModelFlag">
        <p class="modeltitle">{{getLanguageData.nextText.validNextPay}}</p>
        <div>
          <verification :flag="true" @clostModel="clostModel"></verification>
        </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { randomNum } from '@/assets/js/util'
import verification from '@/pages/personal/verification.vue'

export default {
  name: 'Checkoutcounter',
  // async asyncData ({ $axios, params, query, error }) {
  //   let typeListData = []
  //   await $axios.get('starday-pay/CasherdeskPaytype/getValidPaytypePage', {
  //     params: {
  //       pageNo: 1,
  //       pageSize: 20,
  //       tradeOrderNumber: params.orderid,
  //       sort: 'asc',
  //       terminalType: 3
  //     }
  //   }).then((res) => {
  //     if (res.code === 200) {
  //       typeListData = res.data.rows || []
  //     }
  //   })
  //   return {
  //     typeListData
  //   }
  // },
  data () {
    return {
      balanceTotal: 0,
      typeListData: [],
      paytypeCcode: '',
      showBanliModel: false,
      formValidate: {
        convenience: '',
        customerName: '',
        customerKana: '',
        telNo: '',
        mailAddress: ''
      },
      showCombinePayModel: false,
      combinePaytypeCode: '',
      paymentForm: '',
      isSending: false,
      tonglianForm: '',
      tableData: [],
      protocol: false,
      veriModelFlag: false,
      formVal: {}
    }
  },
  computed: {
    ...mapGetters({
      getLanguage: 'getLanguage',
      getLanguageData: 'getLanguageData',
      getCheckCounter: 'getCheckCounter',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN',
      getImageBasePath: 'getImageBasePath'
    }),
    ruleValidate () {
      const vm = this
      const _rule = {
        convenience: [
          {
            required: true,
            message: vm.getLanguageData.checkoutcounter.wrconvenience,
            trigger: 'change'
          }
        ],
        customerName: [
          {
            required: true,
            message: vm.getLanguageData.checkoutcounter.wrcustomerName,
            trigger: 'blur'
          }
        ],
        customerKana: [
          {
            required: true,
            message: vm.getLanguageData.checkoutcounter.wrcustomerKana,
            trigger: 'blur'
          }
        ],
        telNo: [
          {
            required: true,
            message: vm.getLanguageData.checkoutcounter.wrtelNo,
            trigger: 'blur'
          },
          {
            pattern: /^\d*$/,
            message: vm.getLanguageData.checkoutcounter.wrtelNo,
            trigger: 'blur'
          }
        ],
        mailAddress: [
          {
            required: true,
            message: vm.getLanguageData.checkoutcounter.wrmailAddress,
            trigger: 'blur'
          },
          {
            type: 'email',
            message: vm.getLanguageData.checkoutcounter.wrmailAddressreg,
            trigger: 'blur'
          }
        ]
      }
      return _rule
    },
    columns () {
      const vm = this
      const columns = [
        {
          title: vm.getLanguageData.loginpage.phoneNum,
          key: 'mobile',
          align: 'center'
        },
        {
          title: vm.getLanguageData.nextText.postCode,
          key: 'postcode',
          align: 'center'
        },
        {
          title: vm.getLanguageData.nextText.emailAddress,
          key: 'email',
          align: 'center'
        },
        {
          title: vm.getLanguageData.storeText.name,
          key: 'name',
          align: 'center'
        },
        {
          title: vm.getLanguageData.nextText.accountAdress,
          key: 'address',
          align: 'center'
        },
        {
          title: vm.getLanguageData.nextText.nextPaymodify,
          slot: 'opcting',
          align: 'center'
        }
      ]
      return columns
    }
  },
  mounted () {
    this.requestPayType()
    this.reqquestBalance()
    this.getPayInfo()
  },
  components: {
    verification
  },
  methods: {
    clostModel () {
      this.veriModelFlag = false
      this.getPayInfo()
    },
    // 获取次月付是否验证过个人信息
    getPayInfo () {
      const vm = this
      vm.$axios({
        url: 'starday-user/user/monthly/pay/info',
        method: 'get'
      }).then((res) => {
        if (res.code === 200) {
          vm.formVal = res.data || {}
          vm.tableData = [res.data] || []
        }
      })
    },
    showModel () {
      this.protocol = true
    },
    showVeriModel () {
      this.protocol = false
      this.veriModelFlag = true
    },
    reqquestBalance () {
      const vm = this
      vm.$axios.get('starday-user/user/cardBalance').then((res) => {
        if (res.code === 200) {
          vm.balanceTotal = res.data || 0
        }
      })
    },
    requestPayType () {
      const vm = this
      vm.$axios.get('starday-pay/CasherdeskPaytype/getValidPaytypePage', {
        params: {
          pageNo: 1,
          pageSize: 20,
          tradeOrderNumber: vm.$route.params.orderid,
          sort: 'asc',
          terminalType: 3
        }
      }).then((res) => {
        if (res.code === 200) {
          // if (res.data.rows && res.data.rows.length) {
          //   const _index = res.data.rows.findIndex((item) => {
          //     return item.paytypeCode === '02' || item.paytypeCode === '05'
          //   })
          //   if (_index > -1) {
          //     res.data.rows.splice(_index, 1)
          //   }
          // }
          vm.typeListData = res.data.rows || []
        }
      })
    },
    changeSelectType (item) {
      if (item.paytypeCode === '03') {
        this.showBanliModel = true
        return
      }
      this.paytypeCcode = item.paytypeCode
    },
    changeCombineSelectType (item) {
      if (item.paytypeCode === '03') {
        this.showBanliModel = true
        return
      }
      this.combinePaytypeCode = item.paytypeCode
    },
    sureBanliHandle () {
      const vm = this
      vm.$refs.formValidate.validate((valid) => {
        if (valid) {
          if (vm.showCombinePayModel) {
            vm.combinePaytypeCode = '03'
          } else {
            vm.paytypeCcode = '03'
          }
          vm.showBanliModel = false
        }
      })
    },
    submitPayHandle () {
      const vm = this
      if (vm.isSending) {
        return
      }
      if (!vm.paytypeCcode) {
        vm.$Message.warning(vm.getLanguageData.checkoutcounter.selectPayType)
        return
      }
      if (vm.paytypeCcode === '01' && vm.balanceTotal < vm.getCheckCounter.totalPayAmount) {
        const _index = vm.typeListData.findIndex(function (item) {
          return item.paytypeCode !== '01'
        })
        if (_index > -1) {
          vm.combinePaytypeCode = vm.typeListData[_index].paytypeCode
        } else {
          vm.$Message.warning(vm.getLanguageData.checkoutcounter.cannotuseCombine)
          return
        }
        vm.showCombinePayModel = true
        return
      }
      if (vm.paytypeCcode === '07') {
        if (!vm.formVal.mobile) {
          vm.protocol = true
          return
        }
      }
      vm.isSending = true
      const _params = {
        payBalanceFlag: vm.paytypeCcode === '01' ? '1' : '',
        payChannelFlag: vm.paytypeCcode === '01' ? '' : '1',
        terminalType: '3',
        tradeNumber: vm.$route.params.orderid,
        transFlow: randomNum(12),
        channelCode: vm.paytypeCcode !== '01' ? vm.paytypeCcode.replace(/0/g, '') : '',
        convenience: vm.formValidate.convenience,
        customerId: '',
        customerKana: vm.formValidate.customerKana,
        customerName: vm.formValidate.customerName,
        mailAddress: vm.formValidate.mailAddress,
        stopReturnUrl: vm.paytypeCcode === '05' ? vm.getLOCATIONORIGIN + 'placeorder/payresult?type=error' : '',
        telNo: vm.formValidate.telNo,
        url: vm.paytypeCcode === '05' ? vm.getLOCATIONORIGIN + 'placeorder/payresult' : ''
      }
      if (vm.paytypeCcode === '07') {
        _params.payMonthFlag = 1
      }
      if (vm.paytypeCcode === '04') {
        _params.stopReturnUrl = location.href
      }
      vm.$axios.post('starday-pay/PayUser/pay', _params).then((res) => {
        vm.isSending = false
        if (res.code === 200) {
          switch (vm.paytypeCcode) {
            case '01':
              vm.$router.push('/placeorder/payresult?type=success')
              break
            case '02':
              vm.paymentForm = res.data
              setTimeout(() => {
                vm.$refs.paymentsubmit.click()
              }, 100)
              break
            case '03':
              vm.$router.push('/placeorder/payresult?type=success')
              break
            case '04':
              location.href = res.data.url
              break
            case '05':
              location.href = res.data.url
              break
            case '06':
              vm.tonglianForm = res.data.allinPayMap
              setTimeout(() => {
                vm.$refs.tongliansubmit.click()
              }, 100)
              break
            case '07':
              vm.$router.push('/placeorder/payresult?type=success')
              break
          }
        }
      }).catch(() => {
        vm.isSending = false
      })
    },
    //  组合支付
    sureCombineHandle () {
      const vm = this
      if (vm.isSending) {
        return
      }
      const _params = {
        payBalanceFlag: '1',
        payChannelFlag: '1',
        terminalType: '3',
        tradeNumber: vm.$route.params.orderid,
        transFlow: randomNum(12),
        channelCode: vm.combinePaytypeCode !== '01' ? vm.combinePaytypeCode.replace(/0/g, '') : '',
        convenience: vm.formValidate.convenience,
        customerId: '',
        customerKana: vm.formValidate.customerKana,
        customerName: vm.formValidate.customerName,
        mailAddress: vm.formValidate.mailAddress,
        stopReturnUrl: vm.combinePaytypeCode === '05' ? vm.getLOCATIONORIGIN + 'placeorder/payresult?type=error' : '',
        telNo: vm.formValidate.telNo,
        url: vm.combinePaytypeCode === '05' ? vm.getLOCATIONORIGIN + 'placeorder/payresult' : ''
      }
      vm.isSending = true
      vm.$axios.post('starday-pay/PayUser/pay', _params).then((res) => {
        vm.isSending = false
        if (res.code === 200) {
          switch (vm.combinePaytypeCode) {
            case '01':
              vm.$router.push('/placeorder/payresult?type=success')
              break
            case '02':
              vm.paymentForm = res.data
              setTimeout(() => {
                vm.$refs.paymentsubmit.click()
              }, 100)
              break
            case '03':
              vm.$router.push('/placeorder/payresult?type=success')
              break
            case '04':
              location.href = res.data.url
              break
            case '05':
              location.href = res.data.url
              break
            case '06':
              vm.tonglianForm = res.data.allinPayMap
              setTimeout(() => {
                vm.$refs.tongliansubmit.click()
              }, 100)
              break
          }
        }
      }).catch(() => {
        vm.isSending = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
  /deep/.modelbtn .ivu-btn{
    width: 140px;
    height: 50px;
  }
  .checkoutcounter {
    .breadcrumb {
      height: 64px;
      line-height: 64px;

      a {
        color: #333333;
      }
    }

    .paytypebox {
      background-color: #fff;
      padding: 24px 40px;

      h5 {
        font-size: 16px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        margin-bottom: 24px;
      }

      .typecontent {
        border: 1px solid #e0e0e0;
        padding: 10px 20px;

        section {
          padding: 10px 0;
          font-size: 14px;
          font-weight: 600;
          color: #333333;
          cursor: pointer;

          .radioimg {
            width: 18px;
            height: 18px;
            cursor: pointer;
            vertical-align: middle;
            margin-right: 32px;
          }
          .paytypenaem {
            display: inline-block;
            vertical-align: middle;
            width: 130px;
          }

          .label {
            margin-left: 28px;
            font-size: 14px;
            font-weight: 400;
            color: #999999;
            display: inline-block;
            vertical-align: middle;

            img {
              width: 51px;
              height: 45px;
              margin-right: 10px;
            }

            strong {
              color: #E76636;
            }
          }
          .protocolbox{
            font-size: 14px;
            color: #1491ff;
            cursor: pointer;
          }
        }
      }
      .tableBox{
        margin-top: 30px;
      }
      .btnbox {
        margin-top: 40px;
        text-align: right;
        margin-bottom: 10px;

        p {
          width: 260px;
          display: inline-block;
          text-align: center;
          height: 54px;
          line-height: 54px;
          background: #e76636;
          border-radius: 2px;
          font-size: 16px;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
  }

  .payinfo {
    ul {
      margin-bottom: 25px;

      li {
        height: 40px;
        line-height: 40px;

        .thirdpay {
          font-size: 16px;
          color: #FF5D19;
        }
      }
    }

    .typecontent {
      border: 1px solid #e0e0e0;
      padding: 10px 20px;

      section {
        padding: 5px 0;
        font-size: 14px;
        font-weight: 600;
        color: #333333;
        cursor: pointer;

        .radioimg {
          width: 18px;
          height: 18px;
          cursor: pointer;
          vertical-align: middle;
          margin-right: 20px;
        }

        .paytypenaem {
          display: inline-block;
          vertical-align: middle;
          width: 130px;
        }

        .label {
          margin-left: 20px;
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          display: inline-block;
          vertical-align: middle;

          img {
            width: 51px;
            height: 45px;
            margin-right: 5px;
          }

          strong {
            color: #E76636;
          }
        }
      }
    }
  }
  .modeltitle{
    margin: 10px 0 36px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #333333;
  }
  .protocolcontent{
    height: 500px;
    overflow-y: scroll;
    padding:0 20px;
    h1{
      text-align: center;
      line-height: 60px;
    }
    h2{
      text-align: left;
      font-weight: 600;
      line-height: 40px;
    }
    h3{
      text-indent: 2em;
    }
    p{
      text-indent: 2em;
      color: #999;
    }
  }
  .modelbtn{
    margin-top: 36px;
    text-align: center;
  }
</style>
