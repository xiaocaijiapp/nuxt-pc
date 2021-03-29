<template>
  <div class="pagecom" v-if="allPages > 1">
    <ul>
      <li :class="currentPage===1?'disablelink':''"> <a :href="currentPage===1?null:(getLOCATIONORIGIN + absolutepath + (andFlag ? '?pageNo=' : '&pageNo=') + (currentPage - 1))"><i class="ivu-icon ivu-icon-ios-arrow-back" /></a></li>
      <li :class="currentPage===1?'currentactive':''"> <a :href="currentPage===1?null:(getLOCATIONORIGIN + absolutepath + (andFlag ? '?pageNo=' : '&pageNo=1'))">1</a></li>
      <li v-if="currentPage > 5" class="ivu-page-item-jump-prev">
        <a :href="getLOCATIONORIGIN + absolutepath + (andFlag ? '?pageNo=' : '&pageNo=') + (currentPage - 5)"><i class="ivu-icon ivu-icon-ios-arrow-back" /></a>
      </li>
      <li v-if="currentPage === 5">
        <a :href="getLOCATIONORIGIN + absolutepath + (andFlag ? '?pageNo=' : '&pageNo=') + (currentPage - 3)">{{ currentPage - 3 }}</a>
      </li>
      <li v-if="currentPage - 2 > 1">
        <a :href="getLOCATIONORIGIN + absolutepath + (andFlag ? '?pageNo=' : '&pageNo=') + (currentPage - 2)">{{ currentPage - 2 }}</a>
      </li>
      <li v-if="currentPage - 1 > 1">
        <a :href="getLOCATIONORIGIN + absolutepath + (andFlag ? '?pageNo=' : '&pageNo=') + (currentPage - 1)">{{ currentPage - 1 }}</a>
      </li>
      <li v-if="currentPage != 1" class="currentactive">
        <a>{{ currentPage }}</a>
      </li>
      <li v-if="currentPage + 1 < allPages">
        <a :href="getLOCATIONORIGIN + absolutepath + (andFlag ? '?pageNo=' : '&pageNo=') + (currentPage + 1)">{{ currentPage + 1 }}</a>
      </li>
      <li v-if="currentPage + 2 < allPages">
        <a :href="getLOCATIONORIGIN + absolutepath + (andFlag ? '?pageNo=' : '&pageNo=') + (currentPage + 2)">{{ currentPage + 2 }}</a>
      </li>
      <li v-if="allPages - currentPage === 4">
        <a :href="getLOCATIONORIGIN + absolutepath + (andFlag ? '?pageNo=' : '&pageNo=') + (currentPage + 3)">{{ currentPage + 3 }}</a>
      </li>
      <li v-if="allPages - currentPage >= 5" class="ivu-page-item-jump-next">
        <a :href="getLOCATIONORIGIN + absolutepath + (andFlag ? '?pageNo=' : '&pageNo=') + (currentPage + 5)"><i class="ivu-icon ivu-icon-ios-arrow-forward" /></a>
      </li>
      <li v-if="allPages!==currentPage">
        <a :href="getLOCATIONORIGIN + absolutepath + (andFlag ? '?pageNo=' : '&pageNo=') + allPages">{{ allPages }}</a>
      </li>
      <li :class="currentPage===allPages?'disablelink':''"><a :href="currentPage===allPages?null:(getLOCATIONORIGIN + absolutepath + (andFlag ? '?pageNo=' : '&pageNo=') + (currentPage + 1))"><i class="ivu-icon ivu-icon-ios-arrow-forward" /></a></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Pagecom',
  props: ['total', 'pageSize', 'currentPage', 'absolutepath', 'allPages', 'andFlag'],
  computed: {
    ...mapGetters({
      getLOCATIONORIGIN: 'getLOCATIONORIGIN'
    })
  }

}
</script>

<style scoped lang="scss">
.pagecom{
  li{
    background-color: #fff;
    display: inline-block;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    list-style: none;
    text-align: center;
    cursor: pointer;
    color: #666;
    font-family: Arial;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
    a{
      display: inline-block;
      min-width: 32px;
      height: 32px;
      line-height: 30px;
      color: #333333;
    }
  }
  .ivu-page-item-jump-prev{
    border: none;
    background: none;
    position: relative;
    .ivu-icon-ios-arrow-back{
      color: #FF5D19;
    }
  }
  li:hover{
    a{
      color: #FF5D19;
    }
    border-color: #FF5D19;
  }
  .currentactive{
    a{
      color: #FF5D19;
    }
    border-color: #FF5D19;
  }
  .ivu-page-item-jump-next{
    border: none;
    background: none;
    position: relative;
    .ivu-icon-ios-arrow-forward{
      color: #FF5D19;
    }
  }
  .disablelink{
    a{
      color: #cccccc;
    }
  }
  .disablelink:hover{
    a{
      color: #cccccc;
    }
    border-color: #cccccc;
  }
  .ivu-page-item-jump-prev:after, .ivu-page-item-jump-next:after {
    content: "•••";
    display: block;
    position: absolute;
    top: 0;
    left: 10px;
    letter-spacing: 1px;
    color: #ccc;
    text-align: center;
  }
  .ivu-page-item-jump-prev:hover:after, .ivu-page-item-jump-next:hover:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 10px;
    letter-spacing: 1px;
    color: #ccc;
    text-align: center;
  }
}

</style>
