import { FC, useEffect, useRef } from 'react';
import { D3Node, graphHeight, graphWidth } from './Graph';
import * as d3 from 'd3';

type Props = {
  nodes: D3Node[];
  simulation: any;
};
const Nodes: FC<Props> = ({ nodes, simulation }) => {
  const nodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const context = d3.select(nodeRef.current);

    const node = context
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 12)
      .classed('node', true)
      .classed('fixed', (d: D3Node) => d.fx !== undefined)
      .attr('type', (d: D3Node) => d.type);

    node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
    node
      .append('g')
      .classed('label', true)
      .append('title')
      .text(function (d: D3Node) {
        return d.id;
      })
      .classed('label', true);

    function click(event: any, d: any) {
      delete d.fx;
      delete d.fy;
      // @ts-ignore
      d3.select(this).classed('fixed', false);
      simulation.alpha(1).restart();
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
    simulation.nodes(nodes);
  }, [nodes, simulation]);

  return <g className='nodes' ref={nodeRef} />;
};

export default Nodes;
