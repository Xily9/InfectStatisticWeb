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
</style>
<script>
import ECharts from "vue-echarts";
import VueDatepickerLocal from "vue-datepicker-local";
import logData from "../config/logData";
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
    }
  },
  data() {
    return {
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
      }
    };
  }
};
</script>