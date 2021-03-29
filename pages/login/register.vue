<template>
  <div class="register">
    <div class="registertitle">
      新規会員登録
    </div>
    <div class="tabbox">
      <div class="tabitembox">
        <div class="tabitem">
          <span :class="activeTab==='0'?'activespan':''" @click="changeActiveTabHandle('0')">{{ getLanguageData.pageFooter.emailregister }}</span>
        </div>
        <div class="tabitem">
          <span :class="activeTab==='0'?'':'activespan'" @click="changeActiveTabHandle('1')">{{ getLanguageData.loginpage.phoneregister }}</span>
        </div>
      </div>
    </div>
    <div class="registerbox">
      <!--      邮箱注册form -->
      <Form v-show="activeTab==='0'" ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="220">
        <FormItem :label="getLanguageData.loginpage.email" prop="email">
          <Input v-model="formItem.email" :placeholder="getLanguageData.loginpage.wremail" />
        </FormItem>
        <FormItem :label="getLanguageData.loginpage.password" prop="password">
          <Input
            v-model="formItem.password"
            type="password"
            password
            :placeholder="getLanguageData.loginpage.wrpassword"
          />
        </FormItem>
        <FormItem :label="getLanguageData.loginpage.valicode" prop="emailCode">
          <div style="display: flex;justify-content: flex-start;align-items: center">
            <Input v-model="formItem.emailCode" :placeholder="getLanguageData.loginpage.wrvalicode" style="width:501px;margin-right: 30px" />
            <div
              class="imgbox"
              style="width: 108px;height: 40px;position: relative"
              @mouseover="showMask=true"
              @mouseleave="showMask=false"
            >
              <img :src="'/api/starday-auth/register/easy/captcha/1?refresh=' + captcaRefresh" alt="">
              <div
                v-if="showMask"
                class="mask"
                style="position: absolute;width: 108px;height: 40px;left: 0;top: 0;background: rgba(0,0,0,0.2);line-height: 48px;text-align: center"
              >
                <Icon type="md-refresh" size="26" style="cursor: pointer" color="#FFFFFF" @click="captcaRefresh++" />
              </div>
            </div>
          </div>
        </FormItem>
        <!--        <FormItem :label="getLanguageData.loginpage.valicode" prop="emailCode">-->
        <!--          <Input v-model="formItem.emailCode" :placeholder="getLanguageData.loginpage.wrvalicode" >-->
        <!--          <span slot="append" class="appendcode" @click="sendCodeHandle">{{ isSendCode?numInter:getLanguageData.loginpage.sendvalicode }}</span>-->
        <!--          </Input>-->
        <!--        </FormItem>-->

        <!--        <FormItem :label="getLanguageData.loginpage.surepass" prop="confirmPassword">-->
        <!--          <Input-->
        <!--            v-model="formItem.confirmPassword"-->
        <!--            type="password"-->
        <!--            password-->
        <!--            :placeholder="getLanguageData.loginpage.wrsurepass"-->
        <!--          />-->
        <!--        </FormItem>-->
        <FormItem :label="getLanguageData.loginpage.registerprotol">
          <div class="agreebox">
            <div class="argeement-content wrapper">
              <p style="margin-bottom:0;margin-bottom:0">
                <span style="font-size: 11px;">
                  <strong>
                    <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">STARDAY</span>
                  </strong>
                  <strong>
                    <span
                      style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                    >サービス利用規約</span></strong></span>
              </p>
              <p style="margin-bottom:0;margin-bottom:0">
                <span style="font-size: 11px;"><strong><span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >第1章 総則</span></strong></span>
              </p>
              <p style="margin-bottom:0;margin-bottom:0">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第1条 本規約の範囲及び変更</span>
              </p>
              <p style="margin-bottom:0;margin-bottom:0">
                <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >1.この規約（以下、「本規約」といいます。）は、当社が運営するウェブサイト「STARDAY」に関するサービス（以下、「本サービス」といいます。）の利用に関し、当社及び会員（第3条で定義します。）に適用されるものとします。但し、本サービス以外に当社が提供する各サービスに関しては、当該各サービスに関連する利用規約のみが適用されるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.当社は、会員の事前の承諾を得ることなく、ウェブサイト上での掲載又はメール等の当社が適当と判断する方法で会員に告知又は通知することにより、適宜、本規約の全部又は一部を変更できるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">3.本規約の全部又は一部が変更された場合、本サービスの利用に関しては、変更後の規約のみが適用されるものとし、会員は変更後の規約のみに従うものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第2条 本サービスの利用</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">1.会員は、法令、条例、規則、通達並びに共通サービス利用規約、本規約及び当社が別途定めるプライバシーポリシー、ヘルプ等に従い、本サービスを利用するものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.未成年の会員は、適格な法定代理人の事前の同意を得なければ、本サービスを利用することができません。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第3条 提供するサービス</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">利用者は、本サービスにおいて次の行為を行うことができます。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(1)会員は、当社所定の方法に従い、本サービスを利用して当社から商品等を購入することができます。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 11px;"><strong><span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >第2章 会員</span></strong></span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">第4条 会員</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">本規約において「会員」とは、当社が別途定める＜共通サービス利用規約＞「第4条 会員」の規定が適用されるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">第5条 会員登録</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">1.会員登録をする際には、＜共通サービス利用規約＞「第5条 会員登録」に定めた会員登録に必要な項目を入力・設定した上で、登録申請することを前提条件とします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.未成年者は、適格な法定代理人の事前の同意がなければ、会員登録申請をすることができないものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">3.当社は、以下の各号の何れかに該当する場合、当該登録を承認しない場合があります。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(1)会員登録の希望者が過去に当社の提供する何らかのサービスに関する規約（本規約及びサイト上に明記した各サービスに関連する他社の規約を含みますが、これらに限りません。）に違反したこと等により、会員登録の抹消等の処分を受けていたことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(2)会員登録の希望者の申請内容に虚偽の事項が含まれていることが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(3)過去に当社の提供する何らかのサービス（サイト上に明記した各サービスに関連する他社のサービスを含みますが、これらに限りません。）に関して、料金等の支払を履行していない場合（当社が別途認める支払方法に関連する第三者に対して料金等の支払を履行していない場合を含みますが、これに限りません。）、又は、正当な理由なく長期間に亘る商品又はサービス（以下、「商品等」と総称します。）の受取り不能、返品・交換の拒絶その他の債務不履行があったことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(4)過去に＜共通サービス利用規約＞「第14条 禁止事項」の行為を行ったことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(5)その他登録を承認することが本サービスの運営・管理上、不適当であると当社が合理的に判断する場合</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第6条 登録内容の変更</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">1.会員は、氏名、住所、電話番号その他当社に登録している事項の全部又は一部に変更が生じた場合には、当社が別途指定する方法により、すみやかに登録内容を変更するものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.当社は、会員が適宜、変更登録を行わなかったことにより何らかの損害が生じたとしても、一切責任を負わないものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">第7条 本サービスの利用停止及び会員登録の取消</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">当社は、会員が以下の各号の何れかに該当する場合、事前通知することなく、当該会員に対して本サービスの利用停止、会員登録抹消その他当社が適当と考える措置を講ずることができるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(1)過去に当社の提供する何らかのサービスに関する規約（本規約及びサイト上に明記した各サービスに関連する他社の規約を含みますが、これらに限りません。）に違反をしたこと等により、会員登録の抹消等の処分を受けていたことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >(2)登録された内容に虚偽の事項が含まれていることが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(3)過去又は現在において、当社の提供する何らかのサービス（サイト上に明記した各サービスに関連する他社のサービスを含みますが、これらに限りません。）に関して、料金等の支払を履行していない場合（当社が別途認める支払方法に関連する第三者に対して料金等の支払を履行していない場合を含みますが、これに限りません。）、又は、正当な理由なく長期間に亘る商品等の受取り不能、返品・交換の拒絶その他の債務不履行があったことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(4)＜共通サービス利用規約＞「第14条禁止事項」の行為を行ったことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(5)その他当社の定める何らかの規約（本規約及びサイト上に明記した各サービスに関連する他社の規約を含みますが、これらに限りません。）に違反した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">第8条 退会手続</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">退会を希望する場合は、別途定める＜共通サービス利用規約＞「第8条 退会手続」の規定が適用されるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第3章 商品の購入</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第9条 商品の購入</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">1.会員は、商品等の購入を希望する場合、当社が別途指定する方法に従って、商品等の購入又は利用を申込むものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.前項の申込みに伴い、会員が入力・登録した配達先・注文内容等を確認の上で注文する旨のボタンをクリックし、その後、当社から注文内容を確認する旨のメールが会員に到達した時点で、会員と当社との間に当該商品等に関する売買契約が成立するものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">3.前項の規定に拘わらず、本サービス利用に関して不正行為又は不適当な行為があった場合、当社は売買契約について取消、解除その他の適切な措置を取ることができるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">4.本サービスによる商品等の配送は、日本国内に限ります。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第10条 支払方法</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">1.商品等の支払い金額は、消費税を含む商品等の購入代金及びこれに係わる取り扱い手数料の合計となります。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.本サービスによって購入された商品等の支払いに関しては、会員本人名義のクレジットカードによる支払、又は当社が別途認める支払方法に限るものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">3.クレジットカードで支払われる場合は、会員がクレジットカード会社との間で別途契約する条件に従うものとします。なお、クレジットカードの利用に関連して、会員とクレジットカード会社等の間で何らかの紛争が発生した場合は、会員とクレジットカード会社との間で責任をもって解決するものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">第11条 商品等の返品・交換・注文の撤回及び取消し</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >1.商品の返品については、以下の場合に限り受け付けるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(1)商品が模造品・海賊版であることが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >(2)商品に瑕疵があった場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(3)ご注文内容と異なる商品が到着した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(4)配送中に破損した商品の場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(5)上記（1）から（4）のいずれにも該当せず、商品到着後7日以内であって、かつ以下のいずれにも該当しない場合。但し、販売ページ上に「返品対象外」の記載がある商品については返品することができません。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">①使用済み、お直しや洗濯、クリーニングがされた場合</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >②納品書を紛失した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">③商品タグ・ラベルを切り離し、紛失した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">④返送時の商品（箱、商品の付属品を含みますが、これらに限りません。）の状態がお届け時と比べて毀損、汚損、紛失等している場合</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >⑤お客様のもとで商品に臭いが付着したり、汚れ、キズが生じた場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">⑥パッケージが商品の一部となっている商品において、パッケージを開封した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">⑦下着・水着等・化粧品等の衛生商品、福袋・福箱・セール商品（中古商品でのセールも含みます。）・アウトレット商品・予約商品である場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 11px;"><span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >2.会員は、当社が別途定める手順に従い前項に定める返品を申請するものとし、前項（1）から（4）については返送にかかる費用は当社が負担し、会員が購入した時点の販売価格、配送料、代引き手数料及びコンビニ決済手数料、ならびに返品対象商品の購入に際して使用したSTARDAY</span> <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >POINTもしくは提携サイト発行ポイントを返還するか、又は代品に交換します。なお、代品への交換を希望された場合においても、商品の欠品等を理由に交換ができないことがあります。また、前項（5）については返送にかかる費用は会員が負担し、当社は会員が購入した時点の販売価格、配送料及び代引き手数料及びコンビニ決済手数料、ならびに返品対象商品の購入に際して使用したSTARDAY</span> <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >POINTまたは提携サイト発行ポイントを返還します。</span></span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 11px;"><span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >3.会員は、商品の返品を行った場合、当該商品及び会員が返品対象商品の購入に際して取得したSTARDAY MAR</span> <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >TPOINT又は提携サイト発行ポイントを当社に返還するものとし、当社と会員間で相互に返還すべきポイントの処理方法は、対等数をもって相殺する方法により行うものとします。この場合、当社が返還すべきポイント数が、会員が返還すべきポイント数を上回るときは、当該相殺後の残数のポイントを会員に返還するものとし、会員が返還すべきポイント数が、当社が返還すべきポイント数を上回るときは、当該相殺後の残数に相当する額（返品対象商品の購入時点における1ポイントあたりの金額で算定した額）を、当社が会員に返金すべき返品対象商品の購入代金から控除する方法で行うものとします。</span></span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">4.本条第1項第5号?の定めに拘らず、ご注文の撤回及び取消しについては、予約/受注商品（但し、福袋・福箱を除く）については注文確定から24時間以内、セール商品・アウトレット商品については注文確定後から当社における配送準備中までの期間に限り受け付けるものとします。商品の発送処理後から商品到着までの間は、当社の責めに帰すべき事由がある場合を除き、商品のご注文の撤回および取消しをすることができません（商品到着後の返品については、本条第１項の定めるとおりとします）。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">5.当社は、会員が正当な理由なく商品を当社に返送した場合（第1項に定める事由に該当しない商品の返品、受領拒否、受領不可等を含みますがこれらに限りません。）、当該商品を受領した後、遅滞なく会員に対し通知し、相当の期間を定めたうえで当該商品の受け取りにつき会員に対して指図をもとめるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">6.当社は、相当の期間内に前項に規定する会員からの指図がない場合、会員に対し予告した上で、その予告をした日から起算して1年間当該商品を保管するものとします。なお、当社は、当該保管期間内に会員より商品の受け取りに関する指図を受けた場合、当該商品について現状有姿で引渡すものであり、当該商品の状態（商品の変質、変形、消耗、毀損又は腐敗等を含みますがこれらに限りません。）について一切責任を負わないものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">7.当社は、前項の保管期間経過後、当該商品の保管期間が終了した旨を会員に対して通知するものとし、当該通知日から起算して7日以内に会員より当該商品の受け取りに関する指図がない場合、廃棄その他当社の定める処分方法により当該商品を処分するものとします。この場合当社は会員に対して一切の責任を負わないものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第12条 商品等に関する免責</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">1.当社は、本サービス及び本サービスを通じて販売される商品等につき、その品質、材質、機能、性能、他の商品との適合性その他の欠陥、又はこれらが原因となり生じた損害、損失、不利益等については、前条に定める場合を除き、いかなる保証・負担も負わないものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.当社は、配送先不明等によるトラブルに関しては、会員が登録している連絡先に連絡すること及び商品購入の際に指定された配達先に商品等を配送等することにより、商品等の引渡債務を履行し、当該債務から免責されるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">3.当社は、STARDAYのトップページ及び販売ページ上において、Twitter等のSNSサービスの利用会員が投稿した商品に関するコメントの内容について、当該コメントの内容が事実に反するものであったとしても、これによる商品を購入した会員に生じた損害に対しては、当社に故意又は重過失がある場合を除き、一切の責任を負わないものとします。</span>
              </p>

              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第13条 反社会的勢力の排除</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">1.売主及び買主は、それぞれの双方に対し、次の事項に該当することを確約する。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(1).自らが、暴力団、暴力団関係企業、総会屋若しくはこれらに準ずる団体に属する者又はその構成員(以下総称して「反社会的勢力」という)に該当しないこと。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(2).自らの役職(業務を執行する社員、取締役、執行役又はこれらに準ずる者をいう)が反社会的勢力に該当しないこと。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(3).反社会的勢力に自己の名義を利用させ、この契約を締結するものではないこと。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(4).本物件の引き渡し及び売買代金全額の支払いが終了するまでの間に、自ら又は第三者を利用して、この契約に関して次の事項に該当する行為をしないこと。ア．相手方に対する脅追的な言動又は暴力を用いる行為イ．偽計又は威力を用いて相手方の業務を妨害し、又は信用を毀損する行為</span>
              </p>

              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.売主又は買主の一方について、次のいずれかに該当した場合には、その相手方は、何らの催告を要せずして、この契約を解除することができる。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >(1)．前項(1)又は(2)の確約に反する申告をしたことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >(2).前項(3)の確約に反する契約をしたことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(3).前項(4)の確約に反する行為をした場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">3.買主は、売主に対し、自ら又は第三者を利用して本物件を反社会的勢力の事務所または、その他の活動の拠点に供しないことを確約する。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">4.売主は、買主が前項に反した行為をした場合には、何らの催告を要せずして、この契約を解除することができる。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">5.第2項又は前項の規定によりこの契約が解除された場合、解除された者は、その相手方に対し、違約金(損害賠償額の予定)として金○○○○円(売買代金の20%相当額)を支払うものとする。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">6.第2項又は第4項の規定によりこの契約が解除された場合、解除された者は、解除により生じる損害について、その相手方に対し一切の請求を行うことができない。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">7.買主が第3項の規定に違反し、本物件を反社会的勢力の事務所その他の活動の拠点に供したと認められる場合において、売主が第4項の規定によりこの契約を解除するときは、
                  買主は、売主に対し、第5項の違約金に加え、金○○○○円(売買代金の80%相当額)を制裁金として支払うものとする。ただし、宅地建物取引業者が自ら売主となり、かつ宅地建物取引業者でない者が買主となる場合は、この限りでない。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >付則：本規約は2011年9月6日から全ての会員に適用されるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >【2018年10月24日改訂】</span>
              </p>
              <p><br></p>
            </div>
          </div>
        </FormItem>
        <FormItem prop="agree">
          <RadioGroup v-model="formItem.agree">
            <Radio label="1">
              {{ getLanguageData.loginpage.agreeprotol }}
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <!--      手机注册form -->
      <Form v-show="activeTab==='1'" ref="formPhoneValidate" :model="formPhoneItem" :rules="rulePhoneValidate" :label-width="220">
        <FormItem :label="getLanguageData.loginpage.phoneNum" prop="phone">
          <Input v-model.trim="formPhoneItem.phone" :placeholder="getLanguageData.loginpage.wrphoneNum" maxlength="11">
          <Select slot="prepend" v-model="formPhoneItem.area" style="width: 80px">
            <Option value="+81">
              +81
            </Option>
            <Option value="+86">
              +86
            </Option>
          </Select>
          </Input>
        </FormItem>
        <FormItem :label="getLanguageData.loginpage.password" prop="password">
          <Input
            v-model="formPhoneItem.password"
            type="password"
            password
            :placeholder="getLanguageData.loginpage.wrpassword"
          />
        </FormItem>
        <FormItem :label="getLanguageData.loginpage.valicode" prop="emailCode">
          <Input v-model="formPhoneItem.emailCode" :placeholder="getLanguageData.loginpage.wrvalicode">
            <span slot="append" class="appendcode" @click="sendMobileCodeHandle">{{ isSendCode?numInter:getLanguageData.loginpage.sendvalicode }}</span>
          </Input>
        </FormItem>
        <FormItem :label="getLanguageData.loginpage.registerprotol">
          <div class="agreebox">
            <div class="argeement-content wrapper">
              <p style="margin-bottom:0;margin-bottom:0">
                <span style="font-size: 11px;">
                  <strong>
                    <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">STARDAY</span>
                  </strong>
                  <strong>
                    <span
                      style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                    >サービス利用規約</span></strong></span>
              </p>
              <p style="margin-bottom:0;margin-bottom:0">
                <span style="font-size: 11px;"><strong><span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >第1章 総則</span></strong></span>
              </p>
              <p style="margin-bottom:0;margin-bottom:0">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第1条 本規約の範囲及び変更</span>
              </p>
              <p style="margin-bottom:0;margin-bottom:0">
                <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >1.この規約（以下、「本規約」といいます。）は、当社が運営するウェブサイト「STARDAY」に関するサービス（以下、「本サービス」といいます。）の利用に関し、当社及び会員（第3条で定義します。）に適用されるものとします。但し、本サービス以外に当社が提供する各サービスに関しては、当該各サービスに関連する利用規約のみが適用されるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.当社は、会員の事前の承諾を得ることなく、ウェブサイト上での掲載又はメール等の当社が適当と判断する方法で会員に告知又は通知することにより、適宜、本規約の全部又は一部を変更できるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">3.本規約の全部又は一部が変更された場合、本サービスの利用に関しては、変更後の規約のみが適用されるものとし、会員は変更後の規約のみに従うものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第2条 本サービスの利用</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">1.会員は、法令、条例、規則、通達並びに共通サービス利用規約、本規約及び当社が別途定めるプライバシーポリシー、ヘルプ等に従い、本サービスを利用するものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.未成年の会員は、適格な法定代理人の事前の同意を得なければ、本サービスを利用することができません。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第3条 提供するサービス</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">利用者は、本サービスにおいて次の行為を行うことができます。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(1)会員は、当社所定の方法に従い、本サービスを利用して当社から商品等を購入することができます。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 11px;"><strong><span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >第2章 会員</span></strong></span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">第4条 会員</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">本規約において「会員」とは、当社が別途定める＜共通サービス利用規約＞「第4条 会員」の規定が適用されるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">第5条 会員登録</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">1.会員登録をする際には、＜共通サービス利用規約＞「第5条 会員登録」に定めた会員登録に必要な項目を入力・設定した上で、登録申請することを前提条件とします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.未成年者は、適格な法定代理人の事前の同意がなければ、会員登録申請をすることができないものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">3.当社は、以下の各号の何れかに該当する場合、当該登録を承認しない場合があります。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(1)会員登録の希望者が過去に当社の提供する何らかのサービスに関する規約（本規約及びサイト上に明記した各サービスに関連する他社の規約を含みますが、これらに限りません。）に違反したこと等により、会員登録の抹消等の処分を受けていたことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(2)会員登録の希望者の申請内容に虚偽の事項が含まれていることが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(3)過去に当社の提供する何らかのサービス（サイト上に明記した各サービスに関連する他社のサービスを含みますが、これらに限りません。）に関して、料金等の支払を履行していない場合（当社が別途認める支払方法に関連する第三者に対して料金等の支払を履行していない場合を含みますが、これに限りません。）、又は、正当な理由なく長期間に亘る商品又はサービス（以下、「商品等」と総称します。）の受取り不能、返品・交換の拒絶その他の債務不履行があったことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(4)過去に＜共通サービス利用規約＞「第14条 禁止事項」の行為を行ったことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(5)その他登録を承認することが本サービスの運営・管理上、不適当であると当社が合理的に判断する場合</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第6条 登録内容の変更</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">1.会員は、氏名、住所、電話番号その他当社に登録している事項の全部又は一部に変更が生じた場合には、当社が別途指定する方法により、すみやかに登録内容を変更するものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.当社は、会員が適宜、変更登録を行わなかったことにより何らかの損害が生じたとしても、一切責任を負わないものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">第7条 本サービスの利用停止及び会員登録の取消</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">当社は、会員が以下の各号の何れかに該当する場合、事前通知することなく、当該会員に対して本サービスの利用停止、会員登録抹消その他当社が適当と考える措置を講ずることができるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(1)過去に当社の提供する何らかのサービスに関する規約（本規約及びサイト上に明記した各サービスに関連する他社の規約を含みますが、これらに限りません。）に違反をしたこと等により、会員登録の抹消等の処分を受けていたことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >(2)登録された内容に虚偽の事項が含まれていることが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(3)過去又は現在において、当社の提供する何らかのサービス（サイト上に明記した各サービスに関連する他社のサービスを含みますが、これらに限りません。）に関して、料金等の支払を履行していない場合（当社が別途認める支払方法に関連する第三者に対して料金等の支払を履行していない場合を含みますが、これに限りません。）、又は、正当な理由なく長期間に亘る商品等の受取り不能、返品・交換の拒絶その他の債務不履行があったことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(4)＜共通サービス利用規約＞「第14条禁止事項」の行為を行ったことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(5)その他当社の定める何らかの規約（本規約及びサイト上に明記した各サービスに関連する他社の規約を含みますが、これらに限りません。）に違反した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">第8条 退会手続</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">退会を希望する場合は、別途定める＜共通サービス利用規約＞「第8条 退会手続」の規定が適用されるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第3章 商品の購入</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第9条 商品の購入</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">1.会員は、商品等の購入を希望する場合、当社が別途指定する方法に従って、商品等の購入又は利用を申込むものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.前項の申込みに伴い、会員が入力・登録した配達先・注文内容等を確認の上で注文する旨のボタンをクリックし、その後、当社から注文内容を確認する旨のメールが会員に到達した時点で、会員と当社との間に当該商品等に関する売買契約が成立するものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">3.前項の規定に拘わらず、本サービス利用に関して不正行為又は不適当な行為があった場合、当社は売買契約について取消、解除その他の適切な措置を取ることができるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">4.本サービスによる商品等の配送は、日本国内に限ります。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第10条 支払方法</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">1.商品等の支払い金額は、消費税を含む商品等の購入代金及びこれに係わる取り扱い手数料の合計となります。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.本サービスによって購入された商品等の支払いに関しては、会員本人名義のクレジットカードによる支払、又は当社が別途認める支払方法に限るものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">3.クレジットカードで支払われる場合は、会員がクレジットカード会社との間で別途契約する条件に従うものとします。なお、クレジットカードの利用に関連して、会員とクレジットカード会社等の間で何らかの紛争が発生した場合は、会員とクレジットカード会社との間で責任をもって解決するものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">第11条 商品等の返品・交換・注文の撤回及び取消し</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >1.商品の返品については、以下の場合に限り受け付けるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(1)商品が模造品・海賊版であることが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >(2)商品に瑕疵があった場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(3)ご注文内容と異なる商品が到着した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(4)配送中に破損した商品の場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(5)上記（1）から（4）のいずれにも該当せず、商品到着後7日以内であって、かつ以下のいずれにも該当しない場合。但し、販売ページ上に「返品対象外」の記載がある商品については返品することができません。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">①使用済み、お直しや洗濯、クリーニングがされた場合</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >②納品書を紛失した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">③商品タグ・ラベルを切り離し、紛失した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">④返送時の商品（箱、商品の付属品を含みますが、これらに限りません。）の状態がお届け時と比べて毀損、汚損、紛失等している場合</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >⑤お客様のもとで商品に臭いが付着したり、汚れ、キズが生じた場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">⑥パッケージが商品の一部となっている商品において、パッケージを開封した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-family: MS PGothic, sans-serif; font-size: 11px;">⑦下着・水着等・化粧品等の衛生商品、福袋・福箱・セール商品（中古商品でのセールも含みます。）・アウトレット商品・予約商品である場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 11px;"><span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >2.会員は、当社が別途定める手順に従い前項に定める返品を申請するものとし、前項（1）から（4）については返送にかかる費用は当社が負担し、会員が購入した時点の販売価格、配送料、代引き手数料及びコンビニ決済手数料、ならびに返品対象商品の購入に際して使用したSTARDAY</span> <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >POINTもしくは提携サイト発行ポイントを返還するか、又は代品に交換します。なお、代品への交換を希望された場合においても、商品の欠品等を理由に交換ができないことがあります。また、前項（5）については返送にかかる費用は会員が負担し、当社は会員が購入した時点の販売価格、配送料及び代引き手数料及びコンビニ決済手数料、ならびに返品対象商品の購入に際して使用したSTARDAY</span> <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >POINTまたは提携サイト発行ポイントを返還します。</span></span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 11px;"><span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >3.会員は、商品の返品を行った場合、当該商品及び会員が返品対象商品の購入に際して取得したSTARDAY MAR</span> <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >TPOINT又は提携サイト発行ポイントを当社に返還するものとし、当社と会員間で相互に返還すべきポイントの処理方法は、対等数をもって相殺する方法により行うものとします。この場合、当社が返還すべきポイント数が、会員が返還すべきポイント数を上回るときは、当該相殺後の残数のポイントを会員に返還するものとし、会員が返還すべきポイント数が、当社が返還すべきポイント数を上回るときは、当該相殺後の残数に相当する額（返品対象商品の購入時点における1ポイントあたりの金額で算定した額）を、当社が会員に返金すべき返品対象商品の購入代金から控除する方法で行うものとします。</span></span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">4.本条第1項第5号?の定めに拘らず、ご注文の撤回及び取消しについては、予約/受注商品（但し、福袋・福箱を除く）については注文確定から24時間以内、セール商品・アウトレット商品については注文確定後から当社における配送準備中までの期間に限り受け付けるものとします。商品の発送処理後から商品到着までの間は、当社の責めに帰すべき事由がある場合を除き、商品のご注文の撤回および取消しをすることができません（商品到着後の返品については、本条第１項の定めるとおりとします）。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">5.当社は、会員が正当な理由なく商品を当社に返送した場合（第1項に定める事由に該当しない商品の返品、受領拒否、受領不可等を含みますがこれらに限りません。）、当該商品を受領した後、遅滞なく会員に対し通知し、相当の期間を定めたうえで当該商品の受け取りにつき会員に対して指図をもとめるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">6.当社は、相当の期間内に前項に規定する会員からの指図がない場合、会員に対し予告した上で、その予告をした日から起算して1年間当該商品を保管するものとします。なお、当社は、当該保管期間内に会員より商品の受け取りに関する指図を受けた場合、当該商品について現状有姿で引渡すものであり、当該商品の状態（商品の変質、変形、消耗、毀損又は腐敗等を含みますがこれらに限りません。）について一切責任を負わないものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">7.当社は、前項の保管期間経過後、当該商品の保管期間が終了した旨を会員に対して通知するものとし、当該通知日から起算して7日以内に会員より当該商品の受け取りに関する指図がない場合、廃棄その他当社の定める処分方法により当該商品を処分するものとします。この場合当社は会員に対して一切の責任を負わないものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第12条 商品等に関する免責</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">1.当社は、本サービス及び本サービスを通じて販売される商品等につき、その品質、材質、機能、性能、他の商品との適合性その他の欠陥、又はこれらが原因となり生じた損害、損失、不利益等については、前条に定める場合を除き、いかなる保証・負担も負わないものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.当社は、配送先不明等によるトラブルに関しては、会員が登録している連絡先に連絡すること及び商品購入の際に指定された配達先に商品等を配送等することにより、商品等の引渡債務を履行し、当該債務から免責されるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">3.当社は、STARDAYのトップページ及び販売ページ上において、Twitter等のSNSサービスの利用会員が投稿した商品に関するコメントの内容について、当該コメントの内容が事実に反するものであったとしても、これによる商品を購入した会員に生じた損害に対しては、当社に故意又は重過失がある場合を除き、一切の責任を負わないものとします。</span>
              </p>

              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >第13条 反社会的勢力の排除</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">1.売主及び買主は、それぞれの双方に対し、次の事項に該当することを確約する。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(1).自らが、暴力団、暴力団関係企業、総会屋若しくはこれらに準ずる団体に属する者又はその構成員(以下総称して「反社会的勢力」という)に該当しないこと。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(2).自らの役職(業務を執行する社員、取締役、執行役又はこれらに準ずる者をいう)が反社会的勢力に該当しないこと。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(3).反社会的勢力に自己の名義を利用させ、この契約を締結するものではないこと。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(4).本物件の引き渡し及び売買代金全額の支払いが終了するまでの間に、自ら又は第三者を利用して、この契約に関して次の事項に該当する行為をしないこと。ア．相手方に対する脅追的な言動又は暴力を用いる行為イ．偽計又は威力を用いて相手方の業務を妨害し、又は信用を毀損する行為</span>
              </p>

              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">2.売主又は買主の一方について、次のいずれかに該当した場合には、その相手方は、何らの催告を要せずして、この契約を解除することができる。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >(1)．前項(1)又は(2)の確約に反する申告をしたことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >(2).前項(3)の確約に反する契約をしたことが判明した場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">(3).前項(4)の確約に反する行為をした場合</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">3.買主は、売主に対し、自ら又は第三者を利用して本物件を反社会的勢力の事務所または、その他の活動の拠点に供しないことを確約する。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">4.売主は、買主が前項に反した行為をした場合には、何らの催告を要せずして、この契約を解除することができる。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">5.第2項又は前項の規定によりこの契約が解除された場合、解除された者は、その相手方に対し、違約金(損害賠償額の予定)として金○○○○円(売買代金の20%相当額)を支払うものとする。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">6.第2項又は第4項の規定によりこの契約が解除された場合、解除された者は、解除により生じる損害について、その相手方に対し一切の請求を行うことができない。</span>
              </p>
              <p style="margin-top:16px">
                <span style="font-size: 14px; font-family: MS PGothic, sans-serif;">7.買主が第3項の規定に違反し、本物件を反社会的勢力の事務所その他の活動の拠点に供したと認められる場合において、売主が第4項の規定によりこの契約を解除するときは、
                  買主は、売主に対し、第5項の違約金に加え、金○○○○円(売買代金の80%相当額)を制裁金として支払うものとする。ただし、宅地建物取引業者が自ら売主となり、かつ宅地建物取引業者でない者が買主となる場合は、この限りでない。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-family: MS PGothic, sans-serif; font-size: 11px;"
                >付則：本規約は2011年9月6日から全ての会員に適用されるものとします。</span>
              </p>
              <p style="margin-top:16px">
                <span
                  style="font-size: 14px; font-family: MS PGothic, sans-serif;"
                >【2018年10月24日改訂】</span>
              </p>
              <p><br></p>
            </div>
          </div>
        </FormItem>
        <FormItem prop="agree">
          <RadioGroup v-model="formPhoneItem.agree">
            <Radio label="1">
              {{ getLanguageData.loginpage.agreeprotol }}
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div class="btnbox">
        <p class="btn" @click="registerHandle">
          {{ getLanguageData.loginpage.register }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookie from 'js-cookie'

export default {
  name: 'Register',
  data () {
    return {
      formItem: {
        email: '',
        password: '',
        emailCode: '',
        confirmPassword: '',
        source: 1,
        agree: ''
      },
      formPhoneItem: {
        phone: '',
        area: '+81',
        password: '',
        emailCode: '',
        confirmPassword: '',
        source: 1,
        agree: ''
      },
      activeTab: '0',
      captcaRefresh: 0,
      captcaRefreshurl: '',
      numInter: 0,
      showMask: false,
      isSendCode: false
    }
  },
  methods: {
    ...mapActions({
      handleLogin: 'handleLogin',
      handleAddBuyCart: 'handleAddBuyCart'
    }),
    changeActiveTabHandle (str) {
      this.activeTab = str
      // if (str === '0') {
      //   this.formItem = {
      //     email: '',
      //     password: '',
      //     emailCode: '',
      //     confirmPassword: '',
      //     source: 1,
      //     agree: ''
      //   }
      //   this.$refs.formValidate.resetFields()
      // } else {
      //   this.formPhoneItem = {
      //     phone: '',
      //     area: '+81',
      //     password: '',
      //     emailCode: '',
      //     confirmPassword: '',
      //     source: 1,
      //     agree: ''
      //   }
      // }
    },
    sendCodeHandle () {
      const vm = this
      if (vm.isSendCode) {
        return
      }
      this.$refs.formValidate.validateField('email', (error) => {
        if (!error) {
          vm.$axios.post('starday-auth/register/user/email/send/' + vm.formItem.email).then((res) => {
            vm.isSendCode = true
            if (res.code === 200) {
              vm.numInter = 300
              const _timeint = setInterval(function () {
                if (vm.numInter <= 0) {
                  clearInterval(_timeint)
                  vm.isSendCode = false
                } else {
                  vm.numInter--
                }
              }, 1000)
            } else {
              vm.isSendCode = false
            }
          }).catch(() => {
            vm.isSendCode = false
          })
        }
      })
    },
    sendMobileCodeHandle () {
      const vm = this
      if (vm.isSendCode) {
        return
      }
      this.$refs.formPhoneValidate.validateField('phone', (error) => {
        if (!error) {
          vm.$axios.post('starday-auth/register/user/mobile/send/' + vm.formPhoneItem.phone + '/' + vm.formPhoneItem.area).then((res) => {
            vm.isSendCode = true
            if (res.code === 200) {
              vm.numInter = 300
              const _timeint = setInterval(function () {
                if (vm.numInter <= 0) {
                  clearInterval(_timeint)
                  vm.isSendCode = false
                } else {
                  vm.numInter--
                }
              }, 1000)
            } else {
              vm.isSendCode = false
            }
          }).catch(() => {
            vm.isSendCode = false
          })
        }
      })
    },
    // 处理游客购物车数据
    editBuyCart () {
      const vm = this
      const _arr = []
      const _dataArr = vm.getAddBuyCart
      _dataArr.forEach((item, index) => {
        item.shopItems.forEach((chItem) => {
          _arr.push({
            num: chItem.num,
            skuId: chItem.skuId,
            spuId: chItem.spuId,
            storeId: item.storeId,
            skuValue: chItem.skuValue
          })
        })
      })
      return _arr
      // console.log('_arr----', _arr)
    },
    registerHandle () {
      const vm = this
      if (vm.activeTab === '1') {
        vm.$refs.formPhoneValidate.validate((valid) => {
          if (valid) {
            const _params = { ...vm.formPhoneItem }
            _params.confirmPassword = _params.password
            _params.mobile = _params.phone
            _params.mobileAreaCode = _params.area
            vm.$axios.post('starday-auth/register/user/register.do', _params).then((res) => {
              if (res.code === 200) {
                vm.$store.dispatch('handleLogin', res.data)
                Cookie.set('token', res.data.token)
                if (vm.getAddBuyCart && vm.getAddBuyCart.length > 0) {
                  vm.$axios({
                    url: 'starday-order/shopCart/mergeShopCart',
                    method: 'post',
                    data: vm.editBuyCart()
                  }).then((res) => {
                    if (res.code === 200) {
                      vm.handleAddBuyCart([])
                    }
                  })
                }
                setTimeout(function () {
                  vm.$router.push('/')
                })
              } else {
                vm.captcaRefresh++
              }
            }).catch(() => {
              vm.captcaRefresh++
            })
          }
        })
        return
      }
      vm.$refs.formValidate.validate((valid) => {
        if (valid) {
          const _params = { ...vm.formItem }
          _params.confirmPassword = _params.password
          vm.$axios.post('starday-auth/register/user/register.do', _params).then((res) => {
            if (res.code === 200) {
              vm.$store.dispatch('handleLogin', res.data)
              Cookie.set('token', res.data.token)
              if (vm.getAddBuyCart && vm.getAddBuyCart.length > 0) {
                vm.$axios({
                  url: 'starday-order/shopCart/mergeShopCart',
                  method: 'post',
                  data: vm.editBuyCart()
                }).then((res) => {
                  if (res.code === 200) {
                    vm.handleAddBuyCart([])
                  }
                })
              }
              setTimeout(function () {
                vm.$router.push('/')
              })
            } else {
              vm.captcaRefresh++
            }
          }).catch(() => {
            vm.captcaRefresh++
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getAddBuyCart: 'getAddBuyCart'
    }),
    ruleValidate () {
      const vm = this
      const validatePass = (rule, value, callback) => {
        if (value !== vm.formItem.password) {
          callback(new Error(vm.getLanguageData.loginpage.passwordEqual))
        } else {
          callback()
        }
      }
      const _valid = {
        email: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.wremail,
            trigger: 'blur'
          },
          {
            type: 'email',
            message: vm.getLanguageData.loginpage.emailreg,
            trigger: 'blur'
          }
        ],
        emailCode: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.wrvalicode,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.wrpassword,
            trigger: 'blur'
          },
          {
            pattern: /^[0-9A-Za-z]{6,20}$/,
            message: vm.getLanguageData.loginpage.passwordreg,
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.wrpassword,
            trigger: 'blur'
          },
          {
            pattern: /^[0-9A-Za-z]{6,20}$/,
            message: vm.getLanguageData.loginpage.passwordreg,
            trigger: 'blur'
          },
          {
            validator: validatePass,
            trigger: 'blur'
          }

        ],
        agree: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.agreeregisterprotol,
            trigger: 'change'
          }
        ]
      }
      return _valid
    },
    rulePhoneValidate () {
      const vm = this
      const _valid = {
        phone: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.wrphoneNum,
            trigger: 'blur'
          },
          {
            pattern: vm.formPhoneItem.area === '+81' ? /^[0][0-9]{10}$/ : /^[1][3,4,5,7,8,9][0-9]{9}$/,
            message: vm.getLanguageData.loginpage.phonereg,
            trigger: 'blur'
          }
        ],
        emailCode: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.wrvalicode,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.wrpassword,
            trigger: 'blur'
          },
          {
            pattern: /^[0-9A-Za-z]{6,20}$/,
            message: vm.getLanguageData.loginpage.passwordreg,
            trigger: 'blur'
          }
        ],
        agree: [
          {
            required: true,
            message: vm.getLanguageData.loginpage.agreeregisterprotol,
            trigger: 'change'
          }
        ]
      }
      return _valid
    }
  }
}
</script>

<style scoped lang="scss">
  .register {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
    .registertitle {
      height: 40px;
      font-size: 28px;
      font-weight: 400;
      color: #333;
      line-height: 40px;
    }
    .tabbox{
      text-align: center;
      padding: 10px 0 10px 20px;
      .tabitembox{
        display: inline-block;
        margin: 0 auto;
        width: 340px;
        color: #333333;
        font-size: 24px;
        display: flex;
        justify-content: space-between;
        .tabitem{
          span{
            font-size: 20px;
            cursor: pointer;
          }
          .activespan{
            position: relative;
            color: #FF5D19;
          }
          .activespan::before{
            position: absolute;
            width: 30px;
            height: 4px;
            content: '';
            background-color: #FF5D19;
            left: calc(50% - 15px);
            bottom: -10px;
          }
        }
      }

    }
    .registerbox {
      width: 880px;
      margin: 40px auto;

      .appendcode {
        cursor: pointer;
        padding: 0 15px;
      }

      .agreebox {
        padding: 20px;
        height: 300px;
        border: 1px solid #DFDFDF;
        overflow-y: scroll;
      }

      .btnbox {
        text-align: center;

        .btn {
          display: inline-block;
          width: 288px;
          height: 54px;
          background: #e76636;
          border-radius: 2px;
          line-height: 54px;
          font-size: 16px;
          color: #fff;
          margin: 40px auto 0;
          cursor: pointer;
        }
      }
    }
  }
</style>
