import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sources: []
    },
    getters: {
        sourcesByName: (state) => (name) => {
            return name === '' ? state.sources : state.sources.filter(s => s.name.toLowerCase().includes(name.toLowerCase()) || s.id === Number(name))
        }
    },
    mutations: {
        addSource: (state, source) => {
            if(state.sources.some(s => s.name === source.name)) {
                return
            }

            let maxId = Math.max(-1, ...state.sources.map(s => s.rank))
            source.rank = maxId+1

            state.sources.push(source)
            console.log(state)

            axios.post('/source/add', source)
        },
        delSource: (state, source) => {
            var idx = state.sources.indexOf(s => s.rank = source.rank)
            state.sources.splice(idx,1)
            axios.post('/source/del', source)
        },
        loadSourceFromDb: (state) => {
            axios.get('/source/get').then((res) => {
                state.sources = res.data
            })
        }
    }
})