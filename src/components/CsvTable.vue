<style scoped>
.table
{
    position: absolute;
    left: 200px;
    right: 0;
    /* border-spacing: 2px; */
    background-color: rgb(212, 203, 156);
    /* border-collapse: collapse; */
}
tr {
    background-color: rgb(243, 241, 230);
}
td{
    /* background-color: white; */
    cursor:pointer;
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
}
.calender-container {
    position: relative;
    width: 100%;
}
.calender {
    /* position: absolute; */
    /* left: 0px; */
    /* width: 100%; */
    margin-left: 10px;
    margin-right: 10px;
}
.list-container {
    position: relative;
    padding-top: 10px;
}
.selected {
    background-color: rgb(230, 223, 189);
}
</style>

<template>
<div class="table">
    <!-- <div> -->
        <!-- <vue-csv-import v-model="csv" :map-fields="['name', 'semis', 'recolte']"></vue-csv-import> -->
    <!-- </div> -->

    <div class="list-container" v-if="table != undefined">
        <!-- <tr>
            <td>Plante</td>
            <td v-on:click="monthClick" v-for="(month, idx) in monthAsName" :key="idx" colspan=2 style="text-align:center; background-color: #765707;">{{monthAsName[(idx + firstMonth)%12]}}</td>
        </tr> -->

        <div v-for="(plant, idx) in sortedTable" :key="plant.name" @click="selectPlant(idx)" :class="{selected: idx===selectedPlant, 'calender-container':true}">
        <!-- <month-row :rowspan="idx === selectedPlant ? 2:1" :on-click="() => selectPlant(idx)" :label="plant.name" :default-color="idx === selectedPlant ? '#edbd24':'#c69707'" :selected-color="idx === selectedPlant ? '#00b000':'green'" :selected-month="plant.semis[0].dates" :offset="firstMonth"></month-row>
        <month-row :on-click="() => selectPlant(idx)" v-if="idx === selectedPlant" default-color="#edbd24" selected-color="#904040" :selected-month="plant.recolte" :offset="firstMonth"></month-row> -->
            <editable-calender :labelPos="3" :label="plant.name" :rows="1" :columns="12" class="calender" :value="computedSources[plant._id].dates.semis" :colors="['#c69707', '#00b0b0', '#008000']" ></editable-calender>
            <editable-calender v-if="idx === selectedPlant" :labelPos="3" :label="' '" :rows="1" :columns="12" class="calender" :value="computedSources[plant._id].dates.recolte" :colors="['#c69707', '#904040']"></editable-calender>
        </div>
    </div>
</div>
</template>

<script>
import VueCsvImport from 'vue-csv-import'
import MonthRow from './MonthRow'
import * as SourceUtils from '../utils/Sources'
import EditableCalender from './EditableCalender'
import * as Sorting from '../utils/Sorting'

export default {
    name: 'CsvTable',
    components: {
        VueCsvImport,
        MonthRow,
        EditableCalender
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
        selectedPlant: undefined, // selected plant in table,
    }},
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
                // plants = this.sortBySemis(plants)
                plants = plants.filter(p1 => !this.table.some(p2 => p2.name == p1.name))

                // console.log(plants)
                
                plants.forEach(p => {
                    p.semis = [{dates: p.semis}]
                    p.recolte = [{dates: p.recolte}]
                    console.log(p)
                    this.table.push(p)
                })

                // localStorage.setItem('table', JSON.stringify(this.table))
            }
        },
    },
    computed: {
        sortedTable() {
            return Sorting.sortPlants(this.table)
        },
        computedSources() {
            let cmp = {}
            this.table.forEach(plant => {
                cmp[plant._id] = SourceUtils.computeSourcesToInfos(SourceUtils.filterSourcedInfos(plant.sourcedInfos))
            })
            return cmp
        }
    },
    methods: {
        selectPlant(idx) {
            console.log('clickckckc')
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