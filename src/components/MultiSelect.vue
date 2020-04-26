<template>
<span>
    <span v-if="!editMode">{{ value.map(v => options[v]).join(', ') }}</span>
    <span v-else>
        <span v-for="(option, idx) in options" :key="idx"><input type="checkbox" :checked="value.includes(idx)" @change="e => checkbox(e, idx)" />{{option}}</span>
    </span>
</span>
</template>

<script>
 export default {
    name: 'MultiSelect',
    props: {
        options: Array,
        value: Array,
        editMode: Boolean
    },
    data() {return {
    }},
    methods: {
        checkbox(event, idx) {
            const val = event.target.checked
            if(val && !this.value.includes(idx)) {
                this.value.push(idx)
            }
            if(!val && this.value.includes(idx)) {
                this.value.splice(this.value.indexOf(idx), 1)
            }
            this.value.sort()
            this.$emit('input', this.value)
        }
    }
}
</script>