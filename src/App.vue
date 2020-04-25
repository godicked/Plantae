<style scoped>
.main-panel {
  position: absolute;
  left: 220px;
  right: 20px;
  bottom: 0;
  top: 5px;
}

.plant-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
  top: 50px;
  /* background-color: yellow; */
  overflow: auto;
}

.top-option-panel {
    position: relative;
    margin-top: 10px;
    position: relative;
    text-align: left;
    margin-right: 10px;
}
.top-option-panel input{
    display: inline-block;
    border:none;
    width: 80%;
    background-color: inherit;
    line-height: 14px;
    padding:0;
    padding-left: 10px;
    font-size: 14px;
    margin:0;
    color:inherit;
    font-family: inherit;
    height: 14px;
}

.top-option-panel input:focus {
    outline: none;
}
.plant-options{
  display: inline-block;
  position: absolute;
  right: 0px;
  top: 0px;
}

.plant-options span{
  cursor:pointer;
  display: inline-block;
  margin-left: 10px;

}

</style>

<style>
textarea:focus, input:focus{
    outline: none;
}
</style>

<template>
  <div id="app">
    <vue-snotify></vue-snotify>
    <main-menu
      :options="['Plantes', 'Semis', 'Sources']"
      :on-click="selectMenu"
      :selected="selected"
    ></main-menu>

    <csv-table v-if="selected === 'Semis'" :table="plants"></csv-table>

    <div class="main-panel" v-if="selected === 'Sources'">
      <source-wizard></source-wizard>
      <source-list :full="true"></source-list>
    </div>

    <div
      class="main-panel"
      v-if="selected === 'Plantes' && plants !== undefined"
    >
      <div class="top-option-panel">
        <input type="text" v-model="searchString" placeholder="Search by Name..."
        />
        <div class="plant-options">
          <span @click="searchString = ''">Clear</span>
          <span @click="addPlant">Add</span>
          <span>Restore</span>
        </div>
        <hr />
      </div>
      <div class="plant-container">
        <plant-editor
          ref="plant"
          v-for="plant in filteredPlant"
          :key="plant._id"
          :plant="plant"
          @delete="deletePlant"
          @submit="savePlant"
        ></plant-editor>
      </div>
    </div>
  </div>
  <!-- app -->
</template>

<script>
import PlantEditor from "./components/PlantEditor.vue";
import CsvTable from "./components/CsvTable.vue";
import MainMenu from "./components/MainMenu.vue";
// import axios from 'axios'
import SourceList from "./components/SourceList.vue";
import SourceWizard from "./components/SourceWizard.vue";
import * as Factory from "./utils/Factory";
import * as SocketApi from "./utils/SocketApi";

export default {
  name: "app",
  components: {
    PlantEditor,
    CsvTable,
    MainMenu,
    SourceList,
    SourceWizard
  },
  mounted() {
    this.$store.dispatch("loadSourceFromDb").then(this.$store.dispatch("loadPlants"))

    SocketApi.init(this.$store, this.$snotify);

    // this.loadFromDatabase()
    document.title = "Plantae";
  },
  data() {
    return {
      selected: "Plantes",
      searchString: undefined
    };
  },
  methods: {
    savePlant(plant) {
      // plant exist in db
      if (plant._id) {
        this.$store.dispatch("updatePlant", plant).then(p => {
          this.scrollTo(p);
        })
      }
    },
    deletePlant(plant) {
        if(plant.new) {
            const idxN = this.newPlants.map(p => p.new).indexOf(plant.new);
            this.newPlants.splice(idxN, 1);
            return
        }
        this.$store.dispatch("deletePlant", plant);
    },
    // loadFromDatabase() {
    //     DB.getPlants().then(data => {
    //         // console.log(data)
    //         this.plants = data.data
    //         this.sortPlants()
    //     })
    // },
    // loadFromLocalStorage() {
    //     let save = localStorage.table
    //     if(save != "undefined")
    //     {
    //         let table = JSON.parse(localStorage.getItem('table'))
    //         this.plants = table
    //     }
    // },
    // saveToLocalStorage() {
    //     localStorage.setItem('table', JSON.stringify(this.plants))
    // },
    selectMenu(selected) {
      this.selected = selected;
    },
    addPlant() {
        let name = "";
        if (this.searchString !== undefined && this.searchString !== "") {
            name = this.searchString;
            this.searchString = "";
        }

        const plant = Factory.Plant(name);
        console.log('add new plant: ')
        console.log(plant)
        
        this.$store.dispatch("addPlant", plant).then(p => {
            console.log(p)
            this.scrollTo(p, true);
        })

    },
    scrollTo(plant, expand) {
      this.$nextTick(() => {
        const selectedEditor = this.$refs.plant.filter(
          p => p.$props.plant._id === plant._id
        );
        console.log(selectedEditor);
        selectedEditor[0].$el.scrollIntoView(true);

        if(expand === true && selectedEditor[0].expand === false) {
          selectedEditor[0].toggleExpand()
        }
      })
    }
  },
  computed: {
    filteredPlant() {
      if (this.searchString !== undefined && this.searchString !== "") {
        return this.plants.filter(plant =>
          plant.name.toLowerCase().includes(this.searchString.toLowerCase())
        );
      }
      return this.plants;
    },
    plants() {
      return this.$store.getters.plants();
    }
  }
};
</script>

<style>
body,
div,
html {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
  padding: 0;
}
</style>
