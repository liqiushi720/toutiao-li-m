<template>
  <!-- 只能有一个div根标签 -->
  <div class="layout-container">
    <!-- 子路由需要一个出口来进行存储 -->
    <router-view />liqiushi
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">{{$store.state.token?'我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  data () {
    return {}
  },
  created () { },
  mounted () { },
  components: {},
  props: {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped lang='less'>
.layout-container {
  .layout-tabbar {
    .toutiao {
      font-size: 40px;
    }
    .text {
      font-size: 17px;
    }
  }
}
</style>
