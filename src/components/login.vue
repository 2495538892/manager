<template>
  <div class="login">
    <div class="center-box">
      <h2>用户登录</h2>
      <el-form label-position="top" label-width="80px">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="my-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  .login {
    height: 100%;
    background: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.center-box {
  width: 480px;
  height: 360px;
  background: white;
  border-radius: 10px;
  padding: 20px 35px;
  box-sizing: border-box;
  .my-btn {
    width: 100%;
    margin-top: 10px;
  }
  h2 {
    margin: 0;
    text-align: center;
  }
}
</style>
