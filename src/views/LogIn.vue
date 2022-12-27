<template>
  <div class="loginbody">
    <div class="logindata">
      <div class="logintext">
        <h2>CS353</h2>
        <h2>HELLO WORLD</h2>
      </div>
      <div class="formdata">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="form.username" clearable placeholder="enter account"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" clearable placeholder="enter password" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool">
        <div>
          <el-checkbox v-model="checked" @change="remenber">Remember pass</el-checkbox>
        </div>
        <!-- <div>
          <span class="shou" @click="forgetpas">Forget Password？</span>
        </div> -->
      </div>
      <div class="butt">
        <el-button type="primary" @click.native.prevent="login('form')">Log In</el-button>
        <el-button class="shou" @click="register">Register</el-button>
      </div>

      
    </div>
    <!-- a dialog pops up when you click the 'register'-->
    <fileDialog v-model="dialogShow" :rowInfo="rowInfo" :title="title"
        :arrayNum="registerInfo.length" />
      <!-- 我没想好 -->
      <fileDetail v-if="detailShow" :rowInfo="rowInfo" />
  </div>
</template>

<script>

import { login, register } from "@/http/api";
import router from "@/router";
import { ElMessage } from "element-plus";
import fileDialog from "./tool/fileDialog.vue";


export default {
  name: "login",
  components: {
    fileDialog
  },
  data() {
    return {
      // dialog and detail for register
      dialogShow: false,
      detailShow: false,
      rowInfo: {

      },
      title: "",
      registerInfo: [
        {
          Account: "",
          Password: "",
          email: ""
        },

      ],
      
      form: {
        password: "",
        username: "",
      },
      checked: false,
      rules: {
        username: [
          { required: true, message: "Please enter username.", trigger: "blur" },
          { max: 10, message: "Cannot exceed 10 characters.", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Please enter password.", trigger: "blur" },
          { max: 10, message: "Cannot exceed 10 characters.", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    if (localStorage.getItem("access_token")) {
      ElMessage({ type: 'info', message: 'Already logged in.' })
      router.push('/group')
    }
    if (localStorage.getItem("news")) {
      this.form = JSON.parse(localStorage.getItem("news"))
      this.checked = true
    }
  },
  methods: {
    login(form) {
      window.localStorage.removeItem('access_token')
      this.$refs[form].validate((valid) => {
        if (valid) {
          login(this.form)
            .then((res) => {
              localStorage.setItem("access_token", res.data.data);
              router.push('/group');
            })
        } else {
          return false;
        }
      });
    },

    remenber(data) {
      this.checked = data
      if (this.checked) {
        localStorage.setItem("news", JSON.stringify(this.form))
      } else {
        localStorage.removeItem("news")
      }
    },
    forgetpas() {
      this.$message({
        type: "info",
        message: "功能尚未开发额",
        showClose: true
      })
    },
    register() {
      /*
      this.title = "Register";
      this.rowInfo = {
        };
      this.dialogShow = true;

       */

      register(this.form).then((res) => {
        ElMessage({ type: 'success', message: 'Register successfully, please log in' })
      })

    },
  },
};


</script>

<style scoped>
.loginbody {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  /* background-image: url("../assets/login2.jpg");
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat; */
  background: linear-gradient(to bottom, rgb(235, 255, 255), rgb(172, 222, 222));
  overflow: auto;
  position: fixed;
  line-height: 100%;
  padding-top: 150px;
}

.logintext {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
  text-shadow: 2px 2px 4px #000000;
}

.logindata {
  width: 400px;
  height: 300px;
  transform: translate(-50%);
  margin-left: 50%;
}

.tool {
  display: flex;
  justify-content: space-between;
  color: #606266;
}

.butt {
  margin-top: 10px;
  text-align: center;
}

.shou {
  cursor: pointer;
  color: #606266;
}
</style>

