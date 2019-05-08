<template>
  <el-container class="father-box">
    <el-header class="header">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">IG</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <h2>后台管理</h2>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-button type="danger" icon="el-icon-delete" circle @click="loginout"></el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="container">
      <!-- 左侧 -->
      <el-aside width="200px" class="aside">
        <!--点击跳转使用  router属性 不写就默认是false 写了默认是true  -->
        <el-menu router default-active="2" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>用户列表
            </el-menu-item>
          </el-submenu>
          <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">
              <i class="el-icon-menu"></i>角色列表
            </el-menu-item>
            <el-menu-item index="rights">
              <i class="el-icon-menu"></i>权限列表
            </el-menu-item>
          </el-submenu>

          <!-- 商品管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="goods">
              <i class="el-icon-menu"></i>商品列表
            </el-menu-item>
            <el-menu-item index="params">
              <i class="el-icon-menu"></i>分类参数
            </el-menu-item>
            <el-menu-item index="categories">
              <i class="el-icon-menu"></i>商品分类
            </el-menu-item>
          </el-submenu>

          <!-- 订单管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="orders">
              <i class="el-icon-menu"></i>订单列表
            </el-menu-item>
          </el-submenu>

          <!-- 数据统计 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="reports">
              <i class="el-icon-menu"></i>数据报表
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 左侧 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  beforeCreate() {
    if (!sessionStorage.getItem("token")) {
      this.$message.warning("请登录");
      this.$router.push("/login");
    }
  },
  methods: {
    //退出登录
    loginout() {
      this.$confirm("是否确定退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          sessionStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang='scss'>
.father-box {
  height: 100%;
  .header {
    background: #bbccdd;
  }
  .container {
    .aside {
      background: skyblue;
    }
    .main {
      background: #eeeeff;
    }
  }
}
</style>
