<style scoped>

.reduce-mode {
    display: inline-block;
    position: relative;
    padding: 3px;
    /* padding-top: 5px; */
    /* width: 280px; */
}
.expand-mode {
    position: relative;
    display: inline-block;

    width: 100%;
    height: 98.5%;
    padding: 0;
    /* z-index: 2; */
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
    position: relative;
    /* background-color: rgb(224, 216, 176); */
    /* background-color: rgb(226, 226, 226); */
    width: 100%;
    height: 100%;
    /* height: 551px; */
    border-radius: 15px;
    overflow: hidden;
    /* padding-top: 5px; */
    background: blue;
}

.options-reduce {
    position: absolute;
    display: inline-block;
    width: 280px;
    height: 30px;
    /* margin: 0; */
    /* margin-top: 10px; */
    /* overflow: hidden; */
    /* padding:0px; */
    bottom:0px;
    left:0px;
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

.visual-data-expanded {
    position: relative;
    width: 100%;
    height: 100%;;
}

.simple-boutton-expand{
    display: inline-block;
    text-decoration: none;
    color:inherit;
    background-color: rgb(214, 203, 149);
    font-size: 20px;
    /* text-align: center; */
    width: 148px;
    height: 100%;
    text-align: center;
    line-height: 30px;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
}

.simple-boutton-expand+.simple-boutton-expand{
    margin-left: 4px;
}

.half-boutton-container-expand+.simple-boutton-expand {
    margin-left: 4px;
}

.half-boutton-expand+.half-boutton-expand {
    margin-left: 4px;
}


.simple-boutton-reduce+.simple-boutton-reduce {
    margin-left: 2px;
}

.half-boutton-container-reduce+.simple-boutton-reduce {
    margin-left: 2px;
}

.half-boutton-reduce+.half-boutton-reduce {
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

.half-boutton-container-reduce {
    display: inline-block;
    width: 139px;
}

.half-boutton-container-expand {
    display: inline-block;
    width: 148px;
}

.half-boutton-reduce {
    display: inline-block;
    text-decoration: none;
    color:inherit;
    background-color: rgb(214, 203, 149);
    font-size: 20px;
    /* text-align: center; */
    width: 68px;
    height: 100%;
    text-align: center;
    line-height: 30px;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
}

.half-boutton-expand {
    display: inline-block;
    text-decoration: none;
    color:inherit;
    background-color: rgb(214, 203, 149);
    font-size: 20px;
    /* text-align: center; */
    width: 72px;
    height: 100%;
    text-align: center;
    line-height: 30px;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
}

.extended-info {
    /* display: inline-block; */
    /* bottom: 30px; */
    width: 100%;
    height: 100%;
    /* z-index: 2; */
}

.delete-button-reduced {
    position: absolute;
    top:15px;
    left: 228px;
    font-size: 15px;
    background-color: rgb(252, 86, 86);
    padding: 3px;
    border-radius: 8px;
    color: white;
    cursor:pointer;
}

.delete-button-expanded {
    position: absolute;
    top:15px;
    left: 235px;
    background-color: rgb(252, 86, 86);
    padding: 3px;
    border-radius: 8px;
    color: white;
    cursor:pointer;
    z-index: 99;
}

</style>


<template>
    <div :id="plant.name" :class="expand? 'expand-mode':'reduce-mode'">
        <div :class="expand? 'expand-mode-container':'reduce-mode-container'">
            <div v-if="expand" class="visual-data-expanded">
                <div v-if="editMode" @click="deletePlant" :class="expand? 'delete-button-expanded':'delete-button-reduced'">
                    Delete
                </div>
                <extended-plant-info class="extended-info" :plant="editedPlant" :editMode="editMode"></extended-plant-info>
            </div>
        
            <div v-if="expand" :class="expand?'options-expand':'options-reduce'">
                    <simple-boutton hover-color="rgb(248, 242, 214)" :locked="plantLocked" :class="bouttonClass" v-if="!editMode" @click="edit" >Edit</simple-boutton>
                    <div :class="halfContainerClass" v-if="editMode">
                        <simple-boutton hover-color="rgb(248, 242, 214)" :locked="plantLocked" :class="halfBouttonClass" v-if="editMode" @click="save" >Save</simple-boutton>
                        <simple-boutton hover-color="rgb(248, 242, 214)" :class="halfBouttonClass" v-if="editMode" @click="cancel" >Cancel</simple-boutton>
                    </div>
                    
                    <simple-boutton hover-color="rgb(248, 242, 214)" :class="bouttonClass" v-if="!expand" @click="toggleExpand" >Expand</simple-boutton>
                    <simple-boutton hover-color="rgb(248, 242, 214)" :locked="editMode" :class="bouttonClass" v-if="expand" @click="toggleExpand" >Reduce</simple-boutton>
            </div>
            <reduced-plant-info v-else @click="toggleExpand" :plant="editedPlant" :editMode="editMode"></reduced-plant-info>
        </div>
    </div>
</template>

<script>

import ReducedPlantInfo from './ReducedPlantInfo.vue'
import ExtendedPlantInfo from './ExtendedPlantInfo.vue'
import SimpleBoutton from './SimpleButton.vue'
import * as SocketApi from '../utils/SocketApi'
import * as SourceUtils from '../utils/Sources'

export default {
    name: 'PlantEditor',
    components: {
    ReducedPlantInfo,
    ExtendedPlantInfo,
    SimpleBoutton,
    },
    props: {
        plant: {
            type: Object
        }
    },
    data: function() {
        return {
            editedPlant: undefined,
            editedSources: undefined,
            editMode: false,
            expand: false,
        }
    },
    watch: {
        plant: {
            immediate: true,
            deep:true,
            handler(newVal) {
                this.editedPlant = JSON.parse(JSON.stringify(newVal))
            }
        }
    },
    mounted: function() {
        if(this.plant.new) {
            this.edit()
            this.toggleExpand()
        }
    },
    methods: {
        edit() {
            this.editMode = true
            
            if(this.plant._id) {
                SocketApi.lockPlant(this.plant)
            }
        },
        save() {
            if(this.plant.new) {
                if(this.expand) this.toggleExpand()
                delete this.editedPlant.new
            }

            SourceUtils.clearPlantBeforeSave(this.editedPlant)
            console.log(this.editedPlant)
            this.editMode = false
            this.$emit('submit', this.editedPlant)
            console.log('save')
            // this.$nextTick(() => this.$el.scrollIntoView(true))
            this.$snotify.success('Saved', '', {
                timeout: 2000,
                showProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            });

            SocketApi.unlockPlant(this.plant)
        },
        cancel() {

            if(this.plant.new) {
                this.deletePlant()
                return
            }

            this.editMode = false
            this.editedPlant = JSON.parse(JSON.stringify(this.plant))
            console.log('cancel')

            SocketApi.unlockPlant(this.plant)
        },
        toggleExpand() {
            this.expand = !this.expand
            if(!this.expand && this.editMode) {
                this.cancel()
            }
            this.$nextTick(() => this.$el.scrollIntoView(true))
        },
        deletePlant() {
            this.$emit('delete', this.editedPlant)
        }
    },
    computed: {
        bouttonClass() {
            return this.expand? 'simple-boutton-expand':'simple-boutton-reduce'
        },
        halfBouttonClass() {
            return this.expand? 'half-boutton-expand':'half-boutton-reduce'
        },
        halfContainerClass() {
            return this.expand? 'half-boutton-container-expand':'half-boutton-container-reduce'
        },
        plantLocked() {
            return this.plant.locked === true
        }
    }
}
</script>