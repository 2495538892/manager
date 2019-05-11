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
    <!-- 视图的容器 -->
    <div id="main" style="height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "users",
  data() {
    return {
      // 视图的数据字段;
      option: {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  // 如果要操作dom元素,就要用mounted这个钩子
  mounted() {
    this.$request.getresport().then(res => {
      console.log(res);
      // 将数据存进一个变量里(返回的数据是一个变量);
      const resportData = res.data.data;
      // 然后遍历这个变量(对象)
      for (const key in resportData) {
        // 因为数据中的只要四个字段,可以选择删掉原数据多余的字段,也可以通过遍历返回的数据去替换原有的数据
        this.option[key] = resportData[key];
      }
      // 替换完后在来渲染页面数据,这个渲染不可以放在请求的外面.因为请求是异步的,如果在外面,请求的同时已经在渲染了,所以更新不了数据;
      var myChart = echarts.init(document.getElementById("main"));
      myChart.setOption(this.option);
    });
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
.imgs {
  img {
    height: 100%;
  }
}
</style>
