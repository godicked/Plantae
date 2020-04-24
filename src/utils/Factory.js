
export let Cultivar = function(id) {
    return {
        name: 'Varieté',
        id: id
    }
}

export let Plant = function(name) {
    return {
        name: name !== undefined? name : '',
        sciName: '',
        cultivar: [],
        sourcedInfos: { 'default': { 'undefined': PlantInfo()}}
    }
}

export let PlantInfo = function() {
    return {
        properties: {},
        requirements: {},
        dates: {
            semis: {dates: Array(24).fill(0)},
            recolte: {dates: Array(24).fill(0)}
        },
        usages: {}
    }
}