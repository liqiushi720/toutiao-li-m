<template>
  <van-button @click="onCollect" :class="{collected:value}" :icon="value? 'star':'star-o'"></van-button>
</template>
<script>
import { addCollect, deleteCollect } from '@/api/articles'

export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false

    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏，要取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 没有收藏，要添加收藏
          await addCollect(this.articleId)
        }
        // 更新视图
        // 自定义事件修改数据并不是立即的
        this.$emit('input', !this.value)
        this.$nextTick(() => {
          this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
        })
      } catch (err) {
        this.$toast.fail('操作失败，请重试！')
      }
      this.loading = false
    }
  },
  created () {
  }
}
</script>
<style scoped lang="less">
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
