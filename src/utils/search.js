import request from '@/utils/request'

export const getSearchSuggestions = q => request({
  url: '/v1_0/suggestion',
  params: {
    q
  }
})
