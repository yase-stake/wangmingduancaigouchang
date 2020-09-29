<template>
 <div> 
     <el-dialog
  :title="info.isAdd?'添加分类':'修改分类'"
  :visible.sync="info.isShow"
  @close="cancel"
  width="40%"
  > 
<!-- 表单 -->
<!-- rules 是设置表单必填项-->
<el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
    <el-form-item  label="上级分类">
        <el-select v-model="forminfo.pid" placeholder="请选择">
            <el-option label="顶级目录" :value="0"></el-option>
            <el-option
            v-for="item in categorylist"
            
            :key="item.id" 
            :label="item.catename"
            :value="item.id">
            </el-option>
  </el-select>
                </el-form-item>
    <el-form-item label="分类名称" prop="catename">
        <el-input v-model="forminfo.catename" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item  label="分类图片">
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
import {addCategory,editCategory} from "@/request/category"
import {mapGetters,mapActions} from "vuex"
let defaultItem={
            pid:0,
         catename:"",
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
         catename:[{required:true,message:"必填",trigger:'blur'},{}],
        
        
     },
     filelist:[]
    
     
 }
 },
 computed: {
   ...mapGetters({
       categorylist:"category/categorylist"

   })
 }, 
 mounted() {
     if(!this.categorylist.length){
         this.get_category_list()
     }
 },

 
 methods:{
    ...mapActions({
        get_category_list:"category/get_category_list"
    }),
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
           
             res = await addCategory(fd)
          
                 }else{
           res = await editCategory(fd)
                }

          if(res.code==200){
               this.$message.success(res.msg)
               this.info.isShow=false
               this.get_category_list()
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
         console.log(val)
     
         if(val.img){
             this.filelist=[{
             name:val.catename,
             url:this.$host+ val.img
         }]
         }
             val.children ? delete val.children:''
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