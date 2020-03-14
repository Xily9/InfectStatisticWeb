<template>
  <div class="content">
    <img :src="img" alt="top" id="top_img" />
    <div class="row">
      <div class="name">全国疫情</div>
      <vue-datepicker-local v-model="time"></vue-datepicker-local>
    </div>
    <div class="number_container">
      <div class="number_block">
        <div class="number" style="color:#FF6A57">{{number.currentConfirmedCount}}</div>
        <div class="title">现有确诊</div>
      </div>
      <div class="number_block">
        <div class="number" style="color:#EC9217">{{number.suspectedCount}}</div>
        <div class="title">现有疑似</div>
      </div>
      <div class="number_block">
        <div class="number" style="color:#476DA0">{{number.seriousCount}}</div>
        <div class="title">现有重症</div>
      </div>
    </div>
    <div class="number_container">
      <div class="number_block">
        <div class="number" style="color:#E83132">{{number.confirmedCount}}</div>
        <div class="title">累计确诊</div>
      </div>
      <div class="number_block">
        <div class="number" style="color:#10AEB5">{{number.curedCount}}</div>
        <div class="title">累计治愈</div>
      </div>
      <div class="number_block">
        <div class="number" style="color:#4E5054">{{number.deadCount}}</div>
        <div class="title">累计死亡</div>
      </div>
    </div>
    <div class="switch_buttons">
      <div class="button" :class="!isTotal?'checked':''" @click="change(false)">现有确诊</div>
      <div class="button" :class="isTotal?'checked':''" @click="change(true)">累计确诊</div>
    </div>
    <v-chart :options="map" @click="handleClick" class="chart" />
  </div>
</template>
<style>
#top_img {
  width: 100%;
}
.row {
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 16px;
}
.row .name {
  font-size: 18px;
  color: #000;
  font-weight: bold;
}
.chart {
  width: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.number_container {
  padding: 10px;
  display: flex;
  flex: 1;
  width: 100%;
}
.number_block {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.number_block .title {
  font-size: 12px;
  color: #000;
  background: #f2f2f2;
  border-radius: 3px;
  padding: 2px;
  margin: 4px;
}
.number_block .number {
  font-size: 25px;
  color: #f00;
}
.number_block .increase_block {
  display: flex;
  flex-direction: row;
  font-size: 12px;
}
.number_block .increase_block .increase {
  color: #f00;
}
.switch_buttons {
  width: 100%;
  display: flex;
  border-radius: 10px;
  background: #ddd;
  margin: 16px;
  flex-direction: row;
}
.switch_buttons .button {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  font-size: 16px;
  text-align: center;
}
.switch_buttons .checked {
  background: #efefef;
  font-weight: bold;
}
</style>
<script>
import ECharts from "vue-echarts";
import VueDatepickerLocal from "vue-datepicker-local";
import "echarts/lib/chart/map";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/geo";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/dataset";
import chinaMap from "../assets/china.json";
import logData from "../config/logData";
ECharts.registerMap("China", chinaMap);
export default {
  components: {
    "v-chart": ECharts,
    VueDatepickerLocal
  },
  methods: {
    handleClick(params) {
      this.$router.push({
        path: "/detail/" + params.data.name
      });
    },
    loadData() {
      this.analyzeData();
      this.drawMap();
    },
    analyzeData() {
      if (this.time - new Date(2020, 1, 1) > 0)
        this.time = new Date(2020, 1, 1);
      var Y = this.time.getFullYear();
      var M =
        this.time.getMonth() + 1 < 10
          ? "0" + (this.time.getMonth() + 1)
          : this.time.getMonth() + 1;
      var D =
        this.time.getDate() < 10
          ? "0" + this.time.getDate()
          : this.time.getDate();
      let data = logData["aggregate"][Y + "-" + M + "-" + D];
      let aggregate = data["全国"];
      let augment = data["全国"];
      this.number.currentConfirmedCount = aggregate["infected"];
      this.number.confirmedCount = augment["infected"];
      this.number.suspectedCount = aggregate["suspect"];
      this.number.curedCount = aggregate["cure"];
      this.number.deadCount = aggregate["death"];
    },
    drawMap() {
      if (this.time - new Date(2020, 1, 1) > 0)
        this.time = new Date(2020, 1, 1);
      var Y = this.time.getFullYear();
      var M =
        this.time.getMonth() + 1 < 10
          ? "0" + (this.time.getMonth() + 1)
          : this.time.getMonth() + 1;
      var D =
        this.time.getDate() < 10
          ? "0" + this.time.getDate()
          : this.time.getDate();
      let data;
      if (this.isTotal) {
        data = logData["aggregate"][Y + "-" + M + "-" + D];
      } else {
        data = logData["augment"][Y + "-" + M + "-" + D];
      }
      let arr = [];
      for (var key in data) {
        arr.push({ name: key, value: data[key]["infected"] });
      }
      this.map.series[0].data = arr;
    },
    change(isTotal) {
      this.isTotal = isTotal;
      this.drawMap();
    }
  },
  mounted() {
    window.onresize = () => {
      if (this.chart) {
        this.chart.resize();
      }
    };
    this.loadData();
  },
  watch: {
    time: function() {
      this.analyzeData();
      this.drawMap();
    }
  },
  data() {
    return {
      isTotal: false,
      time: new Date(),
      img: require("../assets/img/u0.png"),
      calendar: require("../assets/img/calendar.png"),
      number: {
        updateTime: 0,
        currentConfirmedCount: 0,
        confirmedCount: 0,
        suspectedCount: 0,
        curedCount: 0,
        deadCount: 0,
        seriousCount: 0
      },
      map: {
        tooltip: {
          trigger: "item",
          formatter: "地区：{b}<br/>确诊：{c}"
        },
        visualMap: {
          type: "piecewise",
          itemSymbol: "rect",
          minOpen: true,
          pieces: [
            {
              gte: 10000,
              color: "#660208"
            },
            {
              gte: 1000,
              lte: 9999,
              color: "#8c0d0d"
            },
            {
              gte: 100,
              lte: 999,
              color: "#CC2929"
            },
            {
              gte: 10,
              lte: 99,
              color: "#ff7b69"
            },
            {
              gte: 1,
              lte: 9,
              color: "#ffaa85"
            },
            {
              value: 0,
              color: "#ffffff"
            }
          ],
          showLabel: true
        },
        series: [
          {
            type: "map",
            mapType: "China",
            zoom: 1.2,
            label: {
              show: true,
              fontSize: 6
            },
            data: [],
            clickable: true
          }
        ]
      }
    };
  }
};
</script>