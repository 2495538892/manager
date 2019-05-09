<template>
  <div class="users-content">
    <!-- 面包屑 -->
    <div class="bread-header">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 输入框和添加用户  -->
    <div class="users-btn">
      <el-row>
        <el-col :span="24">
          <el-button type="success" plain @click="addVisible=true">添加角色</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <div class="tabled">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
        <el-table-column prop="caozuo" label="操作">
          <template slot-scope="scope">
            <!-- scope.row可以拿到对应的数据 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              plain
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              plain
              size="mini"
              @click="handlReols(scope.$index, scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              plain
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加角色-->
    <el-dialog title="添加角色" :visible.sync="addVisible" class="add">
      <el-form :model="adduserForm" :rules="rules" ref="adduserForm">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="adduserForm.roleName" autocomplete="off" class="add-btn"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="adduserForm.roleDesc" autocomplete="off" class="add-btn"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('adduserForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "roles",
  data: function() {
    return {
      tableData: [],

      // 添加角色的字段
      addVisible: false,
      adduserForm: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getroles();
  },
  methods: {
    handleEdit() {},
    handlReols() {},
    handleDelete() {},

    // 获取角色列表;
    getroles() {
      this.$request.roles().then(res => {
        console.log(res);
        // 这里要修改数据中的children并且删除,因为饿了么官方会把childen当做树桩解析,而我们不需要
        let data = res.data.data;
        data.forEach(v => {
          v._children = v.children;
          delete v.children;
        });
        this.tableData = data;
      });
    },

    // 添加角色的事件
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$request.addRoles(this.adduserForm).then(res => {
            console.log(res);
            if (res.data.meta.status == 200) {
              this.getroles();
              this.addVisible = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
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
.users-btn {
  margin: 5px 0;
}
</style>
