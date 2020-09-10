import React from "react";
import { mapIndexed } from "lib/utils";
import { TOOLBAR_ACTION_GROUP_OPTS } from "./constants";
import ToolbarButton from "./ToolbarButton";

function ToolbarButtonGroup(props) {
  const { groupName, toolbarActionOptions, state, handleClick } = props;
  // follow up조건 
  // 1. candle차트는 무조건 Ct값 이어야함
  if(groupName === "data" && state.chart ==="candle" && state.data !== "ct"){
    console.log(props)
    // debugger;
  }
  // 조건 end
  function renderToolbarActions() {
    return mapIndexed((toolbarActionOption, index) => {

      // 조건별 버튼 노출 선택
      return (
        <ToolbarButton
          key={index}
          handleClick={handleClick}
          {...toolbarActionOption}
        />
      )
    })(toolbarActionOptions);
  }

  return (
    <span className={TOOLBAR_ACTION_GROUP_OPTS[groupName]} data-chart-button-group={groupName}>
      {renderToolbarActions()}
    </span>
  )
}

export default ToolbarButtonGroup
