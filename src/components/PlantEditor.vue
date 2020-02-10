<style scooped>
.plant-editor
{
    display: inline-block;
    position:relative;
    /* border-spacing: 2px; */
    background-color: rgb(224, 216, 176);
    /* border-collapse: collapse; */
    margin: 20px;
    padding: 0px;
    border-radius: 2%;
}

.plant-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 230px;
    height: 230px;
    overflow: hidden;
    border-radius: 50%;
}
img {
    height: 100%;
    margin: 0 auto;
} 
ul {
    list-style: none;
    padding: 0
}
form {
    text-align: center;
}
center {
    position: relative;
    font-size: 120%;
    width: 230px;
    height: 50px;
    word-wrap: break-word;
    margin: 0 auto;
    padding-top: 10px;
    overflow: hidden;
}

.read-mode {
    display: inline-block;
    position: relative;
    background-color: rgb(224, 216, 176);
    margin: 5px;
    padding: 0;
    padding-top: 5px;
    width: 270px;
    border-radius: 3%;
    overflow: hidden;
}
.edit-mode {
    position: relative;
    display: inline-block;

    width: 100%;
    height: 96vh;
    padding: 2vh;
    z-index: 99;
}

.edit-mode-container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgb(224, 216, 176);
}


.options {
    position: relative;
    width: 270px;
    margin: 0;
    margin-top: 10px;
    background-color: yellow;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
}

.options a{
    text-decoration: none;
    color: black;
    font-size: 100%;
    text-align: center;
}
</style>


<template>
    <div :id="plant.name" :class="editMode? 'edit-mode':'read-mode'"><div :class="editMode? 'edit-mode-container':''">
        <div v-if="!editMode" class="plant-image">
            <img :src="editedPlant.image"/>
        </div>
        <input v-else type="text" v-model="editedPlant.image" style="width:90%;"/>
        <center><editable-input :editMode="editMode" type="text" v-model="editedPlant.name"/></center>
        <ul>
            <!-- <li>Nom vernaculaire: <editable-input :editMode="editMode" type="text" :text="editedPlant.commonName"/></li> -->
            <!-- <li>Famille: <editable-input type="text" v-bind:text="fields.family"/></li>
            <li>Type: <editable-select v-bind:text="fields.type" v-bind:options="fieldOptions.type"/></li>
            <li>Vie: <editable-select v-bind:text="fields.lifetime" v-bind:options="fieldOptions.lifetime"/></li> -->
            <!-- <li>Taille: [<editable-input type="text" v-bind:text="fields.size[0]"/>;<editable-input type="text" v-bind:text="fields.size[1]"/>]</li> -->
            <!-- <li>Diametre: <editable-input type="text" v-bind:text="fields.diameter" /></li>
            <li>Feuillage: <editable-select v-bind:text="fields.lifetime" v-bind:options="fieldOptions.leaf"/></li>
            <li>Rusticité: <editable-input type="text" v-bind:text="fields.coldResistance" /></li>
            <li>Utilité:</li>
            <li>Commestible: {{ fields.use.comestibles.join(',') }}</li>
            <li>Ressources: {{ fields.use.resources.join(',') }}</li>
            <li>Temperature semis: {{fields.seedlingTemp}}</li> -->
            <!-- <li>Dates de semis: {{plant.semis.join(',')}}</li>
            <li>Dates de recolte: {{plant.recolte.join(',')}}</li> -->
            <!-- <li>Exposition soleil: (100, 50, 20, 0)</li>
            <li>Tolerance a l'ombre: (0, 50, 80, 100)</li>
            <li>Fertilité: (AF, PAF, AS, MF)</li>
            <li>Couleur des fleurs: </li> -->
        </ul>

        <editable-calender :editMode="editMode" label="Semis" v-model="editedPlant.semis" default-color="#c69707" selected-color="green"></editable-calender>
        <editable-calender :editMode="editMode" label="Recoltes" v-model="editedPlant.recolte" default-color="#c69707" selected-color="#904040"></editable-calender>
        <div class="options">
        <a v-if="!editMode" v-on:click="edit" :href="'#'+plant.name">Edit</a>
        <a v-if="editMode" v-on:click="save" :href="'#'+plant.name">Save</a>
        </div>
    </div></div>
</template>

<script>


import EditableInput from './EditableInput.vue'
import EditableSelect from './EditableSelect.vue'
import EditableCalender from './EditableCalender.vue'

export default {
    name: 'PlantEditor',
    components: {
    EditableInput,
    EditableSelect,
    EditableCalender
    },
    props: {
        plant: {
            type: Object,
            default: {
                name: 'Solanum lycopersicum',
                commonNames: ['Tomate'],
                image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Tomatoes-on-the-bush.jpg',
                // family: 'Solanaceae',
                // type: 'Herbacé',
                // lifetime: 'Pérenne',
                // size: [0, 1],
                // diameter: 0,
                // leaf: 'Caduc',
                // coldResistance: 12,
                // use: {
                //     comestibles: ['Fruit'],
                //     resources: []
                // },
                // seedlingTemp: 15,
                seedlingDates: ['mars', 'avril', 'mai'],
                harvestDates: ['juillet', 'aout', 'septembre'],
                // sunExposition: 100,
                // shadeTolerance: 0,
                // fertility: 'AF',
                // flowerColor: 'jaune'
            }
        }
    },
    data: function() {
        return {
            editedPlant: JSON.parse(JSON.stringify(this.plant)),
            editMode: false,
            // fieldOptions: {
            //     type: ['Herbacée', 'Ligneuse'],
            //     lifetime: ['Pérenne', 'Bisannuelle', 'Annuelle'],
            //     leaf: ['Caduc', 'Semi-persistant', 'Persistant'],
            //     dates: ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'],
            //     sunExpositions: [100, 50, 20, 0],
            //     shadeTolerance: [0, 50, 80, 100],
            //     fertility: ['AF', 'PAF', 'AS', 'M/F']
            // }
        }
    },
    watch: {
        plant: {
            deep:true,
            handler(newVal) {
                this.editedPlant = newVal
            }
        }
    },
    methods: {
        edit() {
            this.editMode = true
        },
        save() {
            this.editMode = false
            console.log('PlantEditor Emit: submit -> ' + this.editedPlant.name)
            this.$emit('submit', this.editedPlant)
        }
    }
}
</script>