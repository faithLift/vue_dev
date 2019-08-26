<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane
        v-for="item in tabMapOptions"
        :label="item.label"
        :key="item.key"
        :name="item.key"
      >
        <keep-alive>
          <tab-pane v-if="activeName==item.key" :type="item.key" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from "./components/tabPane";

export default {
  name: "Tab",
  components: { tabPane },
  data() {
    return {
      tabMapOptions: [
        { label: "监控", key: "monitor" },
        { label: "告警", key: "alarm" },
        { label: "场景化", key: "auto" },
        { label: "变更", key: "modify" }
      ],
      activeName: "alarm"
    };
  },
  methods: {}
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
