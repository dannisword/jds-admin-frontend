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
  app.demo("");
  return navigation("/");

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
    <div class="login-form-wrap">
      <div class="left-wrap">
        <div class="logo">
          <img src="../assets/Jabil-logo-blue.svg" alt="" />
        </div>
        <img src="../assets/login.png" alt="bg" />
      </div>

      <div class="right-wrap">
        <el-form
          ref="loginForm"
          auto-complete="on"
          label-position="left"
          :model="data.user"
          :rules="data.loginRules"
        >
          <div class="logo logo-mobile">
            <img src="../assets/Jabil-logo-blue.svg" alt="" />
          </div>
          <div id="register_header">
            <h3>Welcome</h3>
          </div>

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
            type="primary"
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

      <!-- <div id="logo">
        <img src="../assets/IA_LOGO_BIG.png" alt="logo" class="logo" />
        <p>Copyright © 2022 漢錸科技股份有限公司 All rights reserved.</p>
      </div> -->
    </div>
  </el-container>
</template>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #163e6a;
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

.el-button-login {
  background-color: #072178;
}

.login-form-wrap {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;

  // background: $bg;
  h1 {
    color: #454545;
  }
}

.logo {
  width: 130px;
  margin-bottom: 0 auto 20px;
  display: flex;
  position: absolute;
  left: 20px;
  top: 20px;

  img {
    max-width: 100%;
    width: 110px;
  }
}

.logo-mobile {
  display: none;
}

.right-wrap {
  max-width: 33.3%;
  flex: 33.3%;
  padding: 5rem;
}

.left-wrap {
  flex: 0 0 66.6666666667%;
  max-width: 66.6666666667%;
  background: #f9f9f9;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
    width: 80%;
  }
}

@media screen and (max-width: 768px) {
  .left-wrap {
    display: none !important;
  }

  .logo-mobile {
    display: block;
  }

  .right-wrap {
    background: #f9f9f9;
    width: 100%;
    max-width: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 !important;
  }
}
</style>
