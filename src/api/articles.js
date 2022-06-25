import request from '@/utils/request'

export const getArticles = params => request({
  url: '/v1_0/articles',
  params
})
/**
 * 根据 id 获取指定文章
 */
export const getArticleById = articleId => request({
  url: `/v1_0/articles/${articleId}`
})
