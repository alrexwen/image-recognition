<template>
    <page-layout :avatar="currUser.avatar">
        <div slot="headerContent">
            <div class="title" @click="Info">{{welcome.timeFix[lang]}}，{{currUser.name}}</div>
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
                                action="/api/"
                                list-type="picture-card"
                                :file-list="fileList"
                                @preview="handlePreview"
                                @change="handleChange"
                        >
                            <div v-if="fileList.length < 8">
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
                        <a-select-option value="jack">
                            Jack
                        </a-select-option>
                        <a-select-option value="lucy">
                            Lucy
                        </a-select-option>
                        <a-select-option value="disabled" disabled>
                            Disabled
                        </a-select-option>
                        <a-select-option value="Yiminghe">
                            yiminghe
                        </a-select-option>
                    </a-select>
                    <a-descriptions  layout="vertical" bordered>

                        <a-descriptions-item label="图片类型">
                            Cloud Database
                        </a-descriptions-item>
                        <a-descriptions-item label="Billing Mode">
                            Prepaid
                        </a-descriptions-item>
                        <a-descriptions-item label="时间">
                            2018-04-24 18:00:00
                        </a-descriptions-item>
                        <a-descriptions-item label="Info">
                            Data disk type: MongoDB
                            <br />
                            Database version: 3.4
                            <br />
                            Package: dds.mongo.mid
                            <br />
                            Storage space: 10 GB
                            <br />
                            Replication factor: 3
                            <br />
                            Region: East China 1<br />
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
        fileList: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '-5',
            name: 'image.png',
            status: 'error',
          },
        ],
        loading: true,
        activities: [],
        teams: [],
        welcome: {
          timeFix: '',
          message: ''
        }
      }
    },
    computed: {
      ...mapState('account', {currUser: 'user'}),
      ...mapState('setting', ['lang'])
    },
    methods: {
      handleCancel() {
        this.previewVisible = false;
      },
      Info(){
        this.$router.push('/info')
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
