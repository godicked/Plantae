import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as Db from '../utils/DbApi'
import * as Sorting from '../utils/Sorting'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sources: [],
        plants: {},
    },
    getters: {
        sourcesByName: (state) => (name) => {
            return name === '' ? state.sources : state.sources.filter(s => s.name.toLowerCase().includes(name.toLowerCase()) || s.id === Number(name))
        },
        plants: (state) => () => {
            return Sorting.sortPlants(Object.values(state.plants))
        },
    },
    mutations: {
        addSource(state, source) {
            if(state.sources.some(s => s.name === source.name)) {
                return
            }

            let maxId = Math.max(-1, ...state.sources.map(s => s.rank))
            source.rank = maxId+1

            state.sources.push(source)
            console.log(state)

            axios.post('/source/add', source)
        },
        delSource(state, source) {
            var idx = state.sources.indexOf(s => s.rank = source.rank)
            state.sources.splice(idx,1)
            axios.post('/source/del', source)
        },
        loadSourceFromDb(state) {
            axios.get('/source/get').then((res) => {
                state.sources = res.data
            })
        },
        setPlants(state, plants) {
            plants.forEach(p => {
                Vue.set(state.plants, p._id, p)
            })
        },
        setPlant(state, plant) {
            Vue.set(state.plants, plant._id, plant)
        },
        deletePlant(state, id) {
            Vue.delete(state.plants, id)
        },
        lockPlant(state, lock) {
            console.log('lock: ' + lock.isLocked)
            Vue.set(state.plants[lock.id], "locked", lock.isLocked)
        }
    },
    actions: {
        async loadPlants(context) {
            let plants = await Db.getPlants()
            context.commit('setPlants', plants)
        },
        async addPlant(context, plant) {
            try {
                let p = await Db.addPlant(plant)
                context.commit('setPlant', p)
                return p
            }
            catch(err) {
                console.log(err)
            }
        },
        async updatePlant(context, plant) {
            try {
                console.log(plant)
                let p = await Db.updatePlant(plant)
                console.log(p)
                context.commit('setPlant', p)
                return p
            }
            catch(err) {
                console.log(err)
            }
        },
        async deletePlant(context, plant) {
            try {
                await Db.deletePlant(plant)
                context.commit('deletePlant', plant._id)
            }
            catch(err) {
                console.log(err)
            }
        }
    }
})