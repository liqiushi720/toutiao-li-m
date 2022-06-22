import request from '@/utils/request'

export const getAllChannels = () => request({
  url: '/v1_0/channels'
})
export const addUserChannel = channel => request({
  url: '/v1_0/user/channels',
  method: 'PATCH',
  data: {
    channels: [channel]
  }
})

/**
 * 删除用户频道
 */
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
