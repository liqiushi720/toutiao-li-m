<template>
  <van-button :class="{collected:value}" :icon="value? 'star':'star-o'"></van-button>
</template>
<script>
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false

    }
  },
  data () {
    return {}
  },
  methods: {},
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
