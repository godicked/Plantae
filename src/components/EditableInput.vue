<template>
<span>
    <span v-if="editMode == false">{{ value }}</span>
    <input v-if="editMode" :type="type" :value="value" v-on:input="update($event.target.value)">
</span>
</template>

<script>
 export default {
    name: 'EditableInput',
    props: {
        value: String | Number,
        type: String,
        editMode: {
            type: Boolean,
            default: false
        }
    },
    data() {return {
    }},
    methods: {
        update(value) {
            console.log('EditableInput Emit: input -> ' + value)
            this.$emit('input', value)
        }
    }
}
</script>