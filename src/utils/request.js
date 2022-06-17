import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { token } = store.state
  if (token && token.token) {
    config.headers.Authorization = `Bearer ${store.state.token.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  console.log(error)
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  // console.log(error)
  if (error.response.status === 401) {
    // 如果401就捕获 重新发送请求

    const { data } = await axios({
      url: 'http://toutiao.itheima.net/v1_0/authorizations',
      method: 'PUT',
      headers: { Authorization: `Bearer ${store.state.token.refresh_token}` }
    })
    store.commit('setItem', { ...store.state.token, token: data.data.token })
    return request(error.config)
  }
  return Promise.reject(error)
})
export default request
