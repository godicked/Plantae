import axios from 'axios'

/** 
 *  Plant API calls
 */
export let getPlants = async function() {
    try {
        let plants = await axios.get('/plant/get')
        return plants
    }
    catch(err) {
        console.log('Could not Load plants from DB')
        console.log(err)
    }
}

export let addPlant = async function(plant) {
    try {
        let saved = await axios.post('/plant/add', plant)
        console.log(saved.data)
        return saved.data
    }
    catch(err) {
        console.log('Could not Add plant into DB')
        console.log(err)
        return plant
    }
}

export let updatePlant = async function(plant) {
    try {
        let saved = await axios.post('/plant/update', plant).data
        return saved
    }
    catch(err) {
        console.log('Could not update plant in DB')
        console.log(err)
        return plant
    }
}

export let deletePlant = async function(plant) {
    try {
        // console.log(plant._id)
        await axios.post('/plant/del', {_id:plant._id})
        return true
    }
    catch(err) {
        console.log('Could not delete plant in DB')
        console.log(err)
        return false
    }
}

/** 
 *  Source API calls
 */
export let getSources = async function() {
    try {
        let source = await axios.get('/source/get')
        return source
    }
    catch(err) {
        console.log('Could not Load source from DB')
        console.log(err)
    }
}

export let addSources = async function(source) {
    try {
        let saved = await axios.post('/source/add', source)
        return saved
    }
    catch(err) {
        console.log('Could not Add source into DB')
        console.log(err)
        return source
    }
}

export let updateSources = async function(source) {
    try {
        let saved = await axios.post('/source/update', source)
        return saved
    }
    catch(err) {
        console.log('Could not update source in DB')
        console.log(err)
        return source
    }
}

export let deleteSources = async function(source) {
    try {
        await axios.post('/source/del', source._id)
        return true
    }
    catch(err) {
        console.log('Could not delete source in DB')
        console.log(err)
        return false
    }
}