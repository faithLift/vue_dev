<template>
    <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="告警" name="alarm" lazy>
            <keep-alive>
                <tab-alarm />
            </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="场景化" name="auto" lazy>
            <keep-alive>
                <tab-auto/>
            </keep-alive>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import tabAlarm from '@/views/myApps/components/tabAlarm'

export default {
    name: 'comp',
    components: {
        tabAlarm,
    },
    data() {
        return {
            activeName: this.$route.query.active ? this.$route.query.active : 'alarm'
        }
    }
}
</script>

<style scoped>
.tab-container {
    margin: 30px;
}
</style>