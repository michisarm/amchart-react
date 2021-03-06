import React from "react";
import * as R from "ramda";
import PropTypes from 'prop-types';

import ToolbarButton from "./ToolbarComponent/ToolbarButton";
import ToolbarSpacer from "./ToolbarComponent/ToolbarSpacer";
// import ToolbarLinkDialog from "./ToolbarComponent/ToolbarLinkDialog";
import ToolbarButtonGroup from "./ToolbarComponent/ToolbarButtonGroup";
import { groupBy, mapIndexed } from "../Shared/utils";
import { TOOLBAR_ACTION_OPTS, SPACER_BEFORE_TOOL_GROUP } from "./constants";

function ReactToolbar(props) {
  const { disableGroupingAction = false, toolbarId, toolbarActions } = props;
  const isToolbarActionPresent = toolbarActions && R.not(R.isEmpty(toolbarActions));
  let allowedToolbarActions = TOOLBAR_ACTION_OPTS;
  if(isToolbarActionPresent) {
    allowedToolbarActions = R.pick(toolbarActions, TOOLBAR_ACTION_OPTS);
  }

  function renderGroupedToolbarActions() {
    const groupedToolbarActionOptions = groupBy(allowedToolbarActions, "trixButtonGroup");
    let groupedToolbarActionHTML = [];

    R.mapObjIndexed((toolbarActionOptions, key) => {
      if(R.equals(key, SPACER_BEFORE_TOOL_GROUP)) {
        const dateTimestamp = new Date().getTime();
        groupedToolbarActionHTML.push(<ToolbarSpacer key={dateTimestamp}/>);
      }

      groupedToolbarActionHTML.push(
        <ToolbarButtonGroup
          key={key}
          toolbarActionOptions={toolbarActionOptions}
          groupName={key}
        />
      );
    })(groupedToolbarActionOptions);

    return groupedToolbarActionHTML;
  }

  function renderUnGroupedToolbarActions() {
    return mapIndexed((toolbarActionKey, index) => {
      return <ToolbarButton key={index} {...allowedToolbarActions[toolbarActionKey]} />
    })(R.keys(allowedToolbarActions));
  }

  function renderToolbarActions() {
    if(disableGroupingAction) {
      return(
        <span className="chart-button-group">
          {renderUnGroupedToolbarActions()}
        </span>
      );
    } else {
      return renderGroupedToolbarActions();
    }
  }

  return (
    <chart-toolbar id={toolbarId}>
      <div className="chart-button-row">
        {renderToolbarActions()}
      </div>
    </chart-toolbar>
  );
}

ReactToolbar.propTypes = {
  disableGroupingAction: PropTypes.bool,
  toolbarId: PropTypes.string,
  toolbarActions: PropTypes.array
}

export default ReactToolbar;
