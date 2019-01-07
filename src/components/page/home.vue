<template>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-header style="text-align: right; font-size: 12px;height:80px;">
        <header-top></header-top>
      </el-header>
      <el-container>
          <slide-bar></slide-bar>
          <router-view></router-view>
      </el-container>
    </el-container>
</template>

<style>
.el-header {
    background-color: rgb(238, 241, 246);
    color: #333;
    padding: 10px 20px;
  }
</style>

<script>
  import headerTop from "../common/headerTop";
  import slideBar from "../common/slideBar";
  export default {
    data() {
      return {
        
      }
    },

    components: {headerTop,slideBar}

  };
</script>