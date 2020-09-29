<template>
 <div class="table-bg"> 
    <el-table border :data="specslist" >
        <el-table-column prop="id" label="ID" width='120' align="center"></el-table-column>
        <el-table-column prop="specsname" label="规格名称" align="center"></el-table-column>
        <el-table-column label="规格项" align="center">
        <template slot-scope="scope">
            <el-tag type="success" v-for="(item,index) in scope.row.attrs " :key="index">{{item}}</el-tag>
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
                <el-button type="danger" size="small"  circle @click="del(scope.row.id)"  icon="el-icon-delete"></el-button>
              
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
import { delSpecs} from "@/request/specs";
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
     specslist:"specs/specslist",
     page:"specs/page",
     size:"specs/size",
     total:"specs/total"
    

   })
 },
  mounted() {
      console.log(this)
     if(!this.specslist.length){
         this.get_specs_list()
     }
 
 },
methods:{
    ...mapMutations({
        SET_PAGE:'specs/SET_PAGE',
        SET_SIZE:'specs/SET_SIZE'
    }),
      ...mapActions({
        get_specs_list:"specs/get_specs_list",
        set_page:"specs/set_page",
        set_size:"specs/set_size"
      
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
                      let res = await delSpecs(id); 
            console.log(res)
        if(res.code==200){
            this.$message.success(res.msg)
            if(this.specslist.length==1 && this.page!=1){
                this.SET_PAGE(this.page-1)
            }
            this.get_specs_list()
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