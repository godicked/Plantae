<style scooped>

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

    width: 98%;
    height: 97vh;
    padding-left: 1%;
    padding-right: 1%;
    padding-top: 1.5vh;
    padding-bottom: 1.5vh;
    z-index: 99;
    /* background-color:green; */
    min-width: 800px;
    min-height: 500px
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
    width: 300px;
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

.extended-info {
    position: absolute;
    top: 0px;
    bottom: 30px;
    width: 100%;
}

</style>


<template>
    <div :id="plant.name" :class="expand? 'expand-mode':'reduce-mode'">
        <div :class="expand? 'expand-mode-container':'reduce-mode-container'">

            <reduced-plant-info v-if="!expand" :plant="editedPlant" :editMode="editMode"></reduced-plant-info>
            <extended-plant-info class="extended-info" v-if="expand" :plant="editedPlant" :editMode="editMode"></extended-plant-info>

            <div :class="expand?'options-expand':'options-reduce'">
                <simple-boutton hover-color="rgb(248, 242, 214)" :class="bouttonClass" v-if="!editMode" v-on:click.prevent="edit" href="#">Edit</simple-boutton>
                <simple-boutton hover-color="rgb(248, 242, 214)" :class="bouttonClass" v-if="editMode" v-on:click.prevent="save" href="#">Save</simple-boutton>

                <simple-boutton hover-color="rgb(248, 242, 214)" :class="bouttonClass" v-if="!expand" v-on:click="toggleExpand" :href="'#'+plant.name">Expand</simple-boutton>
                <simple-boutton hover-color="rgb(248, 242, 214)" :class="bouttonClass" v-if="expand" v-on:click="toggleExpand" :href="'#'+plant.name">Reduce</simple-boutton>
            </div>

        </div>
    </div>
</template>

<script>

import ReducedPlantInfo from './ReducedPlantInfo.vue'
import ExtendedPlantInfo from './ExtendedPlantInfo.vue'
import SimpleBoutton from './SimpleButton.vue'

export default {
    name: 'PlantEditor',
    components: {
    ReducedPlantInfo,
    ExtendedPlantInfo,
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
            this.$emit('submit', this.editedPlant)
        },
        toggleExpand() {
            this.expand = !this.expand
            window.scroll(0,1)
            window.scroll(0,-1)
        }
    },
    computed: {
        bouttonClass() {
            return this.expand? 'simple-boutton-expand':'simple-boutton-reduce'
        }
    }
}
</script>