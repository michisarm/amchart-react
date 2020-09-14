import React from 'react'
import { useTooltip } from "components/common"

function ToolbarButton(props) {
  const { type, classNames, data, id, child, selected, handleClick } = props;
  return (
    <button 
      ref={useTooltip('tooltip 3')}
      type={type}
      data-chart-attribute={data.chartAttribute}
      className={selected ? classNames+" chart-active": classNames}
      name={id}
      onClick={handleClick}
    >
      {child}
    </button>
  )
}

export default ToolbarButton;
