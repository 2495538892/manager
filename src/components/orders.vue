<template>
  <div class="users-content">
    <!-- 面包屑 -->
    <div class="bread-header">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 表格 -->
    <div class="tabled">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
        <el-table-column prop="create_time" label="下单时间" width="180">
          <!-- 用过滤器过滤时间 -->
          <template slot-scope="scope">{{scope.row.create_time|formTime}}</template>
        </el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
          <template slot-scope="scope">
            <el-button type="danger" plain v-if="scope.row.pay_status==0">未付款</el-button>
            <el-button type="success" plain v-if="scope.row.pay_status==1">已付款</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货">
          <template slot-scope="scope">{{scope.row.is_send}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              plain
              size="mini"
              @click="editVisible=true"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :current-page="orederData.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="orederData.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <!--编辑-->
    <el-dialog title="编辑订单" :visible.sync="editVisible" class="add">
      <el-form :model="editorderForm" ref="edituserForm">
        <el-form-item label="修改订单地址" label-width="120px">
          <!-- 饿了么提供的省市联动 -->
          <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions2"></el-cascader>

          <!-- 省市联动方法二自定义组件 -->
          <v-distpicker></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px">
          <el-input v-model="editorderForm.location" autocomplete="off" class="add-btn"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editVisible=false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
// 省市联动的数据(先要有级联菜单,然后在导入这个数据)
import options from "../assets/city_data2017_element.js";

// 省市联动方法二(省市插件)
import VDistpicker from "v-distpicker";

export default {
  name: "orders",
  data: function() {
    return {
      tableData: [],
      orederData: {
        pagenum: 1,
        pagesize: 10,
        query: ""
      },
      // 分页
      total: 0,

      //编辑订单
      editVisible: false,
      // 这个原本是options:options
      options,
      selectedOptions2: [],
      editorderForm: {
        location: ""
      }
    };
  },
  created() {
    this.getorders();
  },
  filters: {
    formTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    handleSizeChange(val) {
      this.orederData.pagesize = val;
      this.getorders();
    },
    handleCurrentChange(val) {
      this.orederData.pagenum = val;
      this.getorders();
    },
    getorders() {
      this.$request.getOrders(this.orederData).then(res => {
        console.log(res);
        this.tableData = res.data.data.goods;
        this.total = res.data.data.total;
      });
    },

    // 返回选择好的省市区的值(省市联动插件提供的方法)
    selected(val) {
      console.log(val)
    }
  },

  // 创建省市联动组件
  components: {
    VDistpicker
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
.pagination {
  margin-top: 20px;
}
</style>
