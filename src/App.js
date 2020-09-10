import React, { useState, useEffect, useRef, useCallback } from "react";
import { Toolbar } from "components/toolbar";
import Panel from "components/common/Panel";
import { useRadioButton } from "components/common"
// import { ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';

import './App.css';


function App() {

  const { RadioGroup, RadioButton } = useRadioButton();

  const [form, setValues] = useState({
    chart: '',
    data: '',
    type: '',
  });

  const updateForm = useCallback(e=>{
    const buttonGroup = e.target.closest('span');
    const button = e.target.closest('button');
    Array.from(buttonGroup.children).map((obj, i)=>{
      obj.classList.remove("chart-active");
    });
    button.classList.add("chart-active");
    /**
     * rule 
     * 1. list 선택시 ct 선택안됨
     * 2. bar 선택시 
     * 
     */
    // useEffect(()=>{
      setValues({
        ...form,
        [buttonGroup.dataset.chartButtonGroup]: button.name
      });
  },[form]);

  const [radioC, setRadioC] = useState({
    menuC: 'prevalence',
    gubunC: 'pathogen'
  });
  const updateRadioC = useCallback(({name, value})=>{
    console.log(name + "    "+ value);
    // setRadioC({
    //   ...radioC,
    //   [name]: value
    // });
  },[radioC]);
  
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
        <section>
        <h1>메뉴</h1>
        <RadioGroup name="menuC" defaultValue={radioC.menu} callback={updateRadioC}>
          <RadioButton label="Prevalence" value="prevalence" />
          <RadioButton label="Coinfection" value="coinfection" />
        </RadioGroup>
        </section>
      </div>
      <div style={{marginBottom:'40px'}}>
        <section>
        <h1>기준</h1>
        <RadioGroup name="gubunC" defaultValue={radioC.gubun} callback={updateRadioC}>
          <RadioButton label="Pathogens" value="pathogen" />
          <RadioButton label="Project" value="project" />
        </RadioGroup>
        </section>
      </div>
      <div style={{marginBottom:'40px'}}>
        <input name="menu" onChange={updateRadio} value="teprevalencest" type="radio"/>
        <input name="menu" onChange={updateRadio} value="coinfection" type="radio"/>
        </div>
        <div>
        <input name="gubun" onChange={updateRadio} value="pathogen" type="radio"/>
        <input name="gubun" onChange={updateRadio} value="project" type="radio"/>
      </div>
      <div style={{display:"block", marginBottom: "40px"}}>
        <p>{`선택된 값`}</p>
        <p>{`[chart] : ${form.chart}  , [data] : ${form.data}  , [type] : ${form.type}`}</p>
      </div>
      <div>
        <Toolbar handleClick={updateForm}/>
      </div>
    </div>
  );
}

export default App;
