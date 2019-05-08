<template>
  <div class="users-content">
    <!-- 面包屑 -->
    <div class="bread-header">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 输入框和添加用户  -->
    <div class="users-btn">
      <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="success" plain>成功按钮</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <div class="tabled">
      <el-table :data="tableData" style="width: 100%">
        <!-- 索引 -->
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <!-- 开关的状态通过scope.row获取当前的数据,然后数据里面的mg_state来决定 -->
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="caozuo" label="操作">
          <template slot-scope="scope">
            <!-- scope.row可以拿到对应的数据 -->
            <el-button type="primary" icon="el-icon-edit" plain size='mini' @click="handleEdit(scope.$index, scope.row)"></el-button>
            <el-button type="success" icon="el-icon-check" plain size='mini'></el-button>
            <el-button type="danger" icon="el-icon-delete" plain size='mini' @click="handleDelete(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "users",
  data: function() {
    return {
      tableData: [],
      //用户列表的数据
      userData: {
        query: "",
        //当前页
        pagenum: "1",
        //页容量
        pagesize: "10"
      }
    };
  },
  created() {
    this.$request.getuser(this.userData).then(res => {
      console.log(res);
      this.tableData = res.data.data.users;
    });
  },

  methods: {
    // 操作模板的两个事件, index拿到的是索引, row拿到的是对应的数据;
    // 编辑
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
    },
    // 删除
    handleDelete(index, row) {
      console.log(index);
      console.log(row);
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
.users-btn {
  margin: 5px 0;
}
</style>
