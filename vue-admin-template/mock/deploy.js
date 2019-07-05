import Mock from 'mockjs'

export default {
  pie: () => {
    const data = Mock.mock({
      'name': [{
        0: 'legend',
        1: 'count'
      }],
      'cnt|3': [{
        count: '@integer(1,1000)',
        'legend|1': ['进行中', '部署失败', '部署成功']
      }]
    })
    return data
  },
  chart: () => {
    /* const chart_data = Mock.mock({
      'name': [{
        0: 'legend',
        1: 'count'
      }],
      'cnt|7': [{
        legend: '@date',
        count: '@integer(10,2000)'
      }]
    }) */
    const data = Mock.mock({
      'name': ['count', 'legend'],
      'cnt|7': {
        legend: '@string("number", 4)',
        count: '@integer(10,2000)'
      }
    })
    return data
  },
  list: () => {
    const items = Mock.mock({
      'items|20': [{
        create_time: '@datetime',
        deploy_type: 'UCD',
        deployer: '@string("upper", 6)',
        end_time: '@datetime',
        'id|+1': 1,
        plan_time: '@datetime',
        remarks: 'Test',
        request_env: 'FAT1',
        request_id: '@string("upper", 36)',
        request_process: 'install_all',
        request_version: '1.1.1.1',
        start_time: '@datetime',
        'status|1': ['进行中', '部署失败', '部署成功'],
        sys_name: 'Test_system',
        sys_name_zh: '测试数据系统',
        update_time: '@datetime'
      }]
    })
    return items
  }
}
