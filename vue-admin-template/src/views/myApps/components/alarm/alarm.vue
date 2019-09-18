<template>
    <div class="alarmDeal-container">
        <div class="tabHeader">
            <el-page-header @back="goBack" content="告警工作流"></el-page-header>
        </div>
        <div class="tabLine">
            <el-steps :active.sync="active" process-status="process" 
            finish-status="success" align-center>
                <el-step :title="item.label" v-for="item in flowLine" 
                :id="item.id" :icon="item.icon" @click.native="getActive(item.id)" 
                :key="item.key"></el-step>
            </el-steps>
        </div>
        <div class="tabContent">
            <div v-if="active == 0">
                <keep-alive>
                    <alarm-converge @getChildEvent="to_next"/>
                </keep-alive>
            </div>
            <!-- <div v-else-if="active == 1">
                <keep-alive>
                    <alarm-plan @getChildEvent="to_next"/>
                </keep-alive>
            </div> -->
            <div v-else-if="active == 1">
                <keep-alive>
                    <alarm-dealing @getChildEvent="to_next"/>
                </keep-alive>
            </div>
            <div v-else-if="active == 2">
                <keep-alive>
                    <alarm-summing @getChildEvent="to_next"/>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
import alarmConverge from './alarmConverge'
import alarmDealing from './alarmDealing'
import alarmSumming from './alarmSumming'
//import alarmPlan from './alarmPlan'

export default {
   name: 'alarmCaseFlow',
   props: ['data', 'default'],
   components: {
       alarmSumming,
       alarmConverge,
       alarmDealing
   },
   data() {
       return {
           active: 0,
           flowList: ['converge', 'plan', 'dealing', 'summing'],
           activeFlow: 'converge',
           flowLine: [
               { id: 0, label: '汇聚事件', icon: 'el-icon-sort' },
               { id: 1, label: '确定方案', icon: 'el-icon-document' },
               { id: 2, label: '定制并实施方案', icon: 'el-icon-loading' },
               { id: 3, label: '总结', icon: 'el-icon-edit' }
           ]
       }
   },
   watch: {
       acitve: function(val) {
           this.activeFlow = this.flowList[val]
       }
   },
   methods: {
       goBack() {
           console.log('Go Back!')
           this.$router.push({
               name: "myApps",
               query: {
                   active: 'alarm'
               }
           })
       },
       to_next: function(val) {
           this.active = val
       },
       getActive(id) {
           console.log(id)
           this.active = id
       }
   }
}
</script>

<style scoped>
.tabLine {
    padding: 18px;

}
.el-steps {
    cursor: pointer;
}

.el-step * :hover {
    color: red !important;
}

.tabHeader {
    height: 40px;
    background-color: whitesmoke;
    align-self: center;
}

.el-page-header {
    padding-top: 10px;
    padding-left: 5px;
    align-self: center;
}
</style>