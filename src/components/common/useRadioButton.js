import React, { useState, useEffect, useContext, createContext } from 'react'

const useRadioButton = () => {
  
  const RadioValue = ({name, defaultValue}) => {
    const [value, setState] = useState(null);
  
    const handleChange = (event) => {
      setState(event.target.value);
    };
    const inputProps = {
      onChange: handleChange,
      name,
      value,
      defaultValue,
      type: "radio"
    }; 
    return [value, inputProps];
  }
  
  const RadioGroupContext = createContext();
  const RadioGroup = ({ children, name, defaultValue, callback }) => {

    const [value, inputProps] = RadioValue({name, defaultValue});
    
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
            <input {...props} {...context} defaultChecked={context.value !== context.defaultValue}/>
            {props.label}
        </label>
    );
  }
  
  return { RadioGroup, RadioButton };
}

export default useRadioButton;