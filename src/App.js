import React, { useState, useCallback } from "react";
import { Toolbar } from "components/toolbar";
// import { useRadioButton } from "components/common"
// import { ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';

import './App.css';


function App() {

  // const { RadioGroup, RadioButton } = useRadioButton();

  const [toolbar, setToolbar] = useState({
    chart: 'bar',
    data: 'number',
    type: 'all',
  });

  //
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
      }else if(value === 'ct' && toolbar.chart !== 'candle'){ // 4. data:ct -> !chart:candle
        toolbarObj['chart'] = 'candle';
      }
    }

    // setState
    setToolbar({
      ...toolbar,
      ...toolbarObj
    });
  },[toolbar]);

  const [radio, setRadio] = useState({
    menu: 'prevalence',
    gubun: 'pathogen'
  });
  const updateRadio = useCallback(e=>{
    setRadio({
      ...radio,
      [e.target.name]: e.target.value
    });
  },[radio]);
  
  return (
    <div className="App">
      <div>
        <p>{`선택된 값`}</p>
        <p>{`[menu] : ${radio.menu}`}</p>
        <p>{`[gubun] : ${radio.gubun}`}</p>
        <p>{`[chart] : ${toolbar.chart}`}</p>
        <p>{`[data] : ${toolbar.data}`}</p>
        <p>{`[type] : ${toolbar.type}`}</p>
      </div>
      <div>
        <span>메뉴</span>
        <label>
          <input name="menu" onChange={updateRadio} value="prevalence" type="radio" defaultChecked={radio.menu === "prevalence"}/>
          Prevalence
        </label>
        <label>
          <input name="menu" onChange={updateRadio} value="coinfection" type="radio" defaultChecked={radio.menu === "coinfection"}/>
          Coinfection
        </label>
      </div>
      <div style={{display:"block", marginBottom: "40px"}}>
        <span>기준</span>
        <label>
          <input name="gubun" onChange={updateRadio} value="pathogen" type="radio" defaultChecked={radio.gubun === "pathogen"}/>
          Pathogen
        </label>
        <label>
          <input name="gubun" onChange={updateRadio} value="project" type="radio" defaultChecked={radio.gubun === "project"}/>
          Project
        </label>
      </div>
      <div>
        <Toolbar state={toolbar} handleClick={updateToolbar}/>
      </div>
    </div>
  );
}

export default App;
