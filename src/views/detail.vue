<template>
  <div class="content">
    <div class="back" @click="back">&lt; 疫情地图</div>
    <img :src="img" alt="top" class="top_img" />
    <div class="row">
      <div class="name">{{this.$route.params.province}}</div>
      <vue-datepicker-local v-model="time"></vue-datepicker-local>
    </div>
    <div class="number_container">
      <div class="number_block">
        <div class="number" style="color:#FF6A57">{{number.currentConfirmedCount}}</div>
        <div class="title">现有确诊</div>
      </div>
      <div class="number_block">
        <div class="number" style="color:#E83132">{{number.confirmedCount}}</div>
        <div class="title">累计确诊</div>
      </div>
      <div class="number_block">
        <div class="number" style="color:#10AEB5">{{number.curedCount}}</div>
        <div class="title">累计治愈</div>
      </div>
      <div class="number_block">
        <div class="number" style="color:#4D5054">{{number.deadCount}}</div>
        <div class="title">累计死亡</div>
      </div>
    </div>
    <v-chart :options="line" class="chart" />
    <div class="buttons_container">
      <div class="button" :class="type=='infected'?'checked':''" @click="change('infected','累计确诊')">
        累计
        <br />确诊趋势
      </div>
      <div class="button" :class="type=='cure'?'checked':''" @click="change('cure','累计治愈')">
        累计
        <br />治愈趋势
      </div>
      <div class="button" :class="type=='death'?'checked':''" @click="change('death','累计死亡')">
        累计
        <br />死亡趋势
      </div>
    </div>
  </div>
</template>
<style>
.top_img {
  width: 100%;
}
.back {
  display: flex;
  align-self: flex-start;
  padding: 12px;
  flex-direction: row;
  align-items: center;
}
.row {
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  padding: 16px;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
.chart {
  width: 100%;
  margin-top: 30px;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.name {
  font-size: 18px;
  color: #000;
  font-weight: bold;
}
.update_time {
  margin-left: 10px;
  color: #aaa;
  font-size: 12px;
  display: flex;
  flex: 1;
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
.number_block > .title {
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
.buttons_container {
  padding: 10px;
  display: flex;
  flex: 1;
  width: 100%;
}
.buttons_container .button {
  width: 100%;
  display: flex;
  background: #f5f6f7;
  border-radius: 5px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  color: #707070;
  font-size: 10px;
}
.buttons_container .checked {
  background: #00bec7;
  color: #fff;
}
</style>
<script>
import ECharts from "vue-echarts";
import VueDatepickerLocal from "vue-datepicker-local";
import "echarts/lib/component/tooltip";
import "echarts/lib/chart/line";
import "echarts/lib/component/title";
import logData from "../config/logData";
export default {
  components: {
    "v-chart": ECharts,
    VueDatepickerLocal
  },
  watch: {
    time: function() {
      this.analyzeData();
    }
  },
  data() {
    return {
      time: new Date(),
      img: require("../assets/img/u0.png"),
      type: "infected",
      title: "累计确诊",
      number: {
        currentConfirmedCount: 0,
        confirmedCount: 0,
        suspectedCount: 0,
        curedCount: 0,
        deadCount: 0
      },
      line: {
        title: {
          text: ""
        },
        legend: {
          data: ["数值"]
        },
        tooltip: {
          trigger: "axis",
          formatter: "日期：{b}<br/>人数：{c}"
        },
        calculable: true,
        xAxis: [
          {
            axisLine: {
              lineStyle: {
                color: "#CECECE"
              }
            },
            type: "category",
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#CECECE"
              }
            }
          }
        ],
        series: [
          {
            name: "数值",
            type: "line",
            symbol: "none",
            smooth: 0.2,
            color: ["#66AEDE"],
            data: []
          }
        ]
      }
    };
  },
  methods: {
    loadData() {
      this.analyzeData();
      this.drawLine();
    },
    back() {
      this.$router.back();
    },
    analyzeData() {
      if (this.time - new Date(2020, 1, 1) > 0)
        this.time = new Date(2020, 1, 1);
      if (new Date(2020, 0, 19) - this.time > 0)
        this.time = new Date(2020, 0, 19);
      var Y = this.time.getFullYear();
      var M =
        this.time.getMonth() + 1 < 10
          ? "0" + (this.time.getMonth() + 1)
          : this.time.getMonth() + 1;
      var D =
        this.time.getDate() < 10
          ? "0" + this.time.getDate()
          : this.time.getDate();
      let aggregate = logData["aggregate"][Y + "-" + M + "-" + D][this.$route.params.province];
      let augment = logData["augment"][Y + "-" + M + "-" + D][this.$route.params.province];
      if (aggregate != null) {
        this.number.currentConfirmedCount = augment["infected"];
        this.number.confirmedCount = aggregate["infected"];
        this.number.suspectedCount = augment["suspect"];
        this.number.curedCount = aggregate["cure"];
        this.number.deadCount = aggregate["death"];
      } else {
        this.number.currentConfirmedCount = 0;
        this.number.confirmedCount = 0;
        this.number.suspectedCount = 0;
        this.number.curedCount = 0;
        this.number.deadCount = 0;
      }
    },
    drawLine() {
      let keys = [];
      let values = [];
      for (var key in logData["aggregate"]) {
        let date = key.substring(5, 10);
        keys.push(date);
        let tmp = logData["aggregate"][key];
        if (this.$route.params.province in tmp) {
          let value = tmp[this.$route.params.province][this.type];
          values.push(value);
        } else {
          values.push(0);
        }
      }
      this.line.xAxis[0].data = keys;
      this.line.series[0].data = values;
      this.line.title.text =
        this.$route.params.province + " " + this.title + "趋势";
    },
    change(type, title) {
      this.type = type;
      this.title = title;
      this.drawLine();
    }
  },
  mounted() {
    window.onresize = () => {
      if (this.chart) {
        this.chart.resize();
      }
    };
    this.loadData();
  }
};
</script>
