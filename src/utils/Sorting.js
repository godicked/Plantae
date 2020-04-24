import * as SourceUtils from './Sources'

export let sortPlants = function(plants) {
    plants.sort((a, b) => {
        let i1 = JSON.parse(JSON.stringify(a.sourcedInfos))
        let i2 = JSON.parse(JSON.stringify(b.sourcedInfos))

        Object.keys(i1).forEach(k => SourceUtils.addMissingInfoFields(i1[k]))
        Object.keys(i2).forEach(k => SourceUtils.addMissingInfoFields(i2[k]))

        i1 = SourceUtils.computeSourcesToInfos(SourceUtils.filterSourcedInfos(i1))
        i2 = SourceUtils.computeSourcesToInfos(SourceUtils.filterSourcedInfos(i2))
        // let s1 = SourceUtils.computePlant(a).semis
        // let s2 = SourceUtils.computePlant(b).semis


        return sortDates(i1.dates.semis.dates, i2.dates.semis.dates)

        // s1 = SourceUtils.computeDates(s1).dates
        // s2 = SourceUtils.computeDates(s2).dates

        // return sortDates(s1,s2)
    })

    return plants
}

let sortDates = function(d1, d2) {
    let score1 = 0, score2 = 0

    for(let i = 0; i < 24; i++) {
    score1 += d1[i] * Math.pow(2, 23-i)
    score2 += d2[i] * Math.pow(2, 23-i)
    }
    return score2 - score1

}