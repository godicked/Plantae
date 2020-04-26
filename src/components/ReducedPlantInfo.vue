<style scoped>
.container {
    background-color: rgb(226, 226, 226);
    width: 276px;
    /* height: 100%; */
    padding-top: 10px;
}
.plant-image {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 230px;
    height: 230px;
    overflow: hidden;
    /* border-radius: 50%; */
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
    overflow: hidden;
    text-align: center;
    line-height: 50px;
    padding: 0;
}

.icon-container {
    width: 256px;
    /* margin: 10px; */
    margin-left: 10px;
    /* margin-bottom: 0; */
    /* background: yellow; */
    text-align: center;
    /* padding-bottom: 10px; */
}

.info-icon {
    height: 50px;
    width: 50px;
    /* background: white; */
}

.soil-container {
    margin:0;
    padding:0;
    height: 81px;
}

.info-soil {
    display: inline-block;
    width: 92px;
    margin: 0;
    padding: 0;
    /* height: 60px; */
    opacity: 0.5;
}

.info-soil img {
    width: 100%;
}
.active-soil {
    opacity: 1;
}

.temp {
    position:absolute;
    display: inline-block;
    left:20px;
    height: 35px;
    width: 5px;
}
.low {
    top:210px;
}

.high {
    top:15px;
}

.size {
    position:absolute;
    display: inline-block;
    right:20px;
    height: 35px;
    width: 5px;
}

.size-width {
    position:absolute;
    display: inline-block;
    right:3px;
    height: 4px;
    top: 220px;
}


</style>

<template>
  <div class="container" @click="$emit('click')">
    <div class="plant-image">
        <circular-calender style="width:100%; height:100%;" :image="plant.image" :semis="semisSource" :recolte="recolteSource"></circular-calender>
    </div>

    <img src="./../../res/Asset 5.png" class="temp low"/>
    <img src="./../../res/Asset 6.png" class="temp high"/>
    <img src="./../../res/Asset 8.png" class="size-width"/>
    <img src="./../../res/Asset 7.png" class="size high"/>

    <div class="plant-name">
      {{plant.name}}
    </div>

    <table class="icon-container">
        <tr>
            <td><img src="./../../res/moist.svg" class="info-icon"/></td>
            <td><img src="./../../res/soleil-full.svg" class="info-icon"/></td>
            <td><img src="./../../res/Asset 3.svg" class="info-icon"/></td>
            <td><img src="./../../res/ph-neutre.svg" class="info-icon"/></td>
        </tr>
    </table>

    <div class="soil-container">
        <img src="./../../res/soil_1.svg" class="info-soil " :class="{'active-soil': soilIsOk(0)}"/>
        <img src="./../../res/soil_2.svg" class="info-soil " :class="{'active-soil': soilIsOk(1)}"/>
        <img src="./../../res/soil_3.svg" class="info-soil " :class="{'active-soil': soilIsOk(2)}"/>
    </div>
  </div>
</template>

<script>
import EditableCalender from './EditableCalender.vue';
import EditableInput from './EditableInput.vue';
import SourcedCalender from './SourcedCalender';
import * as SourceUtils from '../utils/Sources';
import CircularCalender from './CircularCalender';

export default {
    name: "ReducedPlantInfo",
    components: {
        EditableCalender,
        EditableInput,
        SourcedCalender,
        CircularCalender
    },
    props: {
        editMode: {
        type: Boolean,
        default: false
        },
        plant: Object
    },
    computed: {
        semisSource() {
            return this.info.dates.semis
        },
        recolteSource() {
            return this.info.dates.recolte
        },
        info() {
            return SourceUtils.computeSourcesToInfos(this.filteredSourcedInfos)
        },
        filteredSourcedInfos() {
            return SourceUtils.filterSourcedInfos(this.plant.sourcedInfos)
        }
    },
    methods: {
        scrollToSource(target) {
            this.$nextTick(() => target.parentElement.scrollTo(0, 200));
        },
        soilIsOk(n) {
            return this.info.requirements.soil.includes(n)
        }
    }
}
</script>
