import React from "react";
import { mapIndexed } from "lib/utils";
import { TOOLBAR_ACTION_GROUP_OPTS } from "./constants";
import ToolbarButton from "./ToolbarButton";

function ToolbarButtonGroup(props) {
  const { groupName, toolbarActionOptions, state, handleClick } = props;

  const visibledToolbar = toolbarActionOptions.map((obj, i)=>{
    // default 제어
    if(obj.id === state[groupName]){
      obj.selected = true;
    }else{
      obj.selected = false;
    }
    return obj;
  });

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
    })(visibledToolbar);
  }

  return (
    <span className={TOOLBAR_ACTION_GROUP_OPTS[groupName]} data-chart-button-group={groupName}>
      {renderToolbarActions()}
    </span>
  )
}

export default ToolbarButtonGroup
