import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置插件
dayjs.extend(relativeTime)
// 全局使用
dayjs.locale('zh-cn')

dayjs().format('YYYY-MM-DD')
export default dayjs
