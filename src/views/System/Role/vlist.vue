<template>
 <div class="table-bg"> 
    <el-table border :data="rolelist" >
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="rolename" label="角色名称"></el-table-column>
      
       
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
import {mapGetters,mapActions} from "vuex";
import { delRole } from "@/request/role";
export default {
 data(){
 return{
    //  list:[
    //      {id:'1',title:"adwdwadwa",content:"3243332"},
    //      {id:'1',title:"adwdwadwa",content:"3243332"},
    //      {id:'1',title:"adwdwadwa",content:"3243332"},
    //      {id:'1',title:"adwdwadwa",content:"3243332"}
    //  ]
 }
 },
  computed: {
   ...mapGetters({
     rolelist:"role/rolelist"

   })
 },
 
 created(){},
  mounted() {
     if(!this.rolelist.length){
         this.get_role_list()
     }
 },
methods:{
      ...mapActions({
        get_role_list:"role/get_role_list"
    }),
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
                      let res = await delRole(id); 
            console.log(res)
        if(res.code==200){
            this.$message.success(res.msg)
            this.get_role_list()
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