<template>
  <!-- 只能有一个div根标签 -->
  <div class="layout-container">
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
      <van-tabbar-item to="/wode">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">我的</span>
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
