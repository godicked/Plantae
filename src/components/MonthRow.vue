<template>
<tr>
    <td v-on:click="onClick()" v-if="label != undefined" :rowspan="rowspan" style="max-width: 300px; vertical-align: top; text-overflow: ellipsis; overflow:hidden; white-space: nowrap"><span>{{label}}</span></td>
    <td v-on:click="onClick()" style="min-width: 35px; position:relative; padding: 0px; height: 25px;" v-for="month in range(0,23,1)" :key="month"> 
        <div :style="{backgroundColor: selectedColor, width: '100%', position:'absolute', top:'0px', bottom:'0px'}" v-if="selectedMonth[((month + offset)%24)] !== 0"></div>
        <div :style="{backgroundColor: defaultColor, width: '100%', position:'absolute', top:'0px', bottom:'0px'}" v-else></div>
    </td>
</tr>
</template>

<script>
 export default {
    name: 'MonthRow',
    props: {
        selectedMonth: Array,
        defaultColor: String,
        selectedColor: String,
        offset: {
            type:Number,
            default: 0
        },
        label: String,
        onClick: {
            type: Function,
            default: () => {}
        },
        rowspan: {
            type:Number,
            default: 1
        }
    },
    data() {return {
    }},
    methods: {
        range(start, end, step) {

            if(end < start) return []
            var range = [];
            var typeofStart = typeof start;
            var typeofEnd = typeof end;

            if (step === 0) {
                throw TypeError("Step cannot be zero.");
            }

            if (typeofStart == "undefined" || typeofEnd == "undefined") {
                throw TypeError("Must pass start and end arguments.");
            } else if (typeofStart != typeofEnd) {
                throw TypeError("Start and end arguments must be of same type.");
            }

            typeof step == "undefined" && (step = 1);

            if (end < start) {
                step = -step;
            }

            if (typeofStart == "number") {

                while (step > 0 ? end >= start : end <= start) {
                    range.push(start);
                    start += step;
                }

            } else if (typeofStart == "string") {

                if (start.length != 1 || end.length != 1) {
                    throw TypeError("Only strings with one character are supported.");
                }

                start = start.charCodeAt(0);
                end = end.charCodeAt(0);

                while (step > 0 ? end >= start : end <= start) {
                    range.push(String.fromCharCode(start));
                    start += step;
                }

            } else {
                throw TypeError("Only string and number types are supported");
            }

            return range;

        }
    }
}
</script>