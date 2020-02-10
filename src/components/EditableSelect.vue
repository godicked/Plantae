<template>
<span>
    <span v-if="editMode == false" v-on:click="editMode = true">{{ text }}</span>
    <select v-if="editMode">
        <option v-for="option in options" :key="option" v-bind:selected="option == text">{{ option }}</option>
    </select>
</span>
</template>

<script>
 export default {
    name: 'EditableSelect',
    props: {
        options: Array,
        text: String
    },
    data() {return {
        editMode: false
    }},
}
</script>