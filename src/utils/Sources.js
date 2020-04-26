import * as Factory from './Factory'
import Vue from 'vue'

export let computeSourcesToInfos = function(sources, cultivar) {
    let src = JSON.parse(JSON.stringify(sources))
    let info = Factory.PlantInfo()

    info.dates.semis = compute(src, cultivar, (i) => i.dates.semis, computeDates)
    info.dates.recolte = compute(src, cultivar, (i) => i.dates.recolte, computeDates)


    info.requirements.soil = compute(src, cultivar, (i) => i.requirements.soil, uniqueUnion)

    return info
}

const uniqueUnion = function(arrays) {
    const vals = {}
    arrays.forEach(arr => arr.forEach(value => vals[value] = value))
    const res = Object.values(vals)
    res.sort()
    return res
} 

const compute = function(sources, cultivar, selectorFunc, computeFunc) {
    const data = []

    if(cultivar === undefined) {
        getCultivarFromSources(sources).forEach(c => data.push(compute(sources, c, selectorFunc, computeFunc)))
    }
    else {
        Object.keys(sources).forEach(sk => {
            try {
                const src = selectorFunc(sources[sk][cultivar])
                if(src !== undefined) {
                    data.push(src)
                }
            }
            catch(e) {
                // ignore
            }
        })
    }
    if(data.length === 0) {
        return selectorFunc(Factory.PlantInfo())
    }

    return computeFunc(data)

}

let getCultivarFromSources = function(sources) {
    let res = {}
    Object.keys(sources).forEach(k => {
        Object.keys(sources[k]).forEach(cultivar => res[cultivar] = cultivar)
    })

    return Object.values(res)
}

// aggregate multiples dates to one weighted dates array
export let computeDates = function(sources, override = true)  {
    // console.log('compute: ' + sources.length + ' cmp: ' + sources[0].computed)
    let dates = []
    let weight = []
    for(let i = 0; i < 24; i++) {

        let max = 0

        if(override) {
            let c1 = sources.filter(s => s.dates[i] === 1).length
            let c2 = sources.filter(s => s.dates[i] === 2).length

            if(c1 > 0 && c1 > c2) {max = 1}
            if(c2 > 0 && c2 >= c1) {max = 2} // at equal occurence option 2 is still stronger than 1
        }
        else {
            max = Math.max(...sources.map(s => s.dates[i]))
        }

        dates.push(max)

        let w = 0
        sources.forEach((s) => {
            if(s.dates[i] === max && max !== 0) {
                if(s.computed) {
                    // console.log('pre computed')
                    w += s.weight[i]
                }
                else {
                    w += 1
                }
            }
        })
        weight.push(w)
    }

    let maxWeight = 0
    weight.forEach((w,i) => {if(w > maxWeight && dates[i] !== 0) maxWeight = w})
    weight = weight.map(w => w / maxWeight)

    // let names = []
    // sources.forEach(s => {
    //     if(s.computed) {
    //         s.names.forEach(n => {if(!names.includes(n)) {names.push(n)}})
    //     }
    //     else if(s.source === undefined) {
    //         names.push('Default')
    //     }
    //     else {
    //         names.push(s.source.name)
    //     }
    // })
    // console.log(weight)
    return {dates, weight, computed:true}
}

// Select only Defined (source.source !== undefined) Sources if some are available
export let selectDefinedSources = function(sources) {
    // console.log(sources)
    if(sources.some(s => s.source !== undefined)) {
        sources = sources.filter(s => s.source !== undefined)
    }
    return sources
}

//
export let addMissingInfoFields = function(info) {
    const model = Factory.PlantInfo()
    let keys = Object.keys(model)

    keys.forEach(k => {
        // if(infoFromDb[k])
        if(!info.hasOwnProperty(k)) {
            Vue.set(info, k, {})
        }
        Object.keys(model[k]).forEach(k2 => {
            if(!info[k].hasOwnProperty(k2)) {
                Vue.set(info[k], k2, model[k][k2])
            }
        })
    })
}

export const addDefaultSourceIfMissing = function(plant) {
    if(!plant.sourcedInfos) {
        plant.sourcedInfos = {}
    }
    if(!plant.sourcedInfos.default) {
        plant.sourcedInfos.default = {'undefined': {}}
    }
}

export let clearUnusedInfoFields = function(info) {
    Object.keys(info).forEach(k1 => {
        Object.keys(info[k1]).forEach(k2 => {
            const val = info[k1][k2]
            if(k1 != 'dates') {
                if(val === undefined || val === '' || (Array.isArray(val) && val.length === 0)) {
                    Vue.delete(info[k1], k2)
                }
            }
            else {
                if(!val.dates.some(v => v !== 0)) {
                    Vue.delete(info[k1], k2)
                }
            }
        })
        if(Object.keys(info[k1]).length === 0) {
            Vue.delete(info, k1)
        }
    })
}

export let clearPlantBeforeSave = function(plant) {
    Object.keys(plant.sourcedInfos).forEach(k => {
        Object.keys(plant.sourcedInfos[k]).forEach(k2 => {
            clearUnusedInfoFields(plant.sourcedInfos[k][k2])
        })
    })
}

export const filterSourcedInfos = function(infos) {
    let keys = Object.keys(infos)
    if(keys.length < 2) {
        return infos
    }

    let res = {}
    keys.forEach(sId => {
        if(sId !== 'default') {
            res[sId] = infos[sId]
        }
    })
    return res
} 