import { FC, useEffect, useRef, useState } from 'react';
import './Graph.css';
import * as d3 from 'd3';

type D3Node = {};

type D3Link = {
  source: number;
  target: number;
  value?: number;
};

type D3Graph = {
  nodes: D3Node[];
  links: D3Link[];
};

const graph: D3Graph = {
  nodes: Array.from({ length: 13 }, () => ({})),
  links: [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
    { source: 2, target: 0 },
    { source: 1, target: 3 },
    { source: 3, target: 2 },
    { source: 3, target: 4 },
    { source: 4, target: 5 },
    { source: 5, target: 6 },
    { source: 5, target: 7 },
    { source: 6, target: 7 },
    { source: 6, target: 8 },
    { source: 7, target: 8 },
    { source: 9, target: 4 },
    { source: 9, target: 11 },
    { source: 9, target: 10 },
    { source: 10, target: 11 },
    { source: 11, target: 12 },
    { source: 12, target: 10 },
  ],
};

type Props = {};
const Graph: FC<Props> = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [simulation, setSimulation] = useState<
    d3.Simulation<d3.SimulationNodeDatum, undefined>
  >();

  const width = 800;
  const height = 600;

  useEffect(() => {
    const context = d3.select(svgRef.current);

    const link = context
      .selectAll('.link')
      .data(graph.links)
      .join('line')
      .classed('link', true);

    const node = context
      .selectAll('.node')
      .data(graph.nodes)
      .join('circle')
      .attr('r', 12)
      .classed('node', true)
      .classed('fixed', (d: any) => d.fx !== undefined);

    function tick() {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
    }

    const _simulation = d3
      .forceSimulation()
      .nodes(graph.nodes)
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink(graph.links))
      .on('tick', tick);
    setSimulation(_simulation);

    function click(event: any, d: any) {
      delete d.fx;
      delete d.fy;
      // @ts-ignore
      d3.select(this).classed('fixed', false);
      _simulation!.alpha(1).restart();
    }

    function dragstart() {
      // @ts-ignore
      d3.select(this).classed('fixed', true);
    }

    function clamp(x: number, lo: number, hi: number) {
      return x < lo ? lo : x > hi ? hi : x;
    }

    function dragged(event: any, d: any) {
      d.fx = clamp(event.x, 0, width);
      d.fy = clamp(event.y, 0, height);
      _simulation!.alpha(1).restart();
    }

    const drag: any = d3.drag().on('start', dragstart).on('drag', dragged);

    node.call(drag).on('click', click);

    console.log(context);
  }, []);

  useEffect(() => {

  }, [simulation]);

  return <svg width={width} height={height} ref={svgRef}></svg>;
};

export default Graph;
