<template>
 <div  class="tageslist">

     <el-scrollbar class="scroll-bar">
         <el-tag
	 class="item"
  v-for="(tag,index) in taglist"
  :key="tag.path"
  size="small"
  closable
  @close="clearSingle(tag.path,index)"
  effect="dark"
  :type="isActive(tag.path)?'':'info'">
  <router-link :to="tag.path">{{tag.name}}</router-link>
</el-tag>
     </el-scrollbar>
	 <el-dropdown class="tagaction" split-button type="primary" size="mini">
标签操作
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item @click.native="DEL_ALL">关闭所有</el-dropdown-item>
    <el-dropdown-item @click.native="DEL_OTHER_ALL($route.fullPath)">关闭其他</el-dropdown-item>
   
  </el-dropdown-menu>
</el-dropdown>
 </div>
</template>

<script>
import {mapMutations,mapGetters} from "vuex"
import router from "@/router"
export default {
 data(){
 return{ 
	
 }
 },
 watch: {
	 $route:{
		 immediate:true,
		 deep:true,
		 handler(newval){
			 console.log(newval.fullPath)
			 //传入当前地址信息，加入标签数组
			 this.SET_TAGS(newval)
		 }
		 
	 }
 },
 created(){},
 computed: {
	 ...mapGetters({
		 taglist:"tagsview/taglist"
	 })
 },
 methods:{
	 ...mapMutations({
		 SET_TAGS:"tagsview/SET_TAGS",
		DEL_TAGS:"tagsview/DEL_TAGS",
		DEL_ALL:"tagsview/DEL_ALL",
		DEL_OTHER_ALL:"tagsview/DEL_OTHER_ALL"
	 }),
	 isActive(path){
		 return path==this.$route.fullPath
	 },
	
	closeOtherAll(){},
	 clearSingle(path,index){
		 if(this.$route.fullPath===path){
			this.DEL_TAGS({index,isActive:true})

		 }else{
			 	this.DEL_TAGS({index})
		 }
	 }
 },
 components:{}
}

</script>
<style scoped>
.tageslist{
width: 100%;
position: absolute;
left: 0;
top:0;
line-height: 40px;
height: 40px;
background-color: #fff;
box-shadow: 0 0 4px 0 rgba(0, 0, 0,0.3);
padding: 60px 0px 0px 0px;
z-index: 80;
}
.tageslist .item{
	margin-top: 4px 4px 0;
}
.tageslist .item a{
	text-decoration: none;
	color: inherit;
}
.tagaction{
	position:absolute;
	right:0;
	top:0;
	margin-top: 60px;
}
</style>