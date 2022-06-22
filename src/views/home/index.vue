<template>
  <!-- 只能有一个div根标签 -->
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search" to="/search">搜索
      </van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <!--
animated 滑动的动画
border 底边框线
swipeable 开启左右手势滑动
    -->
    <van-tabs class="channel-tabs" v-model="active" swipeable animated border>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleIndex :channels="item"/>
      </van-tab>

      <!-- 右侧自定义内容 -->
      <!-- 占位元素 -->
      <div slot="nav-right" class="placeholder"></div>
      <!-- 右侧按钮 -->
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow=true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表 -->
    <!-- 频道编辑 -->
    <van-popup
      class="edit-channel-popup"
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit :my-channels="channels" :active.sync="active" @addChannel="addChannel"/>  <!-- 使用组件 -->
    </van-popup>
    <!-- /频道编辑 -->
  </div>
</template>

<script>
import ArticleIndex from './components/article-list.vue'
import { getUserPinDao } from '@/api/user'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItems } from '@/utils/storage'

export default {
  name: 'homeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false

    }
  },
  created () {
    this.loadingChannels()
  },
  mounted () {
  },
  components: {
    ArticleIndex,
    ChannelEdit
  },
  props: {},
  computed: {
    ...mapState(['token'])
  },
  watch: {},
  methods: {
    addChannel (channel) {
      this.channels.push(channel)
    },
    async loadingChannels () {
      try {
        const { data } = await getUserPinDao()
        this.channels = data.data.channels
        if (!this.token && getItems('TOUTIAO_CHANNELS')) {
          this.channels = getItems('TOUTIAO_CHANNELS')
        }
      } catch (e) {
        this.$toast.fail('获取频道失败')
      }

      // try {
      //   // const { data } = await getUserPinDao()
      //   // // console.log(data)
      //   // this.channels = data.data.channels
      //   let channels = []
      //   // 已登录请求用户的频道
      //   if (this.token) {
      //     const { data } = await getUserPinDao()
      //     channels = data.data.channels
      //   } else {
      //     const localChannels = getItems('TOUTIAO_CHANNELS')
      //     if (localChannels) {
      //       channels = localChannels
      //     } else {
      //       const { data } = await getUserPinDao()
      //       channels = data.data.channels
      //     }
      //   }
      //
      //   // 未登录 同时判断本地是否有频道列表
      //
      //   this.channels = channels
      // } catch (error) {
      //   this.$toast.fail('获取频道失败')
      // }
    }
  }
}
</script>

<style scoped lang="less">
.edit-channel-popup {
  box-sizing: border-box;
}

.home-container {
  padding-top: 174px;
  padding-bottom: 100px;

  /deep/ .van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;

    .van-icon {
      font-size: 32px;
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);

      i.toutiao {
        font-size: 33px;
      }

      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
