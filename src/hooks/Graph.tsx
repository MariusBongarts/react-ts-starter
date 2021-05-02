import { FC, useEffect, useRef, useState } from 'react';
import './Graph.css';
import * as d3 from 'd3';
import { SimulationNodeDatum } from 'd3';
import Nodes from './Nodes';
import Links from './Links';
import Labels from './Labels';

export type D3Node = SimulationNodeDatum & {
  id: number;
  type: string;
};

export type D3Link = {
  source: number;
  target: number;
  id: number;
  value?: number;
};

export type D3Graph = {
  nodes: D3Node[];
  links: D3Link[];
};

const graph: D3Graph = {
  nodes: Array.from({ length: 15 }, () => ({ id: 1, type: 'private' })),
  links: [
    { id: 0, source: 0, target: 1 },
    { id: 1, source: 1, target: 2 },
    { id: 2, source: 2, target: 0 },
    { id: 3, source: 1, target: 3 },
    { id: 4, source: 3, target: 2 },
    { id: 5, source: 3, target: 4 },
    { id: 6, source: 4, target: 5 },
    { id: 7, source: 5, target: 6 },
    { id: 8, source: 5, target: 7 },
    { id: 9, source: 6, target: 7 },
    { id: 10, source: 6, target: 8 },
    { id: 11, source: 7, target: 8 },
    { id: 12, source: 9, target: 4 },
    { id: 13, source: 9, target: 11 },
    { id: 14, source: 9, target: 10 },
    { id: 15, source: 10, target: 11 },
    { id: 16, source: 11, target: 12 },
    { id: 17, source: 12, target: 10 },
  ],
};

export const graphWidth = window.screen.availWidth;
export const graphHeight = window.screen.availHeight;

type Props = {};
const Graph: FC<Props> = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [simulation, setSimulation] = useState<
    d3.Simulation<d3.SimulationNodeDatum, undefined>
  >();

  useEffect(() => {
    const _simulation = d3
      .forceSimulation()
      .nodes(graph.nodes)
      .force('charge', d3.forceManyBody().strength(-40))
      .force('center', d3.forceCenter(graphWidth / 2, graphHeight / 2))
      .force('link', d3.forceLink(graph.links));

    setSimulation(_simulation);
  }, []);

  useEffect(() => {
    const context = d3.select(svgRef.current);

    const node = context.selectAll('.node');
    const link = context.selectAll('.link');
    const label = context.selectAll('.label');

    function tick() {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
      label.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y);
    }

    simulation?.on('tick', tick);

    function click(event: any, d: any) {
      delete d.fx;
      delete d.fy;
      // @ts-ignore
      d3.select(this).classed('fixed', false);
      simulation!.alpha(1).restart();
    }

    function dragstart() {
      // @ts-ignore
      d3.select(this).classed('fixed', true);
    }

    function clamp(x: number, lo: number, hi: number) {
      return x < lo ? lo : x > hi ? hi : x;
    }

    function dragged(event: any, d: any) {
      d.fx = clamp(event.x, 0, graphWidth);
      d.fy = clamp(event.y, 0, graphHeight);
      simulation!.alpha(1).restart();
    }

    const drag: any = d3.drag().on('start', dragstart).on('drag', dragged);

    node.call(drag).on('click', click);
  }, [simulation]);

  return (
    <svg
      className='container'
      width={graphWidth}
      height={graphHeight}
      ref={svgRef}
    >
      {simulation && <Links links={graph.links} simulation={simulation} />}
      {simulation && <Nodes nodes={graph.nodes} simulation={simulation} />}
      {simulation && <Labels nodes={graph.nodes} />}
    </svg>
  );
};

export default Graph;
