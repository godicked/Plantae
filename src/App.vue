<style scooped>


.main-panel {
  position:absolute;
  left: 220px;
  right: 20px;
  bottom: 5px;
  top: 5px;
}

</style>

<template>
  <div id="app">
    <main-menu :options="['Plantes', 'Semis', 'Sources', 'Save To Local', 'Load LocalStorage', 'Save To DB']" :on-click="selectMenu" :selected="selected"></main-menu>
    
    <csv-table v-if="selected === 'Semis'" :table="table"></csv-table>

    <div class="main-panel" v-if="selected === 'Sources'">
        <source-wizard></source-wizard>
        <source-list :full="true"></source-list>
    </div>
    
    <div class="main-panel" v-if="selected === 'Plantes' && table !== undefined">
      <div class="top-option-panel">
        <input type="text" v-model="searchString" placeholder="Search by Name..."/>
        <div class="plant-options">
          <span @click="searchString=''">Clear</span>
          <span @click="addPlant">Add</span>
          <span>Restore</span>
        </div>
        <hr>
      </div>
      <plant-editor v-for="(plant, idx) in filteredPlant" :key="plant.name" :plant="plant" @delete="table.splice(idx,1)" @submit="(edited) => {table[idx] = edited; saveToDatabase()}"></plant-editor>
    </div>
    
  </div><!-- app -->
</template>

<script>
import PlantEditor from './components/PlantEditor.vue'
import CsvTable from './components/CsvTable.vue'
import MainMenu from './components/MainMenu.vue'
import axios from 'axios'
import SourceList from './components/SourceList.vue'
import SourceWizard from './components/SourceWizard.vue'

export default {
  name: 'app',
  components: {
    PlantEditor,
    CsvTable,
    MainMenu,
    SourceList,
    SourceWizard
  },
  mounted() {
        this.$store.commit('loadSourceFromDb')
        
        this.loadFromDatabase()
        document.title = "Plantae"
  },
  data() { return {
      selected: 'Plantes',
      table: undefined,
      searchString: undefined,
      plants: [{name: 'Solanum lycopersicum',commonNames: ['Tomate'],image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Tomatoes-on-the-bush.jpg',seedlingDates: ['mars', 'avril', 'mai'],harvestDates: ['juillet', 'aout', 'septembre'],},{name: 'Solanum lycopersicum',commonNames: ['Tomate'],image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Tomatoes-on-the-bush.jpg',seedlingDates: ['mars', 'avril', 'mai'],harvestDates: ['juillet', 'aout', 'septembre'],},{name: 'Solanum lycopersicum',commonNames: ['Tomate'],image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Tomatoes-on-the-bush.jpg',seedlingDates: ['mars', 'avril', 'mai'],harvestDates: ['juillet', 'aout', 'septembre'],},{name: 'Solanum lycopersicum',commonNames: ['Tomate'],image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Tomatoes-on-the-bush.jpg',seedlingDates: ['mars', 'avril', 'mai'],harvestDates: ['juillet', 'aout', 'septembre'],}]
  }},
  methods: {
    saveToDatabase() {
        // this.sortPlants()
        // return;
        axios.post('/fill', this.table)
        console.log(this.table[0].cultivar)
        this.sortPlants()
    },
    loadFromDatabase() {
        axios.get('/data').then((data) => {
            this.table = data.data

            // this.table.forEach((p) => {
            //   // let semis = p.semis[0].dates
            //   // let recolte = p.recolte[0].dates

            //   // let semisAsBool = this.defaultMonthArray()
            //   // let recolteAsBool = this.defaultMonthArray()

            //   // semis.forEach(s => semisAsBool[s*2] = 2)
            //   // recolte.forEach(s => recolteAsBool[s*2] = 2)


            //     // p.semis = [{dates:semis.slice(0,24)}]
            //     // p.recolte = [{dates:recolte.map(d => d == 2 ? 1 : 0)}]

            //     // p.cultivar.forEach(c => c.semis = [{dates: Array(24).fill(0)}])
            // })

            this.sortPlants()
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
        if(selected == 'Save To DB') {
          this.saveToDatabase()
        }
        else {
          this.sortPlants()
            this.selected = selected
        }
    },
    addPlant() {
      let name = ''
      if(this.searchString !== undefined && this.searchString !== '') {
        name = this.searchString
      }

      this.table.unshift(this.defaultPlant(name))
      this.searchString = ''
    },
    sortPlants() {
        this.table.sort((a, b) => {
          return this.sortDates(a.semis[0].dates, b.semis[0].dates)
        })
    },
    sortDates(d1, d2) {
      let score1 = 0, score2 = 0

      for(let i = 0; i < 24; i++) {
        score1 += d1[i] * Math.pow(2, 23-i)
        score2 += d2[i] * Math.pow(2, 23-i)
      }
      return score2 - score1

    },
    defaultPlant(name) {
      return {
        name: name !== '' ? name : 'Common Name',
        sciName: 'Scientific Name',
        semis: [{dates: this.defaultMonthArray()}],
        recolte: [{dates: this.defaultMonthArray()}],
        cultivar: []
      }
    },
    defaultMonthArray() {
      let arr = []
      for(let i = 0; i < 24; i++) {
        arr.push(0)
      }
      return arr
    }
  },
  computed: {
    filteredPlant() {
      if(this.searchString !== undefined && this.searchString !== '') {
        return this.table.filter(plant => plant.name.toLowerCase().includes(this.searchString.toLowerCase()))
      }
      return this.table
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
