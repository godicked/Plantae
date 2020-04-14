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
    width: 240px;
    height: 240px;
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
    height: 70px;
}

.info-soil {
    display: inline-block;
    width: 92px;
    margin: 0;
    padding: 0;
    height: 70px;
    opacity: 0.5;
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
            <td><img src="./../../res/Asset 1.svg" class="info-icon"/></td>
            <td><img src="./../../res/Asset 2.svg" class="info-icon"/></td>
            <td><img src="./../../res/Asset 3.svg" class="info-icon"/></td>
            <td><img src="./../../res/Asset 4.svg" class="info-icon"/></td>
        </tr>
    </table>

    <div class="soil-container">
        <img src="./../../res/sable.png" class="info-soil active-soil"/>
        <img src="./../../res/terr2.png" class="info-soil active-soil"/>
        <img src="./../../res/argile2.png" class="info-soil"/>
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
    name: "ReducedInfoF",
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
        if (!this.editMode) {
            return SourceUtils.computeDates(
            SourceUtils.computePlant(this.plant).semis
            );
        } else {
            return this.plant.semis;
        }
        },
        recolteSource() {
        if (!this.editMode) {
            return SourceUtils.computeDates(
            SourceUtils.computePlant(this.plant).recolte
            );
        } else {
            return this.plant.recolte;
        }
        }
    },
    methods: {
        scrollToSource(target) {
        this.$nextTick(() => target.parentElement.scrollTo(0, 200));
        }
    }
}
</script>
