<style>
input {
    /* height: 20px; */
    /* padding: 5px; */
    margin: 0;
    border: 0;
    overflow: hidden;
    font-size:inherit;
    font-family: inherit;
    color:inherit;
    border:none;
    background-color: white;
    border-radius: 10px;
    /* text-align: left; */
}
</style>

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
    padding-top: 10px;
    padding-bottom: 0;
    cursor: pointer;
}
.plant-name >>> input{
    padding: 5px;
    font-size: 20px;
    width: 220px;
    background-color: rgb(252, 251, 244);
}
.plant-name >>> span {
    cursor: inherit;
    display: inline-block;
    padding: 5px;
    width: 220px;
    /* text-align: center; */
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

.variete >>> input {
    width: 100%;
    /* padding: 0;
    padding-left: 5px;
    padding-right: 5px; */
    /* border: none; */
    height: 30px;
    width: 242px;
    margin-left: -5px;
    /* font-size: inherit;
    color:inherit; */
    text-align: left;
    /* font-family: inherit; */
    background-color: rgb(252, 251, 244);
    /* border-radius: 15px; */

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

h3 {
    margin-top: 10px;
    margin-bottom: 10px;
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
    width: 40%;
}

.edit {
    width: 50%;
}

.source-container {
    position: absolute;
    bottom: 0px;
    height: 30px;
    left:0;
    right: 0;
    line-height: 30px;
    /* background: yellow; */
    padding-left: 20px;
}

.section >>> input {
    text-align: left;
    padding-left: 5px;
}


.section >>> span {
    padding-left: 5px;
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
            <div v-if="!addSourceMode">
                <div style="text-align:center;">
                    <h2>Varieté: <span v-if="selectedVar === undefined">Toutes</span><span v-else>{{varieteName}}</span></h2>
                </div>
                <div class="info-container">
                    <div class="section classification" :class="{edit:editMode}">
                        <h3>Classification</h3>
                        <table>
                            <tr><td>Nom:</td><td><editable-input type="text" v-model="plant.name" :editMode="editMode"/></td></tr>
                            <!-- <tr><td>Espèce:</td><td><editable-input type="text" v-model="plant.classification.species" :editMode="editMode"/></td></tr> -->
                            <!-- <tr><td>Genre:</td><td><editable-input type="text" v-model="plant.classification.genus" :editMode="editMode"/></td></tr> -->
                            <!-- <tr><td>Famille:</td><td><editable-input type="text" v-model="plant.classification.family" :editMode="editMode"/></td></tr> -->
                            <!-- <tr><td>Ordre:</td><td><editable-input type="text" v-model="plant.classification.order" :editMode="editMode"/></td></tr> -->
                        </table>
                    </div>

                    <div class="section properties" :class="{edit:editMode}">
                        <h3>Propriétés</h3>
                        <table>
                            <tr><td>Cycle:</td><td><editable-select :acceptUndefined="true" v-model="info.properties.cycle" :editMode="editMode" :options="['Anuelle', 'Bisanuelle', 'Pérenne']"/></td></tr>
                            <tr><td>Croissance:</td><td><editable-select v-model="info.properties.growth" :editMode="editMode" :options="['Lente', 'Moyenne', 'Rapide']"/></td></tr>
                            <tr><td>Hateur:</td><td></td></tr>
                            <tr><td>Largeur:</td><td></td></tr>
                            <tr><td>Feuillage:</td><td></td></tr>
                        </table>
                    </div>

                    <div class="section requirements" :class="{edit:editMode}">
                        <h3>Conditions</h3>
                        <table>
                            <tr><td>Humidité:</td>          <td></td></tr>
                            <tr><td>Secheresse:</td>        <td></td></tr>
                            <tr><td>Temperature Min:</td>   <td></td></tr>
                            <tr><td>Temperature Max:</td>   <td></td></tr>
                            <tr><td>Type(s) de Sol:</td>    <td><multi-select v-model="info.requirements.soil" :editMode="editMode" :options="['sableux', 'limoneux', 'argileux']" /></td></tr>
                            <tr><td>Soleil:</td>            <td></td></tr>
                            <tr><td>Ombre:</td>             <td></td></tr>
                            <tr><td>Ph:</td>                <td></td></tr>
                        </table>
                    </div>

                    <div class="section dates" :class="{edit:editMode}">
                        <h3>Dates</h3>
                        <editable-calender :rows="2" :columns="6" class="calender" :editMode="editMode" label="Semis" :value="info.dates.semis" :colors="['#c69707', '#00b0b0', '#008000']"></editable-calender>
                        <editable-calender :rows="2" :columns="6" class="calender" :editMode="editMode" label="Recoltes" :value="info.dates.recolte" :colors="['#c69707', '#904040']"></editable-calender>
                    </div>
                </div>
            </div>
            <div v-else-if="editMode">
                <source-list @select="addSource" @cancel="addSourceMode = false"/>
            </div>
            <div class="source-container">
                <span>Source<span v-if="sourcesIds.length > 1 && !editMode">s</span>: </span>  
                <selectable-list v-model="selectedSourceIdx" :selectMode="editMode" :options="sourcesNames"/>
                <button v-if="editMode && !addSourceMode" @click="addSourceMode = true" style="margin-left:10px;">Add Source</button>
                <button v-if="!addSourceMode && editMode && sourcesNames[selectedSourceIdx] !== 'Default'" @click="removeSelectedSource" style="margin-left:10px">Remove</button> 
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import EditableCalender from './EditableCalender'
import EditableInput from './EditableInput'
import SimpleButton from './SimpleButton'
import * as Factory from '../utils/Factory'
import * as SourceUtils from '../utils/Sources'
import EditableSelect from './EditableSelect'
import SelectableList from './SelectableList'
import SourceList from './SourceList'
import MultiSelect from './MultiSelect'

export default {
    name: 'ExtendedPlantInfo',
    components: {
        EditableCalender,
        EditableInput,
        SimpleButton,
        EditableSelect,
        SelectableList,
        SourceList,
        MultiSelect
    },
    props: {
        editMode: {
            type: Boolean,
            default: false
        },
        plant: Object
    },
    watch: {
        editMode: {
            handler(val) {
                if(val === false) {
                    this.addSourceMode = false
                }
            }
        }
    },
    data() { return {
        selectedVar: undefined,
        selectedSourceIdx: 0,
        addSourceMode: false
    }},
    computed: {
        sourcesIds() {
            return Object.keys(this.filteredSourcedInfos)
        },
        sourcesNames() {
            return this.sourcesIds.map(id => this.source(id).name)
        },
        filteredSourcedInfos() {
            return SourceUtils.filterSourcedInfos(this.plant.sourcedInfos)
        },

        info() {
            // console.log('computed: info')
            let usedInfo
            if(this.editMode) {
                const infos = this.infosFromSourceIdx(this.selectedSourceIdx)
                if(!infos.hasOwnProperty(this.selectedVarId)) {
                    this.$set(infos, this.selectedVarId, {})
                }
                usedInfo = infos[this.selectedVarId]
                SourceUtils.addMissingInfoFields(usedInfo)
            }
            else {
                usedInfo = SourceUtils.computeSourcesToInfos(this.filteredSourcedInfos, this.selectedVarId)
            }

            // console.log('used info')
            // console.log(usedInfo)
            return usedInfo
        },
        selectedVarId() {
            let idx = this.safeSelectedVar
            if(idx !== undefined) {
                return this.plant.cultivar[idx].id
            }
            else {
                return undefined
            }
        },
        safeSelectedVar() {
            if(this.selectedVar !== undefined && this.selectedVar > this.plant.cultivar.length-1) {
                return undefined
            }
            return this.selectedVar
        },
        varieteName() {
            if(this.safeSelectedVar === undefined) {
                return 'Toutes'
            }
            return this.plant.cultivar[this.selectedVar].name
        }
    },
    methods: {
        source(id) {
            return this.$store.getters.source(id)
        },
        infosFromSourceIdx(idx) {
            return this.plant.sourcedInfos[this.sourcesIds[idx]]
        },
        addVar() {
            // if(this.plant.cultivar === undefined) this.plant.cultivar = []
            const maxId = Math.max(...this.plant.cultivar.map(c => c.id))
            this.plant.cultivar.push(Factory.Cultivar(maxId+1))
            this.selectedVar = this.plant.cultivar.length-1
        },
        remVar(idx) {
            const cultivar = this.plant.cultivar[idx]
            this.selectedVar = undefined
            this.plant.cultivar.splice(idx,1)
            Object.keys(this.plant.sourcedInfos).forEach(k => {
                console.log(cultivar)
                console.log(k)
                if(this.plant.sourcedInfos[k][cultivar.id]) {
                    delete this.plant.sourcedInfos[k][cultivar.id]
                }
            })
        },
        selectVariete(idx) {
            console.log('select')
            if(this.selectedVar !== idx) {
                this.selectedVar = idx
            }
            else if(!this.editMode){
                this.selectedVar = undefined
            }
        },
        addSource(source) {
            this.$set(this.plant.sourcedInfos, source._id, {})
            // this.plant = JSON.parse(JSON.stringify(this.plant))
            this.addSourceMode = false
            this.selectedSourceIdx = Object.keys(this.filteredSourcedInfos).length - 1
        },
        removeSelectedSource() {
            const source = this.source(this.sourcesIds[this.selectedSourceIdx])
            
            // dont delete default source
            if(source.name === 'Default') return

            this.$delete(this.plant.sourcedInfos, source._id)
            this.selectedSourceIdx = Math.max(this.selectedSourceIdx-1, 0)
        }
    },
}

</script>