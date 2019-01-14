<template>
  <div id="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="form-border" :model="orderForm" ref="orderForm">
      <div class="serchParam">
        <el-col :span="6">
          <el-form-item label="收件人">
            <el-col :span="30">
              <el-input v-model="orderForm.consignee" placeholder="请输入收件人"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search" @click="searchOrder('orderForm')">搜索</el-button>
        </el-col>
      </div>
    </el-form>
    <el-table :data="orderData" style="width: 100%" border>
      <el-table-column prop="id" label="订单号" align="center"></el-table-column>
      <el-table-column prop="consignee" label="收件人" align="center"></el-table-column>
      <el-table-column prop="consigneeType" label="收件人类型" align="center" :formatter="typeFormat"></el-table-column>
      <el-table-column prop="totalAmount" label="总金额" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" align="center" :formatter="dateFormat"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="订单详情" :visible.sync="orderFormVisible" width="40%">
      <el-form-item label="收件人" :label-width="formLabelWidth">
        <el-col :span="16"></el-col>
      </el-form-item>
      <el-form-item label="收件人类型" :label-width="formLabelWidth">
        <el-col :span="16"></el-col>
      </el-form-item>
      <el-table :data="orderData" style="width: 100%" border>
        <el-table-column prop="id" label="订单号" align="center"></el-table-column>
        <el-table-column prop="consignee" label="收件人" align="center"></el-table-column>
        <el-table-column prop="consigneeType" label="收件人类型" align="center"></el-table-column>
        <el-table-column prop="totalAmount" label="总金额" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建日期" align="center" :formatter="dateFormat"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      orderData: [],
      orderForm: {
        consignee:""
      },
      orderFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    searchOrder(id) {
      const self = this;
          self.$http
            .post("/api/order/searchOrder", JSON.stringify(self.orderForm))
            .then(response => {
              self.orderData = response.body;
            })
            .then(error => {
              console.log(error);
            });
        
    },

    handleClick(row) {
        let oid = {id:row.id};
        self.$http
            .post("/api/order/searchOrder", JSON.stringify(oid))
            .then(response => {
              self.orderData = response.body;
            })
            .then(error => {
              console.log(error);
            });
    },

    dateFormat(row, column) {
      let tempTime = row.createTime;
      return tempTime.replace("T", " ").replace(".000Z", "");
    },

    typeFormat(row, column) {
      let tempType = row.consigneeType;
      if (tempType == '1') {
          return "代理"
      } else if (tempType == '2') {
          return "顾客"
      }
      
    }
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
