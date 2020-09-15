<template>
 <div> 
     <el-dialog
  :title="info.isAdd?'tinajia':'xiugai'"
  :visible.sync="info.isShow"
  width="40%"
  > 
<!-- 表单 -->
<el-form :model="forminfo" ref="form" label-width="140px" >
    <el-form-item label="菜单类型">
         <el-radio-group v-model="forminfo.type">
              <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
             </el-radio-group>
             </el-form-item>

    <el-form-item v-if="forminfo.type==2"  label="上级目录">
        <el-select v-model="forminfo.pid" placeholder="请选择">
            <el-option label="顶级目录" :value="0"></el-option>
            <el-option
            v-for="item in menulist"
            :key="item.id"
            :label="item.title"
            :value="item.id">
            </el-option>
  </el-select>
                </el-form-item>
    <el-form-item :label="forminfo.type==1?'目录名称':'菜单名称'">
        <el-input v-model="forminfo.title" placeholder="请输入名称"></el-input>
                </el-form-item>
    <el-form-item label="目录图标" v-if="forminfo.type==1">
        <el-input v-model="forminfo.icon" placeholder="请输入图标class"></el-input>
                 </el-form-item>
    <el-form-item label="菜单地址" v-if="forminfo.type==2">
        <el-input v-model="forminfo.url" placeholder="请输入菜单地址"></el-input>
            </el-form-item>
    <el-form-item label="状态">
       <el-switch
        v-model="forminfo.status" :active-value='1' :inactive-value="2" >
</el-switch> 
    </el-form-item>
    <el-form-item label="">
        <el-button type="primary" @click="submit()">提交</el-button>
        <el-button type="warning" @click="reset()">重置</el-button>
       
    </el-form-item>
  
       

    
</el-form> 

  <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="info.isShow = false">取 消</el-button>
    <el-button type="primary" @click="submit()">确 定</el-button>
  </span> -->
</el-dialog>
</div>
</template> 

<script>
import {addMenu,editMenu} from "@/request/menu"
import {mapGetters,mapActions} from "vuex"

export default { 
    props:{
        info:{
            type:Object ,
            default(){
                return{
        isAdd:false,
        isShow:false
                }
            }
        }

    },
 data(){
 return{
     forminfo:{
         pid:0,
         title:"",
         icon:"",
         type:1,//1目录  2菜单
         url:"",
         status:1//1正常
     },
    
     
 }
 },
 computed: {
   ...mapGetters({
       menulist:"menu/menulist"

   })
 }, 
 mounted() {
     if(!this.menulist.length){
         this.get_menu_list()
     }
 },
 methods:{
    ...mapActions({
        get_menu_list:"menu/get_menu_list"
    }),
     async submit(){
         let res;
         if(this.info.isAdd){
             
        res = await addMenu(this.forminfo)
          
         }else{
           res =editMenu(this.forminfo)
         }

          if(res.code==200){
               this.$message.success(res.msg)
               this.info.isShow=false
               this.get_menu_list()
           }else{
               this.$message.error(res.msg);
              
           }
       
     },
     reset(){

     }
 },
 components:{}
}

</script>
<style scoped>
</style>