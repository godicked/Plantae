
export let Cultivar = function() {
    return {
        name: 'Cultivar',
        semis: [{dates: Array(26).fill(0)}],
        recolte: [{dates: Array(26).fill(0)}]
    }
}

export let Plant = function(name) {
    return {
        name: name !== undefined? name : '',
        sciName: '',
        semis: [{dates: Array(26).fill(0)}],
        recolte: [{dates: Array(26).fill(0)}],
        cultivar: []
    }
}