<template>
  <div class="login">
    <div class="center-box">
      <h2>用户登录</h2>
      <el-form
        label-position="top"
        label-width="80px"
        :model="loginForm"
        :rules="loginrules"
        ref="rulesForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="my-btn" @click="submitForm('rulesForm')">登录</el-button>
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
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  // 方法;
  methods: {
    // 点击登录验证表单格式的方法;绑定点击事件传入一个参数 ,然后通过设置ref属性,属性的值等于传入的参数(字符串的参数)
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 格式正确就使用抽出来请求插件;
          this.$request.login(this.loginForm).then(res => {
            console.log(res);
            if (res.data.meta.status == 400) {
              this.$message.error("用户名或密码错误");
            } else if (res.data.meta.status == 200) {
              this.$message.success("登录成功");
              sessionStorage.setItem('token',res.data.data.token)
              this.$router.push("/");
            }
          });
        } else {
          //格式错误
          this.$message.error("用户名或密码格式错误");
          return false;
        }
      });
    }
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
