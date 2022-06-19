<template>
  <!-- 只能有一个div根标签 -->
  <div class="article-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/articles'

export default {
  name: 'articleIndex',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now()
    }
  },
  created () { },
  mounted () { },
  components: {},
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
        console.log(data)
        this.timestamp = data.data.pre_timestamp
        this.loading = false
        // this.list = [...this.list, ...data.data.results]
        this.list.push(...data.data.results)
        if (this.timestamp === null) { this.finished = true }
        console.log(data)
      } catch (error) {
        this.$toast.fail('获取频道失败')
      }
    }
  }
}

</script>

<style scoped>
</style>
