<style>
.container {
    position:relative;
    display:table;
    width:100%;
}
.boutton{
    position: relative;
    display: table-cell;
    vertical-align: middle;
    height: 100%;
    width: 100%;
    text-align: center;
    font-size: 20px;
}

a{
    text-decoration: none;
    color:inherit;
}

</style>

<template>
    <div>
    <div class="container">
        <a :href="href" class="boutton" @click="$emit('click', $event)" @mouseout="hover=false" @mouseover="hover=true" :style="{backgroundColor: hover ? hoverColor:'inherit'}">
            <slot></slot>
        </a>
    </div>
    </div>
</template>

<script>


export default {
    name: 'SimpleButton',
    components: {
    },
    props: {
        name: String,
        hoverColor: String,
        href: String
    },
    data() {return {
        hover:false
    }},
}

</script>