<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="show===0" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中
        </van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="show===1" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate|ass }}</div>
          <follow-user class="follow-btn" :user-id="article.aut_id" v-model="article.is_followed"/>
          <!--          <van-button-->
          <!--            v-if="article.is_followed"-->
          <!--            class="follow-btn"-->
          <!--            round-->
          <!--            size="small"-->
          <!--            @click="onFollow"-->
          <!--            :loading="followLoading"-->
          <!--            loading-text="加载中..."-->
          <!--          >已关注-->
          <!--          </van-button>-->
          <!--          <van-button-->
          <!--            :loading="followLoading"-->
          <!--            loading-text="加载中..."-->
          <!--            v-else-->
          <!--            class="follow-btn"-->
          <!--            type="info"-->
          <!--            color="#3296fa"-->
          <!--            round-->
          <!--            size="small"-->
          <!--            icon="plus"-->
          <!--            @click="onFollow"-->
          <!--          >关注-->
          <!--          </van-button>-->

        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" ref="article-content" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
          >写评论
          </van-button>
          <van-icon
            name="comment-o"
            info="123"
            color="#777"
          />
          <!--                    <van-icon-->
          <!--                       color="#777"-->
          <!--                      name="star-o"-->
          <!--                    />-->
          <collect-article v-model="article.is_collected" :article-id="article.art_id" color="#777" class="btn-item"/>
          <!--          <van-icon-->
          <!--            color="#777"-->
          <!--            name="good-job-o"-->
          <!--          />-->
          <like-article class="btn-item" v-model="article.attitude" :article-id="article.art_id"/>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="show===2" class="error-wrap">
        <van-icon name="failure"/>
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else-if="show===3" @click="loadArticle" class="error-wrap">
        <van-icon name="failure"/>
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

  </div>
</template>

<script>
import { getArticleById } from '@/api/articles'
import dayjs from '@/utils/dayjs'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'

export default {
  filters: {
    ass (values) {
      return dayjs().to(dayjs(values))
    }
  },
  name: 'ArticleIndex',
  components: {
    LikeArticle,
    CollectArticle,
    FollowUser
  },
  props: {
    // 使用props获取动态路由的数据
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      article: {},
      show: 0,
      followLoading: false // 点击关注是否处于false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {
  },
  methods: {
    // async onFollow () {
    //   this.followLoading = true
    //   try {
    //     if (this.article.is_followed) {
    //       // false 表示关注用户了 点击取消关注
    //       await deleteFollow(this.article.aut_id)
    //     } else {
    //       await addFollow(this.article.aut_id)
    //     }
    //     this.article.is_followed = !this.article.is_followed
    //   } catch (e) {
    //     if (e.response && e.response.status === 400) {
    //       this.$toast('你丫的不能关注自己')
    //     }
    //     this.$toast('请求失败')
    //   }
    //   this.followLoading = false
    // },

    async loadArticle () {
      try {
        this.show = 0
        // 3.1 发送请求
        const { data } = await getArticleById(this.articleId)
        // 3.3 成功赋值
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsankljdnskaljndlkjsa')
        // }
        this.article = data.data
        this.show = 1
        // 必须在此之后 视图更新之后再进行图片的预览
        setTimeout(() => {
          // console.log(this.$refs['article-content']) // 这里有内容
          this.previewImage()
        }, 0)
      } catch (err) {
        // 3.2 失败处理
        // console.log(err)
        if (err.response && err.response.status === 404) {
          this.show = 2
        } else {
          this.show = 3
        }
      }
    },
    previewImage () {
      const images = []

      this.$refs['article-content'].querySelectorAll('img').forEach((item, index) => {
        images.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
            onClose () {
              this.$toast('关闭')
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }

  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;

      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }

      .van-cell__label {
        margin-top: 0;
      }

      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }

      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }

      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;

      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    /deep/ .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }

    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }

    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }

    /deep/ .van-icon {
      font-size: 40px;

      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
