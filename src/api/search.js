import request from '@/utils/request'

export const getSearchSuggestions = q => request({
  url: '/v1_0/suggestion',
  params: {
    q
  }
})
export const getSearchResult = params => request({
  url: '/v1_0/search',
  params
})
