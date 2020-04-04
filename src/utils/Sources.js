export let computePlant = function(plant) {
    let semis = []
    // if(plant.cultivar.length === 0) 
    semis.push(computeDates(selectDefinedSources(plant.semis)))
    plant.cultivar.forEach(c => semis.push(computeDates(selectDefinedSources(c.semis))))
    // console.log(semis)

    let recolte = []
    // if(plant.cultivar.length === 0) 
    recolte.push(computeDates(selectDefinedSources(plant.recolte)))
    plant.cultivar.forEach(c => recolte.push(computeDates(selectDefinedSources(c.recolte))))
    return {semis, recolte}
}

// aggregate multiples dates to one weighted dates array
export let computeDates = function(sources)  {
    // console.log('compute: ' + sources.length + ' cmp: ' + sources[0].computed)
    let dates = []
    let weight = []
    for(let i = 0; i < 24; i++) {
        let max = Math.max(...sources.map(s => s.dates[i]))
        dates.push(max)

        let w = 0
        sources.forEach((s) => {
            if(s.dates[i] === max) {
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

    let names = []
    sources.forEach(s => {
        if(s.computed) {
            s.names.forEach(n => {if(!names.includes(n)) {names.push(n)}})
        }
        else if(s.source === undefined) {
            names.push('Default')
        }
        else {
            names.push(s.source.name)
        }
    })
    // console.log(weight)
    return {dates, weight, names, computed:true, source: sources}
}

// Select only Defined (source.source !== undefined) Sources if some are available
export let selectDefinedSources = function(sources) {
    // console.log(sources)
    if(sources.some(s => s.source !== undefined)) {
        sources = sources.filter(s => s.source !== undefined)
    }
    return sources
}