import React from "react";

const Input = ({type, id, name, placeholder}) => {
    return <input className="w-full h-10 mx-auto font-Poppins text-sm border-0 border-b-2 border-black focus:outline-none focus:border-green-500" type={type} id={id} name={name} placeholder={placeholder} required />
}

export default Input;