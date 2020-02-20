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
    margin: 0;
    overflow: hidden;
    text-align: center;
    line-height: 50px;
    padding: 0;
}
.plant-name input{
    width: 210px;
    padding: 0;
    font-size: 20px;
    font-family: inherit;
    color:inherit;
    border:none;
    background-color: rgb(241, 239, 223);
    border-radius: 30px;
    padding-left: 10px; 
    padding-right: 10px;
}

.plant-name span {
    cursor: default;
}

</style>

<template>
<div>
    <div class="plant-image">
        <img :src="plant.image"/>
        <input v-if="editMode"  type="text" v-model="plant.image" placeholder="image url"/>
    </div>
    
    <div class="plant-name"><editable-input :editMode="editMode" type="text" v-model="plant.name"/></div>

    <editable-calender :editMode="editMode" label="Semis" v-model="plant.semis" default-color="#c69707" selected-color="green"></editable-calender>
    <editable-calender :editMode="editMode" label="Recoltes" v-model="plant.recolte" default-color="#c69707" selected-color="#904040"></editable-calender>
</div>
    
</template>

<script>
import EditableCalender from './EditableCalender.vue'
import EditableInput from './EditableInput.vue'

export default {
    name: 'ReducedPlantInfo',
    components: {
        EditableCalender,
        EditableInput
    },
    props: {
        editMode: {
            type: Boolean,
            default: false
        },
        plant: Object
    }
}

</script>