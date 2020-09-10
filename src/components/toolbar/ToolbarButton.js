import React from 'react'

function ToolbarButton(props) {
  const { type, classNames, data, id, child, defaultSelect, handleClick } = props;
  return (
    <button 
      type={type}
      data-chart-attribute={data.chartAttribute}
      className={defaultSelect ? classNames+" chart-active": classNames }
      title={id}
      name={id}
      onClick={handleClick}
    >
      {child}
    </button>
  )
}

export default ToolbarButton;
