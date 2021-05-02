import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { D3Node } from './Graph';

const Label: FC<{ node: D3Node }> = ({ node }) => {
  const ref = useRef<SVGTextElement>(null);

  useEffect(() => {
    const context = d3.select(ref.current);
    context.data([node]);
  });

  return (
    <text className='label' ref={ref}>
      {node.id}
    </text>
  );
};

const Labels: FC<{ nodes: D3Node[] }> = ({ nodes }) => {
  const labels = nodes.map((node: D3Node, index: number) => {
    return <Label key={index} node={node} />;
  });

  return <g className='labels'>{labels}</g>;
};

export default Labels;