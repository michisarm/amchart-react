import React, { useState, useRef } from "react";
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
    type: ''
  });

  const updateField = e => {
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

    setValues({
      ...form,
      [buttonGroup.dataset.chartButtonGroup]: button.name
    });
    
  };

  const updateRadioField = e => {
    console.log(e);
    // const buttonGroup = e.target.closest('span');
    // const button = e.target.closest('button');
    // Array.from(buttonGroup.children).map((obj, i)=>{
    //   obj.classList.remove("chart-active");
    // });
    // button.classList.add("chart-active");
    
    // setValues({
    //   ...form,
    //   [buttonGroup.dataset.chartButtonGroup]: button.name
    // });
    
  };

  return (
    <div className="App">
      <div>
        <section>
        <h1>메뉴</h1>
        <RadioGroup name="menu" onChange={updateRadioField}>
          <RadioButton label="Prevalence" value="prevalence" />
          <RadioButton label="Coinfection" value="coinfection" />
        </RadioGroup>
        </section>
      </div>
      <div>
        <section>
        <h1>기준</h1>
        <RadioGroup name="gubun" onChange={updateRadioField}>
          <RadioButton label="Pathogens" value="pathogen" />
          <RadioButton label="Project" value="project" />
        </RadioGroup>
        </section>
      </div>
      <div>
        <section>
        <h1>test</h1>
        <RadioGroup name="test" onChange={updateRadioField}>
          <RadioButton label="test" value="test1" />
          <RadioButton label="test2" value="test2" />
        </RadioGroup>
        </section>
      </div>
      <div>
        <Toolbar handleClick={updateField}/>
      </div>
      <div>
        {`[chart] : ${form.chart}  , [data] : ${form.data}  , [type] : ${form.type}`}
      </div>
    </div>
  );
}

export default App;
