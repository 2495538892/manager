<template>
  <div class="users-content">
    <!-- 面包屑 -->
    <div class="bread-header">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 输入框和添加用户  -->
    <div class="users-btn">
      <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="success" plain>成功按钮</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <div class="tabled">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="344"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="113"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="113"></el-table-column>
        <el-table-column prop="add_time" label=" 创建时间" width="228">
          <template slot-scope="scope">{{scope.row.add_time|Formtime}}</template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit"
              plain
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              icon="el-icon-delete"
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :current-page="Goodsdata.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="Goodsdata.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "goods",
  data: function() {
    return {
      tableData: [],
      Goodsdata: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      total:0
    };
  },
  methods: {
    getgoods() {
      this.$request.getGoods(this.Goodsdata).then(res => {
        console.log(res);
        this.tableData = res.data.data.goods;
        this.total=res.data.data.total
      });
    },
    handleSizeChange(val) {
      this.Goodsdata.pagesize = val;
      this.getgoods();
    },
    handleCurrentChange(val) {
      this.Goodsdata.pagenum = val;
      this.getgoods();
    }
  },
  created() {
    this.getgoods();
    console.log(this.Goodsdata);
  },
  filters: {
    Formtime(val) {
      console.log(val);
      return moment(val).format("YYYY年MM月DD日");
    }
  }
};
</script>

<style lang='scss'>
.bread-header {
  height: 40px;
  background: #ddddee;
  .bread {
    line-height: 40px;
  }
}
.users-btn {
  margin: 5px 0;
}
</style>
