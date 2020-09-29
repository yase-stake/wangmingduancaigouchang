<template>
 <div> 
     <h3 class="logo">小U商城</h3>
    <el-menu 
    class="page-menu"  
    background-color="#444" 
    text-color="#fff"
     router
      :default-active="$router.path" 
      :collapse="iscollapse"
    >
     <el-menu-item  index="/index"><i class="el-icon-house"></i> <span slot="title">后台首页</span></el-menu-item>
       <template v-for="(item,index) in menus" >
                 <el-menu-item v-if="!item.children && item.type==2" index="item.url"><i :class="item.icon"></i> <span slot="title">{{item.title}}</span></el-menu-item>
        
        <el-submenu v-else :index="index+''">
            <template  slot="title"><i class="item.icon"></i><span slot="title">{{item.title}}</span></template>
           <el-menu-item v-for="(val,idx) in item.children" :index="val.url" :key="idx"><i :class="val.icon"></i>{{val.title}}</el-menu-item>
             
        </el-submenu>

       </template>
        <!-- <el-menu-item index="/index"><i class="el-icon-house"></i> <span slot="title">后台首页</span></el-menu-item>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-setting"></i><span slot="title">系统设置</span></template>
           <el-menu-item index="/menu"><i class=""></i>菜单管理</el-menu-item>
               <el-menu-item index="/role"><i class=""></i>角色管理</el-menu-item>
               <el-menu-item index="/user"><i class=""></i>管理员管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title"> <i class="el-icon-setting"></i><span slot="title">商城管理</span> </template>
           <el-menu-item index="3-1">分类管理</el-menu-item>
               <el-menu-item index="3-2">规格管理</el-menu-item>
               <el-menu-item index="3-3">商品管理</el-menu-item>
               <el-menu-item index="3-4">会员管理</el-menu-item>
               <el-menu-item index="3-5">轮播图管理</el-menu-item>
               <el-menu-item index="3-6">秒杀管理</el-menu-item>
        </el-submenu> -->
        
    </el-menu>
     
 </div>
</template>

<script>
import {mapState,mapGetters} from "vuex"
export default {
 data(){
 return{}
 },
 created(){
     console.log(this)
 },
 computed: {
     ...mapState(["iscollapse"]),
     ...mapGetters({
         menus:"user/menus"

     })
 },
 methods:{},
 components:{}
}

</script>
<style scoped>
.logo{ 
    line-height: 60px;
    text-align: center;
    background-color: #666;
    white-space: nowrap;
    overflow: hidden;
}
.page-menu{
    border-right: none;
}
</style>