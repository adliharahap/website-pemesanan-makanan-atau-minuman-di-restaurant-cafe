import React from 'react';

const NoDataFound = ({ message = "Data tidak ditemukan" }) => {
    return (
        <div className="flex justify-center min-h-screen min-w-full p-5">
            <div className="bg-white h-[500px] w-[90%] shadow-lg rounded-lg p-8 text-center flex justify-center items-center flex-col">
                <div className="mb-5 animate-bounceIn">
                    <img 
                        src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127818.jpg?t=st=1730102932~exp=1730106532~hmac=cc09fd77038a32b518ff830f21be0eda40008a24f37850801e418d2ba5281dd1&w=740" 
                        alt="No Data Found" 
                        className="w-56 h-56 mx-auto object-cover opacity-80"
                    />
                </div>
                
                <h2 className="text-gray-800 text-xl font-semibold mb-2 font-Poppins">{message}</h2>
            </div>
        </div>
    );
};

export default NoDataFound;
