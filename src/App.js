import React, { useState, useRef } from "react";
// import { ReactToolbarResult, ReactToolbar } from "react-trix-rte";
import { ReactToolbarResult, ReactToolbar } from "components/react-toolbar";
import Panel from "components/common/Panel";
// import { ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';

import './App.css';

function App() {

  // const reactResultRef = useRef();

  const [value, setValue] = useState("");
  function handleChange(event, newValue) {
    setValue(newValue); // OR custom on change listener.
  }

  return (
    <div className="App">
      {/* <ToolbarComponent id='toolbar'>
        <ItemsDirective>
          <ItemDirective text="Cut" />
          <ItemDirective text="Copy" />
          <ItemDirective text="Paste" />
          <ItemDirective type="Separator" />
          <ItemDirective text="Bold" />
          <ItemDirective text="Italic" />
          <ItemDirective text="Underline" />
        </ItemsDirective>
      </ToolbarComponent>       */}


    <>
      <ReactToolbar toolbarId="react-trix-rte-editor" />
      <ReactToolbarResult
        toolbarId="react-trix-rte-editor"
        defaultValue="<div>React Trix Rich Text Editor</div>"
        onChange={handleChange}
      />
        {/* <Panel/>
      </ReactToolbarResult> */}
    </>
    </div>
  );
}

export default App;
