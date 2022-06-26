<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1
    }"
    :loading="loading"
    @click="onLike"
  />
</template>
<script>

import { addLike, deleteLike } from '@/api/articles'

export default {
  name: 'LikeArticle',
  components: {},
  props: {
    // 文章态度
    value: {
      type: Number,
      required: true
    },
    // 文章id
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onLike () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞，要取消点赞
          await deleteLike(this.articleId)
        } else {
          // 没有点赞，要添加点赞
          await addLike(this.articleId)
          status = 1
        }

        // 更新视图
        this.$emit('input', status)
        this.$nextTick(() => {
          this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
        })
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败，请重试！')
      }
      this.loading = false
    }
  }
}

</script>
<style scoped lang="less">
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
