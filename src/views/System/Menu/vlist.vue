<template>
 <div class="table-bg"> 
    <el-table border :data="list">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column label="按钮">
            <template slot-scope="scope">
                <el-button type="primary" size="small" circle @click="edit(scope.row)" icon="el-icon-edit"></el-button>
                <el-button type="danger" size="small"  circle @click="del(scope.row)"  icon="el-icon-delete"></el-button>
              
            </template>
        </el-table-column>
    </el-table>
 </div>
</template>

<script>
export default {
 data(){
 return{
     list:[
         {id:'1',title:"adwdwadwa",content:"3243332"},
         {id:'1',title:"adwdwadwa",content:"3243332"},
         {id:'1',title:"adwdwadwa",content:"3243332"},
         {id:'1',title:"adwdwadwa",content:"3243332"}
     ]
 }
 },
 created(){},
 methods:{
     edit(){
     },
     del(){ }
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