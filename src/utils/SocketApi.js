import io from 'socket.io-client';

const socket = io.connect()
let store = undefined
let snotify = undefined

socket.on('connect', () => {
    console.log('socket connection ok')
})

socket.on('lock-plant', function(data) {
    console.log(data)
    store.commit('lockPlant', {id:data.id, isLocked:data.value})

    let plants = store.getters.plants()
    console.log(plants)
    let plant = plants.filter(p => p._id === data.id)
    if(plant.length === 1) {
        let name = plant[0].name
        snotify.info(name, data.value?'Locked':'Unlocked')
    }
})

socket.on('locked', function(data) {
    console.log('initial lock')
    console.log(data)

    Object.keys(data).forEach(k => {
        if(data[k] !== socket.id) {
            store.commit('lockPlant', {id:k, isLocked:true})
        }
    })
})

export let init = function(vuexStore, snotifyInstance) {
    store = vuexStore
    snotify = snotifyInstance
}

export let lockPlant = function(plant) {
    socket.emit('lock-plant', {id:plant._id, value: true})
}

export let unlockPlant = function(plant) {
    socket.emit('lock-plant', {id:plant._id, value: false})
}

