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
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 230px;
    height: 230px;
    overflow: hidden;
    border-radius: 50%;
}


.plant-image input {
    position: absolute;
    top: 105px;
    left: 5px;
    width: 220px;
    height: 20px;
    padding: 0;
    margin: 0;
    border: 0;
    overflow: hidden;
    font-size: 10px;
    font-family: inherit;
    color:inherit;
    border:none;
    background-color: rgb(241, 239, 223);
    border-radius: 15px;
    text-align: center;
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
.plant-name {
    position: relative;
    font-size: 20px;
    width: 230px;
    height: 50px;
    word-wrap: break-word;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
    text-align: center;
    line-height: 50px;
    padding: 5px;
}
.plant-name input{
    font-size: 20px;
    font-family: inherit;
    color:inherit;
    border:none;
    background-color: rgb(241, 239, 223);
    border-radius: 30px;
}

.plant-name span {
    cursor: default;
}

.read-mode {
    display: inline-block;
    position: relative;
    padding: 3px;
    padding-top: 5px;
    width: 280px;
}
.edit-mode {
    position: relative;
    display: inline-block;

    width: 100%;
    height: 96vh;
    padding: 2vh;
    z-index: 99;
}

.expand-mode-container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgb(224, 216, 176);
    border-radius: 15px;
}

.reduced-mode-container {
    background-color: rgb(224, 216, 176);
    width: 100%;
    height: 100%;
    border-radius: 15px;
    overflow: hidden;
    padding-top: 5px;
}



.options {
    position: relative;
    width: 280px;
    height: 30px;
    margin: 0;
    margin-top: 10px;
    overflow: hidden;
}

.options a{
    display: inline-block;
    text-decoration: none;
    color:inherit;
    background-color: rgb(214, 203, 149);
    font-size: 20px;
    /* text-align: center; */
    width: 139px;
    height: 100%;
    text-align: center;
    line-height: 30px;
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
}

.options a:hover{
    background-color: rgb(241, 239, 223);
}

.options a+a {
    margin-left: 2px;
}


</style>


<template>
    <div :id="plant.name" :class="expand? 'edit-mode':'read-mode'"><div :class="expand? 'expand-mode-container':'reduced-mode-container'">
        <div class="plant-image">
            <img :src="editedPlant.image"/>
            <input v-if="editMode"  type="text" v-model="editedPlant.image" placeholder="image url"/>
        </div>
        
        <div class="plant-name"><editable-input :editMode="editMode" type="text" v-model="editedPlant.name"/></div>
        <!-- <ul> -->
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
        <!-- </ul> -->

        <editable-calender :editMode="editMode" label="Semis" v-model="editedPlant.semis" default-color="#c69707" selected-color="green"></editable-calender>
        <editable-calender :editMode="editMode" label="Recoltes" v-model="editedPlant.recolte" default-color="#c69707" selected-color="#904040"></editable-calender>
        <div class="options">
        <a v-if="!editMode" v-on:click.prevent="edit" href="#">Edit</a>
        <a v-if="editMode" v-on:click.prevent="save">Save</a>
        <a v-on:click="toggleExpand" :href="'#'+plant.name">Expand</a>
        </div>
    </div></div>
</template>

<script>


import EditableInput from './EditableInput.vue'
// import EditableSelect from './EditableSelect.vue'
import EditableCalender from './EditableCalender.vue'

export default {
    name: 'PlantEditor',
    components: {
    EditableInput,
    // EditableSelect,
    EditableCalender
    },
    props: {
        plant: {
            type: Object,
            default: function(){return {
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
        }
    },
    data: function() {
        return {
            editedPlant: JSON.parse(JSON.stringify(this.plant)),
            editMode: false,
            expand: false
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
            // console.log('PlantEditor Emit: submit -> ' + this.editedPlant.name)
            this.$emit('submit', this.editedPlant)
        },
        toggleExpand() {
            this.expand = !this.expand
        }
    }
}
</script>