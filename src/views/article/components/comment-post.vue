<template>
  <div class="comment-post">
    <van-field
      v-model.trim="message"
      autosize
      class="post-field"
      maxlength="50"
      placeholder="请输入留言"
      rows="2"
      show-word-limit
      type="textarea"
    />
    <van-button
      :disabled="!message.length"
      class="post-btn"
      @click="onPost"
    >发布
    </van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'

export default {

  props: {
    // 目标id，接收文章id或者评论id
    target: {
      type: [Number, String, Object],
      required: true
    },
    art_id: {
      type: [Number, String],
      default: null

    },
    comment: {
      type: Object
    }
  },
  name: 'CommentPost',
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      })

      try {
        const { data } = await addComment({
          target: this.target.toString(), // 评论目标id（评论文章即文章id，对评论进行回复则为评论id） 防止有大数字最好也执行一下toString方法！
          content: this.message, // 评论内容
          art_id: this.art_id // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        console.log(data)
        this.$toast.success('发布成功')
        this.$parent.$parent.list.unshift(data.data.new_obj)
        this.$parent.$parent.isPostShow = false
        if (this.comment !== undefined) {
          this.$parent.$parent.$parent.$parent.comment.reply_count++
        }
        // 关闭弹出层
        // 将发布内容显示到列表顶部
        // 清空文本框
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;

  .post-field {
    background-color: #f5f7f9;
  }

  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;

    &::before {
      display: none;
    }
  }
}
</style>
