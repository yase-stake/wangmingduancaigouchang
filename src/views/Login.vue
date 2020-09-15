<template>
<el-row class="login-bg" type="flex">
    <el-col :span="8" class="al">
        <h3>小U后台登陆</h3>
        <!-- 登录的输入框 -->
        <el-form :model="formInfo" ref="form" label-width="100px" >
            <el-form-item label="用户名">
                <el-input v-model="formInfo.username" class="p1"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formInfo.password"  show-password class="p1"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" class="login-btn">登录</el-button>
              
            </el-form-item>
        </el-form>
        
    </el-col>
</el-row>
</template>

<script>
export default {
 data(){
 return{
     formInfo:{
         username:"",
         password:''
     }
 }
 },
 created(){},
 methods:{
     onSubmit(){
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