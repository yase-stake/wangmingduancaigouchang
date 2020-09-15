<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
/* 输入框样式 */
.p1{
   width: 300px;
   height: 20px;
   line-height: 20px;
   border-radius: 10%;
 
}
.el-aside{
  overflow: hidden;
  
}
.toggle-btn i{
  font-size: 18px;
}
.el-dialog__header{
  border:solid 1px #ddd ;
  padding: 15px 20px 10px!important;
}

</style>
