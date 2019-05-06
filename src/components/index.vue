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
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
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
  .header{
      background: #bbccdd
  }
  .container{
      .aside{
          background: pink;
      }
      .main{
          background: green;
      }
  }
}
</style>
