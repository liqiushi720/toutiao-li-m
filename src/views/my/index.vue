<template>
  <!-- 只能有一个div根标签 -->
  <div class="layout-container">
    <!-- 登录状态 -->
    <div class="degnlu header" v-if="token">
      <div class="top">
        <div class="left">
          <van-image class="avatar" round :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" round size="mini">编辑资料</van-button>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="bottom-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="bottom-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="bottom-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /结束-登录 -->
    <!-- not-login未登录状态 -->
    <div class="header not-login" v-else>
      <div class="login-btn">
        <img class="moblie-img" src="@/assets/mobile.png" alt />
        <span @click="$router.push('/login')" class="text">登录&nbsp;/&nbsp;注册</span>
      </div>
    </div>
    <!-- /结尾-未登录 -->

    <!-- 宫格 -->
    <van-grid :column-num="2" class="grid" clickable>
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="grid-t">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="grid-t">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /结束-宫格 -->
    <!-- 单元格 -->
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="Al智能" is-link />
    <van-cell v-if="token" class="logout-cell" clickable title="退出登录" @click="login_out" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'myIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (this.token) {
      this.loadingUserInfo()
    }
  },
  mounted () {

  },
  components: {},
  props: {},
  computed: {
    ...mapState(['token'])
  },
  watch: {},
  methods: {
    ...mapMutations(['removeItems']),
    login_out () {
      this.$dialog.confirm({
        title: '确定要退出?'

      })
        .then(() => {
          // on confirm
          this.removeItems(this.token)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadingUserInfo () {
      try {
        const { data: liqiushi } = await getUserInfo(this.token)
        // console.log(res)
        this.userInfo = liqiushi.data
      } catch (error) {
        this.$toast.fail('获取用户信息失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  .header {
    height: 410px;
    background-image: url("~@/assets/banner.png");
    box-sizing: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .moblie-img {
        width: 132px;
        height: 132px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .degnlu {
    .top {
      height: 276px;
      padding: 115px 29px 28px;
      box-sizing: border-box;
      // background-color: pink;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 29px;
          color: #fff;
        }
      }
    }
    .bottom {
      display: flex;
      .bottom-item {
        flex: 1;
        height: 66px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid {
    height: 141px;
    .toutiao {
      font-size: 45px;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .grid-t {
      font-size: 27px;
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
