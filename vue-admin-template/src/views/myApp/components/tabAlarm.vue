<template>
  <div class="content-container">
    <div v-for="(item, index) in list" :key="index">
      <div class="box">
        <div class="alarm_title">
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :lg="4">
              <h2 style="color: darkorange;">{{ getLabel(item) }}</h2>
            </el-col>
            <el-col  :xs="24" :sm="24" :lg="18">
              <div class="filter-container">
                <el-checkbox-group v-model="checkBiz">
                  <el-checkbox label="critical">critical</el-checkbox>
                  <el-checkbox label="major">major</el-checkbox>
                  <el-checkbox label="warning">warning</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="alarm_table">
          <el-table :data="datas[item]" border fit highlight-current-row style="width: 96%">
            <el-table-column
              align="center"
              label="ID"
              width="65"
              :key="key"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="50px" label="来源">
              <template slot-scope="scope">
                <span>{{ scope.row.source }}</span>
              </template>
            </el-table-column>

            <el-table-column width="130px" align="center" label="告警时间">
              <template slot-scope="scope">
                <span>{{ scope.row.alarmtime }}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="300px" label="告警内容">
              <template slot-scope="scope">
                <span>{{ scope.row.alarm_content }}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="70px" label="告警级别">
              <template slot-scope="scope">
                <el-tag :type="scope.row.alarm_level | typeFilter">{{ scope.row.alarm_level }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="处置状态" min-width="70px">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column width="130px" align="center" label="更新时间">
              <template slot-scope="scope">
                <span>{{ scope.row.update_time }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>  
      </div>
    </div>
  </div>
  
</template>

<script>
import { fetchList } from "@/api/alarm";
/* const defaultAlarmLevel = ['critical', 'major', 'warning'] */

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        done: "success",
        doing: "warn",
        undo: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      const typeMap = {
        warning: "success",
        major: "warn",
        critical: "danger"
      };
      return typeMap[type];
    }
  },
  props: {
    type: {
      type: String,
      default: "warning"
    },
    source: {
      type: String,
      default: "detector"
    }
  },
  data() {
    return {
      list: ['biz', 'app', 'related', 'midware', 'os'],
      datas: {},
      listQuery: {
        page: 1,
        limit: 5,
        // source: this.source,
        sort: "+id"
      },
      key: 1,
    };
  },
  created() {
    try {
      var len = this.list.length
      for(var i = 0; i < len; i++){
        console.log('getList', this.list[i])
        this.getList(this.list[i]);
      }
    } catch (e) {
      console.error('Error: ', e)
    }
  },
  methods: {
    getList(biz) {
      this.loading = true;
      //this.$emit("create"); // for test
      this.listQuery.biz = biz
      try {
        fetchList(this.listQuery).then(response => {
          console.log('Response', response.data.items)
          // console.log('List: ', this.list);
          this.datas[biz]  = response.data.items;
          console.log(this.datas)
          this.loading = false;
          // return response.data.items;
        });
        /* var res = {}
        switch(biz) {
          case 'biz':
            res = [
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"critical",
                alarmtime:"2006-10-23 07:36:54",
                id:1,
                pageviews:4592,
                source:"grafana",
                status:"doing",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"warning",
                alarmtime:"2006-10-23 07:36:54",
                id:3,
                pageviews:4592,
                source:"detector",
                status:"done",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"critical",
                alarmtime:"2006-10-23 07:36:54",
                id:4,
                pageviews:4592,
                source:"F16",
                status:"undo",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"critical",
                alarmtime:"2006-10-23 07:36:54",
                id:8,
                pageviews:4592,
                source:"detector",
                status:"done",
                update_time:"2010-01-16 03:03:46"
              },
            ]
            break
          case 'app':
            res = [
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"critical",
                alarmtime:"2006-10-23 07:36:54",
                id:2,
                pageviews:4592,
                source:"grafana",
                status:"doing",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"warning",
                alarmtime:"2006-10-23 07:36:54",
                id:10,
                pageviews:4592,
                source:"detector",
                status:"done",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"major",
                alarmtime:"2006-10-23 07:36:54",
                id:12,
                pageviews:4592,
                source:"F16",
                status:"undo",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"critical",
                alarmtime:"2006-10-23 07:36:54",
                id:23,
                pageviews:4592,
                source:"detector",
                status:"done",
                update_time:"2010-01-16 03:03:46"
              },
            ]
            break
          case 'related':
            res = [
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"critical",
                alarmtime:"2006-10-23 07:36:54",
                id:11,
                pageviews:4592,
                source:"grafana",
                status:"doing",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"warning",
                alarmtime:"2006-10-23 07:36:54",
                id:16,
                pageviews:4592,
                source:"detector",
                status:"done",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"critical",
                alarmtime:"2006-10-23 07:36:54",
                id:23,
                pageviews:4592,
                source:"F16",
                status:"undo",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"critical",
                alarmtime:"2006-10-23 07:36:54",
                id:14,
                pageviews:4592,
                source:"detector",
                status:"done",
                update_time:"2010-01-16 03:03:46"
              },
            ]
            break
          case 'midware':
            res = [
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"critical",
                alarmtime:"2006-10-23 07:36:54",
                id:17,
                pageviews:4592,
                source:"grafana",
                status:"doing",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"warning",
                alarmtime:"2006-10-23 07:36:54",
                id:19,
                pageviews:4592,
                source:"detector",
                status:"done",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"major",
                alarmtime:"2006-10-23 07:36:54",
                id:9,
                pageviews:4592,
                source:"F16",
                status:"undo",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"critical",
                alarmtime:"2006-10-23 07:36:54",
                id:18,
                pageviews:4592,
                source:"detector",
                status:"done",
                update_time:"2010-01-16 03:03:46"
              },
            ]
            break
          case 'os':
            res = [
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"critical",
                alarmtime:"2006-10-23 07:36:54",
                id:17,
                pageviews:4592,
                source:"F16",
                status:"doing",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"warning",
                alarmtime:"2006-10-23 07:36:54",
                id:19,
                pageviews:4592,
                source:"detector",
                status:"done",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"major",
                alarmtime:"2006-10-23 07:36:54",
                id:9,
                pageviews:4592,
                source:"F16",
                status:"undo",
                update_time:"2010-01-16 03:03:46"
              },
              {
                alarm_content:"我是测试数据我是测试数据",
                alarm_level:"critical",
                alarmtime:"2006-10-23 07:36:54",
                id:18,
                pageviews:4592,
                source:"detector",
                status:"done",
                update_time:"2010-01-16 03:03:46"
              },
            ]
            break
          default:
            res = res
        }
        this.datas[biz] = res */
      } catch (e) {
        console.error('Error: ', e)
      }
      
    },
    getLabel(label) {
      switch(label) {
        case 'biz':
          label = '业务层'
          break
        case 'app':
          label = '应用层'
          break
        case 'related':
          label = '关联组件层'
          break
        case 'midware':
          label = '技术组件和中间层'
          break
        case 'os':
          label = '系统层'
          break
        default:
          label = label
      }
      return label
    },
    checkBiz(valArr) {
/*       console.log(valArr)
      this.datas[alarm_level] = this.datas[alarm_level].filter(item => {
        if(alarm_level && item.alarm_level !== alarm) return false
        return true
      })
      this.key += 1 */
    }
  }
};
</script>

<stype rel="stylesheet/scss" lang="scss" scoped>

.box {
  width: 95%;
  margin-left: 2.5%;
  margin-top: 30px;
  padding: 1.5%;
  border: 1.2px solid #888;
}

.alarm_table {
  padding: 2%;
}

.filter-container {
  padding-top: 2%;
}

</stype>