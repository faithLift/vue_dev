<template>
    <div class="content-container">
        <div>
            <div class="alarm-option">
                <el-col :span="2"><button type="primary" @click="showSelect" >选择事件</button></el-col>
                <el-col :span="2"><button type="success" @click="alarmFlow" :disabled="!isShow">汇聚事件</button></el-col>
            </div>
            <div class="alarm-table">
                <el-table :data="datas" border fit highlight-current-row>
                    <el-table-column v-if="isShow" align="center" lael="选择" min-width="35px" :key="key">
                        <template slot-scope="scope">
                            <input type="checkbox" :value="scope.row.alarm_id" v-model="checkedNames" />
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="事件ID" min-width="85px">
                        <template slot-scope="scope">
                            <span>{{ scope.row.alarm_id }} </span>
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
                            <el-tag :type="scop.row.alarm_level | levelFilter">{{ scope.row.alarm_level }}</el-tag>
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
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "alarmF",
    filters: {
        statusFilter(status) {
            const statusMap = {
                done: "success",
                doing: "warn",
                undo: "danger"
            }
            return statusMap[status]
        },
        levelFilter(level) {
            const levelMap = {
                warning: "success",
                major: "warn",
                critical: "danger"
            }
            return levelMap[level]
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
            datas: [],
            key: 1,
            checkedNames: [],
            isShow: false,
        }
    },
    created() {
        try {
            this.getList()
        } catch (e) {
            console.error("Errors: ", e)
        }
    },
    methods: {
        getList() {
            try {
                this.datas = [
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
                ],
                this.datas.sort(function(m, n, p='alarm_id') {
                    var a = m[p]
                    var b = n[p]
                    return a - b
                })
            } catch (e) {
                console.error("Errors: ", e)
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
                case 'nidware':
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
            console.log(varArr)
            this.datas[alarm_level] = this.datas[alarm_level].filter(item => {
                if(alarm_level && item.alarm_level !== alarm) return false
                return true
            })
            this.key += 1
        },
        showSelect() {
            if(this.isShow) {
                this.isShow = false
            } else {
                this.isShow = true
            }
        },
        alarmFlow() {
            this.$router.push({
                name: "AlarmFlow",
                query: {
                    relatedEvent: this.checkedNames
                }
            })
            console.log(this.checkedNames)
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.box {
    width: 100%;
    margin-left: 2.5%;
    margin-top: 30px;
    padding: 1.5%;
    border: 1.2px solid #888;
}
.alarm-option {
    padding-left: 20px;
    height: 35px;
}

.alarm-table {
    padding: 1%;
}

.filter-container {
    padding-top: 2%;
}

</style>