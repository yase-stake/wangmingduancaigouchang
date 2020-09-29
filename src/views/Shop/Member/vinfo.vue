 <template>
 <div> 
     <el-dialog
 title="修改信息"
  :visible.sync="info.isShow"
  @close="cancel"
  width="40%"
  > 
<!-- 表单 -->
<!-- rules 是设置表单必填项-->
<el-form :model="forminfo" ref="form"  label-width="140px" >
        <el-form-item label="会员名" prop="nickname">
        <el-input v-model="forminfo.nickname" readonly placeholder="会员名"></el-input>
                 </el-form-item>
        <el-form-item label="手机号" prop="phone">
        <el-input v-model="forminfo.phone"  readonly placeholder="手机号"></el-input>
                 </el-form-item>
        <el-form-item label="密码" prop="password">
        <el-input v-model="forminfo.password"  placeholder="密码"></el-input>
                 </el-form-item>
    <el-form-item label="会员状态">
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
import {editMember} from "@/request/member"
let defaultItem={
         nickname:"",
        phone:"",
        password:"",
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
    
 }
 },

 mounted() {
      this.$emit('update')
 },
 methods:{
    
     async submit(){
    
      //表单验证
        this.$refs.form.validate(async valid=>{
            if(valid){
              let res; 
               res = await editMember(this.forminfo)
           

          if(res.code==200){
               this.$message.success(res.msg)
               this.info.isShow=false
        this.$emit('update')
            this.cancel()
           }else{
               this.$message.error(res.msg);
              this.reset()
           }   
            }
        })
    
         
       
     },
     reset(){
         
             this.setinfo({...defaultItem})
         
        
     },
     setinfo(val){
        val.password=''
         defaultItem={...val}
         this.forminfo={...val}
     },
     cancel(){
          this.forminfo={...resetItem}
        
     }
 },
 components:{}
}

</script>
<style scoped>
</style>