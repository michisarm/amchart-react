import React, { useState, useRef } from "react";
// import { ReactToolbarResult, ReactToolbar } from "react-chart-rte";
import { ReactToolbarResult, ReactToolbar } from "components/react-toolbar";
import { Toolbar } from "components/toolbar";
import Panel from "components/common/Panel";
// import { ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';

import './App.css';

function App() {

  const [form, setValues] = useState({
    number: '',
    // : ''
  });

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
    console.log(e.target.name);
  };

  return (
    <div className="App">
    <Toolbar handleClick={updateField}/>
    </div>
  );
}

export default App;
