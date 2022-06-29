<template>
  <van-list
    :immediate-check='false'
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <!--    <van-cell v-for="(item,index) in list" :key="index" :title="item.content"></van-cell>-->
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      :index="index"/>
  </van-list>
</template>
<script>

import { getComments } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  created () {
    this.loading = true
    this.onLoad()
  },
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    totalCount: {
      type: [Number, String]
    },
    type: {
      type: String,
      default: 'a',
      validator (value) {
        return ['a', 'c'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },

  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getComments({
          type: this.type, //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id,【可能有大数字，所以执行一下toString 方法】
          offset: this.offset, // 评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })

        // 2. 将数据添加到列表中(一定要注意是追加数据，否则列表高度不增加，形成死循环)
        const {
          results,
          total_count: totalCount
        } = data.data
        if (this.totalCount !== undefined) {
          this.$emit('update:totalCount', totalCount)
        }

        this.$parent.list.push(...results)

        // 3. 将 loading 设置为 false
        this.loading = false

        // 4. 判断是否还有数据
        if (results.length) {
          // 有就更新获取下一页的数据页码
          this.offset = data.data.last_id
        } else {
          // 没有就将 finished 设置结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }

}
</script>
