<template>
  <div class="search-suggestion">
    <van-cell v-for="(text,index)  in suggestions" :key="index" icon="search" @click="$emit('search',text)">
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    suggestions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    highlight (text) {
      const hightStr = `<span style="color: red">${this.$parent.searchText}</span>`
      const reg = new RegExp(this.$parent.searchText, 'gi')
      return text.replace(reg, hightStr)
    }
  }
}
</script>

<style scoped lang="less"></style>
