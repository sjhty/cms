<template>
  <div id="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="form-border" :model="searchForm" ref="searchForm">
      <div class="serchParam">
        <el-form-item>
          <el-col :span="5">
            <el-form-item label="商品ID">
              <el-col :span="15">
                <el-input placeholder="请输入商品ID" v-model="searchForm.id"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="商品名称">
              <el-col :span="35">
                <el-input placeholder="请输入商品名称" v-model="searchForm.title"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="searchProduct('searchForm')">搜索</el-button>
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="productFormVisible = true,button.showAddButton = true,button.showUpdateButton = false,productForm = {}"
            >添加商品</el-button>
          </el-col>
        </el-form-item>
      </div>
    </el-form>
    <el-table :data="userData" style="width: 100%" border>
      <el-table-column prop="id" label="商品ID" align="center" width="80"></el-table-column>
      <!-- <el-table-column prop="sku" label="商品SKU" align="center"></el-table-column> -->
      <el-table-column prop="title" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="price" label="零售价" align="center" width="80"></el-table-column>
      <el-table-column prop="minister_price" label="部长拿货价" align="center" width="80"></el-table-column>
      <el-table-column prop="director_price" label="理事拿货价" align="center" width="80"></el-table-column>
      <el-table-column prop="president_price" label="社长拿货价" align="center" width="80"></el-table-column>
      <el-table-column prop="size" label="规格" align="center" width="50"></el-table-column>
      <el-table-column prop="stock" label="库存" align="center" width="50"></el-table-column>
      <!-- <el-table-column prop="salesType" label="销售类型" align="center"></el-table-column> -->
      <el-table-column prop="supplier" label="供货商" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" align="center" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="modifyTime" label="修改日期" align="center" :formatter="dateFormat"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="searchProductById(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button @click="updateProductById(scope.row.id)" type="text" size="small">修改</el-button>
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加商品" :visible.sync="productFormVisible" width="40%">
      <el-form :model="productForm" ref="productForm">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="productForm.title" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="productForm.size" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="productForm.imgUrl" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="零售价" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="productForm.price" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="部长拿货价" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="productForm.minister_price" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="理事拿货价" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="productForm.director_price" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="社长拿货价" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="productForm.president_price" autocomplete="off"></el-input>
          </el-col>
        </el-form-item> -->
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="productForm.stock" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="供货商" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="productForm.supplier" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="productFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="productAdd('productForm')" v-if="button.showAddButton">添 加</el-button>
        <el-button type="primary" @click="updateproduct('productForm')" v-if="button.showUpdateButton">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: [],
      saleOptions: [
        {
          value: "1",
          label: "代购"
        },
        {
          value: "2",
          label: "艾诗塔"
        }
      ],
      productFormVisible: false,
      searchForm: {
        id: "",
        title: ""
      },
      productForm: {
        title: "",
        size: "",
        imgUrl: "",
        price: 0,
        stock: 0,
        supplier: ""
      },
      formLabelWidth: "120px",
      button: {
        showAddButton: true,
        showUpdateButton: false
      }
    };
  },
  methods: {
    handleClick() {},

    productAdd(formName) {
      const self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          console.log(JSON.stringify(self.productForm));
          self.$http
            .post("/api/product/addProduct", JSON.stringify(self.productForm))
            .then(response => {
              console.log(response);
              self.productFormVisible = false;
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

    searchProduct(formName) {
      const self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          self.$http
            .post("/api/product/searchProduct", JSON.stringify(self.searchForm))
            .then(response => {
              self.userData = response.body;
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

    searchProductById(pid) {
      const self = this;
      self.$http
        .post("/api/product/searchProductById", JSON.stringify({ id: pid }))
        .then(response => {
          console.log(response);
          self.productForm = response.body[0];
          self.productFormVisible = true;
          self.button.showAddButton = false;
        })
        .then(error => {
          console.log(error);
        });
    },

    updateProductById(pid) {
      const self = this;
      self.searchProductById(pid);
      self.button.showUpdateButton = true;
    },

    updateproduct(formName) {
      const self = this;
      self.$http
        .post("/api/product/updateProductById", JSON.stringify(self.productForm))
        .then(response => {
          console.log(response);
          self.searchProduct(formName);
          self.productFormVisible = false;
        })
        .then(error => {
          console.log(error);
        });
    },

    deleteProductById(pid) {
      const self = this;
      self.$http
        .post("/api/product/deteleProductById", JSON.stringify(self.productForm))
        .then(response => {
          console.log(response);
          self.searchProduct(formName);
          self.productFormVisible = false;
        })
        .then(error => {
          console.log(error);
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
  height: auto;
}
</style>
