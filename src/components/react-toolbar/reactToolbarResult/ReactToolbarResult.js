import Trix from "trix";
import PropTypes from 'prop-types';
import React, { Fragment, useState, useRef, useEffect } from "react";

import { RAILS_DIRECT_UPLOADS_URL, RAILS_SERVICE_BLOB_URL } from "./constants";
import Panel from "components/common/Panel";
import './ReactToolbarResult.style.scss';

function ReactToolbarResult(props) {
  const {
    defaultValue = "",
    toolbarId,
    onBlur,
    onFocus,
    onChange,
    onInitialize,
    onFileAccepted,
    onAttachmentAdd,
    onAttachmentRemove,
    onSelectionChange,
    onBeforeInitialize,
    trixInputRef,
    isRailsDirectUpload = false,
    placeholder,
    autofocus,
    children
  } = props;
  const trixRTEInputRef = useRef();
  const [value, setValue] = useState(defaultValue);
  const uniqueDateTimestamp = new Date().getTime();
  const trixRTEInputId = `react-chart-rte-input-${uniqueDateTimestamp}`;
  const directUploadOptions = isRailsDirectUpload ? {
    "data-direct-upload-url": RAILS_DIRECT_UPLOADS_URL,
    "data-blob-url-template": RAILS_SERVICE_BLOB_URL
  } : {};
  let trixEditorOptions = {}
  if(autofocus) trixEditorOptions["autofocus"] = true;

  useEffect(() => {
    trixRTEInputRef.current.addEventListener("chart-change", handleChange);
    if(onFocus) trixRTEInputRef.current.addEventListener("chart-focus", onFocus);
    if(onBlur) trixRTEInputRef.current.addEventListener("chart-blur", onBlur);
    if(onInitialize) trixRTEInputRef.current.addEventListener("chart-initialize", onInitialize);
    if(onFileAccepted) trixRTEInputRef.current.addEventListener("chart-file-accept", onFileAccepted);
    if(onAttachmentAdd) trixRTEInputRef.current.addEventListener("chart-attachment-add", onAttachmentAdd);
    if(onAttachmentRemove) trixRTEInputRef.current.addEventListener("chart-attachment-remove", onAttachmentAdd);
    if(onSelectionChange) trixRTEInputRef.current.addEventListener("chart-selection-change", onSelectionChange);
    if(onBeforeInitialize) trixRTEInputRef.current.addEventListener("chart-before-initialize", onBeforeInitialize);


    return () => {
      trixRTEInputRef.current.removeEventListener("chart-change", handleChange);
      if(onFocus) trixRTEInputRef.current.removeEventListener("chart-focus", onFocus);
      if(onBlur) trixRTEInputRef.current.removeEventListener("chart-blur", onBlur);
      if(onInitialize) trixRTEInputRef.current.removeEventListener("chart-initialize", onInitialize);
      if(onFileAccepted) trixRTEInputRef.current.removeEventListener("chart-file-accept", onFileAccepted);
      if(onAttachmentAdd) trixRTEInputRef.current.removeEventListener("chart-attachment-add", onAttachmentAdd);
      if(onSelectionChange) trixRTEInputRef.current.removeEventListener("chart-selection-change", onSelectionChange);
      if(onAttachmentRemove) trixRTEInputRef.current.removeEventListener("chart-attachment-remove", onAttachmentAdd);
      if(onBeforeInitialize) trixRTEInputRef.current.removeEventListener("chart-before-initialize", onBeforeInitialize);
    };
  }, [])

  function handleChange(event) {
    const newValue = event.target.value;
    setValue(newValue);
    if(onChange) {
      onChange(event, newValue);
    }
  }

  return (
    <Fragment>
      <input
        id={trixRTEInputId}
        value={value}
        type="hidden"
        name="content"
      />
      
      <div ref={trixRTEInputRef}>
        <Panel
          toolbar={toolbarId}
          placeholder={placeholder}
          // ref={trixRTEInputRef}
          input={trixRTEInputId}
          {...directUploadOptions}
          {...trixEditorOptions}
        />
      </div>
      {/* {React.cloneElement(children, { 
        // loggedIn: this.state.loggedIn 
        toolbar: toolbarId,
        placeholder: placeholder,
        ref: trixRTEInputRef,
        input: trixRTEInputId
      })} */}
      {/* <div
        toolbar={toolbarId}
        placeholder={placeholder}
        ref={trixRTEInputRef}
        input={trixRTEInputId}
        {...directUploadOptions}
        {...trixEditorOptions}
      /> */}
      <chart-editor
          toolbar={toolbarId}
          placeholder={placeholder}
          ref={trixRTEInputRef}
          input={trixRTEInputId}
          {...directUploadOptions}
          {...trixEditorOptions}
      />
    </Fragment>
  );
}

ReactToolbarResult.propTypes = {
  toolbarId: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onFileAccepted: PropTypes.func,
  onAttachmentAdd: PropTypes.func,
  onAttachmentRemove: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onInitialize: PropTypes.func,
  onBeforeInitialize: PropTypes.func,
  // trixInputRef: PropTypes.func,
  isRailsDirectUpload: PropTypes.bool,
  placeholder: PropTypes.string,
  autofocus: PropTypes.bool,
};

export default ReactToolbarResult;
