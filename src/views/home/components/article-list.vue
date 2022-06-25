<template>
  <!-- 只能有一个div根标签 -->
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" :success-text="istext" @refresh="onRefresh">
      <van-list
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
        <!-- <article-item ></article-item> -->
        <ArticleItem v-for="(articel,index) in list" :key="index" :article="articel"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/articles'
import ArticleItem from '@/components/article-item/index.vue'

export default {
  name: 'articleIndex',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now(),
      error: false,
      isLoading: false,
      istext: ''
    }
  },
  created () {
  },
  mounted () {
  },
  components: { ArticleItem },
  props: {
    channels: {
      require: true,
      type: Object
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channels.id,
          timestamp: this.timestamp,
          with_top: 1
        })
        // console.log(data)
        this.timestamp = data.data.pre_timestamp
        this.loading = false
        // this.list = [...this.list, ...data.data.results]
        this.list.push(...data.data.results)
        if (this.timestamp === null) {
          this.finished = true
        }
        // console.log(data)
      } catch (error) {
        this.error = true
        this.loading = false// 当onload事件发生的时候 会自动将loading转换为true此时需要将其自动转换为false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channels.id,
          timestamp: +new Date(),
          with_top: 1
        })

        const { results } = data.data
        this.isLoading = false
        this.list = results
        this.istext = `刷新成功,刷新了${results.length}次`
      } catch (error) {
        this.isLoading = false

        this.istext = '刷新失败'
      }
    }
  }
}
</script>

<style scoped lang='less'>
.article-list {
  height: calc(100vh - 274px);
  overflow-y: auto;
}
</style>
