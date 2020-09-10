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

  const updateToolbar = useCallback(e=>{
    const buttonGroup = e.target.closest('span');
    const button = e.target.closest('button');
    Array.from(buttonGroup.children).map((obj, i)=>{
      return obj.classList.remove("chart-active");
    });
    button.classList.add("chart-active");

    const group = buttonGroup.dataset.chartButtonGroup;
    const name = button.name;
    console.log(group);
    console.log(name);
    /**
     * rule 
     * 1. list 선택시 ct 선택안됨
     * 2. bar 선택시 
     * 
     */
    // useEffect(()=>{
      setToolbar({
        ...toolbar,
        [buttonGroup.dataset.chartButtonGroup]: button.name
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
