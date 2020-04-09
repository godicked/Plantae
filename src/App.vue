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
      <plant-editor ref="plant" v-for="(plant) in filteredPlant" :key="plant.name" :plant="plant" @delete="deletePlant" @submit="savePlant"></plant-editor>
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
import * as SourceUtils from './utils/Sources'
import * as DB from './utils/DbApi'
import * as Factory from './utils/Factory'

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
    }},
    methods: {
        saveToDatabase() {
            return
            // this.sortPlants()
            // return;
            axios.post('/fill', this.table)
            console.log(this.table[0].cultivar)
            this.sortPlants()
        },
        savePlant(plant) {
            let idx = undefined
            if(plant._id) {
                idx = this.table.map(p => p._id).indexOf(plant._id)
                DB.updatePlant(plant).then(() => {
                    this.table[idx] = plant
                    this.sortPlants(plant)
                })
            }
            else {
                idx = this.table.map(p => p.sciName).indexOf(plant.sciName)
                DB.addPlant(plant).then((p) => {
                    this.table[idx] = p
                    console.log(p)
                    this.sortPlants(p)
                })
            }

        },
        deletePlant(plant) {
            let idx = this.table.map(p => p._id).indexOf(plant._id)
            DB.deletePlant(plant).then(() => this.table.splice(idx,1))
        },
        loadFromDatabase() {
            DB.getPlants().then(data => {
                // console.log(data)
                this.table = data.data
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
                this.searchString = ''
            }

            let plant = Factory.Plant(name)
            plant.new = true
            this.table.unshift(plant)
        },
        sortPlants(selected) {
            this.table.sort((a, b) => {
                let s1 = SourceUtils.computePlant(a).semis
                let s2 = SourceUtils.computePlant(b).semis

                s1 = SourceUtils.computeDates(s1).dates
                s2 = SourceUtils.computeDates(s2).dates

                return this.sortDates(s1,s2)
            })

            if(selected) {
                // console.log('selected: ')
                // console.log(selected)
                this.$nextTick(() => {
                    let selectedEditor = this.$refs.plant.filter(p => p.$props.plant._id === selected._id)
                    console.log(selectedEditor)
                    selectedEditor[0].$el.scrollIntoView(true)
                })
            }
        },
        sortDates(d1, d2) {
            let score1 = 0, score2 = 0

            for(let i = 0; i < 24; i++) {
            score1 += d1[i] * Math.pow(2, 23-i)
            score2 += d2[i] * Math.pow(2, 23-i)
            }
            return score2 - score1

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
