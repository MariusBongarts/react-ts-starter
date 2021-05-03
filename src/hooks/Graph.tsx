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

const initialGraph: D3Graph = {
  nodes: Array.from({ length: 15 }, (i, index) => ({
    id: index,
    type: 'private',
  })),
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
  const [graph, setGraph] = useState<D3Graph>(initialGraph);
  const svgRef = useRef<SVGSVGElement>(null);

  const [simulation, setSimulation] = useState<
    d3.Simulation<d3.SimulationNodeDatum, undefined>
  >();

  useEffect(() => {
    setTimeout(() => {
      setGraph({
        ...graph,
        links: [
          ...graph.links,
          { id: 18, source: 12, target: 13 },
          { id: 19, source: 13, target: 14 },
          { id: 20, source: 14, target: 15 },
          { id: 20, source: 15, target: 16 },
        ],
        nodes: [...graph.nodes, { id: 15, type: '' }, { id: 16, type: '' }],
      });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const _simulation = d3
      .forceSimulation()
      .nodes(graph.nodes)
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(graphWidth / 2, graphHeight / 2))
      .force('link', d3.forceLink(graph.links));

    setSimulation(_simulation);
  }, [graph]);

  useEffect(() => {
    const context = d3.select(svgRef.current);

    context
    .append('defs')
    .append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 30)
    .attr('refY', 0)
    .attr('markerWidth', 8)
    .attr('markerHeight', 8)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5');

    const node = context.selectAll('.node');
    const nodeContainer = context.selectAll('.node-container');
    const link = context.selectAll('.link');
    // const linkContainer = context.selectAll('.link-container');

    console.log(nodeContainer);

    function tick() {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
      // linkContainer.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    }

    simulation?.on('tick', tick);
  }, [simulation]);

  return (
    <svg
      className='container'
      width={graphWidth}
      height={graphHeight}
      ref={svgRef}
    >
      {simulation && (
        <>
          <Links links={graph.links} />
          <Nodes nodes={graph.nodes} simulation={simulation} />
        </>
      )}
    </svg>
  );
};

export default Graph;
