<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit =!isEdit"
      >{{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in myChannels" :key="index" @click="onMyChannelClick(index,channel.id)"

      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit&&fixedChannels.indexOf(channel.id)===-1"

        ></van-icon>
        <span
          class="text"
          slot="text"
          :class="{active:index ===active}"
        >{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in recommentChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>

import { addUserChannel, deleteUserChannel, getAllChannels } from '@/api/channel'
import _ from 'lodash'

import { mapState } from 'vuex'
import { setItems } from '@/utils/storage'

export default {

  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      allChannels: {},
      isEdit: false,
      fixedChannels: [0]
    }
  },
  computed: {
    ...mapState(['token']),
    recommentChannels () {
      return _.differenceBy(this.allChannels, this.myChannels, 'id')
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {
  },
  methods: {
    async onMyChannelClick (index, id) {
      if (this.isEdit) {
        //  1. 第一个功能 : 不让用户删除特定的频道
        if (this.fixedChannels.indexOf(id) !== -1) return
        // 2. 第二个删除
        this.$parent.$parent.channels.splice(index, 1)
        if (index <= this.active) {
          this.$emit('update:active', this.active - 1)
        }
        if (this.token) {
          // 发请求
          try {
            await deleteUserChannel(id)
          } catch (e) {
            this.$toast('删除失败，请稍后重试')
          }
        } else {
          // 存本地
          setItems('TOUTIAO_CHANNELS', this.myChannels)
        }
      } else {
        this.$emit('update:active', index)
        this.$parent.$parent.isChannelEditShow = false
      }
    },
    async onAddChannel (channel) {
      /* this.myChannels.push(channel) */
      this.$emit('addChannel', channel)
      //  ① 判断用户是否登录,通过token的来判断
      if (this.token) {
        // 发请求
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (e) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 存本地
        setItems('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (e) {
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;

      .van-grid-item__text, .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }

      .active {
        color: red;
      }

      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;

        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
