import React, { useEffect, useState } from "react";
import { verifyToken } from "../utils/checkUserToken";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Homepages = () => {
    const [loading, setLoading] = useState(true);
    
    const userData = useSelector((state) => state.userData);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkLoginOrNot = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                const isValid = await verifyToken(token, dispatch);
                if (isValid) {
                    if (userData && userData.role) {
                        if (userData.role === "admin") {
                            navigate('/Admin/Dashboard');
                        } else if (userData.role === "chef") {
                            navigate('/Chef/ConfirmOrders');
                        } else if (userData.role === "cashier") {
                            navigate('/Cashier/Dashboard');
                        } else if (userData.role === "waiter") {
                            navigate('/Waiter/Dashboard');
                        } else if (userData.role === "user") {
                            navigate('/User/Dashboard');
                        } else {
                            navigate('/');
                        }
                    }
                } else {
                    console.log("Token sudah expired");
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        checkLoginOrNot();
    }, [navigate, dispatch, userData]);

    return (
        <div className="bg-gray-500">
            <h1>Homepages</h1>
            <div className="wave-container">
                <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><path d="M 0,600 L 0,300 C 74.64114832535884,308.7081339712919 149.28229665071768,317.4162679425837 240,331 C 330.7177033492823,344.5837320574163 437.5119617224881,363.0430622009569 535,321 C 632.4880382775119,278.9569377990431 720.6698564593302,176.41148325358853 828,111 C 935.3301435406698,45.588516746411486 1061.8086124401914,17.311004784688997 1167,5 C 1272.1913875598086,-7.311004784688995 1356.0956937799042,-3.6555023923444976 1440,0 L 1440,600 L 0,600 Z" stroke="none" strokeWidth="0" fill="#ffffff" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
            </div>
        </div>
    );
};

export default Homepages;