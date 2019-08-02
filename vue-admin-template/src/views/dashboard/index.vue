<template>
  <div class="dashboard-container">
    <el-row :gutter="24">
      <div v-for="(item, index) in dash" :key="index">
        <div v-if="item.visible">
          <el-col :xs="24" :sm="24" :lg="8">
            <div class="wapper">
              <div class="title">
                <div class="title-content">{{ item.title }}</div>
              </div>
              <div class="count" v-for="(data, k) in item.data" :key="k">
                <div class="span1">
                  {{ data.title1 }}
                  <br>
                  <span :style="data.style1">{{ getData(data.key1) }}</span>
                </div>
                <div class="span2">
                  {{ data.title2 }}
                  <br>
                  <span :style="data.style2">{{ getData(data.key2) }}</span>
                </div>
                <svg-icon
                  icon-class="eye-open"
                  class-name="toggle"
                  @click="toggle(data.graph.module)"
                />
                <div :class="data.graph.module" v-if="data.graph.visible">
                  <ve-line
                    :data="getLineChart(data.graph.module)"
                    :settings="getLineSettings(data)"
                    :extend="getLineExtend(data)"
                  />
                </div>
              </div>
            </div>
          </el-col>
        </div>
        <div
          class="prev_button"
          v-else-if="index == 1 && item.visible == false"
          @click="changeDis(1)"
          :style="{left: sideBarWidth, marginTop: buttonHeight}"
        >
          <img src="@/assets/images/left.png" title="上一模块">
        </div>
        <div
          class="next_button"
          v-else-if="index == 4 && item.visible == false"
          @click="changeDis(4)"
          :style="{marginTop: buttonHeight}"
        >
          <img src="@/assets/images/right.png" title="下一模块">
        </div>
      </div>
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
    return {
      sideBarWidth: null,
      buttonHeight: null,
      BASE_API: "", //this.GLOBAL.util.BASE + "/modifybackend/",
      pieChart: null,
      lineChart: null,
      module: null,
      dash: null,
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
          PV: "数量",
          some: "测试"
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
    this.getDashSettings();
  },
  mounted() {
    window.onresize = function() {
      this.getButtonHeight();
    };
    this.getButtonHeight();
  },
  beforeUpdate() {
    this.autoSideBarWidth();
    this.getButtonHeight();
  },
  watch: {
    "$store.state.app.sidebar.opened": function() {
      this.autoSideBarWidth();
    }
  },
  methods: {
    getButtonHeight() {
      this.buttonHeight =
        0.4 *
          document.getElementsByClassName("sidebar-container")[0].clientHeight +
        "px"; //拼接字串不要加分号，会导致结果失效=> :style="{marginTop: buttonHeight}"
    },
    autoSideBarWidth() {
      if (this.$store.state.app.sidebar.opened) {
        this.sideBarWidth = "210px";
      } else {
        this.sideBarWidth = "54px";
      }
    },
    getDashSettings() {
      this.dash = {
        1: {
          title: "独角鲸平台",
          visible: true,
          data: [
            {
              title1: "平台调用总数(日)",
              type1: "day",
              key1: "access_count",
              label1: "调用数量",
              color1: "#3394f6",
              style1: "color: #3394f6;",
              title2: "平台当前用户总数",
              type2: "total",
              key2: "user_count",
              label2: "用户数量",
              color2: "#11a498",
              style2: "color: #11a498;",
              graph: {
                visible: true,
                module: "narwhal_access_user_count",
                type: "line"
              }
            },
            {
              title1: "任务执行数(日)",
              type1: "day",
              key1: "task_count",
              label1: "执行数量",
              color1: "#3394f6",
              style1: "color: #3394f6;",
              title2: "重启执行数(日)",
              type2: "total",
              key2: "restart_count",
              label2: "重启数量",
              color2: "#11a498",
              style2: "color: #11a498;",
              graph: {
                visible: true,
                module: "task_restart_count",
                type: "line"
              }
            }
          ]
        },
        2: {
          title: "自动化运维",
          visible: true,
          data: [
            {
              title1: "任务成功数(日)",
              type1: "day",
              key1: "noah_success",
              label1: "成功数量",
              color1: "#4de736",
              style1: "color: #4de736;",
              title2: "任务失败数(日)",
              type2: "day",
              key2: "noah_failed",
              label2: "失败数量",
              color2: "#ff5e00",
              style2: "color: #ff5e00;",
              graph: {
                visible: true,
                module: "noah_success_failed",
                type: "line"
              }
            },
            {
              title1: "任务执行数(日)",
              type1: "day",
              key1: "task_count",
              label1: "执行数量",
              color1: "#3394f6",
              style1: "color: #3394f6;",
              title2: "重启执行数(日)",
              type2: "total",
              key2: "restart_count",
              label2: "重启数量",
              color2: "#11a498",
              style2: "color: #11a498;",
              graph: {
                visible: true,
                module: "task_restart_count",
                type: "line"
              }
            }
          ]
        },
        3: {
          title: "资源申请",
          visible: true,
          data: [
            {
              title1: "申请数量(日)",
              type1: "day",
              key1: "apply_count",
              label1: "申请数量",
              color1: "#3394f6",
              style1: "color: #3394f6;",
              title2: "审批数量(日)",
              type2: "day",
              key2: "confirm_count",
              label2: "审批数量",
              color2: "#11a498",
              style2: "color: #11a498;",
              graph: {
                visible: true,
                module: "apply_confirm_count",
                type: "line"
              }
            },
            {
              title1: "提交实施(日)",
              type1: "day",
              key1: "implementation_count",
              label1: "提交实施",
              color1: "#3394f6",
              style1: "color: #3394f6;",
              title2: "驳回数量(日)",
              type2: "day",
              key2: "refuse_count",
              label2: "驳回数量",
              color2: "#ff5e00",
              style2: "color: #ff5e00;",
              graph: {
                visible: true,
                module: "implementation_refuse_count",
                type: "line"
              }
            }
          ]
        },
        4: {
          title: "配置管理",
          visible: false,
          data: [
            {
              title1: "IP数量(日)",
              type1: "day",
              key1: "ip_count",
              label1: "IP数量",
              color1: "#4de736",
              style1: "color: #4de736;",
              title2: "APPID数量(日)",
              type2: "day",
              key2: "appid_count",
              label2: "APPID数量",
              color2: "#ff5e00",
              style2: "color: #ff5e00;",
              graph: {
                visible: true,
                module: "ip_appid_count",
                type: "line"
              }
            },
            {
              title1: "查询数量(日)",
              type1: "day",
              key1: "search_count",
              label1: "查询数量",
              color1: "#3394f6",
              style1: "color: #3394f6;",
              title2: "导出数量(日)",
              type2: "total",
              key2: "export_count",
              label2: "重启数量",
              color2: "#11a498",
              style2: "color: #11a498;",
              graph: {
                visible: true,
                module: "search_export_count",
                type: "line"
              }
            }
          ]
        }
      };
    },
    getLineExtend(data) {
      if (data.color1 && data.color2) {
        var color_style = [data.color1, data.color2];
      } else {
        var color_style = data.color1;
      }

      return {
        "title.text": "周度趋势",
        "title.x": "center",
        "legend.orient": "vertical",
        "legend.right": "15",
        xAxis: {
          axisLabel: {
            rotate: 45
          }
        },
        series: {
          type: "line",
          label: {
            show: true,
            position: "top"
          }
        },
        color: color_style
      };
    },
    getLineSettings(data) {
      var res = { labelMap: {} };
      res.labelMap[data.key1] = data.label1;
      res.labelMap[data.key2] = data.label2;
      return res;
    },
    getAccess() {
      request({
        method: "get",
        url: this.BASE_API + "access_record/getAccess?module=" + this.module
      })
        .then(result => {
          console.log(result.data[0]["access"]);
          this.noah = result.data[0]["access"];
          this.auto = parseInt(this.noah) + this.file;
          this.noah_success = result.data[0]["success"];
          this.noah_failed = result.data[0]["failed"];
        })
        .catch(error => {
          console.log(error);
        });
    },
    getLineChart(module) {
      switch (module) {
        case "narwhal_access_user_count":
          return {
            columns: ["date", "access_count", "user_count"],
            rows: [
              { date: "2019-07-08", access_count: 1445, user_count: 1204 },
              { date: "2019-07-09", access_count: 1535, user_count: 1205 },
              { date: "2019-07-10", access_count: 1665, user_count: 1215 },
              { date: "2019-07-11", access_count: 1715, user_count: 1224 },
              { date: "2019-07-12", access_count: 1455, user_count: 1231 },
              { date: "2019-07-13", access_count: 1685, user_count: 1244 },
              { date: "2019-07-14", access_count: 825, user_count: 1245 }
            ]
          };
          break;
        case "task_restart_count":
          return {
            columns: ["date", "task_count", "restart_count"],
            rows: [
              { date: "2019-07-08", task_count: 445, restart_count: 204 },
              { date: "2019-07-09", task_count: 535, restart_count: 205 },
              { date: "2019-07-10", task_count: 665, restart_count: 215 },
              { date: "2019-07-11", task_count: 715, restart_count: 224 },
              { date: "2019-07-12", task_count: 455, restart_count: 231 },
              { date: "2019-07-13", task_count: 685, restart_count: 244 },
              { date: "2019-07-14", task_count: 825, restart_count: 245 }
            ]
          };
          break;
        case "noah_success_failed":
          return {
            columns: ["date", "noah_success", "noah_failed"],
            rows: [
              { date: "2019-07-08", noah_success: 444, noah_failed: 204 },
              { date: "2019-07-09", noah_success: 353, noah_failed: 205 },
              { date: "2019-07-10", noah_success: 666, noah_failed: 215 },
              { date: "2019-07-11", noah_success: 171, noah_failed: 224 },
              { date: "2019-07-12", noah_success: 545, noah_failed: 231 },
              { date: "2019-07-13", noah_success: 868, noah_failed: 244 },
              { date: "2019-07-14", noah_success: 822, noah_failed: 245 }
            ]
          };
          break;
        case "task_restart_count":
          return {
            columns: ["date", "task_count", "restart_count"],
            rows: [
              { date: "2019-07-08", task_count: 445, restart_count: 204 },
              { date: "2019-07-09", task_count: 535, restart_count: 205 },
              { date: "2019-07-10", task_count: 665, restart_count: 215 },
              { date: "2019-07-11", task_count: 715, restart_count: 224 },
              { date: "2019-07-12", task_count: 455, restart_count: 231 },
              { date: "2019-07-13", task_count: 685, restart_count: 244 },
              { date: "2019-07-14", task_count: 825, restart_count: 245 }
            ]
          };
          break;
        case "apply_confirm_count":
          return {
            columns: ["date", "apply_count", "comfirm_count"],
            rows: [
              { date: "2019-07-08", apply_count: 440, comfirm_count: 404 },
              { date: "2019-07-09", apply_count: 550, comfirm_count: 505 },
              { date: "2019-07-10", apply_count: 661, comfirm_count: 615 },
              { date: "2019-07-11", apply_count: 772, comfirm_count: 724 },
              { date: "2019-07-12", apply_count: 443, comfirm_count: 431 },
              { date: "2019-07-13", apply_count: 664, comfirm_count: 644 },
              { date: "2019-07-14", apply_count: 824, comfirm_count: 245 }
            ]
          };
          break;
        case "implementation_refuse_count":
          return {
            columns: ["date", "implementation_count", "refuse_count"],
            rows: [
              {
                date: "2019-07-08",
                implementation_count: 444,
                refuse_count: 44
              },
              {
                date: "2019-07-09",
                implementation_count: 535,
                refuse_count: 35
              },
              {
                date: "2019-07-10",
                implementation_count: 566,
                refuse_count: 65
              },
              {
                date: "2019-07-11",
                implementation_count: 417,
                refuse_count: 14
              },
              {
                date: "2019-07-12",
                implementation_count: 154,
                refuse_count: 51
              },
              {
                date: "2019-07-13",
                implementation_count: 486,
                refuse_count: 84
              },
              {
                date: "2019-07-14",
                implementation_count: 522,
                refuse_count: 25
              }
            ]
          };
          break;
        case "ip_appid_count":
          return {
            columns: ["date", "ip_count", "appid_count"],
            rows: [
              { date: "2019-07-08", ip_count: 1444, appid_count: 804 },
              { date: "2019-07-09", ip_count: 1533, appid_count: 805 },
              { date: "2019-07-10", ip_count: 1666, appid_count: 815 },
              { date: "2019-07-11", ip_count: 1711, appid_count: 924 },
              { date: "2019-07-12", ip_count: 1755, appid_count: 931 },
              { date: "2019-07-13", ip_count: 1788, appid_count: 944 },
              { date: "2019-07-14", ip_count: 1822, appid_count: 1045 }
            ]
          };
          break;
        case "search_export_count":
          return {
            columns: ["date", "search_count", "export_count"],
            rows: [
              { date: "2019-07-08", search_count: 1445, export_count: 204 },
              { date: "2019-07-09", search_count: 1535, export_count: 205 },
              { date: "2019-07-10", search_count: 1665, export_count: 215 },
              { date: "2019-07-11", search_count: 1715, export_count: 224 },
              { date: "2019-07-12", search_count: 1455, export_count: 231 },
              { date: "2019-07-13", search_count: 1685, export_count: 244 },
              { date: "2019-07-14", search_count: 1825, export_count: 245 }
            ]
          };
          break;
        default:
        //pass
      }
    },
    getData(key) {
      switch (key) {
        case "access_count":
          return 1400;
          break;
        case "user_count":
          return 1201;
          break;
        case "task_count":
          return 1200;
          break;
        case "restart_count":
          return 600;
          break;
        case "noah_success":
          return 900;
          break;
        case "noah_failed":
          return 10;
          break;
        case "task_count":
          return 1203;
          break;
        case "restart_count":
          return 613;
          break;
        case "apply_count":
          return 1023;
          break;
        case "confirm_count":
          return 1001;
          break;
        case "implementation_count":
          return 789;
          break;
        case "refuse_count":
          return 34;
          break;
        case "ip_count":
          return 1899;
          break;
        case "appid_count":
          return 894;
          break;
        case "search_count":
          return 1213;
          break;
        case "export_count":
          return 330;
          break;
        default:
        //pass
      }
    },
    toggle(id) {
      var x = document.getElementsByClassName(id)[0];
      if (x.style.display != "none") {
        x.style.display = "none";
      } else {
        x.style.display = "";
      }
    },
    changeDis(index) {
      this.dash[index].visible = true;
      if (index == 1) {
        this.dash[4].visible = false;
      } else {
        this.dash[1].visible = false;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  padding: 24px;
  background-color: whitesmoke;

  .wapper {
    padding: 4px 6px;
    background-color: white;
    width: 100%;
    float: left;
    position: relative;
    border: 1px solid #eeeeee;
    box-shadow: 5px 5px 5px #eeeeee;

    .title {
      background-color: white;
      padding: 4px;
      height: 58px;
      width: 100%;
      margin-top: 4px;
      margin-bottom: 8px;
      border: 0.8px solid #eee;
      border-radius: 5px;
      box-shadow: 4px 4px 3px #ddd;

      .title-content {
        padding-top: 2%;
        text-align: center;
        font-family: Lisu;
        font-size: 2em;
        text-shadow: 0 0 0.1em lightgrey;
      }
    }

    .count {
      padding: 4px;
      background-color: white;
      height: auto;
      width: 100%;
      margin-top: 4px;
      margin-bottom: 6px;
      border: 0.8px solid #eee;
      border-radius: 3px 3px 2px #dddddd;

      #graph {
        padding-top: 15px;
        margin-bottom: -35px;
      }

      .vu-line {
        height: 350px !important;
      }

      .toggle {
        font-size: 11px;
      }

      .span1 {
        padding: 8px;
        text-align: center;
        float: left;
        width: 50%;
        border-right: 0.8px solid #eee;
        border-bottom: 0.8px solid #eee;
        font-size: 16px;
        span {
          font-size: 22pt;
          color: rgba(0, 90, 255, 0.67);
          padding-left: 3px;
          font-family: 方正准圆简体;
        }
      }

      .span2 {
        padding: 8px;
        text-align: center;
        float: right;
        width: 50%;
        border-right: 0.8px solid #eee;
        border-bottom: 0.8px solid #eee;
        font-size: 16px;
        span {
          font-size: 22pt;
          color: rgba(0, 90, 255, 0.67);
          padding-left: 3px;
          font-family: 方正准圆简体;
        }
      }
    }
  }
  .line_chart_trend {
    margin-top: 4px;
    margin-bottom: 4px;
    padding-top: 10px;
    padding-bottom: -10px;
    border-radius: 4px;
    background-color: rgb(240, 242, 245);
    box-shadow: 4px 4px 2px #eeeeee;
  }
  .pie_chart {
    margin-top: 4px;
    margin-bottom: 4px;
    padding-top: 10px;
    padding-bottom: -10px;
    border-radius: 4px;
    background-color: rgb(240, 242, 245);
    box-shadow: 4px 4px 2px #dddddd;
  }
  .prev_button {
    position: fixed;
    width: 35px;
    height: 40px;
    z-index: 9999;
  }
  .next_button {
    position: fixed;
    margin-right: -10px;
    right: 0px;
    width: 35px;
    height: 40px;
    z-index: 9999;
  }
  img {
    width: 70%;
    height: 100%;
    background-color: rgba(123, 126, 133, 0.247);
  }
  img:hover {
    transform: scale(1.5);
  }
}
</style>
