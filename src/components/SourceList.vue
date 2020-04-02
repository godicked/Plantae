<style scooped>
/* .main-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left:0;
    right:0;
    background-color: rgb(240, 234, 207);
    overflow: scroll;
} */

.top-option-panel {
    position: relative;
    margin-top: 10px;
    position: relative;
    text-align: left;
    margin-right: 10px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding:0;
    margin-left:5px;
    cursor: pointer;
    text-align: left;
}

.top-option-panel input{
    display: inline-block;
    border:none;
    width: 100%;
    background-color: inherit;
    line-height: 14px;
    padding:0;
    padding-left: 10px;
    font-size: 14px;
    margin:0;
    color:inherit;
    font-family: inherit;
    height: 14px;
}

.top-option-panel input:focus {
    outline: none;
}

.sources {
    position:relative;
    top: 0px;
    margin-top: 0px;
    margin-left: 0px;
    height: 100px;
    overflow: scroll;
}

.sources-full {
    position:relative;
    top: 0px;
    margin-top: 0px;
    margin-left: 0px;
    height: 100%;
    /* overflow: scroll; */
}

.plant-options{
  display: inline-block;
  position: absolute;
  right: 0px;
  top: 0px;
}

.plant-options span{
  cursor:pointer;
  display: inline-block;
  margin-left: 10px;

}

.delete-source-boutton {
    cursor: pointer;
}

.delete-source-boutton:hover {
    color:red;
}

</style>

<template>
    <div>
        <div class="main-container">
            <div class="top-option-panel">
                <input type="text" v-model="searchString" placeholder="Search by Name..."/>
                <div class="plant-options">
                    <span @click="searchString=''; $emit('clear');">Cancel</span>
                    <!-- <span>Add</span> -->
                </div>
                <hr style="margin-left:10px;">
            </div>

            <ul :class="full?'source-full':'sources'">
                <li @click="select(source.name)" v-for="source in sources" :key="source.name">
                    <span v-if="full" @click="delSource(source)" class="delete-source-boutton">X</span>  <b>[{{source.rank}}] {{source.name}}</b> <i>{{source.description}}</i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

// import { mapGetters } from 'vuex'

export default {
    name: "SourceList",
    data() { return {
        searchString: ''
    }},
    props: {
        full: Boolean
    },
    computed: {
        sources() {
            return this.$store.getters.sourcesByName(this.searchString)
        }
    },
    methods: {
        select(source) {
            this.$emit('select', source)
        },
        delSource(source) {
            this.$store.commit('delSource', source)
        }
    }
}
</script>