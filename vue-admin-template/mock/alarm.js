import Mock from 'mockjs'
import { param2Obj } from './utils'

const List = {}
/* const List_biz = []
const List_app = []
const List_related = []
const List_midware = [] */
const count = 100

const baseContent = '我是测试数据我是测试数据'

for (let i = 0; i < count; i++) {
  List['biz'] = []
  List['app'] = []
  List['related'] = []
  List['midware'] = []
  List['biz'].push(Mock.mock({
    id: '@increment',
    'source|1': ['detector', 'F16'],
    alarmtime: '@datetime',
    alarm_content: baseContent,
    'alarm_level|1': ['warning', 'major', 'critical'],
    'status|1': ['undo', 'doing', 'done'],
    update_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }))
  List['app'].push(Mock.mock({
    id: '@increment',
    'source|1': ['F16', 'cat', 'zabbix'],
    alarmtime: '@datetime',
    alarm_content: baseContent,
    'alarm_level|1': ['warning', 'major', 'critical'],
    'status|1': ['undo', 'doing', 'done'],
    update_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }))
  List['related'].push(Mock.mock({
    id: '@increment',
    'source|1': ['detector', 'F16', 'easydb'],
    alarmtime: '@datetime',
    alarm_content: baseContent,
    'alarm_level|1': ['warning', 'major', 'critical'],
    'status|1': ['undo', 'doing', 'done'],
    update_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }))
  List['midware'].push(Mock.mock({
    id: '@increment',
    'source|1': ['grafana'],
    alarmtime: '@datetime',
    alarm_content: baseContent,
    'alarm_level|1': ['warning', 'major', 'critical'],
    'status|1': ['undo', 'doing', 'done'],
    update_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }))
}

export default {
  getList: config => {
    // const { status, type, source, page = 1, limit = 20, sort } = param2Obj(config.url)
    const { biz, source, page = 1, limit = 20, sort } = param2Obj(config.url)
    const mockList = {}

    // console.log('type, page, sort', source, page, sort)
    mockList[biz] = List[biz].filter(item => {
      // console.log('Item: ', item.source)
      if (source && item.source !== source) return false
      return true
    })
    /* let mockList_app = List_app.filter(item => {
      // console.log('Item: ', item.source)
      if (source && item.source !== source) return false
      return true
    })
    let mockList_related = List_related.filter(item => {
      // console.log('Item: ', item.source)
      if (source && item.source !== source) return false
      return true
    })
    let mockList_midware = List_midware.filter(item => {
      // console.log('Item: ', item.source)
      if (source && item.source !== source) return false
      return true
    }) */
    // console.log('MockList', mockList)

    if (sort === '-id') {
      mockList[biz] = mockList[biz].reverse()
    }
    /* if (sort === '-id') {
      mockList_app = mockList_app.reverse()
    }
    if (sort === '-id') {
      mockList_related = mockList_related.reverse()
    }
    if (sort === '-id') {
      mockList_midware = mockList_midware.reverse()
    } */
    const pageList = {}
    pageList[biz] = mockList[biz].filter((item, index) => index < limit * page && index >= limit * (page - 1))
    /* const pageList_app = mockList_app.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    const pageList_related = mockList_related.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    const pageList_midware = mockList_midware.filter((item, index) => index < limit * page && index >= limit * (page - 1)) */

    return {
      code: 20000,
      data: {
        total: mockList[biz].length,
        items: pageList[biz]
      }
    }
  }
}
