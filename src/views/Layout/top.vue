<template>
  <div class="headers">
    <div class="lt">
      <el-button type="primary" v-if="iscollapse" size="small"  @click="TOGGLE" class="toggle-btn" icon="el-icon-s-unfold"></el-button>
      <el-button type="primary"  v-else  @click="TOGGLE" size="small" class="toggle-btn" icon="el-icon-s-fold"></el-button>
      
      <el-breadcrumb separator="/" style="margin-left:20px" class="mbx">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button icon="el-icon-back" v-if="$route.path!='/index'" @click="$router.back()" size="small" style="margin-left:20px" circle></el-button>
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{username}}你好
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  @click.native='clickFullscreen'>
            <i class="el-icon-full-screen"></i>{{isFullscreen?'退出全屏':'全屏操作'}} 
          </el-dropdown-item>
          <el-dropdown-item @click.native="quit">
            <i class="el-icon-switch-button"></i> 退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations,mapGetters, mapActions} from "vuex"
import screenfull from 'screenfull'

export default {
  data() {
    return {
      isFullscreen: false
    };
  },
  created() {
    
  },
  computed: {
    ...mapState(["iscollapse"]),
    ...mapGetters({
      username:"user/username"
    })
  },
  methods: {
    ...mapMutations({
      TOGGLE:"TOGGLE",
      QUIT:"user/QUIT"
    }),
    ...mapActions({
      quit:"user/quit"
    }),
       clickFullscreen(){
        if (!screenfull.isEnabled) {
          this.$message.warning("您的浏览器不支持")
          return false
        }
        this.isFullscreen=!this.isFullscreen
        screenfull.toggle()
      }
  },
  components: {},
};
</script>
<style scoped>
.headers {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;

}
.lt {
  display: flex;
  align-items: center;
}
</style>