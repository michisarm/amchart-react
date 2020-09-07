import React, { useState } from "react";
import { ReactTrixRTEInput, ReactTrixRTEToolbar } from "react-trix-rte";
import { ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';

import './App.css';

function App() {


  const [value, setValue] = useState("");
  function handleChange(event, newValue) {
    setValue(newValue); // OR custom on change listener.
  }

  return (
    <div className="App">
      <ToolbarComponent id='toolbar'>
        <ItemsDirective>
          <ItemDirective text="Cut" />
          <ItemDirective text="Copy" />
          <ItemDirective text="Paste" />
          <ItemDirective type="Separator" />
          <ItemDirective text="Bold" />
          <ItemDirective text="Italic" />
          <ItemDirective text="Underline" />
        </ItemsDirective>
      </ToolbarComponent>      


    <>
      <ReactTrixRTEToolbar toolbarId="react-trix-rte-editor" />
      <ReactTrixRTEInput
        toolbarId="react-trix-rte-editor"
        defaultValue="<div>React Trix Rich Text Editor</div>"
        onChange={handleChange}
      />
    </>
    </div>
  );
}

export default App;
