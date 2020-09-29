<template>
 <div class="table-bg"> 
    <el-table border :data="list" >
        <el-table-column prop="uid" label="UID" align="center"></el-table-column>
        <el-table-column prop="nickname" label="角色名称"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
      
        <el-table-column prop="addtime" label="注册时间"></el-table-column>
      
       
        <el-table-column label="状态">
            <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
            <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
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

import { delMember,getMember } from "@/request/member";
export default {
 data(){
 return{
  list:[]
 }
 },
 
 
 created(){},
  mounted() {
    this.get_list()
 },
methods:{
     
     edit(val){
         console.log(val)
         this.$emit('edit',{...val})
     },
    async get_list(){
         let res=await getMember()
         this.list=res 
     },
   async del(id){
                this.$confirm('你真的要删？？？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(async() => {
                      let res = await delRole(id); 
            console.log(res)
        if(res.code==200){
            this.$message.success(res.msg)
              this.get_list()
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