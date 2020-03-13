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
.button {
  width: 100%;
  display: flex;
  background: #00bec7;
  border-radius: 5px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  color: #fff;
  font-size: 10px;
}
</style>
<script>

</script>
