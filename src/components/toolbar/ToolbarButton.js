import React from 'react'

function ToolbarButton(props) {
  const { type, classNames, data, id, child, handleClick } = props;
  return (
    <button 
      type={type}
      data-chart-attribute={data.chartAttribute}
      className={classNames}
      title={id}
      name={id}
      onClick={handleClick}
    >
      {child}
    </button>
  )
}

export default ToolbarButton;
