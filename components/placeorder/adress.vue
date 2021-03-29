<template>
  <div class="adresstem" @mouseenter="showIndex=item.id" @mouseleave="showIndex=''">
    <div class="adresstembox">
      <div class="adressname">
        <span class="receive">{{ item.realName }}</span>
        <span v-if="item.def!==0 && showIndex===item.id" class="def" @click="setDefHandle(item.id)">{{ getLanguageData.adressPage.setleaf }}</span>
        <span v-if="item.def===0" class="def">{{ getLanguageData.adressPage.def }}</span>
      </div>
      <ul>
        <li>
          <span class="label">{{ getLanguageData.adressPage.receive }}</span>
          <span>{{ item.realName }}</span>
        </li>
        <li>
          <span class="label">{{ getLanguageData.adressPage.emailcode }}</span>
          <span>{{ item.postcode }}</span>
        </li>
        <li>
          <span class="label">{{ getLanguageData.adressPage.area }}</span>
          <span>{{ item.address }}</span>
        </li>
        <li>
          <span class="label">{{ getLanguageData.adressPage.adressDetail }}</span>
          <span>{{ item.deliveryAddress }}</span>
        </li>
        <li>
          <span class="label">{{ getLanguageData.adressPage.phone }}</span>
          <span>{{ item.mobile }}</span>
        </li>
      </ul>
      <div class="usebtn">
        <p v-show="useAdressId!==item.id" @click="useHandle">
          {{ getLanguageData.adressPage.useadress }}
        </p>
      </div>
      <div class="operate">
        <span @click="editHandle">{{ getLanguageData.operate.edit }}</span>
        <span @click="deleteHandle">{{ getLanguageData.operate.delete }}</span>
      </div>
    </div>
    <img v-if="useAdressId===item.id" src="@/assets/images/placeorder/selected.png" alt="">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Adress',
  props: ['item', 'useAdressId'],
  data () {
    return {
      showIndex: ''
    }
  },
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData'
    })
  },
  methods: {
    setDefHandle (id) {
      const vm = this
      vm.$axios.put('/starday-user/user/address/def/' + id).then((res) => {
        if (res.code === 200) {
          vm.$emit('refreshAdressHandle')
          vm.$Message.success(vm.getLanguageData.operate.setSuccess)
        }
      })
    },
    useHandle () {
      const vm = this
      vm.$emit('refreshUseId', vm.item.id)
    },
    deleteHandle () {
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
                props: { type: 'ios-alert', size: '18', color: '#f90' }
              }),
              h('span', this.getLanguageData.operate.sureDelete)
            ]
          )
        },
        onOk: () => {
          vm.$axios.delete('starday-user/user/address/' + vm.item.id).then((res) => {
            if (res.code === 200) {
              vm.$emit('refreshAdressHandle')
              vm.$Message.success(vm.getLanguageData.operate.deletesuccess)
            }
          })
        }
      })
    },
    editHandle () {
      this.$emit('editAdressHandle', this.item)
    }
  }
}
</script>

<style scoped lang="scss">
  .adresstem {
    position: relative;
    width: 315px;
    height: 295px;
    border: 1px solid #E0E0E0;
    margin: 10px;

    .adresstembox {
      width: 315px;
      height: 295px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      padding: 10px 20px;
      .adressname{
        height: 36px;
        line-height: 36px;
        border-bottom: 1px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .receive{
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .def{
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #FFFFFF;
          background: #eecca5;
          padding: 0 4px;
          cursor: pointer;
        }
      }
      ul{
        margin-top: 20px;
        li{
          height: 26px;
          line-height: 26px;
          .label{
            display: inline-block;
            width: 60px;
            font-size: 12px;
            color: #999999;
            vertical-align: middle;
          }
          span:nth-of-type(2){
            display: inline-block;
            vertical-align: middle;
            width: 196px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .usebtn{
        text-align: center;
        margin-top: 26px;
        height: 29px;
        margin-bottom: 12px;
        p{
          display: inline-block;
          width: 160px;
          height: 29px;
          line-height: 29px;
          background-color: #E76636;
          color: #FFFFFF;
          cursor: pointer;
        }
      }
      .operate{
        text-align: center;
        span{
          font-size: 12px;
          color: #2188ee;
          margin: 0 15px;
          cursor: pointer;
        }
        span:nth-of-type(1){
          position: relative;
        }
        span:nth-of-type(1)::before{
          position: absolute;
          width: 1px;
          content: '';
          height: 15px;
          background-color: #E0E0E0;
          right: -15px;
          top: 0;
        }
      }
    }

    img {
      width: 315px;
      height: 295px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
