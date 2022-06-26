<template>
  <div id="app">
    <keep-alive include="layoutIndex">
      <router-view/>
    </keep-alive>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less">
</style>
