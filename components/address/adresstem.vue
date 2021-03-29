<template>
  <Card :padding="0" :bordered="false" class="adresstem">
    <div class="title">
      <span v-if="item.realName.length>=10" class="ellipsis">
        <Tooltip :content="item.realName" :transfer="true" max-width="300" placement="top-start">
          <span class="ellipsis">{{ item.realName }}</span>
        </Tooltip>
      </span>
      <span class="ellipsis" v-else>{{item.realName}}</span>
      <span v-if="item.def===0">{{getLanguageData.receiptText.defultAdress}}</span>
    </div>
    <ul>
      <li>
        <span class="label">{{getLanguageData.receiptText.receiverName}}</span>
        <span v-if="item.realName.length>=20">
          <Tooltip :content="item.realName" :transfer="true" max-width="300" placement="top-start">
            <span class="ellipsis">{{ item.realName }}</span>
          </Tooltip>
        </span>
        <span v-else>{{item.realName}}</span>
      </li>
      <li>
        <span class="label">{{getLanguageData.receiptText.postcode}}</span>
        <span>{{item.postcode}}</span>
      </li>
      <li>
        <span class="label">{{getLanguageData.receiptText.locationArea}}</span>
        <span>{{item.address}}</span>
      </li>
      <li>
        <span class="label">{{getLanguageData.receiptText.detialAdress}}</span>
        <span v-if="item.deliveryAddress.length>=20">
          <Tooltip :content="item.deliveryAddress" :transfer="true" max-width="300" placement="top-start">
            <span class="ellipsis">{{ item.deliveryAddress }}</span>
          </Tooltip>
        </span>
        <span v-else>{{item.deliveryAddress}}</span>
      </li>
      <li>
        <span class="label">{{getLanguageData.receiptText.phoneNumber}}</span>
        <span>{{item.mobile}}</span>
      </li>
    </ul>
    <div class="foot">
      <p @click="editHandle">{{getLanguageData.receiptText.edit}}</p>
      <p @click="deleteHandle">{{getLanguageData.receiptText.delete}}</p>
      <p @click="upDefAdressHandle" v-if="item.def===1">{{getLanguageData.receiptText.setDefultAdress}}</p>
    </div>
  </Card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Adresstem',
  props: ['item'],
  computed: {
    ...mapGetters({
      getLanguageData: 'getLanguageData'
    })
  },
  methods: {
    editHandle () {
      this.$emit('editHandle', this.item)
    },
    upDefAdressHandle () {
      this.$emit('upDefAdressHandle', this.item)
    },
    deleteHandle () {
      this.$emit('deleteHandle', this.item)
    }
  }
}
</script>

<style scoped lang="scss">
.adresstem{
  display: inline-block;
  width: 353px;
  height: 260px;
  padding: 14px 20px;
  border: 1px solid #E0E0E0;
  .title{
    font-size: 12px;
    border-bottom: 1px solid #E0E0E0;
    padding-bottom: 14px;
    display: flex;
    span {
      width: 50%;
      vertical-align: middle;
    }
    .ellipsis{
      font-size: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span:nth-of-type(2){
      color: #FFAA45;
      margin-left: 16px;
      text-align: right;
    }
  }
  ul{
    margin: 12px 0;
    li{
      font-size: 12px;
      line-height: 30px;
      span {
        vertical-align: middle;
      }
      .label{
        display: inline-block;
        width: 79px;
        color: #999999;
      }
      .ellipsis{
        display: inline-block;
        width: 225px;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .foot{
    color: #3897E0;
    display: flex;
    p{
      position: relative;
      cursor: pointer;
    }
    p:nth-of-type(1){
      padding-right: 20px;
    }
    p:nth-of-type(2){
      padding: 0 20px;
    }
    p:nth-of-type(3){
     padding-left: 20px;
    }
    p:nth-of-type(2)::before{
      content: '';
      width: 1px;
      height: 15px;
      background-color: #E0E0E0;
      position: absolute;
      top: 2px;
      left: 0px;
    }
    p:nth-of-type(3)::before{
      content: '';
      width: 1px;
      height: 15px;
      background-color: #E0E0E0;
      position: absolute;
      top: 2px;
      left: 0px;
    }
  }

}
</style>
