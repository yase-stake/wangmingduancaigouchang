<template>
<el-row class="login-bg" type="flex">
    <el-col :span="8" class="al">
        <h3>小U后台登陆</h3>
        <!-- 登录的输入框 -->
        <el-form :model="formInfo" ref="form" label-width="100px" :rules="rules" >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="formInfo.username" class="p1"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="username">
                <el-input v-model="formInfo.password"  show-password class="p1"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit" class="login-btn">登录</el-button>
              
            </el-form-item>
        </el-form>
        
    </el-col>
</el-row>
</template>

<script>
import {mapActions} from  "vuex"
export default {
 data(){
 return{
     formInfo:{
         username:"刘浩岩",
         password:'admin888'
     },
     rules:{
          username:[{required:true,message:"必填",trigger:'blur'}],
          password:[{required:true,message:"必填",trigger:'blur'}],
     }
 }
 },
 created(){},
 methods:{
     ...mapActions({
         login:"user/login"
     }),
     submit(){
         this.$refs.form.validate(async valid=>{
             if(valid){
                 this.login(this.formInfo)
             }
         })
     }
 },
 components:{}
}

</script>
<style scoped>
/* 设置大界面背景  布局*/
.login-bg{ 
    width: 100vw;
    height: 100vh;
 justify-content: center;
 align-items: center;

background:url(../assets/img/loginbg.jpg)no-repeat;
background-size:100% 100%;
}
/* 登录框 */
.al{
    box-shadow: 0 0 0 3px;
    background: #999;
    opacity: 0.8;
    border-radius: 20px;
}
.al h3{
    padding: 10px;
    margin-bottom: 20px;
    text-align: center;
}
.login-btn{
display:block;
width: 300px;
}
</style>