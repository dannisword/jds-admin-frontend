<script setup lang="ts">
const $version = inject("$version");
// route
import { routeHandle } from "../hooks/route-handle";
const { navigation } = routeHandle();
// store
import { useApp } from "../store/useApp";
const app = useApp();
// page
import { pageHandle } from "../hooks/page-handle";
const page = pageHandle();
// api method
import { httpOperations } from "../utils/http-operations";

const validateUsername = (rule: any, value: any, callback: any) => {
  callback();
};

const validatePassword = (rule: any, value: any, callback: any) => {
  callback();
};
// 宣告變數
const data = reactive({
  user: {
    account: "admin",
    password: "admin",
    workStn: "STN101",
  },
  loginRules: {
    account: [{ required: true, trigger: "blur", validator: validateUsername }],
    password: [
      { required: true, trigger: "blur", validator: validatePassword },
    ],
  },
  loading: false,
  passwordType: "password",
});
// 宣告方法
const onLogin = () => {
  const url = `/api/auth/login`;
  httpOperations.post(url, data.user).then((response: any) => {
    app.setToken(response.message).then((success) => {
      if (success) {
        navigation("/");
      }
    });
  });
};

const showPwd = () => {
  if (data.passwordType === "password") {
    data.passwordType = "";
  } else {
    data.passwordType = "password";
  }
};
</script>

<template>
  <el-container class="mainWrap" v-loading="page.container.isLoading">
    <div>
      <div id="logo-title">
        <img src="../assets/Tenacity-Logo.png" alt="logo" class="logo-title" />
      </div>

      <div id="registerWrap">
        <el-form
          ref="loginForm"
          auto-complete="on"
          label-position="left"
          :model="data.user"
          :rules="data.loginRules"
        >
          <div id="register_header"><h1>倉儲管理系統</h1></div>

          <el-form-item prop="account">
            <el-input
              ref="account"
              name="account"
              v-model="data.user.account"
              placeholder="帳號"
              type="text"
              tabindex="1"
              auto-complete="on"
              prefix-icon="user"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              ref="password"
              name="password"
              v-model="data.user.password"
              :type="data.passwordType"
              :key="data.passwordType"
              prefix-icon="lock"
              placeholder="密碼"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="onLogin"
            >
              <template slot="append">
                <span class="show-pwd" @click="showPwd">
                  <svg-icon icon-class="password" class-name="custom-class" />
                </span>
              </template>
            </el-input>
          </el-form-item>

          <el-button
            :loading="data.loading"
            type="info"
            style="width: 100%; margin-bottom: 30px"
            @click.native.prevent="onLogin()"
          >
            登入
          </el-button>
          <!-- 
        <div class="tips">
          <span class="version-span">前端版本 {{ $version }} - {{ 1 }}</span
          ><br />
          <span class="version-span">後端版本 {{ 1 }}</span>
          <span>工作站點 {{ 1 }}</span>
        </div>
      -->
        </el-form>
      </div>

      <div id="logo">
        <img src="../assets/IA_LOGO_BIG.png" alt="logo" class="logo" />
        <p>Copyright © 2022 漢錸科技股份有限公司 All rights reserved.</p>
      </div>
    </div>
  </el-container>
</template>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
/*
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
*/
.version-span {
  color: #454545;
}
// 容器
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 100vh;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

.mainWrap {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(../assets/bg_main_1.png), url(../assets/bg_main_2.png),
    url(../assets/bg_circle_1.svg), url(../assets/bg_circle_2.svg);
  background-position: right top, left bottom, left 100px top 190px,
    right 20% bottom 180px;
  background-repeat: no-repeat;
  background-size: 60%, 60%, 140px 130px, 130px 130px;
  margin: 0;
}

#registerWrap {
  position: absolute;
  width: 480px;
  background-color: #fff;
  box-shadow: 0px 0px 10px 10px #ccc;
  top: 28%;
  left: 28%;
  padding: 50px 40px;
  border-radius: 20px;
  z-index: 99999;
}

#register_header {
  background-size: 70px;
  width: 300px;
  top: 12%;
  left: 7%;
  margin-bottom: 30px;
}

#logo-title {
  position: absolute;
  top: 20px;
  left: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
#logo-title img {
  width: 300px;
}
#logo {
  position: absolute;
  bottom: 20px;
  right: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#logo img {
  width: 300px;
}

#logo p {
  color: #334750;
  font-size: 16px;
  line-height: 40px;
}
.el-button-login {
  background-color: #454545;
}
@media screen and (min-width: 1440px) {
  #mainWrap {
    background-image: url(../assets/bg_main_1.png), url(../assets/bg_main_2.png),
      url(../assets/bg_circle_1.svg), url(../assets/bg_circle_2.svg);
    background-position: right top, left bottom, left 100px top 190px,
      right 470px bottom 180px;
    background-repeat: no-repeat;
    background-size: 60%, 60%, 140px 130px, 130px 130px;
    margin: 0;
  }

  #registerWrap {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
}
</style>
