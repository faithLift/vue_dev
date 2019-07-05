<template>
  <div class="container">
    <el-row class="chart-container">
      <el-col :span="12" class="chart-trend">
        <ve-line
          :data="lineChart"
          :settings="chartSettings"
          :extend="chartExtend"
          :events="lineChartEvent"
        />
      </el-col>
      <el-col :span="12" class="chart-pie">
        <vepie
          :data="deployPie"
          :settings="pieSettings"
          :extend="pieExtend"
          :events="pieChartEvent"
        />
      </el-col>
    </el-row>

    <el-row class="table-container">
      <h2>详细列表：</h2>
      <el-table
        v-loading="listLoading"
        :data="deployList"
        element-loading-text="loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column label="子系统英文名">
          <template slot-scope="scope">{{ scope.row.sys_name }}</template>
        </el-table-column>
        <el-table-column label="子系统中文名">
          <template slot-scope="scope">{{ scope.row.sys_name_zh }}</template>
        </el-table-column>
        <el-table-column label="实施人" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.deployer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="计划时间">
          <template slot-scope="scope">{{ scope.row.plan_time }}</template>
        </el-table-column>
        <el-table-column label="开始时间">
          <template slot-scope="scope">{{ scope.row.start_time }}</template>
        </el-table-column>
        <el-table-column label="结束时间">
          <template slot-scope="scope">{{ scope.row.end_time }}</template>
        </el-table-column>
        <el-table-column label="状态" class-name="status-col" width="110" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-pagination
      :total="total"
      :current-page="listPage.page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="listPage.limit"
      layout="total, sizes, prev, pager, next, jumper"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog :visible.sync="dialogTableVisible" title="占比详情" width="90%" @close="closeDialog">
      <el-row class="table-container">
        <el-table
          v-loading="dialogLoading"
          :data="dialogList"
          element-loading-text="Loading"
          :header-cell-stype="headerStyle"
          strip
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="序号" min-width="30%">
            <template slot-scope="scope">{{ scope.$index }}</template>
          </el-table-column>
          <el-table-column label="子系统英文名" min-width="70%">
            <template slot-scope="scope">{{ scope.row.sys_name }}</template>
          </el-table-column>
          <el-table-column label="子系统中文名" min-width="100%">
            <template slot-scope="scope">{{ scope.row.sys_name_zh }}</template>
          </el-table-column>
          <el-table-column label="实施人" min-width="100%" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.deployer }}</span>
            </template>
          </el-table-column>
          <el-table-column label="部署进程">
            <template slot-scope="scope">{{ scope.row.request_process }}</template>
          </el-table-column>
          <el-table-column label="开始时间">
            <template slot-scope="scope">{{ scope.row.start_time }}</template>
          </el-table-column>
          <el-table-column label="结束时间">
            <template slot-scope="scope">{{ scope.row.end_time }}</template>
          </el-table-column>
          <el-table-column class-name="status-col" label="状态" min-width="60%" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-pagination
        :total="dialogTotal"
        :current-page="dialogPage.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="dialogPage.limit"
        layout="total, sizes, prev, pager, next, jumper"
        background
        @size-change="dialogHandleSizeChange"
        @current-change="dialogHandleCurrentChange"
      />
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import vepie from "v-charts/lib/pie.common";
import VeLine from "v-charts/lib/line.common";
import histogram from "v-charts/lib/histogram.common";
import "echarts/lib/component/title";

const BASE_API = "/"; //"http://127.0.0.1:6001/";

export default {
  components: { vepie, histogram, VeLine },
  filters: {
    statusFilter(status) {
      const statusMap = {
        部署成功: "success",
        部署中: "warning",
        部署失败: "danger",
        未开始: "info"
      };
      return statusMap[status];
    }
  },
  data() {
    var self = this;
    this.pieChartEvent = {
      click: function(e) {
        console.log(e["name"]);
        const params = {
          status: e["name"]
        };

        self.dialogPage.filter = params;
        self.getDetailChart();
        self.dialogTableVisible = true;
        self.dialogLoading = true;
      }
    };
    this.lineChartEvent = {
      click: function(e) {
        console.log(e["name"]);
        const params = {
          start_time: e["name"]
        };
        self.getDetailChart(params);
        //self.$refs.detailRef.show();
      }
    };
    return {
      deployList: null,
      deployPie: null,
      dialogTableVisible: false,
      dialogLoading: false,
      dialogTotal: 0,
      lineChart: null,
      listLoading: true,
      detailChart: null,
      dialogList: null,
      total: 0,
      //BASE_API: this.GLOBAL.util.BASE + '/modifybackend/',
      listPage: {
        page: 1,
        limit: 10,
        filter: null
      },
      dialogPage: {
        page: 1,
        limit: 10,
        filter: null
      },
      //detailFields: [
      //  { key: "id", sortable: true },
      //  { key: "sys_name", sortable: true },
      //  { key: "sys_name_zh", sortable: true },
      //  { key: "deployer", sortable: true },
      //  { key: "plan_time", sortable: true },
      //  { key: "start_time", sortable: true },
      //  { key: "end_time", sortable: true },
      //  { key: "status", sortable: true }
      //],
      pieExtend: {
        "title.text": "UCD部署状态占比",
        "title.x": "center",
        "legend.orient": "vertical",
        "legend.right": "15"
      },
      pieSettings: {
        label: {
          formatter: "{b}\n{d}%, 数量:{c}"
        }
      },
      chartExtend: {
        "title.text": "本周投产计划-按天分布",
        "title.x": "center",
        "legend.orient": "vertical",
        "legend.right": "15",
        series: {
          type: "line",
          label: {
            show: true,
            position: "top"
          }
        }
      },
      chartSettings: {
        labelMap: {
          count: "数量"
        }
      }
    };
  },
  created() {
    this.getList();
    this.getPie();
    this.getChart();
  },
  methods: {
    getList(filter = null) {
      this.listLoading = true;
      axios.get(BASE_API + "deploy/getUcdDeployList").then(response => {
        console.log(response.data);
        this.deployList = response.data.items; //JSON.parse(response.data);
        this.listLoading = false;
      });
    },

    getPie() {
      axios.get(BASE_API + "deploy/getUcdDeployPie").then(response => {
        console.log(response.data);
        console.log(response.data.name[0]);
        console.log(response.data.cnt);
        this.deployPie = {
          columns: response.data.name[0],
          rows: response.data.cnt
        };
      });
    },

    getChart() {
      axios.get(BASE_API + "deploy/getUcdDeployChart").then(response => {
        console.log("Line: ");
        console.log(response.data.name[0]);
        console.log(response.data.cnt);
        this.lineChart = {
          columns: response.data.name[0],
          rows: response.data.cnt
        };
      });
    },

    getDetailChart(params) {
      axios.get(BASE_API + "deploy/getUcdDeployList", params).then(response => {
        this.deployList = JSON.parse(response.data);
      });
    },
    handleSizeChange(val) {
      this.listPage.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.dialogPage.page = val;
      this.getList();
    },
    dialogHandleSizeChange(val) {
      this.dialogPage.limit = val;
      this.getDetailChart();
    },
    dialogHandleCurrentChange(val) {
      this.dialogPage.page = val;
      this.getDetailChart();
    },
    closeDialog() {
      this.dialogPage.page = 1;
      this.dialogPage.limit = 10;
    },
    headerStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: darkray; color: black;";
      }
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 98%;
}
</style>
