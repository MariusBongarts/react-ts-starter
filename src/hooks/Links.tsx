import { FC, useEffect, useRef } from 'react';
import { D3Link } from './Graph';
import * as d3 from 'd3';

type Props = {
  links: D3Link[];
  simulation: any;
};
const Links: FC<Props> = ({ links, simulation }) => {
  const linkRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const context: any = d3.select(linkRef.current);
    const link = context
      .selectAll('line')
      .data(links)
      .enter().append("line")
      .classed('link', true)

    // function tick() {
    //   link
    //     .attr('x1', (d: any) => d.source.x)
    //     .attr('y1', (d: any) => d.source.y)
    //     .attr('x2', (d: any) => d.target.x)
    //     .attr('y2', (d: any) => d.target.y);
    // }

    // simulation.on('tick', tick);
    // simulation.force('link', d3.forceLink(links));
  }, [links, simulation]);

  return <g className='links' ref={linkRef} />;
};

export default Links;
