<template>
 <div class="table-bg"> 
    <el-table border :data="goodslist" >
        <el-table-column prop="id" label="ID" width='40' align="center"></el-table-column>
        <el-table-column prop="firstcatename" label="一级分类名称" align="center"></el-table-column>
        <el-table-column prop="secondcatename" label="二级分类名称" align="center"></el-table-column>
        <el-table-column prop="goodsname" label="商品名称" align="center"></el-table-column>
        <el-table-column label="商品图片">
            <template slot-scope="scope">
            <img width="80px" v-if="scope.row.img" :src="scope.row.img | pixImg()" alt="">
            <img width="80px" v-else src="@/assets/img/timg.jpg" alt="">
            </template>
        </el-table-column>
        <el-table-column label="规格名" align="center">
        <template slot-scope="scope">
            <el-tag type="success" v-for="(item,index) in specslist " v-if="item.id==scope.row.specsid" :key="index">{{item.specsname}}</el-tag>
            </template>
       </el-table-column>
        <el-table-column label="规格值" align="center">
        <template slot-scope="scope">
            <el-tag type="success" v-for="(item,index) in scope.row.specsattr" :key="index">{{item}}</el-tag>
            </template>
       </el-table-column>
       <el-table-column prop="price" label="价格" align="center"></el-table-column>
        <el-table-column label="是否热卖">
            <template slot-scope="scope">
                 <el-switch
                    v-model="scope.row.ishot"
                    :active-value="1"
                    :inactive-value="2"
                  >
                  </el-switch>
           
            </template>
        </el-table-column>
        <el-table-column label="是否新品">
            <template slot-scope="scope">
                 <el-switch
                    v-model="scope.row.isnew"
                    :active-value="1"
                    :inactive-value="2"
                  >
                  </el-switch>
           
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
                <el-button type="primary" size="mini" circle @click="edit(scope.row)" icon="el-icon-edit"></el-button>
                <el-button type="danger" size="mini"  circle @click="del(scope.row.id)"  icon="el-icon-delete"></el-button>
              
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        background
      @size-change="set_size"
      @current-change="set_page"
      :current-page="page"
      :page-sizes="[10,20,30,40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 </div>
</template>
 
<script>
import {mapGetters,mapActions,mapMutations} from "vuex";
import { delGoods} from "@/request/goods";
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
     goodslist:"goods/goodslist",
    specslist:"specs/specslist",
     page:"goods/page",
     size:"goods/size",
     total:"goods/total"
    

   })
 },
  mounted() {
      console.log(this)
     if(!this.specslist.length){
         this.get_specs_list()
     }
     if(!this.goodslist.length){
         this.get_goods_list()
     }
 
 },
methods:{
    ...mapMutations({
        SET_PAGE:'goods/SET_PAGE',
        SET_SIZE:'goods/SET_SIZE'
    }),
      ...mapActions({
        get_goods_list:"goods/get_goods_list",
        get_specs_list:"specs/get_specs_list",
        set_page:"goods/set_page",
        set_size:"goods/set_size"
      
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
                      let res = await delGoods(id); 
            console.log(res)
        if(res.code==200){
            this.$message.success(res.msg)
            if(this.specslist.length==1 && this.page!=1){
                this.SET_PAGE(this.page-1)
            }
            this.get_goods_list()
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