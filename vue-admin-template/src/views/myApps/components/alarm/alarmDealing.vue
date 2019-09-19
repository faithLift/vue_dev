<template>
  <div class="dealing-container">
    <div class="dealing-line">
      <light-timeline :items="dealingLine"></light-timeline>
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
        { tag: '2019-09-21 23:30', type: 'circle', content: '处置如下: 速冻发生地发生地发生地发生地速冻分尸案打法' },
        { tag: '2019-09-21 23:55', type: 'circle', content: '处置如下: 速冻发生地发生地发生地发生地速冻分尸案打法' },
        { tag: '2019-09-22 00:45', type: 'star', content: '处置如下: 速冻发生地发生地发生地发生地速冻分尸案打法' },
        { tag: '2019-09-22 01:15', type: 'circle', content: '处置如下: 速冻发生地发生地发生地发生地速冻分尸案打法' },
        { tag: '2019-09-22 03:35', type: 'star', content: '处置如下: 速冻发生地发生地发生地发生地速冻分尸案打法' },
        { tag: '2019-09-22 04:35', type: 'circle', content: '处置如下: 速冻发生地发生地发生地发生地速冻分尸案打法' },
      ]
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
.dealing-line {
  padding-left: 5%;
}
</style>