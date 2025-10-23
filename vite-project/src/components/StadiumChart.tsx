import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { Game, Seat, CategoryInfo } from "./types";
import { stadiumColors } from "./colors";

interface Props {
  game: Game | null;
  stadiumData: Record<string, Seat[]>;
  categoryData: Record<string, CategoryInfo[]>;
  onSelect: (seat: Seat) => void;
}

export const StadiumChart: React.FC<Props> = ({ game, stadiumData, categoryData, onSelect }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!game || !svgRef.current) return;

    const data = stadiumData[game.stadium];
    const category = categoryData[game.id];
    if (!data || !category) return;

    const width = 400;
    const height = 400;
    const tooltip = d3.select("#tooltip");
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove(); // clear previous

    // add stadium image as background
    svg
      .style("background", `url('/src/assets/img/stadiums/${game.stadium}.png')`)
      .style("background-size", "cover");

    const xScale = d3.scaleLinear().domain([0, 950]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 950]).range([0, height]);

    const colorByCategory = new Map(
      category.map(c => [c.카테고리, c["가격/원가 비율 (%)"]])
    );

    const stadiumColor = stadiumColors[game.stadium] || "red";
    const colorScale = d3.scaleLinear<string>().domain([100, 500]).range(["white", stadiumColor]);

    svg
      .selectAll<SVGCircleElement, Seat>("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 5)
      .attr("fill", d => {
        const val = colorByCategory.get(d.구역);
        return val !== undefined ? colorScale(val) : "#ccc";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .on("mouseover", function(event, d) {
        const info = category.find(p => p.카테고리 === d.구역);
        tooltip
          .style("display", "block")
          .html(`
            <strong>구역:</strong> ${d.구역}<br>
            <strong>거래가격/원가 비율:</strong> ${info ? info["가격/원가 비율 (%)"] : "N/A"}%<br>
            <strong>원가:</strong> ${info ? info["평균_원가"] : "N/A"}원<br>
            <strong>평균 거래가격:</strong> ${info ? info["평균_가격"] : "N/A"}원<br>
            <strong>중앙 거래가격:</strong> ${info ? info["중앙_가격"] : "N/A"}원<br>
            <strong>재판매 좌석 개수:</strong> ${info ? info["좌석_개수"] : "N/A"}개
          `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");

        svg
          .selectAll<SVGCircleElement, Seat>("circle")
          .filter(p => p.구역 === d.구역)
          .attr("stroke-width", 3);
      })
      .on("mouseout", () => {
        svg.selectAll<SVGCircleElement, Seat>("circle").attr("stroke-width", 1.5);
        tooltip.style("display", "none");
      })
      .on("click", (event, d: Seat) => {
        onSelect(d);
      });
  }, [game, stadiumData, categoryData, onSelect]);

  return <svg ref={svgRef} width={400} height={400} style={{ backgroundColor: "#eee" }} />;
};
