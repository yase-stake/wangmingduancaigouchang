<template>
 <div> 
     <el-dialog
  :title="info.isAdd?'添加角色':'修改角色'"
  :visible.sync="info.isShow"
  @close="cancel"
  width="40%"
  > 
<!-- 表单 -->
<!-- rules 是设置表单必填项-->
<el-form :model="forminfo" ref="form" :rules="rules" label-width="140px" >
        <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="forminfo.rolename"  placeholder="请输入角色名"></el-input>
                 </el-form-item>
    <el-form-item label="角色权限">
      <el-tree show-checkbox default-expand-all node-key='id' :check-strictly="checkStrictly" ref="tree" :data="menulist" :props="{children:'children',label:'title'}"  ></el-tree>
      
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
import {addRole,editRole} from "@/request/role"
import {mapGetters,mapActions} from "vuex"
let defaultItem={
         rolename:"",
        menus:"",
         status:1//1正常
}
let resetItem={ ...defaultItem}

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
     forminfo:{...defaultItem},
     rules:{
         rolename:[{required:true,message:"必填",trigger:'blur'},{}],
        
       
     },
     checkStrictly:false
    
     
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
        get_menu_list:"menu/get_menu_list",
        get_role_list:"role/get_role_list"

    }),
     async submit(){
      let idarr=this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
      if(idarr.length){
          this.forminfo.menus=idarr
      }else{
          this.$message.warning('你还没选呢')
          return; 
      }
      this.forminfo.menus=idarr;
      //表单验证
        this.$refs.form.validate(async valid=>{
            if(valid){
              let res;
            if(this.info.isAdd){
             
             res = await addRole(this.forminfo)
          
                 }else{
           res = await editRole(this.forminfo)
                }

          if(res.code==200){
               this.$message.success(res.msg)
               this.info.isShow=false
              this.get_role_list();
               this.forminfo={...resetItem};
               this.$refs.tree.setCheckedKeys([])
           }else{
               this.$message.error(res.msg);
              this.reset()
           }   
            }
        })
    
         
       
     },
     reset(){
         if(this.info.isAdd){//添加重置
              this.forminfo={...defaultItem}
              this.$refs.tree.setCheckedKeys([])
         }else{
             //修改重置
             this.setinfo({...defaultItem})
         }
        
     },
     setinfo(val){
         let idarr=val.menus.split(",");
         if(idarr[0]){
            //  树型控件的父子关联开关
             this.checkStrictly=true;
             //this.$nextTick(()=>{}) 等vue当前Dom节点渲染完之后再执行

             this.$nextTick(()=>{
                 this.$refs.tree.setCheckedKeys(idarr);
                 this.checkStrictly=false
                 //完成效果之后再设置回关联不然影响功能
             })
         } 
         defaultItem={...val}
         this.forminfo={...val}
     },
     cancel(){
          this.forminfo={...resetItem}
          this.$refs.tree.setCheckedKeys([])
     }
 },
 components:{}
}

</script>
<style scoped>
</style>