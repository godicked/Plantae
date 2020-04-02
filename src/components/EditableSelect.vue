<template>
<span>
    <span v-if="editMode === false">{{ selected }}</span>
    <select v-else v-model="value" v-on:input="$emit('input', Number($event.target.value))">
        <option v-for="(option, idx) in options" :key="idx" :value="idx">{{option}}</option>
    </select>
</span>
</template>

<script>
 export default {
    name: 'EditableSelect',
    props: {
        options: Array,
        value: Number,
        editMode: Boolean
    },
    data() {return {
    }},
    computed: {
        selected() {
            return this.options[this.value]
        }
    }
}
</script>