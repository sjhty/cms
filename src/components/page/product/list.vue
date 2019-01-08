<template>
  <div id="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="form-border">
      <div class="serchParam">
        <el-form-item>
          <el-col :span="5">
            <el-form-item label="商品ID">
              <el-col :span="15">
                <el-input placeholder="请输入商品ID"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="商品SKU">
              <el-col :span="17">
                <el-input placeholder="请输入商品SKU"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="商品名称">
              <el-col :span="35">
                <el-input placeholder="请输入商品名称"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="销售类型">
              <el-col :span="12">
                <el-select v-model="form.salesType" placeholder="请选择">
                  <el-option
                    v-for="item in saleOptions"
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
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="productFormVisible = true"
            >添加商品</el-button>
          </el-col>
        </el-form-item>
      </div>
    </el-form>
    <el-table :data="userData" style="width: 100%" border>
      <el-table-column prop="id" label="商品ID" align="center" width="50"></el-table-column>
      <el-table-column prop="sku" label="商品SKU" align="center"></el-table-column>
      <el-table-column prop="title" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="price" label="零售价" align="center"></el-table-column>
      <el-table-column prop="size" label="规格" align="center" width="50"></el-table-column>
      <el-table-column prop="stock" label="库存" align="center" width="50"></el-table-column>
      <el-table-column prop="salesType" label="销售类型" align="center"></el-table-column>
      <el-table-column prop="supplier" label="供货商" align="center"></el-table-column>
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
    <el-dialog title="添加商品" :visible.sync="productFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="销售类型" :label-width="formLabelWidth">
          <el-col :span="12">
            <el-select v-model="form.salesType" placeholder="请选择">
              <el-option
                v-for="item in saleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="form.size" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="零售价" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="供货商" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="form.supplier" autocomplete="off"></el-input>
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
          sku: "40000340020",
          title: "樱桃裤",
          price: "120",
          size: "红黑 X",
          stock: "100",
          salesType: "艾诗塔",
          supplier: "艾诗塔",
          createTime: "2019-01-08 13:49:30",
          modifyTime: ""
        },
        {
          id: 2,
          sku: "40000340021",
          title: "坚果裤",
          price: "220",
          size: "红黑 X",
          stock: "100",
          salesType: "艾诗塔",
          supplier: "艾诗塔",
          createTime: "2019-01-08 13:49:30",
          modifyTime: ""
        },
        {
          id: 3,
          sku: "40000340022",
          title: "润肤衣",
          price: "320",
          size: "肤色 X",
          stock: "100",
          salesType: "艾诗塔",
          supplier: "艾诗塔",
          createTime: "2019-01-08 13:49:30",
          modifyTime: ""
        },
      ],
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
      form: {
        name: "",
        salesType: "",
        size: "",
        price: "",
        supplier: ""
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
  height: auto;
}
</style>
