<template>
  <div class="users-content">
    <!-- 面包屑 -->
    <div class="bread-header">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类参数</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 提示 -->
    <div class="params-alert">
      <el-alert title="注意:只允许为三级分类设置相关参数" type="warning" show-icon></el-alert>
    </div>

    <!-- 联级 -->
    <div class="params-cascader">
      <span class="text">请选择商品风类:</span>
      <el-cascader expand-trigger="hover" :options="options" @change="change" :props="props"></el-cascader>
    </div>

    <!-- tab栏 -->
    <div class="parms-tab">
      <el-tabs v-model="activeName">
        <el-tab-pane label="动态参数" name="first">
          <el-table :data="dynamic" style="width: 100%" border>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="attr_vals" label="商品参数" width="350"></el-table-column>
            <el-table-column prop="address" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="second">
          <el-table :data="Static" style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称" width="180"></el-table-column>
            <el-table-column prop="attr_vals" label="属性值" width="180"></el-table-column>
            <el-table-column prop="address" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "params",
  data: function() {
    return {
      Static: [],
      dynamic: [],
      // 联级的数据
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      selectedOptions2: [],
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      // tab栏的数据
      activeName: "first"
    };
  },
  methods: {
    // 级联选择器提供的获取选择后的值;
    change(val) {
      console.log(val);
      // 获取静态参数或者动态参数传递的id只需要最后一个id就可以了.因为最后一个才是商品;
      const id = val[2];
      // 获取静态参数
      this.$request.getStatic(id).then(res => {
        console.log(res);
        this.Static = res.data.data;
      });
      // 获取动态参数
      this.$request.getDynamic(id).then(res => {
        console.log(res);
        this.dynamic = res.data.data;
      });
    }
  },
  created() {
    // 获取商品分类的数据,作为级联菜单的数据;
    this.$request.getCategories().then(res => {
      console.log(res);
      this.options = res.data.data;
    });
  }
};
</script>

<style lang='scss'>
.bread-header {
  height: 40px;
  background: #ddddee;
  margin-bottom: 20px;
  .bread {
    line-height: 40px;
  }
}
.params-alert {
  margin-bottom: 20px;
}

.params-cascader {
  margin-bottom: 20px;
  .text {
    margin-right: 20px;
  }
}
</style>
