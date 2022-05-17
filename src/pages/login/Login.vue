<template>
  <common-layout>
    <div class="top">
      <div class="header">
<!--        <img alt="logo" class="logo" src="@/assets/img/logo.png" />-->
        <span class="title">图像识别系统</span>
      </div>
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
          <a-tab-pane tab="账户密码登录" key="1">
            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                v-model="loginForm.username"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                autocomplete="autocomplete"
                type="password"
                v-model = "loginForm.password"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-tab-pane>

        </a-tabs>
        <div>
          <a-checkbox :checked="true" >自动登录</a-checkbox>
           <a style="float: right">忘记密码</a>
            <register style="float: right;margin-right: 10px"/>
        </div>
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 5px" size="large" htmlType="submit" type="primary">登录</a-button>
        </a-form-item>

      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
import {login, getRoutesConfig} from '@/services/user'
import {setAuthorization} from '@/utils/request'
import {loadRoutes} from '@/utils/routerUtil'
import {mapMutations} from 'vuex'
import Qs from 'qs'
import register from "./compontens/register";
export default {
  name: 'Login',
  components: {CommonLayout,register},
  data () {
    return {
      logging: false,
      error: '',
      loginForm: {
        username: '',
        password: '',
      },
      form: this.$form.createForm(this)
    }
  },
  computed: {
    systemName () {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    // onSubmit (e) {
    //   e.preventDefault()
    //   this.form.validateFields((err) => {
    //     if (!err) {
    //       this.logging = true
    //       const name = this.loginForm.username
    //       const password = this.loginForm.password
    //       login(name, password).then(this.afterLogin)
    //     }
    //   })
    // },
    onSubmit(e){
      console.log(Qs.stringify(this.loginForm))
      let _this =this;
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        alert('账号或密码不能为空');
      } else {
        this.axios({
          headers: {
            'Content-Type':'application/x-www-form-urlencoded'
          },
          method: 'post',
          url: '/api/login',
          data:Qs.stringify(_this.loginForm),
        }).then(res => {
          console.log(res.data);
            e.preventDefault()
            this.form.validateFields((err) => {
              if (!err) {
                this.logging = true
                const name = this.loginForm.username
                const password = this.loginForm.password
                console.log(name,password,1)
                login(name, password).then(this.afterLogin)
              }
            })
        })
      }
    },
    afterLogin(res) {
      this.logging = false
      const loginRes = res.data
      if (loginRes.code >= 0) {
        const {user, permissions, roles} = loginRes.data
        this.setUser(user)
        this.setPermissions(permissions)
        this.setRoles(roles)
        setAuthorization({token: loginRes.data.token, expireAt: new Date(loginRes.data.expireAt)})
        // 获取路由配置
        getRoutesConfig().then(result => {
          const routesConfig = result.data.data
          loadRoutes(routesConfig)
          this.$router.push('/dashboard/workplace')
          this.$message.success(loginRes.message, 3)
        })
      } else {
        this.error = loginRes.message
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .common-layout{
    .top {
      text-align: center;
      .header {
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: @title-color;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: @text-color-second;
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .login{
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button{
          font-size: 14px;
        }
      }
      .icon {
        font-size: 24px;
        color: @text-color-second;
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>
