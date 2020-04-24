<template>
<span>
    <span v-if="isArray && editMode">{{selectedList.join(', ')}}</span>
    <span v-if="editMode === false">{{ selected }}</span>
    <select v-else :value="value" v-on:input="input">
        <option v-if="acceptUndefined" :value="'__undefined__'"></option>
        <option v-for="(option, idx) in options" :key="idx" :value="idx">{{option}}</option>
    </select>
</span>
</template>

<script>
 export default {
    name: 'EditableSelect',
    props: {
        options: Array,
        value: [Number, Array],
        editMode: Boolean,
        acceptUndefined: Boolean
    },
    data() {return {
    }},
    computed: {
        selected() {
            return this.options[this.value]
        },
        isArray() {
            return Array.isArray(this.value)
        },
        selectedList() {
            return this.value.map(v => this.options[v])
        }
    },
    methods: {
        input(event) {
            const value = event.target.value
            // console.log(value)
            if(value !== '__undefined__') {
                this.$emit('input', Number(value))
            }
            else {
                // console.log('undefined')
                this.$emit('input', undefined)
            }                
        }
    }
}
</script>