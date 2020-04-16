<style scoped>

.plant-image {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 230px;
    height: 230px;
    overflow: hidden;
    border-radius: 50%;
    cursor: pointer;
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
    /* line-height: 50px; */
    padding: 5px;
    cursor: pointer;
}
.plant-name input{
    font-size: 20px;
    font-family: inherit;
    color:inherit;
    border:none;
    background-color: rgb(252, 251, 244);
    border-radius: 30px;
}

.plant-name span {
    cursor: inherit;
}

.extended-info-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.left-info {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 300px;
    padding-top: 20px;
    /* background-color: blue; */
}
.center-info {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 300px;
    right: 0px;
    /* padding:20px; */
    padding-left: 20px;
    padding-right: 20px;
    background-color: rgb(240, 234, 207);
    /* background: yellow; */
}

::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}

.variete-list {
    /* margin-top: -8px; */
    position: absolute;
    /* display: inline-block; */
    list-style: none;
    text-align: left;
    width: 300px;
    margin: 0 auto;
    overflow: auto;
    white-space: nowrap;
    top:430px;
    bottom:35px;
    overflow-x:hidden;
    padding: 0;
    padding-right: 5px;
    
}

.variete-list li{
    position: relative;
    margin:0;
    /* border-radius: 15px; */
    overflow: hidden;
    padding:0;
    /* line-height: 40px; */
}

.variete{
    /* position: relative; */
    position: relative;
    display: inline-block;
    margin: 0;
    padding-left: 15px;
    font-size: 17px;
    width: 285px;
    line-height: 40px;
}

.variete-add {
    margin: 0 auto;
    margin-top: 5px;
    margin-bottom:15px;
    padding: 0;
    font-size: 25px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;

}

.variete-add:hover {
    color: rgb(55, 150, 55);
    border: 1px solid rgb(55, 150, 55);
    border-radius: 50%;
    cursor: pointer;
    box-sizing: border-box;
    line-height: 28px;
}

.variete:hover {
    background-color: rgb(248, 242, 214);
    cursor:pointer;
}

.variete-name {
    width: 252px;
    height: 40px;
    display: inline-block;
}

.variete input {
    width: 100%;
    padding: 0;
    padding-left: 5px;
    padding-right: 5px;
    border: none;
    height: 30px;
    width: 242px;
    margin-left: -5px;
    font-size: inherit;
    color:inherit;
    text-align: left;
    font-family: inherit;
    /* margin-top: 5px; */
    background-color: rgb(252, 251, 244);
    border-radius: 15px;

}

.select {
        background-color: rgba(248, 242, 214, 0.65);
}

.select:hover {
        background-color: rgba(248, 242, 214, 0.65);
}

.delete-var {
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 0;
    padding:0;
    top: 4px;
    right: 8px;
    text-align: center;
    font-size: 24px;
    /* background-color:yellow; */
    border-radius: 50%;
}

.delete-var p {
    margin: 0;
    padding:0;
    /* display: inline-block; */
    width: 20px;
    height: 20px;
    position: absolute;
    top: -5px;
}

.delete-var:hover {
    cursor: pointer;
    color:rgb(180, 70, 70);
}


.calender-container {
    position:relative;
    text-align: center;
    width: 90%;
    margin: 0 auto;
}

.info-container {
    position: absolute;
    top:60px;
    bottom:0px;
    left:20px;
    right:20px;
    /* background: yellow; */
    overflow: auto;
}

.section {
    /* background:green; */
    display: inline-block;
    width: 50%;
    margin:0;
    padding:0;  
    /* height: 500px; */
    vertical-align: top;
}

.dates {
    width: 100%;
}

.edit {
    width: 100%;
}
</style>

<template>
<div>
    <div class="extended-info-container">
        
        <div class="left-info">
            <div class="plant-image" @click="selectVariete(undefined)">
                <img :src="plant.image"/>
                <input v-if="editMode"  type="text" v-model="plant.image" placeholder="image url"/>
            </div>
            
            <div class="plant-name" @click="selectVariete(undefined)"><editable-input :editMode="editMode" type="text" v-model="plant.name"/></div>
            <div class="plant-name" @click="selectVariete(undefined)"><editable-input :editMode="editMode" type="text" v-model="plant.sciName"/></div>

            <hr>
            <center>Variété(s)</center>
            <!-- <hr> -->
            <ul class="variete-list">
                <li v-for="(variete, idx) in plant.cultivar" :key="idx">
                    <div :class="selectedVar === idx ? 'variete select':'variete'" @click="selectVariete(idx)">
                        <editable-input class="variete-name" :editMode="editMode" v-model="variete.name" ></editable-input>
                        <div @click.stop="remVar(idx)" v-if="editMode" class="delete-var"><p>x</p></div>
                    </div>
                </li>
                <li v-if="editMode">
                    <div @click="addVar" class="variete-add">+</div>
                </li>
            </ul>

        </div>

        <div class="center-info">
            <div style="text-align:center;">
                <h2>Varieté: <span v-if="selectedVar === undefined">Toutes</span><span v-else>{{varieteName}}</span></h2>
            </div>
            <div class="info-container">
                <div class="section classification" :class="{edit:editMode}">
                    <h3>Classification</h3>
                    <table>
                        <tr><td>Nom:</td><td>{{plant.name}}</td></tr>
                        <tr><td>Espèce:</td><td>{{plant.species}}</td></tr>
                        <tr><td>Genre:</td><td>{{plant.genus}}</td></tr>
                        <tr><td>Famille:</td><td><editable-input type="text" v-model="plant.family" :editMode="editMode"/></td></tr>
                        <tr><td>Ordre:</td><td>{{plant.order}}</td></tr>
                    </table>
                </div>

                <div class="section properties" :class="{edit:editMode}">
                    <h3>Propriétés</h3>
                    <table>
                        <tr><td>Cycle:</td><td></td></tr>
                        <tr><td>Croissance:</td><td></td></tr>
                        <tr><td>Hateur:</td><td></td></tr>
                        <tr><td>Largeur:</td><td></td></tr>
                        <tr><td>Feuillage:</td><td></td></tr>
                    </table>
                </div>

                <div class="section requirements" :class="{edit:editMode}">
                    <h3>Conditions</h3>
                    <table>
                        <tr><td>Humidité:</td><td></td></tr>
                        <tr><td>Secheresse:</td><td></td></tr>
                        <tr><td>Temperature Min:</td><td></td></tr>
                        <tr><td>Temperature Max:</td><td></td></tr>
                        <tr><td>Type(s) de Sol:</td><td></td></tr>
                        <tr><td>Soleil:</td><td></td></tr>
                        <tr><td>Ombre:</td><td></td></tr>
                        <tr><td>Ph:</td><td></td></tr>
                    </table>
                </div>

                <div class="section dates" :class="{edit:editMode}">
                    <h3>Dates</h3>
                    <sourced-calender :rows="1" :columns="12" class="calender" :editMode="editMode" label="Semis" v-model="semisSource" :colors="['#c69707', '#00b0b0', '#008000']"></sourced-calender>
                    <sourced-calender :rows="1" :columns="12" class="calender" :editMode="editMode" label="Recoltes" v-model="recolteSource" :colors="['#c69707', '#904040']"></sourced-calender>
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import SourcedCalender from './SourcedCalender'
import EditableInput from './EditableInput'
import SimpleButton from './SimpleButton'
import * as Factory from '../utils/Factory'
import * as SourceUtils from '../utils/Sources'
// import EditableSelect from './EditableSelect'

export default {
    name: 'ExtendedPlantInfo',
    components: {
        SourcedCalender,
        EditableInput,
        SimpleButton
        // EditableSelect
    },
    props: {
        editMode: {
            type: Boolean,
            default: false
        },
        plant: Object
    },
    data() { return {
        selectedVar: undefined
    }},
    computed: {
        safeSelectedVar() {
            if(this.selectedVar !== undefined && this.selectedVar > this.plant.cultivar.length-1) {
                return undefined
            }
            return this.selectedVar
        },
        semisSource() {
            if(this.safeSelectedVar === undefined) {
                if(!this.editMode) {
                    return SourceUtils.computePlant(this.plant).semis
                }
                return this.plant.semis
            }
            else {
                let semis = this.plant.cultivar[this.selectedVar].semis

                if(semis.length === 1 && semis[0].name === undefined && !semis[0].dates.some(d => d !== 0) && !this.editMode) {
                    let cmp = SourceUtils.computePlant(this.plant).semis
                    cmp.source = {name:'None'}
                    return cmp
                }

                return semis
            }
        },
        recolteSource() {
            if(this.safeSelectedVar === undefined) {
                if(!this.editMode) {
                    return SourceUtils.computePlant(this.plant).recolte
                }
                return this.plant.recolte
            }
            else {
                let recolte = this.plant.cultivar[this.selectedVar].recolte

                if(recolte.length === 1 && recolte[0].name === undefined && !recolte[0].dates.some(d => d !== 0) && !this.editMode) {
                    let cmp = SourceUtils.computePlant(this.plant).recolte
                    cmp.source = {name:'None'}
                    return cmp
                }

                return recolte
            }
        },
        varieteName() {
            if(this.safeSelectedVar === undefined) {
                return 'Toutes'
            }
            return this.plant.cultivar[this.selectedVar].name
        }
    },
    methods: {
        addVar() {
            // if(this.plant.cultivar === undefined) this.plant.cultivar = []
            
            this.plant.cultivar.push(Factory.Cultivar())
            this.selectedVar = this.plant.cultivar.length-1
        },
        remVar(idx) {
            this.selectedVar = undefined
            this.plant.cultivar.splice(idx,1)
        },
        selectVariete(idx) {
            console.log('select')
            if(this.selectedVar !== idx) {
                this.selectedVar = idx
            }
            else if(!this.editMode){
                this.selectedVar = undefined
            }
        }
    },
}

</script>