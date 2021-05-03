import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { D3Link } from './Graph';

const Label: FC<{ link: D3Link }> = ({ link }) => {
  const ref = useRef<SVGTextElement>(null);

  useEffect(() => {
    const context = d3.select(ref.current);
    context.data([link]);
  });

  return (
    <text pointerEvents='none' className='label' ref={ref}>
      {`${link.source.id}->${link.target.id}`}
    </text>
  );
};

const Labels: FC<{ links: D3Link[] }> = ({ links }) => {
  const labels = links.map((link: D3Link, index: number) => {
    return <Label key={index} link={link} />;
  });

  return <g className='labels'>{labels}</g>;
};

export default Labels;