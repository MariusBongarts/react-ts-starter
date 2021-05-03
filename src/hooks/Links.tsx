import { FC, useEffect, useRef } from 'react';
import { D3Link } from './Graph';
import * as d3 from 'd3';

export const Link: FC<{ link: D3Link }> = ({ link }) => {
  const ref = useRef<SVGLineElement>(null);

  useEffect(() => {
    const context = d3.select(ref.current);
    context.data([link]);
  }, []);

  return (
    <g className='link-container'>
      <line
        className='link'
        strokeWidth={1}
        ref={ref}
        markerEnd='url(#arrow)'
      />
    </g>
  );
};

type Props = {
  links: D3Link[];
};
const Links: FC<Props> = ({ links }) => {
  const linkRef = useRef<SVGSVGElement>(null);

  const linkElements = links.map((link: D3Link, index: number) => {
    return <Link key={index} link={link} />;
  });

  return (
    <g className='links' ref={linkRef}>
      {linkElements}
    </g>
  );
};

export default Links;
