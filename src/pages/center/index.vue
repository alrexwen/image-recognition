<template>

    <div>
                <Imgaa/>
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
  }
</script>

<style scoped>

</style>
