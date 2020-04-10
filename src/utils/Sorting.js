import * as SourceUtils from './Sources'

export let sortPlants = function(plants) {
    plants.sort((a, b) => {
        let s1 = SourceUtils.computePlant(a).semis
        let s2 = SourceUtils.computePlant(b).semis

        s1 = SourceUtils.computeDates(s1).dates
        s2 = SourceUtils.computeDates(s2).dates

        return sortDates(s1,s2)
    })

    return plants
    // if(selected) {
    //     // console.log('selected: ')
    //     // console.log(selected)
    //     this.$nextTick(() => {
    //         let selectedEditor = this.$refs.plant.filter(p => p.$props.plant._id === selected._id)
    //         console.log(selectedEditor)
    //         selectedEditor[0].$el.scrollIntoView(true)
    //     })
    // }
}

let sortDates = function(d1, d2) {
    let score1 = 0, score2 = 0

    for(let i = 0; i < 24; i++) {
    score1 += d1[i] * Math.pow(2, 23-i)
    score2 += d2[i] * Math.pow(2, 23-i)
    }
    return score2 - score1

}
