<template>
  <page-layout :avatar="currUser.avatar">
    <div slot="headerContent">
        <div class="title" @click="admin" :style="{ display: admin1 }">{{welcome.timeFix[lang]}}，管理员</div>
      <div class="title" @click="Info" :style="{ display: user1 }"> {{welcome.timeFix[lang]}}，{{currUser.name}}</div>
<!--      <div>{{currUser.position[lang]}}</div>-->
    </div>
    <template slot="extra">
      <head-info class="split-right" :title="$t('project')" content="56"/>
      <head-info class="split-right" :title="$t('ranking')" content="24"/>
      <head-info class="split-right" :title="$t('visit')" content="23"/>
    </template>
      <a-card :loading="loading" :title="`图片识别`" style="margin-bottom: 24px;height: 500px" :bordered="false" :body-style="{padding: 0}">
          <a-row type="flex" justify="space-around">
              <a-col :span="8">
                  <h1>上传图片</h1>
                  <div class="clearfix">
                      <a-upload
                              action="/api/uploadByUser"
                              :data="form"
                              list-type="picture-card"
                              @preview="handlePreview"
                              @change="handleChange"
                      >
                          <div>
                              <a-icon type="plus" />
                              <div class="ant-upload-text">
                                  Upload
                              </div>
                          </div>
                      </a-upload>
                      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                          <img alt="example" style="width: 100%" :src="previewImage" />
                      </a-modal>
                  </div>

              </a-col>
              <a-col :span="8">
                  <h1>识别结果</h1>
                  <a-select default-value="lucy" style="width: 120px" @change="handleChange">
<!--                  <a-select-option value="jack">-->
<!--                      Jack-->
<!--                  </a-select-option>-->
                  <a-select-option value="lucy">
                      {{this.inform.name}}
                  </a-select-option>
<!--                  <a-select-option value="disabled" disabled>-->
<!--                      Disabled-->
<!--                  </a-select-option>-->
<!--                  <a-select-option value="Yiminghe">-->
<!--                      yiminghe-->
<!--                  </a-select-option>-->
              </a-select>
                  <a-descriptions  layout="vertical" bordered>

                      <a-descriptions-item label="图片类型">
                          {{this.inform.type}}
                      </a-descriptions-item>

                      <a-descriptions-item label="时间">
                         {{this.inform.lastModifiedDate}}
                      </a-descriptions-item>
                      <a-descriptions-item label="Top1">
                      {{this.top1.preLabel}}
                  </a-descriptions-item>
                      <a-descriptions-item label="前三预测率">

                          <li v-for="(item,i) in top3" :key="i" style="list-style: none">
                              {{item}}
                          </li>
                      </a-descriptions-item>
                  </a-descriptions>
              </a-col>
          </a-row>
      </a-card>
    </page-layout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout'
import HeadInfo from '@/components/tool/HeadInfo'
// import Radar from '@/components/chart/Radar'
import {mapState} from 'vuex'
import {request, METHOD} from '@/utils/request'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  name: 'WorkPlace',
  components: { PageLayout,HeadInfo},
  i18n: require('./i18n'),
  data () {
    return {
      projects: [],
      previewVisible: false,
      previewImage: '',
      form:{
        id:1
      },
      top1:'',
      top3:[],
      res:'',
      inform:'',
      admin1: '',
      user1: '',
      permissions:'',
      loading: true,
      activities: [],
      teams: [],
      welcome: {
        timeFix: '',
        message: ''
      }
    }
  },
  mounted() {
    const arry1 =this.$store.getters["account/permissions"]
    const array = []
    for (const i in arry1){
      array.push(arry1[i])
    }
    this.permissions=array[0].id
    console.log(this.permissions)
    if (this.permissions === 'form') {
      this.admin1=' ',
        this.user1='none'
    }else {
      this.admin1='none',
        this.user1=' '
    }
  },
  computed: {
    ...mapState('account', {currUser: 'user'}),
    ...mapState('setting', ['lang']),

  },

  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    Info(){
      this.$router.push('/info')
    },
    admin(){
      this.$router.push('/admin')
    },
    push(){
        console.log(1)
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
      this.res=this.fileList[0].response
      this.inform=this.fileList[0]
      this.top1=this.fileList[0].response.top1
      this.top3=this.fileList[0].response.top3
      console.log(this.inform,1)
    },
  },
  created() {
    request('/user/welcome', METHOD.GET).then(res => this.welcome = res.data)
    request('/work/activity', METHOD.GET).then(res => this.activities = res.data)
    request('/work/team', METHOD.GET).then(res => this.teams = res.data)
    request('/project', METHOD.GET).then(res => {
        this.projects = res.data
        this.loading = false
      })
  }
}
</script>

<style lang="less">
@import "index";
</style>
