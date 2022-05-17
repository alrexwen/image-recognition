<template>
    <div>
                <a-row type="flex" justify="space-between">

        <li v-for="(item,i) in imga" :key="i" style="list-style: none">
<!--            <a-col :span="4">-->
            <a-col :span="4">
            <div>
                <a-card hoverable style="width: 300px;margin-bottom: 10px;margin-top: 10px">
                    <img :src="item.image" slot="cover" alt=" " style="height: 300px"/>

                    <template slot="actions" class="ant-card-actions">
                        <a-icon type="delete" @click="test(item.id)"/>
                    </template>
                    <a-card-meta title="详细信息" :description="item.imageLabel">

                    </a-card-meta>
                </a-card>
            </div>
<!--            </a-col>-->
            </a-col>
        </li>

                </a-row>
    </div>

</template>

<script>
  import Qs from "qs";
  import { message } from 'ant-design-vue';
  export default {
    name: "img",
    data(){
      return{
        info:{
          id:6,
          page:1,
          role:0,
        },
        imga:[],
        id:{
          list:[],
        },
      }
    },
    created(){
      this.getimg();
    },
    methods:{
      getimg(){
        this.axios({
          method:'post',
          url:'/api/tranImage',
          // data:{id:1,page:'1',role:'1'},
          data:Qs.stringify(this.info)
        }).then(res=>{
          // console.log(res.data.data)
          this.imga=res.data.data;

        })
      },
      test(i){
        // console.log(i)
        this.id.list =[i];
        // const List=[];

        // console.log(Qs.stringify(this.id))
        this.axios({
          method:'post',
          url:'/api/DeleteByAdmin',
          data:this.id
        }).then(res=>{
          // console.log(res.status)
          if (res.status==200){
            message.success('该图片已删除，已消除对模型的影响');
            this.getimg()
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
