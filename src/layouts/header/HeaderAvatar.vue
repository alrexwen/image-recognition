<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" :src="user.avatar"/>
      <span class="name">{{user.name}}</span>
    </div>

    <a-menu :class="['avatar-menu']" slot="overlay">
        <a-menu-item @click="info" :style="{ display: user1 }">
        <a-icon type="user" />
        <span>个人中心</span>
          </a-menu-item>
        <a-menu-item @click="admin" :style="{ display: admin1 }">
            <a-icon type="user" />
            <span>管理员中心</span>
        </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import {mapGetters} from 'vuex'
import {logout} from '@/services/user'
// import Qs from 'qs'
export default {
  name: 'HeaderAvatar',
  computed: {
    ...mapGetters('account', ['user']),
  },
  data () {
    return {
      admin1: 'none',
      user1: 'none',
      permissions:'',
    }
  },
    mounted() {
      const arry1 =this.$store.getters["account/permissions"]
      const array = []
      for (const i in arry1){
        array.push(arry1[i])
      }
      this.permissions=array[0].id

      if (this.permissions === 'form') {
        this.admin1=' ',
        this.user1='none'
      }else {
        this.admin1='none',
        this.user1=' '
      }
    },
  methods: {

    logout() {
      logout()
      this.$router.push('/login')
    },
    info(){
      this.$router.push('/info')
    },
    admin(){
      this.$router.push('/admin')
    },
  }
}
</script>

<style lang="less">
  .header-avatar{
    display: inline-flex;
    .avatar, .name{
      align-self: center;
    }
    .avatar{
      margin-right: 8px;
    }
    .name{
      font-weight: 500;
    }
  }
  .avatar-menu{
    width: 150px;
  }

</style>
