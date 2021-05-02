import { FC, useEffect, useRef } from 'react';
import { D3Link } from './Graph';
import * as d3 from 'd3';

export const Link: FC<{ link: D3Link }> = ({ link }) => {
  const ref = useRef<SVGLineElement>(null);

  useEffect(() => {
    const context = d3.select(ref.current);
    context.data([link]);
  }, []);

  return <line className='link' ref={ref} strokeWidth={1.5} />;
};

type Props = {
  links: D3Link[];
  simulation: any;
};
const Links: FC<Props> = ({ links, simulation }) => {
  const linkRef = useRef<SVGSVGElement>(null);

  const linkElements = links.map((link: D3Link, index: number) => {
    return <Link key={index} link={link} />;
  });
  // useEffect(() => {
  //   const context = d3.select(linkRef.current);
  //   const link = context
  //     .selectAll('line')
  //     .data(links)
  //     .enter()
  //     .append('line')
  //     .classed('link', true);

  //   // function tick() {
  //   //   link
  //   //     .attr('x1', (d: any) => d.source.x)
  //   //     .attr('y1', (d: any) => d.source.y)
  //   //     .attr('x2', (d: any) => d.target.x)
  //   //     .attr('y2', (d: any) => d.target.y);
  //   // }

  //   // simulation.on('tick', tick);
  //   // simulation.force('link', d3.forceLink(links));
  // }, [links, simulation]);

  return (
    <g className='links' ref={linkRef}>
      {linkElements}
    </g>
  );
};

export default Links;
