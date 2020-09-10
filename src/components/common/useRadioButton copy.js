import React, { useState, useEffect, useContext, createContext } from 'react'

const useRadioButton = () => {
  
  const RadioValue = ({name, value, callback}) => {
    // const [value, setState] = useState(null);
    // useEffect(() => callback({name, value}), [value]);
  
    const handleChange = (event) => {
      // setState(event.target.value);
      // callback({name, value: event.target.value});
      
      callback({name: name, value : event.target.value});
    };
    const inputProps = {
      onChange: handleChange,
      name,
      value,
      type: "radio"
    }; 
    return [inputProps];
  }
  
  const RadioGroupContext = createContext();
  const RadioGroup = ({ children, name, value, callback }) => {

    const [inputProps] = RadioValue({name, value, callback});
    return (
        <RadioGroupContext.Provider value={inputProps}>
            {children}
        </RadioGroupContext.Provider>
    );
  }
  
  const RadioButton = (props) => {
    const context = useContext(RadioGroupContext);
    console.log(context.value === props.value)
    return (
        <label>
            <input {...props} type={context.type} onChange={context.onChange} checked={ context.value === props.value ? 'checked' : ''}/>
            {props.label}
        </label>
    );
  }
  
  return { RadioGroup, RadioButton };
}

export default useRadioButton;