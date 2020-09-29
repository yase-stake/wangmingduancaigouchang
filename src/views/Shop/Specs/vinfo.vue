<template>
 <div> 
     <el-dialog
  :title="info.isAdd?'添加规格':'修改规格'"
  :visible.sync="info.isShow"
  @close="cancel"
  width="40%"
  > 
<!-- 表单 -->
<!-- rules 是设置表单必填项-->
<el-form :model="forminfo" ref="form" :rules="rules" label-width="140px" >
        <el-form-item label="属性名" prop="specsname">
      <el-input v-model="forminfo.specsname"  placeholder="请输入属性名"></el-input>
       
                 </el-form-item>
        <el-form-item label="属性值" prop="username">
            <label v-for="(item,index) in list" :key="index">
                 <el-input style="display:inline-block;width:140px" v-model="item.value"  placeholder="请输入属性值"></el-input>   
        <el-button v-if="index==0" type="primary" @click="addAttrs">添加属性</el-button>         
        <el-button v-else type="danger" @click="delAttrs(index)" >删除属性</el-button>         
            </label>
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
import {addSpecs,editSpecs} from "@/request/specs"
import {mapGetters,mapActions} from "vuex"
let defaultItem={
         specsname:"",
        attrs:"",
        
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
         roleid:[{required:true,message:"必填",trigger:'blur'}],
       
     },
     list:[{value:""}]
    
     
 }
 },
 
 methods:{
    ...mapActions({
        
            get_specs_list:"specs/get_specs_list"

    }),
    addAttrs(){
        this.list.push({value:""})
    },
    delAttrs(idx){
        this.list.splice(idx,1)
    },
     async submit(){
   
     if(!this.list.every(val=>val.value)){
         this.$message.warning("请输入规格值")
         return;}
    this.forminfo.attrs=this.list.map(val=>val.value);
     this.forminfo.attrs = this.forminfo.attrs.join(',')
      //表单验证
        this.$refs.form.validate(async valid=>{
            if(valid){
              let res;
            if(this.info.isAdd){
             
             res = await addSpecs(this.forminfo)
          
                 }else{
           res = await editSpecs(this.forminfo)
                }

          if(res.code==200){
               this.$message.success(res.msg)
               this.info.isShow=false
              this.get_specs_list();
               this.cancel()
             
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
        
         }else{
             //修改重置
             this.setinfo({...defaultItem})
         }
        
     },
     setinfo(val){
         this.list=val.attrs.map(v=>({
             value:v
         }))
       
         defaultItem={...val}
         this.forminfo={...val}
     },
     cancel(){
          this.forminfo={...resetItem}
      this.list=[{value:""}]
     }
 },
 components:{}
}

</script>
<style scoped>
</style>