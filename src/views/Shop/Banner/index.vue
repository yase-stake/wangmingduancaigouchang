<template>
 <div> 
     <el-button type="primary" @click="add()">添加轮播图</el-button>
     <!-- 列表组件 -->
     <v-list @edit="edit" ref="list"></v-list>
     <!-- 添加 -->  
     <v-info :info="info" ref="dialog"></v-info>
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
     },
     edit(val){
         console.log(val)
          this.info.isAdd=false,
         this.info.isShow=true
         this.$refs.dialog.setinfo(val)
     },
     update(){
       this.$refs.list.getlist()
     }
 },
 components:{
     VList,VInfo
 }
}

</script>
<style scoped>
</style>