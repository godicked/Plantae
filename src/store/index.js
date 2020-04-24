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
        Sources: {},
    },
    getters: {
        sourcesByName: (state) => (name) => {
            return name === '' ? state.Sources : Object.values(state.Sources).filter(s => s.name.toLowerCase().includes(name.toLowerCase()) || s.rank === Number(name))
        },
        plants: (state) => () => {
            return Sorting.sortPlants(Object.values(state.plants))
        },
        source: (state) => (id) => {
            return state.Sources[id]
        },
        sources: (state) => {
            return Object.values(state.Sources)
        }
        // sourcedInfos: (state) => (plant) => {
        //     const sources = []
        //     plant.sources.forEach(s => {
        //         const source = JSON.parse(JSON.stringify(state.Sources[s]))
        //         let infos = source.plants[plant._id]
        //         if(infos === undefined) infos = {}
        //         source.infos = infos
        //         source.plant = plant
        //         delete source.plants
        //         sources.push(source)
        //         console.log(source.infos)
        //     })
        //     console.log('Source for: ' + plant.name)
        //     console.log(sources)
        //     return sources
        // }
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
        setSources(state, sources) {
            // state.sources = sources
            Vue.set(state.Sources, 'default', {name:'Default', _id:'default', rank:-1})
            sources.forEach(s => Vue.set(state.Sources, s._id, s))
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
        },
        updateSourceInfos(state, source) {
            console.log('update source infos')
            Vue.set(state.Sources[source._id].plants, source.plant._id, source.infos)
        }
    },
    actions: {
        async loadPlants(context) {
            let plants = await Db.getPlants()
            // plants.forEach(p => {

            //     let ii = 0
            //     p.cultivar.forEach(c => {
            //         c.id = ii
            //         ii++
            //     })

            //     p.sourcedInfos = {}
            //     p.sourcedInfos['default'] = {}
            //     p.sourcedInfos.default.undefined = {dates: {semis: p.semis[0]}}
            //     p.sourcedInfos.default.undefined.dates.recolte = p.recolte[0]

            //     p.cultivar.forEach(c => c.semis.forEach(s => {
            //         let id = "default"
            //         if(s.source) {
            //             id = s.source._id
            //         }
            //         if(!p.sourcedInfos[id]) {
            //             p.sourcedInfos[id] = { "undefined": {dates: {semis: s}}}
            //         }

            //         p.sourcedInfos[id][c.id] = {dates: {semis: s}}
            //     }))

            //     p.cultivar.forEach(c => c.recolte.forEach(r => {
            //         let id = "default"
            //         if(r.source) {
            //             id = r.source._id
            //         }
            //         if(!p.sourcedInfos[id]) {
            //             p.sourcedInfos[id].undefined.dates.recolte = r
            //         }

            //         p.sourcedInfos[id][c.id].dates.recolte =  r
            //     }))

            // })

            context.commit('setPlants', plants)
            // plants.forEach(p => context.dispatch('updatePlant', p))
        },
        async loadSourceFromDb(context) {
            axios.get('/source/get').then((res) => {
                context.commit('setSources', res.data)
            })
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
                console.log('store updatePlant')
                console.log(plant)
                let p = await Db.updatePlant(plant)
                console.log(p)
                context.commit('setPlant', plant)
                return plant
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