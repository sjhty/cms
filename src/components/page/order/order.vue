<template>
  <div id="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">订单管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户下单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="form-border" :model="orderForm" ref="orderForm">
      <el-breadcrumb class="clearfloat">
        <el-breadcrumb-item>基本信息</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="mainCon clearfloat">
        <el-form-item>
          <el-col :span="6">
            <el-form-item label="收件人姓名">
              <el-col :span="14">
                <el-input placeholder="请输入收件人姓名" v-model="orderForm.consignee"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收件人类型">
              <el-col :span="12">
                <el-select v-model="orderForm.consigneeType" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-table
            :data="orderProductData"
            style="width: 80%"
            border
            show-summary
            :summary-method="getSummaries"
          >
            <el-table-column prop="id" label="商品ID" align="center"></el-table-column>
            <el-table-column prop="title" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="size" label="商品规格" align="center"></el-table-column>
            <el-table-column prop="relPrice" label="拿货价" align="center" width="100" ng-if=""></el-table-column>
            <el-table-column prop="num" label="下单数量" align="center" width="100"></el-table-column>
            <el-table-column prop="amount" label="金额" align="center" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button @click="updateOrderProduct(scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="deleteOrderProduct(scope.$index)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-col>
            <el-button type="primary" @click="submitOrder('orderForm')">提交订单</el-button>
          </el-col>
        </el-form-item>
      </div>
      <el-breadcrumb class="clearfloat">
        <el-breadcrumb-item>请选择下单商品</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="mainCon clearfloat">
        <el-col :span="6">
          <el-form-item label="商品名称">
            <el-col :span="14">
              <el-input placeholder="请输入商品名称" v-model="orderForm.title"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search" @click="searchProduct('orderForm')">搜索</el-button>
        </el-col>
        <el-table :data="productData" style="width: 100%" border>
          <el-table-column prop="id" label="商品ID" align="center" width="80"></el-table-column>
          <el-table-column prop="title" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="price" label="零售价" align="center" width="80"></el-table-column>
          <el-table-column prop="minister_price" label="部长拿货价" align="center" width="80"></el-table-column>
          <el-table-column prop="director_price" label="理事拿货价" align="center" width="80"></el-table-column>
          <el-table-column prop="president_price" label="社长拿货价" align="center" width="80"></el-table-column>
          <el-table-column prop="size" label="规格" align="center" width="50"></el-table-column>
          <el-table-column prop="stock" label="库存" align="center" width="50"></el-table-column>
          <el-table-column prop="supplier" label="供货商" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button @click="showDialog(scope.row,'add')" type="text" size="small">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <el-dialog title="添加下单商品" :visible.sync="productFormVisible" width="40%">
      <el-form :model="productForm" ref="productForm" style="border:none">
        <el-form-item label="商品名称">
          <el-col :span="16">
            <label>{{productForm.title}} {{productForm.size}}</label>
          </el-col>
        </el-form-item>
        <el-form-item label="剩余库存">
          <el-col :span="16">
            <label>{{productForm.relStock}}</label>
          </el-col>
        </el-form-item>
        <el-form-item label="拿货价">
          <el-col :span="16">
            <el-input v-model="productForm.relPrice" autocomplete="off" placeholder="请填写商品价格" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="购买数量">
          <el-col :span="16">
            <el-input v-model="productForm.num" autocomplete="off" placeholder="请填写购买数量"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="productFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrderProduct('productForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderProductData: [],
      productData: [],
      options: [
        {
          value: "1",
          label: "顾客"
        },
        {
          value: "2",
          label: "部长"
        },
        {
          value: "3",
          label: "理事"
        },
        {
          value: "4",
          label: "社长"
        },
      ],
      productForm: {
        id: 0,
        title: "",
        size: "",
        relPrice: 0,
        relStock: 0,
        num: 0
      },
      orderForm: {
        consignee: "",
        consigneeType: "1",
        title: "",
        orderProduct: [],
        totalAmount: 0
      },
      productFormVisible: false
    };
  },
  methods: {
    getSummaries(param) {
      const self = this;
      const { columns, data } = param;
      const sums = [];
      let values = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总金额";
          return;
        }
        if (column.property == "amount") {
          values = data.map(item => Number(item[column.property]));
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";

          self.orderForm.totalAmount = sums[index].replace(" 元", "");
        } else {
          sums[index] = "--";
        }
      });

      return sums;
    },

    searchProduct(formName) {
      const self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          self.$http
            .post("/api/product/searchProduct", JSON.stringify(self.orderForm))
            .then(response => {
              self.productData = response.body;
            })
            .then(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    showDialog(row,option) {
      const self = this;
      self.productForm = row;
      if (self.orderForm.consigneeType == "1"){
          self.productForm.relPrice = row.price;
      } else if (self.orderForm.consigneeType == "2"){
          self.productForm.relPrice = row.minister_price;
      } else if (self.orderForm.consigneeType == "3"){
          self.productForm.relPrice = row.director_price;
      } else if (self.orderForm.consigneeType == "4"){
          self.productForm.relPrice = row.president_price;
      }

      if (option == "add"){
          self.productForm.relStock = row.stock
      }
      
      self.productFormVisible = true;
    },

    addOrderProduct(formName) {
      const self = this;
      let flag = true;
      if (typeof self.productForm.num == "undefined") {
        this.$message({
          showClose: true,
          message: "请填写购买数量",
          type: "error"
        });

        return;
      }
      self.productForm.amount = self.productForm.relPrice * self.productForm.num;
      self.productForm.relStock = self.productForm.stock - self.productForm.num;
      self.orderProductData.forEach(function(pro, index) {
        if (pro.id == self.productForm.id) {
          self.orderProductData.splice(index,1)
        }
      });

      self.orderProductData.push(self.productForm);

      self.productFormVisible = false;
    },

    deleteOrderProduct(index) {
      const self = this;
      let tempData = self.orderProductData;
      tempData.splice(index, 1);
      self.orderProductData = tempData;
    },

    updateOrderProduct(row) {
      const self = this;
      self.showDialog(row,'update');
    },

    submitOrder(formName) {
      const self = this;
      if (self.orderForm.consignee == "") {
        this.$message({
          showClose: true,
          message: "请填写收件人姓名",
          type: "error"
        });

        return;
      }

      if (self.orderForm.consigneeType == "") {
        this.$message({
          showClose: true,
          message: "请选择收件人类型",
          type: "error"
        });

        return;
      }
      if (self.orderProductData.length <= 0) {
        this.$message({
          showClose: true,
          message: "请添加下单商品",
          type: "error"
        });

        return;
      }

      self.orderForm.orderProduct = JSON.stringify(self.orderProductData);

      self.$refs[formName].validate(valid => {
        if (valid) {
          self.$http
            .post("/api/order/addOrder", JSON.stringify(self.orderForm))
            .then(response => {
              self.orderProductData.forEach(function(orderData, index) {
                self.$http
                  .post(
                    "/api/product/updateProductById",
                    JSON.stringify(orderData)
                  )
                  .then(response => {
                    self.$message({
                      showClose: true,
                      message: "下单成功",
                      type: "success"
                    });
                    window.location = "/#/order/list";
                  })
                  .then(error => {
                    console.log(error);
                  });
              });
            })
            .then(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    dateFormat(row, column) {
      let tempTime = row.createTime;
      return tempTime.replace("T", " ").replace(".000Z", "");
    }
  }
};
</script>

<style>
#container {
  padding: 10px;
  width: 100%;
}
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
}
.el-form {
  border: 1px solid #f5f5f5;
  height: auto;
  clear: both;
}
.el-breadcrumb {
  padding: 8px 15px;
  margin-bottom: 20px;
  list-style: none;
  background-color: #f5f5f5;
  border-radius: 4px;
}
.mainCon {
  padding: 0 20px 20px 20px;
}
.form-border {
  border: 1px solid #dcdfe6;
}
.serchParam {
  background: #f5f5f5;
  padding: 20px 10px;
  height: auto;
}
</style>
