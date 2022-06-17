<template>
  <!-- 只能有一个div根标签 -->
  <div class="article-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'articleIndex',
  data () {
    return {
      list: [],
      loading: false,
      finished: false
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
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}

</script>

<style scoped>
</style>
