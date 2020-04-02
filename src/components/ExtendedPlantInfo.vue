<style scooped>

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
    cursor: default;
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
    top: 0;
    bottom: -30px;
    left: 300px;
    right: 0;
    background-color: rgb(240, 234, 207);
    
}

::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}

.variete-list {
    /* margin-top: -8px; */
    /* position: absolute; */
    /* display: inline-block; */
    list-style: none;
    text-align: left;
    width: 300px;
    margin: 0 auto;
    overflow: scroll;
    white-space: nowrap;
    /* top:430px; */
    /* bottom:0px; */
    overflow-x:hidden;
    padding: 0;
    list-style: none;
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
}

.center-info {
    position: absolute;
    left: 300px;
    right: 0px;
}

.top-info {
    position: relative;
    /* background-color: rgb(206, 190, 190); */
    height: 200px;
    /* left: 0;
    right: 0; */
    /* overflow: hidden; */
    width: 100%;
    line-height: 20px;
    font-size: 16px;
    color: inherit;
    font-family: inherit;

}

.description-left {
    width: 250px;
    float: left;
    margin:0;
    padding: 0;
    list-style: none;
    background-color: rgb(115, 206, 41);
    height: 100%;
}

.description-right {
    /* display: inline-block; */
    list-style: none;
    padding: 0;
    margin:0;
    width: 100%;
    background-color: violet;
    height: 100%;
}

.description-field {
    /* position: absolute; */
    flex-grow: 1;
    overflow: scroll;
    /* bottom: 10px; */
    background-color: yellow;
}

</style>

<template>
<div>
    <div class="extended-info-container">
        
        <div class="left-info">
            <div class="plant-image">
                <img :src="plant.image"/>
                <input v-if="editMode"  type="text" v-model="plant.image" placeholder="image url"/>
            </div>
            
            <div class="plant-name"><editable-input :editMode="editMode" type="text" v-model="plant.name"/></div>
            <div class="plant-name"><editable-input :editMode="editMode" type="text" v-model="plant.sciName"/></div>

            <hr>
            <center>Variété(s)</center>
            <!-- <hr> -->
            <ul class="variete-list">
                <li v-for="(variete, idx) in plant.cultivar" :key="idx">
                    <div class="variete">
                        <editable-input class="variete-name" :editMode="editMode" v-model="variete.name" ></editable-input>
                        <div @click="remVar(idx)" v-if="editMode" class="delete-var"><p>x</p></div>
                    </div>
                </li>
                <li v-if="editMode">
                    <div @click="addVar" class="variete-add">+</div>
                </li>
            </ul>

        </div>

        <div class="center-info">
            <div class="top-info">
                <ul class="description-left">
                    <li>Famille: Alliaceae</li>
                    <li>Ensoleillement: Moyen/Fort</li>
                    <li>Rendement: Elevé</li>
                    <li>Qualitée: Bonne</li>
                </ul>

                <ul class="description-right">
                    <li>Association: Tomate, Poivron, Carotte, Laitue, Aubergine</li>
                    <li class="description-field">Description: <br>Le poireau (Allium ampeloprasum var. porrum, anciennement Allium porrum) est une espèce de plante herbacée vivace largement cultivée comme plante potagère pour ses feuilles (pseudo-tiges) consommées comme légumes. Il appartient à la famille des Amaryllidacées (précédemment famille des Liliacées puis des Alliacées). Noms communs : poireau, porreau, poirée, poirette, asperge du pauvre.</li>
                </ul>
            </div>
            
            <div class="calender-container">
                <sourced-calender class="calender" :editMode="editMode" label="Semis" v-model="plant.semis" default-color="#c69707" selected-color="#006000"></sourced-calender>
                <sourced-calender class="calender" :editMode="editMode" label="Recoltes" v-model="plant.recolte" default-color="#c69707" selected-color="#904040"></sourced-calender>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import SourcedCalender from './SourcedCalender'
import EditableInput from './EditableInput'
import SimpleButton from './SimpleButton'
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
    }},
    methods: {
        addVar() {
            // if(this.plant.cultivar === undefined) this.plant.cultivar = []
            
            this.plant.cultivar.push({name: 'cultivar'})
        },
        remVar(idx) {
            this.plant.cultivar.splice(idx,1)
        }
    },
}

</script>