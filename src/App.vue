<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
@media screen and (min-width: 700px) {
  #app {
    width: 700px;
    margin: 0 auto;
  }
}
</style>
