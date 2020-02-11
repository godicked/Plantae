<style scoped>
input {
    text-align: center;
    width: 100%;
    height: 100%;
}
</style>

<template>
<span>
    <span v-if="editMode == false">{{ value }}</span>
    <input v-if="editMode" :type="type" :value="value" :style="{fontSize: fontSize}" v-on:input="update($event.target.value)">
</span>
</template>

<script>
 export default {
    name: 'EditableInput',
    props: {
        value: String,
        type: String,
        editMode: {
            type: Boolean,
            default: false
        },
        fontSize: {
            type: String,
            default: '26px;'
        }
    },
    data() {return {
    }},
    methods: {
        update(value) {
            // console.log('EditableInput Emit: input -> ' + value)
            this.$emit('input', value)
        }
    }
}
</script>