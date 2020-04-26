
<style>
.vertical-menu {
    text-align: center;
    position:fixed;
    margin: 0px;
    padding: 0px;
    width: 200px;
    background-color: rgb(136, 129, 70);
    height: 100vh;
}
.vertical-menu a {
    display: block;
    padding: 12px;
    text-decoration: none;
    color: rgb(255, 230, 0);
    background-color: #298300;
    margin: 5px;
}
.vertical-menu a:hover {
    background-color: #71c72b;
}

.active {
    background-color: #51ad27 !important;
}
</style>

<template>
<div>
    <div class="vertical-menu" v-if="options !== undefined">
        <a v-for="option in options" :key="option" href="#" @click="onClick(option)" :class="selected === option ? 'active':''">{{option}}</a>
        <!-- <a href="#" @click.stop="$store.dispatch('changeDbForm')" >UPDATE DATABASE FUNC</a> -->
    </div>
</div>
</template>

<script>
 export default {
    name: 'MainMenu',
    props: {
        options: Array,
        onClick: Function,
        selected: String
    },
    data() {return {
    }},
    methods: {

    }
}
</script>