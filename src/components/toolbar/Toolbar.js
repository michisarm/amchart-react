import React from "react";
import mapObjIndexed from "ramda/src/mapObjIndexed";
import { TOOLBAR_ACTION_OPTS } from "./constants";
import { groupBy } from "lib/utils";
import ToolbarButtonGroup from "./ToolbarButtonGroup";
import { StyledToolbar } from './Toolbar.styled';

const Toolbar = ({ toolbar, menu, handleClick }) => {

  let allowedToolbarActions = TOOLBAR_ACTION_OPTS;

  function renderGroupedToolbarActions() {
    /**
     * buttonGroup 기준으로 groupBy
     */
    const groupedToolbarActionOptions = groupBy(allowedToolbarActions, "buttonGroup");
    let groupedToolbarActionHTML = [];

    mapObjIndexed((toolbarActionOptions, key) => {

      // if(R.equals(key, SPACER_BEFORE_TOOL_GROUP)) {
      //   const dateTimestamp = new Date().getTime();
      //   groupedToolbarActionHTML.push(<ToolbarSpacer key={dateTimestamp}/>);
      // }

      groupedToolbarActionHTML.push(
        <ToolbarButtonGroup
          key={key}
          toolbarActionOptions={toolbarActionOptions}
          groupName={key}
          toolbar={toolbar}
          menu={menu}
          handleClick={handleClick}
        />
      );
    })(groupedToolbarActionOptions);

    return groupedToolbarActionHTML;
  }

  return (
    <>
      <StyledToolbar className="chart-button-row">
        {renderGroupedToolbarActions()}
      </StyledToolbar>
    </>
  );
};
export default Toolbar;
