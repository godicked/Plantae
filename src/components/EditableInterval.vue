<style scoped>
input {
    width: 50px;
    text-align: center;
    padding: 0;
    margin:0;
    border-radius: 5%;
    line-height: 18px;
    padding-top: 2px;
    padding-bottom: 2px;
}
</style>

<template>
<span>
    <span v-if="!editMode">
        <span v-if="isInterval">
            {{value.min}} à {{value.max}} {{usedUnit}}
        </span>
        <span v-else-if="uniqueValue !== undefined">
            {{uniqueValue}} {{usedUnit}}
        </span>
    </span>
    <table v-else>
        <tr>
            <td><input :value="value.min" type="number" placeholder="min" @input="handlerMin" /></td>
            <td>à</td>
            <td><input :value="value.max" type="number" placeholder="max" @input="handlerMax" /></td>
            <td v-if="withUnit">
                <select :value="usedUnit" @input="changeUnit">
                    <option :value="'cm'">cm</option>
                    <option :value="'m'">m</option>
                </select>
            </td>
        </tr>
    </table>
</span>
</template>

<script>
 export default {
    name: 'EditableInterval',
    props: {
        options: Array,
        value: Object,
        editMode: Boolean,
        withUnit: Boolean
    },
    data() {return {
        unit: 'cm'
    }},
    computed: {
        usedUnit() {
            if(!this.withUnit) {
                return undefined
            }
            if(this.value.unit !== undefined) {
                return this.value.unit
            }
            else {
                return this.unit 
            }
        },
        isInterval() {
            const minB = !isNaN(this.value.min)
            const maxB = !isNaN(this.value.max)

            return minB && maxB
        },
        uniqueValue() {
            return !isNaN(this.value.min) ? this.value.min : this.value.max
        }
    },
    methods: {
        handlerMin(event) {
            let val = event.target.value
            if(val == '') val = undefined

            this.update({min: val, max:this.value.max})
        },
        handlerMax(event) {
            let val = event.target.value
            if(val == '') val = undefined
            
            this.update({min: this.value.min, max:val})  
        },
        update(obj) {
            const res = {}
            
            this.$set(res, 'min', obj.min)
            this.$set(res, 'max', obj.max)

            if(this.withUnit && (res.min !== undefined || res.max !== undefined)) {
                this.$set(res, 'unit', this.usedUnit)
            }
            
            this.$emit('input', res)
        },
        changeUnit(event) {
            this.unit = event.target.value
            if(this.value.min !== undefined || this.value.max !== undefined) {
                this.value.unit = this.unit
                this.update(this.value)
            }
        }
    }
}
</script>