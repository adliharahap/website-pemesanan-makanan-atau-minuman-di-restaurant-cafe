import React from "react";

const InputDekstop = ({type, id, name, placeholder, inputValue, setInputValue}) => {

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // Update state dengan nilai baru dari input
    };

    return <input 
        className="w-full h-10 mx-auto text-slate-100 font-Poppins text-sm border-0 border-b-2 border-white bg-transparent focus:outline-none focus:border-cyan-500 placeholder:text-slate-300" 
        type={type} 
        id={id} 
        name={name} 
        placeholder={placeholder} 
        value={inputValue}
        onChange={handleInputChange}
        required 
    />
}

export default InputDekstop;