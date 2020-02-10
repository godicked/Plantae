<style>
.table
{
    position:relative;
    left: 200px;
    /* border-spacing: 2px; */
    background-color: rgb(224, 216, 176);
    /* border-collapse: collapse; */
}
td{
    background-color: white;
}
</style>

<template>
<div class="table">
    <div>
        <vue-csv-import v-model="csv" :map-fields="['name', 'semis', 'recolte']"></vue-csv-import>
    </div>

    <div>
        <table v-if="table != undefined">
            <tr>
                <td>Plante</td>
                <td v-on:click="monthClick" v-for="(month, idx) in monthAsName" :key="idx" colspan=2 style="text-align:center; background-color: #765707;">{{monthAsName[(idx + firstMonth)%12]}}</td>
            </tr>

            <slot v-for="(plant, idx) in sortedTable">
            <month-row :rowspan="idx === selectedPlant ? 2:1" :on-click="() => selectPlant(idx)" :label="plant.name" :default-color="idx === selectedPlant ? '#edbd24':'#c69707'" :selected-color="idx === selectedPlant ? '#00b000':'green'" :selected-month="plant.semis" :offset="firstMonth"></month-row>
            <month-row :on-click="() => selectPlant(idx)" v-if="idx === selectedPlant" default-color="#edbd24" selected-color="#904040" :selected-month="plant.recolte" :offset="firstMonth"></month-row>
            </slot>
        </table>
    </div>
</div>
</template>

<script>
import VueCsvImport from 'vue-csv-import'
import MonthRow from './MonthRow'

export default {
    name: 'CsvTable',
    components: {
        VueCsvImport,
        MonthRow
    },
    props: {
        table: {
            type: Array,
            default: undefined
        }
    },
    mounted() {
        // let save = localStorage.table
        // TODO remember 1
        // if(save != "undefined")
        // {
        //     let table = JSON.parse(localStorage.getItem('table'))
        //     this.table = this.sortBySemis(table)
        // }
        
    },
    data() {return {
        csv: null,
        // TODO: remember 1
        // table: undefined,
        // html; d'habitude on va plutot utiliser de 0 a 11 pour comparer, ordonner.
        monthAsName: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Séptembre', 'Octobre', 'Novembre', 'Décembre'],
        firstMonth: 0, // first month is the table as number
        selectedPlant: undefined // selected plant in table
    }},
    computed: {
    },
    watch: {
        csv: {
            deep: true,
            handler: function (newVal) {
                let plants = JSON.parse(JSON.stringify(newVal)) // delete all reffs.  hacky way
                let l = plants.length
                for(let i = 0; i < l; i++) {
                    let p = plants[i]
                    p.semis = this.clearMonthData(p.semis)
                    p.recolte = this.clearMonthData(p.recolte)
                }
                this.table = this.sortBySemis(plants)
                localStorage.setItem('table', JSON.stringify(this.table))
            }
        },
    },
    computed: {
        sortedTable() {
            return this.sortBySemis(this.table)
        }
    },
    methods: {
        selectPlant(idx) {
            if(this.selectedPlant === idx) {
                this.selectedPlant = undefined
                return
            }
            this.selectedPlant = idx
        },
        monthClick(event) {
            let month = this.monthAsName.indexOf(event.target.innerHTML)
            this.firstMonth = month
        },
        cleanString(s) {
            s = s.replace(/\([^()]*\)/g, '');
            s = s.replace(/\s/g, '')
            s = s.replace(/#/g, '')
            s = s.replace(/°/g, '')
            s = s.replace(/\*/g, '')
            return s
        },
        minMonth(months) {
            return months[0]
        },
        maxMonth(months) {
            months[months.length-1]
        },
        containsMonth(source, month) {
            return source.includes(month)
        },
        clearMonthData(data) {
            let month = this.cleanString(data)
            month = month.split(';')
            month = month.map(x => this.monthToNumber(x))
            let l = month.length
            for(let i = 0; i < l; i++) {
                if(i == l-1) {
                    if(month[i-1] + 1 == month[i]) month.push(month[i]+0.5)
                    else if(month[i-1] + 1.5 == month[i]){
                        month[i] -= 0.5
                        month.push(month[i] - 0.5)
                    } 
                } 
                else if(month[i] + 1 == month[i+1]) month.push(month[i]+0.5)
            }
            // console.log(month.sort())
            return month.sort((a,b) => {return a-b})
        },
        sortBySemis(data){
            let res = data.slice()
            res = res.sort((cvs1, cvs2) => {
                let diff = this.minMonth(cvs1.semis) - this.minMonth(cvs2.semis)
                if(diff == 0) {
                    return this.maxMonth(cvs1.semis) - this.maxMonth(cvs2.semis)
                }
                return diff
            })
            return res
        },
        monthToNumber(month) {

            month = month.replace(/\s/g, '')
            month = month.replace(/#/g, '')
            month = month.replace(/°/g, '')
            month = month.replace(/\*/g, '')

            switch(month){
                case 'janvier':
                    return 0
                case 'mi-janvier':
                    return 0.5
                case 'fevrier':
                    return 1
                case 'mi-fevrier':
                    return 1.5
                case 'mars':
                    return 2
                case 'mi-mars':
                    return 2.5
                case 'avril':
                    return 3
                case 'mai':
                    return 4
                case 'juin':
                    return 5
                case 'juillet':
                    return 6
                case 'aout':
                    return 7
                case 'septembre':
                    return 8
                case 'mi-septembre':
                    return 8.5
                case 'octobre':
                    return 9
                case 'mi-octobre':
                    return 9.5
                case 'novembre':
                    return 10
                case 'mi-novembre':
                    return 10.5
                case 'decembre' || 'décembre':
                    return 11
                case 'mi-decembre':
                    return 11.5
            }
            return 13
        },
        
    }
}
</script>