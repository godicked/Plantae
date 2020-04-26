
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
        cultivar: []
    }
}

export let PlantInfo = function() {
    return {
        properties: {},
        requirements: {
            soil: []
        },
        dates: {
            semis: {dates: Array(24).fill(0)},
            recolte: {dates: Array(24).fill(0)}
        },
        usages: {}
    }
}