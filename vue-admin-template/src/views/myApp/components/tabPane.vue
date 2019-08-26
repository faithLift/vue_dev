<template>
<div v-if="type=='alarm'">
  <tab-alarm />
</div>
<div v-else-if="type=='monitor'">
  <tab-monitor />
</div>
<div v-else-if="type=='auto'">
  <tab-auto />
</div>
<div v-else-if="type=='action'">
  <tab-action />
</div>
<div v-else-if="type=='modify'">
  <tab-modify />
</div>
</template>

<script>

import tabAlarm from '@/views/myApp/components/tabAlarm'
import tabMonitor from '@/views/myApp/components/tabMonitor'
import tabAuto from '@/views/myApp/components/tabAuto'
import tabAction from '@/views/myApp/components/tabAction'
import tabModify from '@/views/myApp/components/tabModify'

export default {
  name: "compo",
  components: {
    tabAlarm,
    tabMonitor,
    tabAuto,
    tabAction,
    tabModify
  },
  props: {
    type: {
      type: String,
      default: "alarm"
    }
  },
 
};
</script>

<stype rel="stylesheet/scss" lang="scss" scoped>

</stype>