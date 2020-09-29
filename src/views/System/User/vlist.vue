<template>
 <div class="table-bg"> 
    <el-table border :data="userlist" >
        <el-table-column prop="uid" label="UID" width='320' align="center"></el-table-column>
        <el-table-column prop="username" label="管理员名称" align="center"></el-table-column>
        <el-table-column label="管理员角色" align="center">
        <template slot-scope="scope">
            <el-tag type="success" >{{scope.row.rolename}}</el-tag>
            </template>
       </el-table-column>
        <el-table-column label="状态">
            <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
            <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="按钮">
            <template slot-scope="scope">
                <el-button type="primary" size="small" circle @click="edit(scope.row)" icon="el-icon-edit"></el-button>
                <el-button type="danger" size="small"  circle @click="del(scope.row.uid)"  icon="el-icon-delete"></el-button>
              
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        background
      @size-change="set_size"
      @current-change="set_page"
      :current-page="page"
      :page-sizes="[2, 3,4,5,6,7]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 </div>
</template>
 
<script>
import {mapGetters,mapActions,mapMutations} from "vuex";
import { delUser} from "@/request/user";
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
     userlist:"user/userlist",
     page:"user/page",
     size:"user/size",
     total:"user/total"
    

   })
 },
  mounted() {
      console.log(this)
     if(!this.userlist.length){
         this.get_user_list()
     }
 
 },
methods:{
    ...mapMutations({
        SET_PAGE:'user/SET_PAGE',
        SET_SIZE:'user/SET_SIZE'
    }),
      ...mapActions({
        get_user_list:"user/get_user_list",
        set_page:"user/set_page",
        set_size:"user/set_size"
      
    }),
     edit(val){
         console.log(val)
         this.$emit('edit',{...val})
     },
   async del(uid){
                this.$confirm('你真的要删？？？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(async() => {
                      let res = await delUser(uid); 
            console.log(res)
        if(res.code==200){
            this.$message.success(res.msg)
            if(this.userlist.length==1 && this.page!=1){
                this.SET_PAGE(this.page-1)
            }
            this.get_user_list()
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