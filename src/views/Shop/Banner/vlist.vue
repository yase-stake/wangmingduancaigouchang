<template>
 <div class="table-bg"> 
    <el-table border :data="bannerlist">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="title" label="轮播图名称"></el-table-column>
    
        <el-table-column label="分类图片">
            <template slot-scope="scope">
            <img width="80px" v-if="scope.row.img" :src="scope.row.img | pixImg()" alt="">
            <img width="80px" v-else src="@/assets/img/timg.jpg" alt="">
            </template>
        </el-table-column>
       
        <el-table-column label="按钮">
            <template slot-scope="scope">
                <el-button type="primary" size="small" circle @click="edit(scope.row)" icon="el-icon-edit"></el-button>
                <el-button type="danger" size="small"  circle @click="del(scope.row.id)"  icon="el-icon-delete"></el-button>
              
            </template>
        </el-table-column>
    </el-table>
 </div>
</template>
 
<script>

import { delBanner,getBanner } from "@/request/banner";

export default {
 data(){
 return{
     bannerlist:[]
    //  list:[
    //      {id:'1',title:"adwdwadwa",content:"3243332"},
    //      {id:'1',title:"adwdwadwa",content:"3243332"},
    //      {id:'1',title:"adwdwadwa",content:"3243332"},
    //      {id:'1',title:"adwdwadwa",content:"3243332"}
    //  ]
 }
 },

 
 created(){},
  mounted() {
    this.getlist()
 },
methods:{
    async getlist(){
        let res= await getBanner(); 
        this.bannerlist=res
    },
     edit(val){
         console.log(val)
         this.$emit('edit',{...val})
     },
   async del(id){
                this.$confirm('你真的要删？？？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(async() => {
                      let res = await delBanner(id); 
            console.log(res)
        if(res.code==200){
            this.$message.success(res.msg)
            this.getlist()
        }else{
                this.$message.error(res.msg)
        }
                    }).catch(()=>{
                    })
                   
   
    }
 },
 components:{}
}

</script>
<style scoped>
.table-bg{
    background-color: deeppink;
    padding: 20px;
    margin: 15px 0;
}
</style>