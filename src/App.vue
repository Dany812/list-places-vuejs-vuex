<template>
  <div id="app">
    <h1>Тестовое задание - Список мест</h1>
    <hr>
    <Map></Map>
    <Add></Add>
    <List></List>
  </div>
</template>

<script>
import Map from './components/Map.vue'
import Add from './components/Add.vue'
import List from './components/List.vue'

export default {
  name: 'app',
  components: {
    Map, 
    Add,
    List
  }
}
</script>

<style src="./style/app.css"></style>
