<template>
  <div class="login">
    <div class="center-box">
      <h2>用户登录</h2>
      <el-form label-position="top" label-width="80px" :model="loginForm" :rules="loginrules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type='password'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="my-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录字段1(输入框的)
      loginForm: {
        username: "",
        password: ""
      },
      // 验证的规则字段2
      loginrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "change" }
        ]
      }
    };
  }
};
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
