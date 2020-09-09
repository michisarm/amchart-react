import React, { useState, useRef } from "react";
import { Toolbar } from "components/toolbar";
import Panel from "components/common/Panel";
// import { ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';

import './App.css';

function App() {

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

  return (
    <div className="App">
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
