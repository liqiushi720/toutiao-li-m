<template>
  <van-button
    v-if="value"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="followLoading"
    loading-text="加载中..."
  >已关注
  </van-button>
  <van-button
    :loading="followLoading"
    loading-text="加载中..."
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
  >关注
  </van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'FollowUser',
  components: {},
  props: {
    userId: {
      type: [Object, String, Number],
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      followLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onFollow () {
      this.followLoading = true
      try {
        if (this.value) {
          // false 表示关注用户了 点击取消关注
          await deleteFollow(this.userId)
        } else {
          await addFollow(this.userId)
        }

        // this.$parent.article.is_followed = !this.$parent.article.is_followed
        // this.$emit('update:value', !this.value)
        this.$emit('input', !this.value)
      } catch (e) {
        if (e.response && e.response.status === 400) {
          this.$toast('你丫的不能关注自己')
        }
        this.$toast('请求失败')
      }
      this.followLoading = false
    }
  }
}
</script>

<style scoped>

</style>
