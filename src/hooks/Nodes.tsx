import { FC, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { D3Node, graphHeight, graphWidth } from './Graph';

const Node: FC<{ node: D3Node }> = ({ node }) => {
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const context = d3.select(ref.current);
    context.data([node]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <g className='node' ref={ref}>
      <circle r={24} fill={'rgb(253, 204, 89)'}></circle>
      <circle r={20} fill={'rgb(253, 204, 89)'}></circle>
      <text pointerEvents='none'>
        {node.id}
      </text>
    </g>
  );
};

const Nodes: FC<{
  nodes: D3Node[];
  simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>;
}> = ({ nodes, simulation }) => {
  const ref = useRef<SVGCircleElement>(null);
  useEffect(() => {
    const context = d3.select(ref.current);
    const node = context.selectAll('.node');

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
  }, [nodes, simulation]);

  return (
    <g className='nodes' ref={ref}>
      {nodes.map((node: D3Node, index: number) => {
        return <Node key={index} node={node} />;
      })}
    </g>
  );
};

export default Nodes;
