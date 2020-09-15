<template>
 <div> 
     <el-button type="primary" @click="add()">添加菜单</el-button>
     <!-- 列表组件 -->
     <v-list></v-list>
     <!-- 添加 -->  
     <v-info :info="info"></v-info>
 </div>
</template>

<script>
import VList from './vlist'
import VInfo from './vinfo'
export default {
 data(){
 return{
     info:{
         isAdd:false,
         isShow:false,
     }
 }
 }, 
 created(){},
 methods:{
     add(){
         this.info.isAdd=true,
         this.info.isShow=true

     }
 },
 components:{
     VList,VInfo
 }
}

</script>
<style scoped>
</style>