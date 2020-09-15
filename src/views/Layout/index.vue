<template>
<el-container class="page">
    <el-aside :width="iscollapse?'64px':'200px'" class="page-side">
        
          <left></left>
        <!-- Aside content -->
    </el-aside>
        <el-container class="page-main">
            <el-header  class="page-header">
            <top></top>
            <!-- Header content -->
        </el-header>
            <el-main height="" class="page-con">
           <router-view/>
        </el-main>
    </el-container>
</el-container>
</template>
<script>
import top from '@/views/Layout/top'
import left from '@/views/Layout/left'
import {mapState} from "vuex"
export default {
 data(){
 return{}
 },
 created(){},
 methods:{},
 computed: {
      ...mapState(["iscollapse"])
 },
 components:{
     top,left
 }
}

</script>
<style scoped>
.page{
    width: 100vw;
    height: 100vh;
}
.page-side{
height: 100%; 
background-color: #444;
}


.page-main{
    height: 100%;
    background-color: hotpink;
}
.page-header{
    width: 100%;
    /* height: 60px; */
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);
}
</style>