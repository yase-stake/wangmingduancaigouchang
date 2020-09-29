<template>
 <div> 
     <el-dialog
  :title="info.isAdd?'添加轮播图':'修改轮播图'"
  :visible.sync="info.isShow"
  @close="cancel"
  width="40%"
  > 
<!-- 表单 -->
<!-- rules 是设置表单必填项-->
<el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
   
    <el-form-item label="轮播图名称" prop="title">
        <el-input v-model="forminfo.title" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item  label="轮播图片">
    <el-upload
    action=""
  :auto-upload="false"
 list-type="picture-card"
  :limit="1"
  :on-preview="see"
  :file-list="filelist"
  :on-change="change"
  :on-remove="remove"
>
 
  <i class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
<el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
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
import {addBanner,editBanner} from "@/request/banner"
let defaultItem={
         
         title:"",
            img:"",
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
     dialogVisible:false,
     dialogImageUrl:"",
     forminfo:{...defaultItem},
     rules:{
     },
     filelist:[]
    
     
 }
 },
 

 
 methods:{
    
    remove(file,fileList){
          this.forminfo.img=[];
    },
     async submit(){
        this.$refs.form.validate(async valid=>{
            if(valid){//如果验证通过
              let res;
              let fd= new FormData();
                for(let k in this.forminfo){
                 fd.append(k,this.forminfo[k])
             }
            if(this.info.isAdd){
           
             res = await addBanner(fd)
          
                 }else{
           res = await editBanner(fd)
                }

          if(res.code==200){
               this.$message.success(res.msg)
               this.info.isShow=false
                this.$parent.update();      
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
         }},
     setinfo(val){
         if(val.img){
             this.filelist=[{
             name:val.catename,
             url:this.$host+ val.img
         }]
         }
         defaultItem={...val}
         this.forminfo={...val}
     }
    ,see(file){
        
        this.dialogVisible=true;
        this.dialogImageUrl=file.url
    },
    change(file,fileList){
        this.forminfo.img=file.raw
   
      
    },
     cancel(){
          this.forminfo={...resetItem};
         
         this.filelist=[];
        
     }
 },
 components:{}
}

</script>
<style scoped>
</style>