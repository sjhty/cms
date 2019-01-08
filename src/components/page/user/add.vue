<template>
    <div id="container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>添加用户</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form>
            <el-breadcrumb>
                <el-breadcrumb-item>基本信息</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="mainCon">
                <el-form-item label="用户名">
                    <el-col :span="6">
                        <el-input placeholder="请输入用户名"></el-input>
                    </el-col>
                </el-form-item>
            </div>
            
        </el-form>
    </div>
</template>
<style>
#container {padding: 10px;width: 100%;}
.el-breadcrumb {
    padding: 8px 15px;
    margin-bottom: 20px;
    list-style: none;
    background-color: #f5f5f5;
    border-radius: 4px;
 }
 .el-form {border: 1px solid #dcdfe6;}
 .mainCon {padding: 20px;}
</style>
