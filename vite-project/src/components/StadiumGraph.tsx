import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { Game, Seat, CategoryInfo } from "./types";
import { colorPalette } from "./colors";
import { categoryData } from "../assets/data/category";

/*interface Bin {
    x0: number;
    x1: number;
    count: number;
}*/


interface Props {
  game: Game | null;
  categoryData: Record<string, CategoryInfo[]>;
//  ticketData: Record<string, Record<string, Bin[]>>;
  selectedSeat: Seat | null;
}

export const StadiumGraph: React.FC<Props> = ({ game, selectedSeat}) =>{
    const ref = useRef<SVGSVGElement | null>(null);
    useEffect(()=>{
        if(!game || !ref.current) return;

        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();
        const width = 600;
        const height = 400;
        const margin = {top: 20, right: 20, bottom: 60, left: 60};
        const primaryColor = colorPalette.primary;
        const secondaryColor = colorPalette.secondary;
        if (selectedSeat===null){
            //make game-level grouped bar chart
            const data = categoryData[game.id] || [];
            const x0 = d3.scaleBand()
                .domain(data.map(d=>d.카테고리))
                .range([margin.left, width-margin.right])
                .paddingInner(0.2);
            const x1 = d3.scaleBand()
                .domain(['평균_원가', "평균_가격"])
                .range([0, x0.bandwidth()])
                .padding(0.1);
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d=>Math.max(d.평균_가격, d.평균_원가))! * 1.1])
                .nice()
                .range([height-margin.bottom, margin.top]);
            const color = d3.scaleOrdinal<string>()
                .domain(["평균_원가", "평균_가격"])
                .range([primaryColor, secondaryColor]);
            
            svg.append("g")
                .selectAll("g")
                .data(data)
                .enter().append("g")
                    .attr("transform", d=> `translate(${x0(d.카테고리)}, 0)`)
                .selectAll("rect")
                .data(d=>[
                    {key: "평균_원가", value: d.평균_원가},
                    {key: "평균_가격", value: d.평균_가격}
                ])
                .enter().append("rect")
                  .attr("x", d => x1(d.key)!)
                  .attr("y", d => y(d.value))
                  .attr("width", x1.bandwidth())
                  .attr("height", d => y(0) - y(d.value))
                  .attr("fill", d => color(d.key)!);
            svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x0))
                .selectAll("text")
                .attr("transform", "rotate(-30)")
                .style("text-anchor", "end");

            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y));

            // Legend
            const legend = svg.append("g")
                .attr("transform", `translate(${width - margin.right - 150},${margin.top})`);

            ["평균_원가", "평균_가격"].forEach((key, i) => {
                legend.append("rect")
                .attr("x", 0).attr("y", i * 20)
                .attr("width", 12).attr("height", 12)
                .attr("fill", color(key)!);

                legend.append("text")
                .attr("x", 20).attr("y", i * 20 + 10)
                .attr("alignment-baseline", "middle")
                .style("font-size", "13px")
                .text(key);
        });
        } else {
            svg.append("text")
                .attr("x", 20)          // horizontal position
                .attr("y", 30)          // vertical position
                .attr("fill", "black")
                .attr("font-size", 20)
                .text(`Selected seat: ${selectedSeat.구역}`);
        }
    }, [game, selectedSeat, categoryData]);
    return <svg ref={ref} width={600} height={400} style={{ backgroundColor: "#f9f9f9" }}></svg>;

}