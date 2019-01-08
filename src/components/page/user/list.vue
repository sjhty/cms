<template>
  <div id="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="form-border">
      <div class="serchParam">
        <el-col :span="6">
          <el-form-item label="用户名">
            <el-col :span="30">
              <el-input placeholder="请输入用户名"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="userFormVisible = true"
          >添加用户</el-button>
        </el-col>
      </div>
    </el-form>
    <el-table :data="userData" style="width: 100%" border>
      <el-table-column prop="id" label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="name" label="用户名" align="center"></el-table-column>
      <el-table-column prop="realName" label="真实姓名" align="center"></el-table-column>
      <el-table-column prop="PINCodes" label="身份证号" align="center"></el-table-column>
      <el-table-column prop="agentLevel" label="代理级别" align="center" width="50"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
      <el-table-column prop="phone" label="电话" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center" width="50"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
      <el-table-column prop="modifyTime" label="修改日期" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加用户" :visible.sync="userFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="form.realName" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="form.PINCodes" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="代理级别" :label-width="formLabelWidth">
          <el-col :span="12">
            <el-select v-model="form.agentLevel" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="form.sex" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: [
        {
          id: 1,
          name: "鲁尼",
          realName: "维恩鲁尼",
          sex: "男",
          email: "luni@163.com",
          phone: "13671892873",
          agentLevel: "课长",
          createTime: "2019-01-08 13:49:30",
          modifyTime: ""
        },
        {
          id: 2,
          name: "吉格斯",
          realName: "瑞安吉格斯",
          sex: "男",
          email: "jigesi@163.com",
          phone: "13671892873",
          agentLevel: "部长",
          createTime: "2019-01-08 13:49:30",
          modifyTime: ""
        },
        {
          id: 3,
          name: "贝克汉姆",
          realName: "大卫贝克汉姆",
          sex: "男",
          email: "dawei@163.com",
          phone: "13671892873",
          agentLevel: "社长",
          createTime: "2019-01-08 13:49:30",
          modifyTime: ""
        }
      ],
      options: [
        {
          value: "1",
          label: "课长"
        },
        {
          value: "2",
          label: "理事"
        },
        {
          value: "3",
          label: "部长"
        },
        {
          value: "4",
          label: "课长"
        },
        {
          value: "5",
          label: "会长"
        }
      ],
      userFormVisible: false,
      form: {
        name: "",
        realName: "",
        PINCodes: "",
        agentLevel: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleClick() {}
  }
};
</script>

<style>
#container {
  padding: 10px;
  width: 100%;
}
.el-breadcrumb {
  padding: 8px 15px;
  margin-bottom: 20px;
  list-style: none;
  background-color: #f5f5f5;
  border-radius: 4px;
}
.form-border {
  border: 1px solid #dcdfe6;
}
.serchParam {
  background: #f5f5f5;
  padding: 20px 10px;
  height: 40px;
}
</style>
