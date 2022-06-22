<template>
  <div class="search-suggestion">
    <van-cell v-for="(text,index)  in suggestions" :key="index" :title="text" icon="search">
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
  methods: {}
}
</script>

<style scoped lang="less"></style>
