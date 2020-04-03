<style scoped>
table {
    table-layout:fixed;
    width: 100%;
}

td {
    position: relative;
    width: 40px !important;
    height: 20px !important;
    /* margin: 0; */
    padding: 0;
    overflow: hidden;
}
td div {
    position: absolute;
    /* display: inline-block; */
    
    width: 50%;
    height: 100%;
} 
.left {
    top: 0px;
}
.right {
    top: 0px;
    left: 50%;
}
.month {
    top: 0px;
    width: 100%;
    text-align: center;
    pointer-events: none;
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
}

th
{
    position: relative;
}

.switch {
    display: inline-block;
    position: absolute;
    right: 0px;
    top:1px;
    bottom:1px;
}
</style>


<template>
<div>
<div>
    <table>
        <tr><th colspan=4>{{label}} <toggle-button v-if="useToggle" @change="toggleHandler" v-model="toggleState" :width="65" :color="{checked: colors[2], unchecked:colors[1]}" :labels="{checked: 'outside', unchecked: 'inside'}" class="switch"/></th></tr>
        <tr v-for="row in 3" :key="row">
            <td v-for="col in 4" :key="col"> 
                    <div class="left" v-on:click="() => toggleMonth(month(row,col))" :style="{cursor: editMode?'pointer':'inherit', backgroundColor: color(month(row,col))}"></div>
                    <div class="right" v-on:click="() => toggleMonth(month(row,col) +0.5)" :style="{cursor: editMode?'pointer':'inherit', backgroundColor: color(month(row,col) +0.5)}"></div>
                    <div class="month">{{monthAsString[month(row,col)]}}</div>
            </td>
        </tr>
    </table>
</div>
</div>
</template>

<script>

import EditableSelect from './EditableSelect'
import { ToggleButton } from 'vue-js-toggle-button'

 export default {
    name: 'EditableCalender',
    components: {
        EditableSelect,
        ToggleButton
    },
    props: {
        value: Array,
        weight: Array,
        colors: Array,
        editMode: Boolean,
        label: String
    },
    data() {return {
        monthAsString: ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUI', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'],
        defaultState: this.colors.length-1,
        toggleState: true
    }},
    methods: {
        toggleMonth(month) {
            if(this.editMode) {
                let val = this.value[month*2]
                if(val === this.defaultState) {
                    this.$set(this.value, month*2, 0)
                }
                else {
                    this.$set(this.value, month*2, this.defaultState)
                }
            }
            // if(this.editMode) {
            //     if(this.value.includes(month)) {
            //         this.value.splice( this.value.indexOf(month), 1 )
            //     }
            //     else {
            //         this.value.push(month)
            //         this.value.sort()
            //     }
            // }
        },
        color(month) {
            // let selected = this.value[month*2] !== 0
            // if(!selected) {
            //     return this.defaultColor
            // }
            if(this.value[month*2] === 0) {
                return this.colors[0]
            }

            let color = this.colors[this.value[month*2]]

            let weight = 1
            if(this.weight !== undefined) weight = this.weight[month*2]

            // const maxWeight = this.maxWeight
            // weight = (weight + 1) / 2
            // weight = weight*weight
            return this.lerpColor('#e0d8b0', color, weight)
        },
        lerpColor(a, b, amount) { 
            var ah = parseInt(a.replace(/#/g, ''), 16),
                ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
                bh = parseInt(b.replace(/#/g, ''), 16),
                br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
                rr = ar + amount * (br - ar),
                rg = ag + amount * (bg - ag),
                rb = ab + amount * (bb - ab);

            return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
        },
        month(row, col) {
            return (col-1) + (row-1) * 4
        },
        toggleHandler(event) {
            this.defaultState = event.value ? 2 : 1
            console.log(this.defaultState)
        }
    },
    computed: {
        useToggle() {
            return this.colors.length > 2 && this.editMode
        }
    }
}
</script>