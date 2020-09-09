import React from 'react';
import { ReactComponent as ListSVG } from 'svg/list.svg';
import { ReactComponent as BarSVG } from 'svg/bar.svg';
import { ReactComponent as LineSVG } from 'svg/line.svg';
import { ReactComponent as CandleSVG } from 'svg/candle.svg';
import { ReactComponent as EachSVG } from 'svg/each.svg';

const IconHandler = (type) => {
  
  switch (type) {
    case 'LIST_SVG':
      return <ListSVG/>
    case 'BAR_SVG':
      return <BarSVG/>
    case 'LINE_SVG':
      return <LineSVG/>
    case 'CANDLE_SVG':
      return <CandleSVG/>
    case 'EACH_SVG':
      return <EachSVG/>
    default:
      return type;
  }
};
export default IconHandler;