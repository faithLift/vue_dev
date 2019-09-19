<template>
  <div class="dealing-container">
    <div class="dealing-line">
      <el-steps :step.sync="step" process-status="process" finish-status="success" align-center>
        <el-step :title="item.title" v-for="item in dealingLine" :key="item.key"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alarmDealing',
  data() {
    return {
      step: 0,
      dealingLine: [{ id: 0, title: '' }]
    }
  }
}
</script>

<style lang="scss" scoped>
.dealing-container {
  margin-top: 5px;
  margin-left: 2%;
  margin-right: 2%;
  min-height: 600px;
  border: 1px solid whitesmoke;
  box-shadow: 4px 4px 3px #ddd;
}
</style>