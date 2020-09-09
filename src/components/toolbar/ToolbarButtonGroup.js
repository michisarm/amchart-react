import React from 'react'
import { mapIndexed } from "lib/utils";
import { TOOLBAR_ACTION_GROUP_OPTS } from "./constants";
import ToolbarButton from "./ToolbarButton";

function ToolbarButtonGroup(props) {
  const { groupName, toolbarActionOptions, handleClick } = props;

  function renderToolbarActions() {
    return mapIndexed((toolbarActionOption, index) => {
      console.log(toolbarActionOption);
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
