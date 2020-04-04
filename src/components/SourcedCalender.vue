<style scooped>
.source-field {
    text-align: right;
    font-size: 13px;
}
.source-option-container {
    /* background-color:yellow; */
    width: 30px;
    float:right;
    font-size: 17px;
    line-height: 18px;
    text-align: center;
    font-weight: bold;
}

.source-option-plus
{
    display: inline-block;
    width: 13px;
    cursor: pointer;
}

.source-option-minus
{
    display: inline-block;
    width: 13px;
    cursor: pointer;
}

.source-option-plus:hover
{
    color: green;
}

.source-option-minus:hover
{
    color: red;
}

.add-source-container {
    position: relative;
    width: 100%;
    line-height: 18px;
    font-size: 15px;
}

.red {
    color: red;
}

</style>

<template>
<div>
    <div>
        <editable-calender @input="$emit('input', $event.target.value)" :weight="weight" :editMode="editMode" :label="label" :value="dates" :colors="colors"></editable-calender>
        <div class="source-field" v-if="!addSourceMode">
            <span v-if="editMode">Select </span>Source: 
            <editable-select :class="names[0] === 'None'?'red':''" :editMode="editMode" v-model="dataIdx" :options="names"></editable-select>
            <span v-if="editMode" class="source-option-container"><span class="source-option-plus" @click="addSourceMode = true; $emit('addSource',$el)">+</span><span class="source-option-minus" @click="removeSource">-</span></span>            
        </div>
        <div v-if="editMode && addSourceMode" class="add-source-container">
            <source-list :excludedRanks="alreadyUsedSource" @clear="addSourceMode=false" @select="addSource"></source-list>
        </div>
    </div>
</div>
</template>

<script>
import EditableCalender from './EditableCalender'
import EditableSelect from './EditableSelect'
import SourceList from './SourceList'
import * as SourceUtils from '../utils/Sources'

export default {
    name: "SourcedCalender",
    components: {
        EditableCalender,
        EditableSelect,
        SourceList
    },
    props: {
        value: Array, // [{dates, source}]
        colors: Array,
        editMode: Boolean,
        label: String,
    },
    watch: {
        editMode: {
            handler(newMode) {
                if(newMode === false) {
                    this.addSourceMode = false
                }
            }
        }
    },
    data() { return {
        ids: 0,
        editDataIdx: 0,
        readDataIdx: 0,
        addSourceMode: false
    }},
    computed: {
        sourcesOptions() {
            let a = [...this.$store.state.sources.map(s => s.name), 'Default']
            return a

        },
        names() {
            if(this.editMode) {
                return this.computedSource.names
            }
            else {
                return [this.computedSource.names.join(',')]
            }
        },
        dates() {
            if(this.editMode) {
                return this.selectedData.dates
            }
            else {
                return this.computedSource.dates
            }
        },
        weight() {
            // if(this.editMode || this.onlyDefault) return undefined
            return this.computedSource.weight
        },
        computedSource() {
            return SourceUtils.computeDates(SourceUtils.selectDefinedSources(this.value))
        },
        selectedData() {
            let idx = this.dataIdx
            if(this.editMode && !this.onlyDefault) {
                idx++
            }
            return this.value[idx]
        },
        dataIdx: {
            get() {
                return this.editMode? this.editDataIdx : this.readDataIdx
                // return this.editDataIdx
            },
            set(val) {
                if(this.editMode) {
                    this.editDataIdx = val
                }
            }
        },
        defaultSourceName() {
            if(this.editMode || this.onlyDefault) {
                return 'Default'
            }
            else {
                let name = ''
                this.value.filter(d => d.source !== undefined).forEach((d, idx) => {
                    if(idx !== 0) name +=', '
                    name += d.source.name
                })
                return name
            }
        },
        onlyDefault() {
            return this.value.length === 1 && this.value[0].source === undefined
        },
        alreadyUsedSource() {
            return this.value.filter(s => s.source !== undefined).map(s => s.source.rank)
        }

    },
    methods: {
        removeSource() {
            if(this.onlyDefault) {
                return
            }
            else {
                console.log(this.editDataIdx)
                this.value.splice(this.editDataIdx+1,1)
                if(this.editDataIdx > 0) {
                    this.editDataIdx--
                }
            }
        },
        addSource(source) {
            this.value.push({dates:Array(24).fill(0), source:source})
            this.addSourceMode=false
            this.editDataIdx = this.value.length-2
        }
    }
}
</script>