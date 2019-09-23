<template>
  <div class="dealing-container">
    <el-row :gutter="24" style="padding-top: 10px;">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="dealing-line">
          <label>处置过程:</label>
          <light-timeline :items="dealingLine">
            <template slot="tag" slot-scope="{ item }">
              <div class="tag-item">{{ item.tag }}</div>
            </template>
            <template slot="type" slot-scope="{ item }">
              <div class="type-item">{{ item.type }}</div>
            </template>
            <template slot="content" slot-scope="{ item }">{{ item.content }}</template>
          </light-timeline>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="dealing-option">
          <div class="basic-options">
            <fieldset>
              <legend>基本操作：</legend>
              <div class="button-group">
                <el-button type="primary">自动任务</el-button>
                <el-button type="warning">手动任务</el-button>
              </div>
            </fieldset>
          </div>
          <div class="advice-options">
            <fieldset>
              <legend>推荐操作：</legend>
              <div class="button-group">
                <el-button type="danger">中间件启停</el-button>
                <el-button type="warning">拉入/拉出</el-button>
              </div>
            </fieldset>
          </div>
          <div class="hist-alert">
            <fieldset>
              <legend>历史相关事件：</legend>
              <el-table></el-table>
            </fieldset>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="dealing-option">
      <el-button type="success" @click="to_next">确认告警恢复</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alarmDealing',
  data() {
    return {
      step: 0,
      dealingLine: [
        {
          tag: '2019-09-21 23:30',
          type: 'circle',
          content:
            '处置如下: 测试测试村上春树村上春树菜市场测试村上春树村上春树村上春树测试菜市场测试测试测试测试测试测试测试测试'
        },
        {
          tag: '2019-09-21 23:55',
          type: 'circle',
          content:
            '处置如下: 测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试'
        },
        {
          tag: '2019-09-22 00:45',
          type: 'star',
          content:
            '处置如下: 测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试'
        },
        {
          tag: '2019-09-22 01:15',
          type: 'circle',
          content:
            '处置如下: 测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试'
        },
        {
          tag: '2019-09-22 03:35',
          type: 'star',
          content:
            '处置如下: 测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试'
        },
        {
          tag: '2019-09-22 04:35',
          type: 'circle',
          content: '处置如下: 测试测试测试测试测试'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.dealing-container {
  position: relative;
  margin-top: 5px;
  margin-left: 2%;
  margin-right: 2%;
  min-height: 600px;
  border: 1px solid whitesmoke;
  box-shadow: 4px 4px 3px #ddd;
}
.dealing-line {
  padding-left: 5%;
  padding-right: 15px;
  border-right: 1px solid #ddd;
}

label {
  position: relative;
  font-size: 18pt;
}
.tag-item {
  margin-left: -4rem !important;
  width: 165px !important;
}

.type-item {
  width: 8px !important;
  height: 8px !important;
  padding-left: -4px !important;
}

.dealing-option {
  padding-right: 18px;
}

.button-group {
  padding-top: 7px;
}

.basic-options {
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
}

.advice-options {
  padding-top: 5px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
}

.hist-alert {
  padding-top: 5px;
}

.dealing-option {
  border-top: 1px solid #ddd;
  padding-top: 5px;
}
</style>