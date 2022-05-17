<template>

    <div>
<!--        <a-row type="flex" justify="space-between">-->
<!--            <a-col :span="4">-->
<!--&lt;!&ndash;                <li v-for="(item,i) in imga" :key="i">&ndash;&gt;-->
<!--&lt;!&ndash;                    <img alt=" " :src="item.image"/>&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                    {{item.image.id}}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                </li>&ndash;&gt;-->
<!--            </a-col>-->
<!--            <a-col :span="4">-->
                <Imgaa/>
<!--            </a-col>-->
<!--            <a-col :span="4">-->
<!--                <Imgaa/>-->
<!--            </a-col>-->
<!--            <a-col :span="4">-->
<!--                <Imgaa/>-->
<!--            </a-col>-->
<!--            <a-col :span="4">-->
<!--                <Imgaa/>-->
<!--            </a-col>-->
<!--        </a-row>-->
<!--            <a-row type="flex" justify="space-between" style="margin-top: 10px">-->
<!--            <a-col :span="4">-->
<!--                <Imgaa/>-->
<!--            </a-col>-->
<!--                <a-col :span="4">-->
<!--                    <Imgaa/>-->
<!--                </a-col>-->
<!--            <a-col :span="4">-->
<!--                <Imgaa/>-->
<!--            </a-col>-->
<!--            <a-col :span="4">-->
<!--                <Imgaa/>-->
<!--            </a-col>-->
<!--            <a-col :span="4">-->
<!--                <Imgaa/>-->
<!--            </a-col>-->
<!--        </a-row>-->
        <a-pagination v-model="current" :total="50" show-less-items style="float: right;margin-top: 10px"/>
    </div>
</template>

<script>
    import Imgaa from "./compontens/img";
    // import Qs from 'qs'
  export default {
    name: 'Demo',
    // eslint-disable-next-line vue/no-unused-components
    components:{Imgaa},
    data(){
      return {
        current: 2,
        info:{
          id:1,
          page:1,
          role:0,
        },
        imga:[],
      };
    },
    methods:{
      test(){
        console.log(this.imga,11)
      },

    },
    // created(){
    //   this.axios({
    //     method:'post',
    //     url:'/api/login/tranImage',
    //     // data:{id:1,page:'1',role:'1'},
    //     data:Qs.stringify(this.info)
    //   }).then(res=>{
    //     // console.log(res.data.data)
    //     this.imga=res.data.data;
    //
    //     // var arr=[]
    //     // for(const i in res.data){
    //     //   this.imga.push(res.data[i])
    //     //   console.log(res.data[i])
    //     // }
    //
    //     // const a=this.imga
    //   //  a.forEach(function (item){
    //   //     console.log(item.image,1)
    //   //   })
    //   })
    // }
  }
</script>

<style scoped>

</style>
