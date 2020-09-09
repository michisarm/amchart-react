import React, { useState, useEffect, useContext, createContext } from 'react'

const useRadioButton = () => {

  const RadioValue = (name) => {
    const [value, setState] = useState(null);
  
    const handleChange = (event) => {
      setState(event.target.value);
    };
    const inputProps = {
      onChange: handleChange,
      name,
      type: "radio"
    }; 
    return [value, inputProps];
  }
  
  const RadioGroupContext = createContext();
  const RadioGroup = ({ children, name, onChange }) => {
    const [state, inputProps] = RadioValue(name);
    useEffect(()=>{
      onChange(state);
    },[state]);
    return (
        <RadioGroupContext.Provider value={inputProps}>
            {children}
        </RadioGroupContext.Provider>
    );
  }
  
  const RadioButton = (props) => {
    const context = useContext(RadioGroupContext);
    return (
        <label>
            <input {...props} {...context} />
            {props.label}
        </label>
    );
  }
  
  return { RadioGroup, RadioButton };
}

export default useRadioButton;