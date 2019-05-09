<template>
  <div class="users-content">
    <!-- 面包屑 -->
    <div class="bread-header">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 表格 -->
    <div class="tabled">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="path" label="路径" width="180"></el-table-column>
        <el-table-column prop="level" label="层级">
          <template slot-scope="scope">
            <!-- 开关的状态通过scope.row获取当前的数据,然后数据里面的mg_state来决定 -->
            {{scope.row.level==='0'?'一级':''}}
            {{scope.row.level==='1'?'二级':''}}
            {{scope.row.level==='2'?'三级':''}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "rights",
  data: function() {
    return {
      tableData: []
    };
  },
  created() {
    this.getRights();
  },
  methods: {
    getRights() {
      this.$request.getRights().then(res => {
        console.log(res);
        this.tableData = res.data.data;
      });
    }
  }
};
</script>

<style lang='scss'>
.bread-header {
  height: 40px;
  background: #ddddee;
  .bread {
    line-height: 40px;
  }
}
</style>
