<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      :src="comment.aut_photo"
      class="avatar"
      fit="cover"
      round
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        :class="{ liked:comment.is_liking  }"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        :loading="commentLoading"
        class="like-btn"
        @click="onCommentLike"
      >{{ comment.like_count || '赞' }}
      </van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ comment.pubdate | relativeTime }}</span>
        <van-button
          class="reply-btn"
          round
          @click="reply"
        >回复 {{ comment.reply_count }}
        </van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>

import { addCommentLike, deleteCommentLike } from '@/api/comment'

export default {
  data () {
    return {
      commentLoading: false // 是否点赞中
    }
  },
  name: 'CommentItem',
  props: {
    // 每行的评论信息
    comment: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    }
  },
  methods: {
    reply () {
      this.$parent.$parent.$parent.comment = this.comment
      this.$parent.$parent.$parent.isReplyShow = true
    },
    // 点赞或取消点赞事件
    async onCommentLike () {
      // loading 开启
      this.commentLoading = true
      try {
        // 如果已经赞了则取消点赞
        if (this.comment.is_liking) {
          await deleteCommentLike(this.comment.com_id)

          this.$parent.$parent.list[this.index].like_count--
        } else {
          // 如果没有赞，则点赞
          await addCommentLike(this.comment.com_id)
          this.$parent.$parent.list[this.index].like_count++
        }
        // 更新视图状态
        this.$parent.$parent.list[this.index].is_liking = !this.$parent.$parent.list[this.index].is_liking
        this.$toast('操作成功')
      } catch (e) {
        console.log(e)
        this.$toast('操作失败，请重试')
      }
      // loading 关闭
      this.commentLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }

  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }

  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }

  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }

  .bottom-info {
    display: flex;
    align-items: center;
  }

  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }

  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;

    .van-icon {
      font-size: 30px;
    }
  }

  .liked {

    .van-button__icon {
      color: orange;
    }
  }
}
</style>
