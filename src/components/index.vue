<template>
  <el-container class="father-box">
    <el-header class="header">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
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
  name: "index"
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
