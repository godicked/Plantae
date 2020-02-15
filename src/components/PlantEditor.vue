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

.reduce-mode {
    display: inline-block;
    position: relative;
    padding: 3px;
    padding-top: 5px;
    width: 280px;
}
.expand-mode {
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
    overflow: hidden;
}

.reduce-mode-container {
    background-color: rgb(224, 216, 176);
    width: 100%;
    height: 100%;
    border-radius: 15px;
    overflow: hidden;
    padding-top: 5px;
}

.options-reduce {
    position: relative;
    width: 280px;
    height: 30px;
    margin: 0;
    margin-top: 10px;
    overflow: hidden;
}

.options-expand {
    position:absolute;
    width: 100%;
    height: 30px;
    bottom: 0px;
    margin: 0;
    /* margin-top: 10px; */
    overflow: hidden;
}

.simple-boutton-expand{
    display: inline-block;
    text-decoration: none;
    color:inherit;
    background-color: rgb(214, 203, 149);
    font-size: 20px;
    /* text-align: center; */
    width: 49.75%;
    height: 100%;
    text-align: center;
    line-height: 30px;
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
}

.simple-boutton-expand+.simple-boutton-expand{
    margin-left: 0.5%;
}


.simple-boutton-reduce+.simple-boutton-reduce {
    margin-left: 2px;
}

.simple-boutton-reduce {
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


</style>


<template>
    <div :id="plant.name" :class="expand? 'expand-mode':'reduce-mode'"><div :class="expand? 'expand-mode-container':'reduce-mode-container'">
        
        <div class="plant-image">
            <img :src="editedPlant.image"/>
            <input v-if="editMode"  type="text" v-model="editedPlant.image" placeholder="image url"/>
        </div>
        
        <div class="plant-name"><editable-input :editMode="editMode" type="text" v-model="editedPlant.name"/></div>

        <editable-calender :editMode="editMode" label="Semis" v-model="editedPlant.semis" default-color="#c69707" selected-color="green"></editable-calender>
        <editable-calender :editMode="editMode" label="Recoltes" v-model="editedPlant.recolte" default-color="#c69707" selected-color="#904040"></editable-calender>
        
        <div :class="expand?'options-expand':'options-reduce'">
            <simple-boutton hover-color="rgb(248, 242, 214)" :class="bouttonClass" v-if="!editMode" v-on:click.prevent="edit" href="#">Edit</simple-boutton>
            <simple-boutton hover-color="rgb(248, 242, 214)" :class="bouttonClass" v-if="editMode" v-on:click.prevent="save" href="#">Save</simple-boutton>
            <!-- <a v-on:click="toggleExpand" :href="'#'+plant.name">Expand</a> -->
            <simple-boutton hover-color="rgb(248, 242, 214)" :class="bouttonClass" v-on:click="toggleExpand" :href="'#'+plant.name">Expand</simple-boutton>
        </div>

        
        <!-- <simple-boutton @click="toggleExpand" style="height:40px;background-color:yellow;">TEST</simple-boutton> -->
    </div></div>
</template>

<script>


import EditableInput from './EditableInput.vue'
// import EditableSelect from './EditableSelect.vue'
import EditableCalender from './EditableCalender.vue'
import SimpleBoutton from './SimpleButton.vue'

export default {
    name: 'PlantEditor',
    components: {
    EditableInput,
    // EditableSelect,
    EditableCalender,
    SimpleBoutton
    },
    props: {
        plant: {
            type: Object
        }
    },
    data: function() {
        return {
            editedPlant: JSON.parse(JSON.stringify(this.plant)),
            editMode: false,
            expand: false
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
            window.scrollBy(0, 1); // simple fix for boutton hover
        }
    },
    computed: {
        bouttonClass() {
            return this.expand? 'simple-boutton-expand':'simple-boutton-reduce'
        }
    }
}
</script>