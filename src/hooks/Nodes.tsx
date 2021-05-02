import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { D3Node } from './Graph';

const Node: FC<{ node: D3Node }> = ({ node }) => {
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const context = d3.select(ref.current);
    context.data([node]);
  });

  return <circle className='node' r={15} fill={'#ccc'} ref={ref}></circle>;
};

const Nodes: FC<{
  nodes: D3Node[];
  simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>;
}> = ({ nodes, simulation }) => {
  const nodeElements = nodes.map((node: D3Node, index: number) => {
    return <Node key={index} node={node} />;
  });

  return <g className='nodes'>{nodeElements}</g>;
};

export default Nodes;
