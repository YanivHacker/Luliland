import React, {useEffect, useRef} from 'react'
import './PieChart.css'
import * as d3 from 'd3'

export default function PieChart({data}){
    const pieChart = useRef()

    useEffect(()=>{
        const piedata = d3.pie().value(d=>d.count)(data)

        const arc = d3.arc().innerRadius(0).outerRadius(200)
        const colors = d3.scaleOrdinal(["#4f9763","#51e6ee","#a14f81"])

        const svg = d3.select(pieChart.current)
            .attr('width', 600)
            .attr('height', 600)
            .append('g')
                .attr('transform','translate(300,300)')
        svg.append('g')
            .selectAll('path')
            .data(piedata)
            .join('path')
                .attr('d', arc)
                .attr('fill', (d,i) => colors(i))
                .attr('stroke','white')
    },[])

    return (
        <div id='chartArea'>
            <svg ref={pieChart}/>
        </div>
    )
}