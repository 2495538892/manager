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
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="userData.query"
            @keypress.13.native="getuser"
          >
            <el-button slot="append" icon="el-icon-search" @click="getuser"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="success" plain @click="addVisible=true">添加用户</el-button>
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
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changestate(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
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

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :current-page="userData.pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="userData.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addVisible" class="add">
      <el-form :model="adduserForm" :rules="rules" ref="adduserForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="adduserForm.username" autocomplete="off" class="add-btn"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="adduserForm.password" autocomplete="off" class="add-btn"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="adduserForm.email" autocomplete="off" class="add-btn"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px" prop="mobile">
          <el-input v-model="adduserForm.mobile" autocomplete="off" class="add-btn"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('adduserForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户信息 -->
    <el-dialog title="编辑用户" :visible.sync="editVisible" class="add">
      <el-form :model="edituserForm" :rules="rules" ref="edituserForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="edituserForm.username" autocomplete="off" class="add-btn" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="edituserForm.email" autocomplete="off" class="add-btn"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px" prop="mobile">
          <el-input v-model="edituserForm.mobile" autocomplete="off" class="add-btn"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('edituserForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 角色管理 -->
    <el-dialog title="角色分配" :visible.sync="rolesVisible" class="add">
      <el-form :model="rolesForm" :rules="rules" ref="rolesForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="rolesForm.username" autocomplete="off" class="add-btn" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色分配" label-width="120px" prop="email">
          <el-select v-model="value" placeholder="请选择">
            <!-- 因为新建的用户没有分配角色,它的rid=-1,所以为了好看点,就写一个如果rid等于-1的就让他显示'未分配角色' -->
            <el-option label="未分配角色" :value="-1"></el-option>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('rolesForm')">确 定</el-button>
      </div>
    </el-dialog>
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
        pagenum: 1,
        //页容量
        pagesize: 10
      },
      // 添加用户的数据字段
      adduserForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 添加用户的必填规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      },
      addVisible: false,

      // 总数;
      total: 0,

      // 编辑信息的字段;
      editVisible: false,
      edituserForm: {
        username: "",
        email: "",
        mobile: ""
      },

      // 角色分配字段;
      rolesVisible: false,
      // option是所以的下拉选项;
      options: [],
      // value是默认的角色选中
      value: "",
      rolesForm: ""
    };
  },
  created() {
    // 页面已加载就调用页面请求的方法;
    this.getuser();
  },

  methods: {
    // 操作模板的两个事件, index拿到的是索引, row拿到的是对应的数据;
    // 编辑
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
      // 点击编辑通过id获取用户的信息,进入编辑状态;
      this.$request.getuserbyID(row.id).then(res => {
        console.log(res);
        this.edituserForm = res.data.data;
        this.editVisible = true;
      });
    },
    // 删除
    handleDelete(index, row) {
      console.log(index);
      console.log(row);
      this.$confirm("是否确定删除此用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request.deleteuser(row.id).then(res => {
            this.getuser();
          });
        })
        .catch(() => {});
    },
    // 勾勾
    handlReols(index, row) {
      this.$request.getuserbyID(row.id).then(res => {
        console.log(res);
        this.rolesForm = res.data.data;
        this.rolesVisible = true;
        this.value = res.data.data.rid;
        // 然后在调用英雄列表;
        this.$request.roles().then(res => {
          console.log(res);
          this.options = res.data.data;
        });
      });
    },
    //获取用户列表的方法;
    getuser() {
      this.$request.getuser(this.userData).then(res => {
        console.log(res);
        this.tableData = res.data.data.users;
        this.total = res.data.data.total;
      });
    },

    //(添加用户)点击确定添加用户的两个事件
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 因为点击确定有两个两个同名的事件,但是执行的代码不相同,所以判断一下传过来的字符串;
          // 这个是添加的逻辑
          if (formName == "adduserForm") {
            this.$request.addusers(this.adduserForm).then(res => {
              console.log(res);
              this.addVisible = false;
              this.getuser();
              // 重置;
              this.$refs[formName].resetFields();
            });
            // 这个是角色修改的逻辑
          } else if (formName == "rolesForm") {
            this.$request
              .Updataroles({ id: this.rolesForm.id, rid: this.value })
              .then(res => {
                console.log(res);
                this.rolesVisible = false;
                this.getuser();
              });
            // 这个是编辑的逻辑
          } else {
            this.$request.UpdataUser(this.edituserForm).then(res => {
              console.log(res);
              if (res.data.meta.status == 200) {
                this.getuser();
                this.editVisible = false;
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 修改状态;
    changestate(params) {
      this.$request
        .changestate({ uId: params.id, type: params.mg_state })
        .then(res => {
          console.log(res);
        });
    },

    // 分页事件
    handleSizeChange(val) {
      console.log(val);
      this.userData.pagesize = val;
      this.getuser();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.userData.pagenum = val;
      this.getuser();
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
.add {
  .add-btn {
    width: 80%;
  }
}
</style>
