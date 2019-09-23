<template>
  <div class="alarmComverge-container">
    <div>
      <h2 style="padding-left: 5%;">
        预生成编号:
        <label>{{ this.converge_no }}</label>
      </h2>
    </div>
    <el-table :data="related_datas" border fit highlight-current-row>
      <el-table-column align="center" label="事件ID" min-width="105px">
        <template slot-scope="scope">
          <span>{{ scope.row.alarm_id }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="50px" align="center" label="来源">
        <template slot-scope="scope">
          <span>{{ scope.row.source }}</span>
        </template>
      </el-table-column>
      <el-table-column width="165px" align="center" label="告警时间">
        <template slot-scope="scope">
          <span>{{ scope.row.alarm_time }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="告警内容">
        <template slot-scope="scope">
          <span>{{ scope.row.alarm_content }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="70px" label="告警级别">
        <template slot-scope="scope">
          <el-tag :type="scope.row.alarm_level | levelFilter">{{ scope.row.alarm_level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="处置状态" min-width="70px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="165px" align="center" label="更新时间">
        <template slot-scope="scope">
          <span>{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="alert_option">
      <el-button type="success" @click="to_next">汇聚并开始处置</el-button>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/formatDate'
export default {
  name: 'alarmConverge',
  filters: {
    statusFilter(status) {
      const statusMap = {
        done: 'success',
        doing: 'warn',
        undo: 'danger'
      }
      return statusMap[status]
    },
    levelFilter(level) {
      const levelMap = {
        warning: 'success',
        major: 'warn',
        critical: 'danger'
      }
      return levelMap[level]
    }
  },
  data() {
    return {
      converge_no: 'H' + formatDate(new Date(), 'yyyyMMddhhmmss'),
      related_event: this.$route.query.relatedEvent,
      related_datas: [],
      alarm_datas: [
        {
          alarm_id: '2019091112031101',
          alarm_content: '测试数据',
          alarm_level: 'critical',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'doing',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031102',
          alarm_content: '测试数据',
          alarm_level: 'critical',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'done',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031103',
          alarm_content: '测试数据',
          alarm_level: 'warning',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'undo',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031104',
          alarm_content: '测试数据',
          alarm_level: 'critical',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'done',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031105',
          alarm_content: '测试数据',
          alarm_level: 'critical',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'done',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031106',
          alarm_content: '测试数据',
          alarm_level: 'major',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'doing',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031107',
          alarm_content: '测试数据',
          alarm_level: 'critical',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'undo',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031108',
          alarm_content: '测试数据',
          alarm_level: 'major',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'done',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031109',
          alarm_content: '测试数据',
          alarm_level: 'warning',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'undo',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031110',
          alarm_content: '测试数据',
          alarm_level: 'critical',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'done',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031111',
          alarm_content: '测试数据',
          alarm_level: 'major',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'doing',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031112',
          alarm_content: '测试数据',
          alarm_level: 'critical',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'doing',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031113',
          alarm_content: '测试数据',
          alarm_level: 'critical',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'done',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031114',
          alarm_content: '测试数据',
          alarm_level: 'critical',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'undo',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031115',
          alarm_content: '测试数据',
          alarm_level: 'critical',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'undo',
          update_time: '2019-08-23 10:11:12'
        },
        {
          alarm_id: '2019091112031116',
          alarm_content: '测试数据',
          alarm_level: 'critical',
          alarm_time: '2019-08-23 09:20:31',
          pageViews: 4592,
          source: 'grafana',
          status: 'done',
          update_time: '2019-08-23 10:11:12'
        }
      ]
    }
  },
  mounted() {
    this.getRelated()
  },
  methods: {
    getRelated() {
      this.related_datas = this.alarm_datas.filter(
        data => this.related_event.indexOf(data.alarm_id) > -1
      )
    },
    to_next: function() {
      const val = 1
      this.$emit('getChildEvent', val)
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-left: 5%;
  width: 90%;
}
.alert_option {
  padding-left: 5%;
  padding-top: 10px;
}
</style>