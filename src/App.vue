<template>
  <div id="app">
    <main-menu :options="['Plantes', 'Semis', 'Save To Local', 'Load LocalStorage']" :on-click="selectMenu" :selected="selected"></main-menu>
    <csv-table v-if="selected === 'Semis'" :table="table"></csv-table>
    <div style="position:relative; left: 200px; max-width: 80%;" v-if="selected === 'Plantes' && table !== undefined">
      <plant-editor v-for="(plant, idx) in table" :plant="plant" v-on:submit="(edited) => {table[idx] = edited; saveToDatabase()}"></plant-editor>
    </div>
  </div>
</template>

<script>
import PlantEditor from './components/PlantEditor.vue'
import CsvTable from './components/CsvTable.vue'
import MainMenu from './components/MainMenu.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    PlantEditor,
    CsvTable,
    MainMenu
  },
  mounted() {
        this.loadFromDatabase()
  },
  data() { return {
      selected: 'Plantes',
      table: undefined,
      plants: [{name: 'Solanum lycopersicum',commonNames: ['Tomate'],image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Tomatoes-on-the-bush.jpg',seedlingDates: ['mars', 'avril', 'mai'],harvestDates: ['juillet', 'aout', 'septembre'],},{name: 'Solanum lycopersicum',commonNames: ['Tomate'],image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Tomatoes-on-the-bush.jpg',seedlingDates: ['mars', 'avril', 'mai'],harvestDates: ['juillet', 'aout', 'septembre'],},{name: 'Solanum lycopersicum',commonNames: ['Tomate'],image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Tomatoes-on-the-bush.jpg',seedlingDates: ['mars', 'avril', 'mai'],harvestDates: ['juillet', 'aout', 'septembre'],},{name: 'Solanum lycopersicum',commonNames: ['Tomate'],image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Tomatoes-on-the-bush.jpg',seedlingDates: ['mars', 'avril', 'mai'],harvestDates: ['juillet', 'aout', 'septembre'],}]
  }},
  methods: {
    saveToDatabase() {
        axios.post('/fill', this.table)
    },
    loadFromDatabase() {
        axios.get('/data').then((data) => {
            this.table = data.data
            this.table.sort((a,b) => { return (a.semis[0]) - (b.semis[0])})

        })
    },
    loadFromLocalStorage() {
        let save = localStorage.table
        if(save != "undefined")
        {
            let table = JSON.parse(localStorage.getItem('table'))
            this.table = table
        }
    },
    saveToLocalStorage() {
        localStorage.setItem('table', JSON.stringify(this.table))
    },
    selectMenu(selected) {
        if(selected === 'Load LocalStorage') {
            this.loadFromLocalStorage()
            return
        }
        if(selected === 'Save To Local') {
            this.saveToLocalStorage()
            return
        }
        else {
            this.selected = selected
        }
    }
  }
}
</script>

<style>
body, div, html {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
  padding: 0;
}
</style>
