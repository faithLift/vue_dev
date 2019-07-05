<template>
  <div class="dashboard-container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="wapper">
          <div class="title">
            <div class="title-content">自动化运维</div>
          </div>
          <div class="count">
            <div class="count-icon">
              <svg-icon icon-class="counter" class-name="card-counter-icon"/>
            </div>
            <div class="count-content">
              <div class="content-text">
                <b>访问总数：</b>1024
              </div>
            </div>
          </div>
          <div class="count">
            <div class="count-icon">
              <svg-icon icon-class="success" class-name="card-counter-icon"/>
            </div>
            <div class="count-content">
              <div class="content-text">
                <b>成功数量：</b>1000
              </div>
            </div>
          </div>
          <div class="count">
            <div class="count-icon">
              <svg-icon icon-class="failed" class-name="card-counter-icon"/>
            </div>
            <div class="count-content">
              <b>失败数量：</b>24
            </div>
          </div>
          <div class="line_chart_trend">
            <ve-line
              :data="lineChart"
              :settings="lineSettings"
              :extend="lineExtend"
              :events="lineChartEvent"
            />
          </div>
          <div class="pie_chart">
            <vepie
              :data="pieChart"
              :settings="pieSettings"
              :extend="pieExtend"
              :events="pieChartEvent"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="wapper">
          <div class="title">
            <div class="title-content">配置管理</div>
          </div>
          <div class="count">
            <div class="count-icon">
              <svg-icon icon-class="counter" class-name="card-counter-icon"/>
            </div>
            <div class="count-content">
              <div class="content-text">
                <b>访问总数：</b>2351
              </div>
            </div>
          </div>
          <div class="count">
            <div class="count-icon">
              <svg-icon icon-class="success" class-name="card-counter-icon"/>
            </div>
            <div class="count-content">
              <div class="content-text">
                <b>成功数量：</b>1222
              </div>
            </div>
          </div>
          <div class="count">
            <div class="count-icon">
              <svg-icon icon-class="failed" class-name="card-counter-icon"/>
            </div>
            <div class="count-content">
              <b>失败数量：</b>21
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="wapper">
          <div class="title">
            <div class="title-content">资源申请</div>
          </div>
          <div class="count">
            <div class="count-icon">
              <svg-icon icon-class="counter" class-name="card-counter-icon"/>
            </div>
            <div class="count-content">
              <div class="content-text">
                <b>访问总数：</b>2347
              </div>
            </div>
          </div>
          <div class="count">
            <div class="count-icon">
              <svg-icon icon-class="success" class-name="card-counter-icon"/>
            </div>
            <div class="count-content">
              <div class="content-text">
                <b>成功数量：</b>1522
              </div>
            </div>
          </div>
          <div class="count">
            <div class="count-icon">
              <svg-icon icon-class="failed" class-name="card-counter-icon"/>
            </div>
            <div class="count-content">
              <b>失败数量：</b>825
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import VeLine from "v-charts/lib/line.common";
import vepie from "v-charts/lib/pie.common";

export default {
  components: { vepie, VeLine },
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
      pieChart: {
        columns: ["legend", "count"],
        rows: [
          { legend: "部署成功", count: 300 },
          { legend: "部署失败", count: 29 },
          { legend: "部署中", count: 3 }
        ]
      },
      lineChart: {
        columns: ["date", "PV"],
        rows: [
          { date: "01-01", PV: 1231 },
          { date: "01-02", PV: 1223 },
          { date: "01-03", PV: 2123 },
          { date: "01-04", PV: 4123 },
          { date: "01-05", PV: 3123 },
          { date: "01-06", PV: 7123 }
        ]
      },
      lineExtend: {
        "title.text": "投产周度趋势",
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
      lineSettings: {
        labelMap: {
          PV: "数量"
        }
      },
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
      }
    };
  },
  created() {
    /* this.getChart(); */
    /* this.getPie(); */
  },
  methods: {
    /* getPie() {
      axios.get("/deploy/getUcdDeployPie").then(response => {
        console.log(response.data);
        console.log(response.data.name[0]);
        console.log(response.data.cnt);
        this.pieChart = {
          columns: response.data.name[0],
          rows: response.data.cnt
        };
      });
    } */
    /* getChart() {
      axios.get("/deploy/getUcdDeployChart").then(response => {
        console.log("Line: ");
        console.log(response.data.name[0]);
        console.log(response.data.cnt);
        this.lineChart = {
          columns: response.data.name[0],
          rows: response.data.cnt
        };
      });
    } */
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  padding: 24px;
  background-color: rgb(240, 242, 245);

  .wapper {
    padding: 4px 6px;
    background-color: white;
    width: 100%;
    float: left;
    position: relative;

    .title {
      background-color: rgb(190, 200, 216);
      padding: 4px;
      height: 65px;
      width: 100%;
      margin-top: 3px;
      margin-bottom: 8px;

      .title-content {
        padding-top: 2%;
        text-align: center;
        font-size: 2.8em;
      }
    }

    .count {
      padding: 4px;
      background-color: rgb(240, 242, 245);
      height: 65px;
      width: 100%;
      margin-top: 3px;
      margin-bottom: 3px;

      .count-icon {
        float: left;
        width: 40%;
        padding: 0 30px;
      }
      .count-content {
        float: right;
        width: 60%;
        padding: 18px;
        font-size: 21px;
      }
      .card-counter-icon {
        text-align: center;
        font-size: 58px;
      }
    }
  }
  .line_chart_trend {
    margin-top: 3px;
    margin-bottom: 3px;
    background-color: rgb(240, 242, 245);
  }
  .pie_chart {
    margin-top: 3px;
    margin-bottom: 3px;
    background-color: rgb(240, 242, 245);
  }
}
</style>
