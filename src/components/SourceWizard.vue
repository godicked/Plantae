<style>

</style>

<template>
    <div>
        <div>
            <p>Source: </p>
            <input type="text" placeholder="Name" v-model="name">
            <p>description: </p>
            <textarea v-model="description" placeholder="Description"></textarea>
            <br>
            <input type="button" value="Add" @click="addSource">
            <input type="button" value="Cancel" @click="cancel">
        </div>
    </div>
</template>

<script>

export default {
    name: "SourceWizard",
    data() { return {
        name: '',
        description: ''
    }},
    methods: {
        addSource() {
            // console.log(this.$store)
            this.$store.dispatch('addSource', {name: this.name, description: this.description})
            this.cancel()
        },
        cancel() {
            this.name = ''
            this.description = ''
        }
    }
}
</script>