import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create_Ticket = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const funcheck = async () => {
            try {
                const checkToken = await axios.get('http://localhost:3001/checktoken', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                
                if (!checkToken.data.is_true) {
                    navigate('/Home');
                } else {
                    console.log('Token is valid');
                    function_model_run(); // Call the next function after token check
                }
            } catch (error) {
                console.error('Error checking token:', error);
                navigate('/Home');
            }
        };

        const function_model_run = async () => {
            try {
                const serverresponse = await axios.get('http://localhost:3001/CreateTicket', {});
                
                if (serverresponse.data.is_true) {
                    console.log('Ticket created successfully');
                    console.log(serverresponse.data.message);
                } else {
                    console.log("Failed to create ticket");
                }
            } catch (error) {
                console.error('Error creating ticket:', error);
            }
        };

        funcheck();
    }, [navigate]);

    return (
        <div>
            <h1>YOu</h1>
        </div>
    );
};

export default Create_Ticket;
