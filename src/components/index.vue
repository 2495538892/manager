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
                                                        <!-- 遍历的值从仓库中取出来 -->
          <el-submenu :index="val.order+''" v-for="(val,index) in $store.state.menulist" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{val.authName}}</span>
            </template>
            <el-menu-item v-for="(val2,i) in val.children" :key="i" :index="'/'+val2.path">
              <i class="el-icon-menu"></i>
              {{val2.authName}}
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
  data() {
    return {
      menuslist: ""
    };
  },
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
  },
  created() {
    this.$request.getmenus().then(res => {
      console.log(res);
      // this.menuslist = res.data.data;
      // 将值传入仓库中,调用仓库的方法
      this.$store.commit("changeMenulist", res.data.data);
    });
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
