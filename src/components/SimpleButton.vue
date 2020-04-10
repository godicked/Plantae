<style>
.boutton-container {
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
    text-align: inherit;
    font-size: inherit;
    cursor: pointer;
}

a{
    text-decoration: none;
    color:inherit;
}

</style>

<template>
    <div>
    <div class="boutton-container">
        <a :href="href" class="boutton" @click="click" @mouseout="hover=false" @mouseover="hover=true" :style="style">
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
        href: String,
        locked: Boolean
    },
    data() {return {
        hover:false
    }},
    computed: {
        style() {
            let color = 'inherit'
            let cursor = 'pointer'

            if(this.locked) {
                color = 'gray'
                cursor = 'default'
            }
            else if(this.hover) {
                color = this.hoverColor
            }

            return {
                backgroundColor: color,
                cursor: cursor
            }
        }
    },
    methods: {
        click() {
            if(this.locked) {
                return
            }

            this.$emit('click', this.$event)
        }
    }
}

</script>