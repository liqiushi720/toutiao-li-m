/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
// import store from '@/store'
/**
  * 用户登录
  */
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
export const getUserInfo = () => request({
  url: '/v1_0/user'
  // headers: { Authorization: `Bearer ${store.state.token.token}` }
})
// 获取用户的频道
export const getUserPinDao = () => request({
  url: '/v1_0/user/channels'
})
