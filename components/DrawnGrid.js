import React from 'react';
import HrLine from './HrLine';

const DrawnGrid = () => {
  return [...Array(24)].map((val, i) => <HrLine key={i} />)
}


export default DrawnGrid;
