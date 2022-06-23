<template>
  <div className="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$parent.searchHistories=[]">全部删除</span>
        &nbsp; &nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow=true"/>
    </van-cell>
    <van-cell @click="onSearchItemClick(item,index)" :title="item" v-for="(item, index) in searchHistories"
              :key="index">
      <van-icon v-show="isDeleteShow" name="close"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        // 删除状态
        this.$parent.searchHistories.splice(index, 1)
      } else {
        this.$parent.onSearch(item)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
