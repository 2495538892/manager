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
        <!-- 通过找到 type="expand" slot-scope="props" 能实现展开-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <!-- 因为样式左中右结构,所以利用row布局 通过props(自定义模板)能够拿到当前那一行的数据,所以先遍历第一级的权限
            依次类推-->
            <el-row v-for="(val,index) in props.row._children" :key="index">
              <el-col :span="6">
                <el-form label-position="left" inline class="demo-table-expand">
                  <!-- 通过el-tag可以实现删除的标签 -->
                  <!-- el-tag标签,点击xx删除是通过close事件 -->
                  <el-tag
                    :key="val.id"
                    closable
                    type="primary"
                    @close="deleteRoles(props.row,val.id)"
                  >{{val.authName}}</el-tag>
                  <span class="el-icon-arrow-right"></span>
                </el-form>
              </el-col>
              <el-col :span="18">
                <el-row v-for="(val2,i) in val.children" :key="i">
                  <el-col :span="6">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-tag
                        :key="val2.id"
                        closable
                        type="success"
                        @close="deleteRoles(props.row,val2.id)"
                      >{{val2.authName}}</el-tag>
                      <span class="el-icon-arrow-right"></span>
                    </el-form>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="(val3,j) in val2.children "
                      :key="val3.id"
                      closable
                      type="warning"
                      class="my_tag"
                      @close="deleteRoles(props.row,val3.id)"
                    >{{val3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

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

    <!-- 编辑角色-->
    <el-dialog title="编辑角色" :visible.sync="editVisible" class="add">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="editForm.roleName" autocomplete="off" class="add-btn"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="editForm.roleDesc" autocomplete="off" class="add-btn"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑权限 -->
    <el-dialog title="编辑权限" :visible.sync="rightVisible" class="add">
      <!-- data(树状的数据), props(匹配的规则)  default-checked-keys(默认选中) default-expanded-keys(默认展开)
      node-key(必须填,值为节点字段中的一个字段名.必须唯一)
      -->
      <el-tree
        :data="data"
        :props="defaultProps"
        :default-checked-keys="defaultCheckedKeys"
        :default-expanded-keys="defaultExpandedKeys"
        node-key="id"
        show-checkbox
        ref="tree"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rightVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { all } from "q";
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
      },

      //编辑角色的字段;
      editVisible: false,
      editForm: {
        roleName: "",
        roleDesc: ""
      },

      // 编辑权限的字段;
      rightVisible: false,
      data: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      defaultCheckedKeys: [],
      defaultExpandedKeys: [],
      rolesmessage: ""
    };
  },
  created() {
    this.getroles();
  },
  methods: {
    handleEdit(index, row) {
      // 点击编辑通过id获取角色信息;
      this.$request.getrolesByID(row.id).then(res => {
        console.log(res);
        this.editVisible = true;
        this.editForm = res.data.data;
      });
    },
    handlReols(index, row) {
      console.log(row);
      this.rolesmessage = row;
      (this.rightVisible = true),
        this.$request.getRigthTree().then(res => {
          console.log(res);
          this.data = res.data.data;
          const allid = [];
          // row._children.forEach(v => {
          //   allid.push(v.id);
          //   v.children.forEach(v2 => {
          //     allid.push(v2.id);
          //     v2.children.forEach(v3 => {
          //       allid.push(v3.id);
          //     });
          //   });
          // });
          function getCheckedKeys(item) {
            // 查找后代的children 如果有 就遍历 并且 添加到数组中
            item._children.forEach(v => {
              // 如果有后代就去找后代
              if (v.children) {
                // 为了保证代码的一致 重新赋值 _children属性
                v._children = v.children;
                getCheckedKeys(v);
              } else {
                // 没有后代了 添加到数组中了
                allid.push(v.id);
              }
            });
          }
          getCheckedKeys(row);
          this.defaultCheckedKeys = allid;
          this.defaultExpandedKeys = allid;
        });
    },
    handleDelete(index, row) {
      this.$confirm("是否确定删除此角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request.deleteRoles(row.id).then(res => {
            this.getroles();
          });
        })
        .catch(() => {});
    },

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
          // 添加角色
          if (formName === "adduserForm") {
            this.$request.addRoles(this.adduserForm).then(res => {
              console.log(res);
              if (res.data.meta.status == 201) {
                this.getroles();
                this.addVisible = false;
              }
            });
            // 编辑角色
          } else if (formName === "editForm") {
            this.editForm.id = this.editForm.roleId;
            this.$request.editRoles(this.editForm).then(res => {
              if (res.data.meta.status == 200) {
                this.editVisible = false;
                this.getroles();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 删除角色权限
    deleteRoles(row, rightId) {
      this.$request.deleteroles({ roleId: row.id, rightId }).then(res => {
        console.log(res);
        row._children = res.data.data;
      });
    },

    // 编辑角色权
    setRole() {
      let checkedKeys = this.$refs.tree.getCheckedKeys();
      const haflCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
      checkedKeys = checkedKeys.concat(haflCheckedKeys);
      const rids = checkedKeys.join(",");
      console.log(rids);
      this.$request
        .setRoleright({ roleId: this.rolesmessage.id, rids })
        .then(res => {
          console.log(res);
          if (res.data.meta.status == 200) {
            this.rightVisible = false;
            this.getroles();
          }
          this.$request.getmenus().then(res => {
            console.log(res);
            // this.menuslist = res.data.data;
            // 将值传入仓库中,调用仓库的方法
            this.$store.commit("changeMenulist", res.data.data);
          });
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
.my_tag {
  margin-right: 5px;
}
</style>
