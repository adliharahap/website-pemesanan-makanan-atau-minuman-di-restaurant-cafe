import React from "react";


const Button = ({ children, onClick, design}) => {
    return (
        <>
            <button className={design} onClick={onClick}>
                {children}
            </button>
        </>
    );
};

export default Button;