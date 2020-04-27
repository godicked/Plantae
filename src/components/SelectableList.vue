<style scoped>
</style>

<template>
<span>
    <span v-if="selectMode === false">{{ options.join(', ') }}</span>
    <select v-else v-model="value" v-on:input="$emit('input', Number($event.target.value))">
        <option v-for="(option, idx) in options" :key="idx" :value="idx">{{option}}</option>
    </select>
</span>
</template>

<script>
 export default {
    name: 'SelectableList',
    props: {
        options: Array,
        value: Number,
        selectMode: Boolean
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