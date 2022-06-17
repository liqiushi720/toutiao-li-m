<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon name="cross" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <!--【增加图标】-->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>

      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <!--【增加图标】-->
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <!--【增加发送按钮】-->
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000*10"
            format="ss s"
            @finish="isCountDownShow=fase"
          />
          <!--这里注意，要加上native-type,否则也可以实现表单提交-->
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            native-type="button"
            type="default"
            @click="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>
<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      isCountDownShow: false,
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    ...mapMutations(['setItem']),
    async onSubmit () {
      // 获取表单数据
      const user = this.user

      this.$toast.loading({
        message: '登录中...',
        forbidClick: true
      })
      // 发送请求
      try {
        const { data: liqiushi } = await login(user)
        this.$toast.success('登录成功')
        this.$router.push('/my')
        this.setItem(liqiushi.data)
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码错误')
          this.$toast.fail('登录失败')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
          console.log('登录失败，请稍后重试', err)
        }
      }
    },
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      this.isCountDownShow = true
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
