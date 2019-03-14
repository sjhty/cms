<template>
  <div id="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">商品管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品分类查询</el-breadcrumb-item>
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
                <el-input placeholder="请输入商品名称" v-model="searchForm.catefory_name"></el-input>
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
      <el-table-column prop="id" label="品类ID" align="center" width="80"></el-table-column>
      <!-- <el-table-column prop="sku" label="商品SKU" align="center"></el-table-column> -->
      <el-table-column prop="category_name" label="品类名称" align="center"></el-table-column>
      <el-table-column prop="price" label="零售价" align="center"></el-table-column>
      <el-table-column prop="minister_price" label="部长拿货价" align="center"></el-table-column>
      <el-table-column prop="director_price" label="理事拿货价" align="center"></el-table-column>
      <el-table-column prop="president_price" label="社长拿货价" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="searchProductById(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button @click="updateProductById(scope.row.id)" type="text" size="small">修改</el-button>
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加品类" :visible.sync="productFormVisible" width="40%">
      <el-form :model="productForm" ref="productForm">
        <el-form-item label="品类名称" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="productForm.category_name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="零售价" :label-width="formLabelWidth">
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
        category_name: ""
      },
      productForm: {
        category_name: "",
        price: 0,
        minister_price: 0,
        director_price: 0,
        president_price: 0
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
            .post("/api/category/addCategory", JSON.stringify(self.productForm))
            .then(response => {
              console.log(response);
              self.productFormVisible = false;
              self.searchProduct(formName)
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
            .post("/api/category/searchCategory", JSON.stringify(self.searchForm))
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
        .post("/api/category/searchCategoryById", JSON.stringify({ id: pid }))
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
        .post("/api/category/updateCategoryById", JSON.stringify(self.productForm))
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
        .post("/api/category/deteleCategoryById", JSON.stringify(self.productForm))
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
