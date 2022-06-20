import request from '@/utils/request'

export const getAllChannels = () => request({
  url: '/v1_0/channels'
})
