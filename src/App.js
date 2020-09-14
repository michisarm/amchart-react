import React, { useState, useEffect, useCallback } from "react";
import { Toolbar } from "components/toolbar";
import isEmpty from "ramda/src/isEmpty";
// import { useRadioButton } from "components/common"
// import { ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';

import './App.css';


function App() {
  // const { RadioGroup, RadioButton } = useRadioButton();
  const [toolbar, setToolbar] = useState({
    qc: 'pc', //default
    chart: 'bar', //default
    data: 'number', //default
    type: 'all', //default
  });

  const [menu, setMenu] = useState({
    lnb: 'prevalence', // prevalence, coinfection, qc
    gubun: 'pathogen' // pathogen, product
  });

  const updateToolbar = useCallback(e=>{
    const buttonGroup = e.target.closest('span');
    const button = e.target.closest('button');
    const groupName = buttonGroup.dataset.chartButtonGroup;
    const value = button.name;
    let toolbarObj = {
      [groupName]: value
    }

    // customize follow up condition
    if(groupName === 'chart'){
      if(value === 'candle' && toolbar.data !== 'ct'){ // 1. chart:candle -> data:Ct
        toolbarObj['data'] = 'ct';
      }else if((value === 'bar' || value === 'line') && toolbar.data === 'ct'){ // 2. chart:bar or line -> data:Ct
        toolbarObj['data'] = 'number';
      }
    } else if(groupName === 'data'){
      if(value !== 'ct' && toolbar.chart === 'candle'){ // 3. data:num or % -> !chart:candle
        toolbarObj['chart'] = 'bar';  
      }else if(value === 'ct' && (toolbar.chart === 'bar' || toolbar.chart === 'line')){ // 4. data:ct -> !chart:candle
        toolbarObj['chart'] = 'candle';
      }
    }

    // setState
    setToolbar({...toolbar,...toolbarObj});
  },[toolbar]);


  const updateMenu = useCallback(e=>{
    const name = e.target.name;
    const value = e.target.value;
    let menuObj = {
      [name]: value
    }
    // customize lnb gubun
    if(name==='lnb' && value==='coinfection'){ // 1. co-infection -> pathogen only
      menuObj['gubun'] = 'pathogen';
    }
    // setState
    setMenu({...menu,...menuObj});
  },[menu]);

  //menu useEffect
  useEffect(() => {
    let toolbarObj = {};
    // ct가 없는 경우 default값 chart:bar, data:number
    if((menu.lnb==='prevalence' && menu.gubun==='product') || (menu.lnb==='qc' && menu.gubun==='product' && toolbar.qc==='pc')){
      toolbarObj['chart'] = 'bar';
      toolbarObj['data'] = 'number';
    }
    // type all 밖에 없는 경우 type:all
    if((menu.lnb==='coinfection'|| menu.lnb==='qc')){
      toolbarObj['type'] = 'all';
    }
    // qc pc 밖에 없는 경우  qc:pc
    if(menu.lnb==='qc' && menu.gubun==='pathogen'){
      toolbarObj['qc'] = 'pc';
    }
    if(!isEmpty(toolbarObj)){
      setToolbar({...toolbar,...toolbarObj});
    }
  }, [menu]);
  
  return (
    <div className="App">
      <div>
        <p>{`선택된 값`}</p>
        <p>{`[menu] : ${menu.lnb}`}</p>
        <p>{`[gubun] : ${menu.gubun}`}</p>
        <p>{`[qc] : ${toolbar.qc}`}</p>
        <p>{`[chart] : ${toolbar.chart}`}</p>
        <p>{`[data] : ${toolbar.data}`}</p>
        <p>{`[type] : ${toolbar.type}`}</p>
      </div>
      <div>
        <span>메뉴</span>
        <label>
          <input name="lnb" onChange={updateMenu} value="prevalence" type="radio" checked={menu.lnb === "prevalence"}/>
          Prevalence
        </label>
        <label>
          <input name="lnb" onChange={updateMenu} value="coinfection" type="radio" checked={menu.lnb === "coinfection"}/>
          Coinfection
        </label>
        <label>
          <input name="lnb" onChange={updateMenu} value="qc" type="radio" checked={menu.lnb === "qc"}/>
          QC
        </label>
      </div>
      <div style={{display:"block", marginBottom: "40px"}}>
        <span>기준</span>
        <label>
          <input name="gubun" onChange={updateMenu} value="pathogen" type="radio" checked={menu.gubun === "pathogen"}/>
          Pathogen
        </label>
        { menu.lnb !== 'coinfection' && 
          <label>
            <input name="gubun" onChange={updateMenu} value="product" type="radio" checked={menu.gubun === "product"}/>
            Product
          </label>
        }
      </div>
      <div>
      <Toolbar state={toolbar} menu={menu} handleClick={updateToolbar}/>
      </div>
    </div>
  );
}

export default App;
