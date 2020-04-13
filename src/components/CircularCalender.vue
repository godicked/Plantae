<style scoped>

.image {
    position: absolute;
    display: block;
    width: 138px;
    height: 138px;
    overflow: hidden;
    border-radius: 50%;
    top: 130px;
    left: 130px;
    border: 1px solid blue;
}

img {
    height: 100%;
    margin: 0 auto;
} 

svg {
    position: absolute;
    width: 100%;
    height: 100%;
}
.wrapper {
    position:relative; 
    width: 200px;
    height: 200px;
    /* background: yellow; */
}
</style>


<template>
    <div class="wrapper">
        <svg :height="cy*2" :width="cx*2" :viewBox="'0 0 ' + cx*2 +' ' +  cy*2">

            <path v-for="i in nb" :key="'a'+i" :d="describeArc(cx,cy, circleR, (i-1)*30, i*30)" :stroke="hover[i-1] ? 'rgb(200,200,200)' : circleColor" :stroke-width="stroke" fill="none"/>
            
            <g stroke-width="8">
                <g v-if="semis !== undefined" stroke="rgb(128,194,190)">
                    <g v-for="(month, idx) in semis.dates" :key="idx">
                        <path v-if="month === 1" :d="describeArc(cx,cy, 80, idx*15, (idx+1)*15)" fill="none"/>
                    </g>
                </g>

                <g v-if="semis !== undefined" stroke="rgb(117,186,134)">
                    <g v-for="(month, idx) in semis.dates" :key="idx">
                        <path v-if="month === 2" :d="describeArc(cx,cy, 90, idx*15, (idx+1)*15)" fill="none"/>
                    </g>
                </g>

                <g v-if="recolte !== undefined" stroke="rgb(199,189,136)">
                    <g v-for="(month, idx) in recolte.dates" :key="idx">
                        <path v-if="month === 1" :d="describeArc(cx,cy, 100, idx*15, (idx+1)*15)" fill="none"/>
                    </g>
                </g>

            </g>
            
            <line v-for="i in nb" :key="i" :x1="pointOnCircle(i-1, 1).x" :y1="pointOnCircle(i-1, 1).y" :x2="pointOnCircle(i-1, -1).x" :y2="pointOnCircle(i-1, -1).y" stroke="rgb(226,226,226)" stroke-width="1"/>
            
            <text v-for="i in nb" :key="-i" :x="pointOnCircle(i-1+monthTextOffset, 0).x" :y="pointOnCircle(i-1+monthTextOffset, 0).y" fill="rgb(226,226,226)" :style="{fontSize: monthFont}" :transform="transformMonthText">{{monthText[i-1]}}</text>
            
            <!-- <path v-for="i in nb" :key="'aa'+i" :d="describeArc(cx,cy, circleR, (i-1)*30, i*30)" stroke="rgb(0,0,0,0)" :stroke-width="stroke" fill="none" @mouseout="$set(hover, i-1,false)" @mouseover="$set(hover, i-1,true)"/> -->

            <defs>
                <clipPath id="myCircle">
                   <circle :cx="cx" :cy="cy" :r="circleR - stroke / 2" fill="#FFFFFF"/>
                </clipPath>
             </defs>
             <image preserveAspectRatio="xMidYMid slice" :width="(circleR - stroke / 2)*2" :height="(circleR - stroke / 2)*2" :x="cx - (circleR - stroke / 2)" :y="cy - (circleR - stroke / 2)" :xlink:href="image" clip-path="url(#myCircle)"/>
             <circle :cx="cx" :cy="cy" :r="circleR - stroke / 2" fill="none" stroke="rgb(127,149,234)" stroke-width="1"/>
        </svg>
    </div>
</template>

<script>

export default {
    name: "CircularCalender",
    data() { return {
        circleColor: "rgb(181,181,181)",
        circleR: 90,
        nb: 12,
        stroke: 40,
        monthFont: 20,
        monthTextOffset: 0.5,
        monthText: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        hover: {},
        cx: 115,
        cy: 115
    }},
    props: {
        semis: Object,
        recolte: Object,
        image: String
    },
    methods: {
        pointOnCircle(i, modif) {
            let angle = i * 360 / this.nb
            let radius = this.circleR + modif * this.stroke / 2
            let point = this.polarToCartesian(this.cx,this.cy,radius,angle)
            return point
        },
        toRad(deg) {
            deg = (deg - 90 - (360/this.nb/2) ) % 360
            return deg * Math.PI / 180
        },
        polarToCartesian(centerX, centerY, radius, angleInDegrees) {
            var angleInRadians = this.toRad(angleInDegrees)

            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        },
        describeArc(x, y, radius, startAngle, endAngle){

            var start = this.polarToCartesian(x, y, radius, endAngle);
            var end = this.polarToCartesian(x, y, radius, startAngle);

            var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

            var d = [
                "M", start.x, start.y, 
                "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
            ].join(" ");

            return d;       
        }
    },
    computed: {
        transformMonthText() {
            return 'translate('+ -7 + ',' + 7+')'
        }
    }
}
</script>