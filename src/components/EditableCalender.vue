<style scoped>
table {
    table-layout:fixed;
    width: 100%;
}
tr {
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
</style>


<template>
<div style="width: 230px; margin: 0 auto;">
    <table>
        <tr><th colspan=4>{{label}}</th></tr>
        <tr v-for="row in 3">
            <td v-for="month in 4"> 
                    <div class="left" v-on:click="() => toggleMonth((month-1) + (row-1) * 4)" :style="{backgroundColor: value.includes((month-1) + (row-1) * 4) ? selectedColor:defaultColor}"></div>
                    <div class="right" v-on:click="() => toggleMonth((month-1) + (row-1) * 4 +0.5)" :style="{backgroundColor: value.includes((month-1) + (row-1) * 4 +0.5) ? selectedColor:defaultColor}"></div>
                    <div class="month">{{monthAsString[(month-1) + (row-1) * 4]}}</div>
            </td>
        </tr>
    </table>
</div>
</template>

<script>
 export default {
    name: 'EditableCalender',
    props: {
        value: Array,
        defaultColor: String,
        selectedColor: String,
        editMode: {
            type: Boolean,
            defaut: false
        },
        label: String
    },
    data() {return {
        monthAsString: ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUI', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC']
    }},
    methods: {
        toggleMonth(month) {
            if(this.editMode) {
                if(this.value.includes(month)) {
                    this.value.splice( this.value.indexOf(month), 1 )
                }
                else {
                    this.value.push(month)
                    this.value.sort()

                }
            }
        }
    }
}
</script>