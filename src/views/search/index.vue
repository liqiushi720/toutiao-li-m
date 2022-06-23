<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
     -->
    <form class="search-form" action="/">
      <van-search
        v-model.trim="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"

      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="show===2" :searchText="searchText"/>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion v-if="show===1" :suggestions="suggestions" @search="onSearch"/>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-if="show===0 " :searchHistories="searchHistories"/>
    <!-- /搜索历史记录 -->

  </div>
</template>
<script>
import SearchResult from './components/search-result'
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import { getSearchSuggestions } from '@/api/search'
import { getItems, setItems } from '@/utils/storage'

export default {
  name: 'SearchPage',
  components: {
    SearchResult,
    SearchHistory,
    SearchSuggestion
  },
  props: {},
  data () {
    return {
      searchText: '', // 绑定输入框变量
      show: 0,
      suggestions: [], // 联想建议数据列表
      timer: null,
      // searchHistories: []
      searchHistories: getItems('serach-histories') || []
    }
  },
  computed: {},
  watch: {

    searchText (val) {
      if (this.show === 2) return
      if (val) {
        this.show = 1
      } else {
        this.show = 0
      }
      if (val) {
        this.loadSearchSuggestions(val)
      }
    },
    searchHistories (val) {
      setItems('serach-histories', val)
    }
  },
  created () {
  },
  methods: {
    onSearch (val) {
      if (this.searchText) {
        // 数组去重
        this.searchHistories.unshift(val)
        const set = new Set(this.searchHistories)
        this.searchHistories = [...set]

        this.searchText = val
        if (this.searchText) {
          this.show = 2
        }
      }
    },
    onCancel () {
      this.$router.back()
    },
    onFocus () {
      if (this.searchText) {
        this.show = 1
      }
      if (this.searchText) {
        this.loadSearchSuggestions(this.searchText)
      }
    },
    loadSearchSuggestions (q) {
      // 清除定时器
      clearTimeout(this.timer)
      // 设置定时器
      this.timer = setTimeout(async () => {
        try {
          const { data } = await getSearchSuggestions(q)
          if (data.data.options[0] == null) {
            this.suggestions = []
            return
          }
          this.suggestions = data.data.options
        } catch (e) {
          this.$toast('请求失败')
        }
      }, 200)
    }
  }
}
</script>
<style scoped lang="less">
.search-container {
  padding-top: 108px;

  .van-search__action {
    color: #fff;
  }

  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
