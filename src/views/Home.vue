<script setup>//setup可以将tableData暴露出去
import { ref, getCurrentInstance, onMounted, reactive } from 'vue'


const { proxy } = getCurrentInstance()
const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href
}

const tableData = ref( [] )
const countData = ref( [] )
const chartData = ref( [] )

const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})

const xOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      legend: {}, //用于配置图例组件，当前为空对象，表示使用默认配置。
      grid: {
        left: "20%", //设置网格的左边距为20%。
      },
      // 提示框
      tooltip: {
        trigger: "axis", //设置提示框的触发方式为“axis”，即按坐标轴触发。
      },
      xAxis: {
        type: "category", // 设置X轴的类型为“category”，即类目轴。
        data: [], //X轴的数据数组，当前为空。
        axisLine: {
          lineStyle: {
            color: "#17b3a3",//设置X轴线的颜色。
          },
        },
        axisLabel: {
          interval: 0, //设置X轴标签的显示间隔，0表示全部显示。
          color: "#333", //设置X轴标签的文字颜色。
        },
      },
      yAxis: [ //是一个数组，可以配置多个Y轴。
        {
          type: "value", //设置Y轴的类型为“value”，即数值轴。
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"], //设置图表的颜色序列，用于不同系列的区分。
      series: [],//存储图表的数据系列
})

const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {},
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: []
})

const getTableData = async () => {
  const data = await proxy.$api.getTableData()
  tableData.value = data.tableData
}

const getCountData = async () => {
  const data = await proxy.$api.getCountData()
  countData.value = data
}

const getChartData = async () => {
  const data = await proxy.$api.getChartData()
  console.log(data)
  chartData.value = data
}

onMounted( () => {
  getTableData()
  getCountData()
  getChartData()
} )
</script>

<template>
  <el-row class="home" :gutter = "20">
    <el-col :span = "8" style="margin-top: 20px">
      <el-card shadow = "hover">
        <div class="user">
          <img :src="getImageUrl('user')" class = "user"/>
          <div class="user-info">
            <p class="user-info-admin">Admin</p>
            <p class="user-info-p">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2024-11-6</span></p>
          <p>上次登录地点: <span>北京</span></p>
        </div>
      </el-card>

      <el-card shadow = "hover" class="user-table">
        <el-table :data = "tableData">
          //prop是表格数据对应的字段类
          <el-table-column
            v-for = "(val, key) in tableLabel"
            :key = "key" 
            :prop = "key"
            :label = "val"
          >
        
          </el-table-column>
        </el-table>
      </el-card>

    </el-col>
    
    <el-col :span = "16" style="margin-top: 20px">
      <div class="num">
        <el-card
          :body-style = "{display: 'flex', padding: 0}"
          v-for="item in countData"
          :key="item.name"
        >
          <component :is="item.icon" class="icons" :style = "{background: item.color}"></component>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>  <!-- 双大括号 {{ }} 用于插值表达式，即将数据动态地插入到模板中。 -->
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="less">
  .home{
    height: 100%;
    overflow: hidden;
    .user{
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      img{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;
      }
      .user-info{
        p{
          line-height: 40px;
        }
        .user-info-p{
          color: #999;
        }
        .user-info-admin{
          font-size: 35px;
        }
      }
    }
    .login-info{
      p{
        line-height: 30px;
        font-size: 14px;
        color: #999;
        span{
          color: #666;
          margin-left: 60px;
        }
      }
      
    }
    .user-table{
      margin-top: 20px;
    }
    .num{
      display: flex;
      flex-wrap: wrap; //它的功能是允许弹性容器内的子元素在必要时换行显示
      justify-content: space-between;
      .el-card{
        width: 32%;
        margin-bottom: 20px;
      }
      .icons{
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
      }
      .detail{
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .num{
          font-size: 30px;
          margin-bottom: 10px;
        }
        .txt{
          font-size: 15px;
          text-align: center;
          color: #999;
        }
      }
    }
  }

</style>