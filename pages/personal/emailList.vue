<template>
    <div class="emailList">
      <div class="breadbox">
        <!-- {{ listData }} -->
        <Breadcrumb separator=">">
          <BreadcrumbItem :to="getLOCATIONORIGIN">
            {{getLanguageData.indexPage.page}}
          </BreadcrumbItem>
          <BreadcrumbItem :to="getLOCATIONORIGIN + 'personal'">
            {{getLanguageData.emailText.personalInfo}}
          </BreadcrumbItem>
          <BreadcrumbItem>
            {{getLanguageData.emailText.viewEmail}}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
        <div class="cardbox">
            <div class="headtitle">
                <div class="headLeft">
                    {{getLanguageData.emailText.viewEmail}}
                </div>
                <div class="headRight">
                    <Button @click="changeTable(1)">{{getLanguageData.emailText.receiveHistory}}</Button>
                    <Button @click="changeTable(2)">{{getLanguageData.emailText.sendChecklist}}</Button>
                    <Button @click="contactSystem">{{getLanguageData.emailText.contactPla}}</Button>
                </div>
            </div>

            <div class="tableBox">
                 <div v-if="active === 1">
                     <Table :columns="tableTitle1" :data="tableData1">
                        <template slot-scope="{ row }" slot="title">
                            <span class="emailName" @click="checkMail(row)">{{row.title}}</span>
                        </template>
                        <template slot-scope="{ row }" slot="checkStatus">
                            <span v-if="row.checkStatus === 0">{{getLanguageData.emailText.alearyRead}}</span>
                            <span v-if="row.checkStatus === 1">{{getLanguageData.emailText.noRead}}</span>
                        </template>
                        <template slot-scope="{ row }" slot="opcting">
                            <span style="color:#1491FF;cursor:pointer;" @click="deleteRow(row)">{{getLanguageData.emailText.deleteBtn}}</span>
                            <span style="color:#1491FF;cursor:pointer;margin-left:10px;" @click="checkMail(row)">{{getLanguageData.emailText.receiveBtn}}</span>
                        </template>
                    </Table>
                    <div class="pagebox">
                        <Page
                        :total="total1"
                        :current="pageNo1"
                        :page-size="pageSize1"
                        @on-change="changepage1"
                    />
                    </div>
                 </div>

                 <div v-if="active === 2">
                     <Table :columns="tableTitle2" :data="tableData2">
                        <template slot-scope="{ row }" slot="title">
                            <span class="emailName" @click="checkMail(row)">{{row.title}}</span>
                        </template>
                        <template slot-scope="{ row }" slot="opcting">
                            <span style="color:#1491FF;cursor:pointer;" @click="deleteRow(row)">{{getLanguageData.emailText.deleteBtn}}</span>
                        </template>
                    </Table>
                    <div class="pagebox">
                        <Page
                        :total="total2"
                        :current="pageNo2"
                        :page-size="pageSize2"
                        @on-change="changepage2"
                    />
                    </div>
                 </div>
            </div>
        </div>

        <mail
        :sendModal="sendModal"
        :userInfo="userInfo"
        :isPla='isPla'
        :modalHeader="modalHeader"
        :isReply="isReply"
        @closeMail="closeMail"
        ></mail>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import mail from '@/components/mail/mail.vue'
export default {
  name: 'emailList',
  layout: 'default',
  middleware: 'auth',
  components: {
    mail
  },
  data () {
    return {
      userInfo: {},
      modalHeader: '',
      isReply: false,
      isPla: false,
      active: 1,
      sendModal: false,
      total1: null,
      pageNo1: 1,
      pageSize1: 10,
      total2: null,
      pageNo2: 1,
      pageSize2: 10,
      tableData1: [],
      tableData2: [],
      emailDetial: {}
      // mailDetail: {}
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData',
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    }),
    tableTitle1 () {
      const vm = this
      const tableTitle1 = [
        {
          align: 'center',
          title: vm.getLanguageData.emailText.emailTitle,
          slot: 'title'
        },
        {
          align: 'center',
          title: vm.getLanguageData.emailText.sender,
          key: 'sendUserName'
        },
        {
          align: 'center',
          title: vm.getLanguageData.emailText.sendEmailTime,
          key: 'receiveTime'
        },
        {
          align: 'center',
          title: vm.getLanguageData.emailText.state,
          slot: 'checkStatus'
        },
        {
          align: 'center',
          title: vm.getLanguageData.emailText.opcting,
          slot: 'opcting'
        }
      ]
      return tableTitle1
    },
    tableTitle2 () {
      const vm = this
      const tableTitle2 = [
        {
          align: 'center',
          title: vm.getLanguageData.emailText.emailTitle,
          slot: 'title'
        },
        {
          align: 'center',
          title: vm.getLanguageData.goodsText.recipient,
          key: 'receiveUserName'
        },
        {
          align: 'center',
          title: vm.getLanguageData.goodsText.emailSendTime,
          key: 'sendTime'
        },
        {
          align: 'center',
          title: vm.getLanguageData.emailText.opcting,
          slot: 'opcting'
        }
      ]
      return tableTitle2
    }
  },
  methods: {
    changeTable (i) {
      this.active = i
      if (i === 2) {
        this.getSendList()
      } else {
        this.getReceiveList()
      }
    },
    contactSystem () {
      this.modalHeader = this.getLanguageData.emailText.contactPla
      this.sendModal = true
      this.isPla = true
    },
    closeMail () {
      this.sendModal = false
    },
    checkMail (row) {
    //   console.log('------id----', row.id)
    //   this.mailDetail = row
      this.$router.push('/personal/emailListDetial?id=' + row.id)
      const vm = this
      const data = {
        id: row.id
      }
      vm.$axios({
        url: 'starday-mail/mail/getMailInfo',
        method: 'get',
        params: data
      }).then((res) => {
        if (res.code === 200) {
          vm.emailDetial = res.data
          vm.userInfo = res.data
        }
      })
    },
    reply () {
      this.sendModal = true
      this.isReply = true
      this.isPla = false
    //   this.userInfo = mailDetail
    },
    deleteRow (row) {
      const vm = this
      const data = {
        id: row.id
      }
      vm.$axios({
        url: 'starday-mail/mail/delMail',
        params: data,
        method: 'get'
      }).then((res) => {
        if (res.code === 200) {
          vm.$Message.success(vm.getLanguageData.emailText.deleteSuccess)
          vm.getReceiveList()
          vm.getSendList()
        }
      })
    },
    changepage1 (page) {
      this.pageNo1 = page
      this.getReceiveList()
    },
    changepage2 (page) {
      this.pageNo2 = page
      this.getSendList()
    },
    // 获取接收的站内信列表
    getReceiveList () {
      const vm = this
      const data = {
        pageNo: vm.pageNo1,
        pageSize: vm.pageSize1
      }
      vm.$axios({
        url: 'starday-mail/mail/findMyReceiveMailPage',
        method: 'get',
        params: data
      }).then((res) => {
        if (res.code === 200) {
          vm.tableData1 = res.data.rows
          vm.pageNo1 = res.data.page
          vm.pageSize1 = res.data.pageSize
          vm.total1 = res.data.totalRows
        }
      })
    },
    // 获取发送的站内信列表
    getSendList () {
      const vm = this
      const data = {
        pageNo: vm.pageNo2,
        pageSize: vm.pageSize2
      }
      vm.$axios({
        url: 'starday-mail/mail/findMySendMailPage',
        method: 'get',
        params: data
      }).then((res) => {
        if (res.code === 200) {
          vm.tableData2 = res.data.rows
          vm.pageNo2 = res.data.page
          vm.pageSize2 = res.data.pageSize
          vm.total2 = res.data.totalRows
        }
      })
    }
  },
  mounted () {
    this.getReceiveList()
  }
}
</script>
<style lang="scss" scoped>
 .emailList{
   .breadbox {
      margin: 12px 0;
      // color:#FF5D19;
    }
    .cardbox{
        margin-top: 20px;
        padding: 24px 40px 35px;
        background-color: #fff;
        .headtitle{
            display: flex;
            justify-content: space-between;
            .headLeft{
                font-size: 16px;
                font-weight: 500;
            }
        }
        .tableBox{
            margin-top: 14px;
            .emailName{
                color: #1491FF;
                // font-size: 12px;
                cursor: pointer;
            }
            .pagebox{
                margin-top: 35px;
                text-align: right;
            }
        }
    }
 }
</style>
