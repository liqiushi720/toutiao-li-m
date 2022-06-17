<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'"
    >
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('update:isReplyShow')"
      />
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="comment"/>
      <!-- /当前评论项 -->

      <!-- 评论的回复列表 -->
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        round
        size="small"
      >写评论
      </van-button>
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'

export default {
  name: 'CommentReply',
  components: {
    CommentItem
  },
  props: {

    comment: {
      type: Object,
      required: true
    },
    isReplyShow: {
      type: Boolean
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>

</style>
