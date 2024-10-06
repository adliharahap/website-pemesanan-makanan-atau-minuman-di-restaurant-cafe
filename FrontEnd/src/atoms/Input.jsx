import React from "react";

const Input = ({type, id, name, placeholder, inputValue, setInputValue}) => {

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // Update state dengan nilai baru dari input
    };

    return <input 
        className="w-full h-10 mx-auto font-Poppins text-sm border-0 border-b-2 border-black focus:outline-none focus:border-green-500" 
        type={type} 
        id={id} 
        name={name} 
        placeholder={placeholder} 
        value={inputValue}
        onChange={handleInputChange}
        required 
    />
}

export default Input;