// aggregate multiples dates to one weighted dates array
export let computeDates = function(sources)  {    
    let dates = []
    let weight = []
    for(let i = 0; i < 24; i++) {
        let max = Math.max(...sources.map(s => s.dates[i]))
        dates.push(max)
        let count = sources.filter(s => s.dates[i] === max).length
        weight.push(count)
    }

    let maxWeight = 0
    weight.forEach(w => {if(w > maxWeight) maxWeight = w})
    weight = weight.map(w => w / maxWeight)

    let names = []
    sources.forEach(s => {
        if(s.source === undefined) {
            names.push('Default')
        }
        else {
            names.push(s.source.name)
        }
    })

    return {dates, weight, names}
}

// Select only Defined (source.source !== undefined) Sources if some are available
export let selectDefinedSources = function(sources) {
    // console.log(sources)
    if(sources.some(s => s.source !== undefined)) {
        sources = sources.filter(s => s.source !== undefined)
    }
    return sources
}