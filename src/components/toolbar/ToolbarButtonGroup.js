import React from "react";
import { mapIndexed } from "lib/utils";
import { TOOLBAR_ACTION_GROUP_OPTS } from "./constants";
import ToolbarButton from "./ToolbarButton";
import isEmpty from "ramda/src/isEmpty";

function ToolbarButtonGroup(props) {
  const { groupName, toolbarActionOptions, state, menu, handleClick } = props;

  const visibledToolbar = toolbarActionOptions.filter(obj =>{

    //default visible
    const flag = obj.lnbGroup.includes(menu.lnb) && obj.gubunGroup.includes(menu.gubun);

    //candle ct custom 
    let ctFlag = true;
    if(obj.id === 'candle' || obj.id === 'ct'){
      if(menu.lnb==='prevalence' && menu.gubun==='product'){ //1. prevalence-product
        ctFlag = false;
      }else if(menu.lnb==='qc' && menu.gubun==='product' && state.qc==='pc'){ //2. qc-product-pc
        ctFlag = false;
      }
    }
    return flag && ctFlag;
  }).map((obj, i)=>{
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
    <>
    {!isEmpty(visibledToolbar) &&
      <span className={TOOLBAR_ACTION_GROUP_OPTS[groupName]} data-chart-button-group={groupName}>
        {renderToolbarActions()}
      </span>
    }
    </>
  )
}

export default ToolbarButtonGroup
