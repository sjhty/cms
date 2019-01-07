<template>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-active="defaultActiveIndex" router :collapse="collapsed" @select="handleSelect">
            <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
                <el-submenu v-if="!item.leaf" :index="index+''">
                    <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
                    <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path" v-if="subItem.menuShow" 
                        :class="$route.path==subItem.path?'is-active':''">
                        <i :class="subItem.iconCls"></i><span slot="title">{{subItem.name}}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path"
                          :class="$route.path==item.children[0].path?'is-active':''">
                    <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </el-aside>
</template>
<script>
export default {
    data() {
        return {
            defaultActiveIndex:'0',
            collapsed:false
        }
    },
    methods: {
        handleSelect(index){
            this.defaultActiveIndex = index;
        },
    }
}
</script>

<style>
.el-aside {
    color: #333;
  }
</style>

