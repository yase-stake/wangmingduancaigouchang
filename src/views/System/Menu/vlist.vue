<template>
 <div class="table-bg"> 
    <el-table border :data="menulist" row-key="id"  :tree-props="{children: 'children'}">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="title" label="菜单名称"></el-table-column>
        <el-table-column prop="url" label="菜单地址"></el-table-column>
        <el-table-column label="图标">
            <template slot-scope="scope">
              <i :class="scope.row.icon"></i>
            </template>
        </el-table-column>
        <el-table-column label="类型">
            <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.type==1">目录</el-tag>
            <el-tag type="warning" v-if="scope.row.type==2">菜单</el-tag>
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
import { delMenu } from "@/request/menu";
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
       menulist:"menu/menulist"

   })
 },
 
 created(){},
  mounted() {
     if(!this.menulist.length){
         this.get_menu_list()
     }
 },
methods:{
      ...mapActions({
        get_menu_list:"menu/get_menu_list"
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
                      let res = await delMenu(id); 
            console.log(res)
        if(res.code==200){
            this.$message.success(res.msg)
            this.get_menu_list()
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