import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MetaMaskWalletComponent = () => {
    const [accounts, setAccounts] = useState();
    const [error, setError] = useState(null);
    const [flag,setFlag]=useState(true);
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState();
    const navigate=useNavigate();
    const email=localStorage.getItem('email');
    const tid=localStorage.getItem('tid');
    const funcheck = async () => {
        const checkToken = await axios.get('http://localhost:3001/checktoken', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
    
        if (checkToken.data.is_true === false) {
          navigate('/Home')
        } else {
          console.log('True')
        }
    }
    const GetId=async()=>{
        const serverresponse=await axios.post('http://localhost:3001/getmmid',{
            emails: email,
            tid: tid,
        });
        console.log(serverresponse);
        setAmount(serverresponse.data.ticket.loan_amount);
        setRecipientAddress(serverresponse.data.reciver.acid);
        setAccounts(serverresponse.data.sender.acid);
        if(amount&&recipientAddress&&accounts){
            setFlag(true);
        }
    }
    useEffect(() => {
        funcheck();
        GetId(); 
    }, []); 
    const sendTransaction = async () => {
        try {
            const transaction = {
                from: accounts[0],
                to: recipientAddress,
                value: window.ethereum.utils.toWei(amount, 'ether')
            };
            await window.ethereum.request({ method: 'eth_sendTransaction', params: [transaction] });
            alert('Transaction sent successfully!');
        } catch (err) {
            alert('Error sending transaction: ' + err.message);
        }
    };

    return (
        <div className="page">
        <div className='image-postlogin'>
        <div className="section">
        <h2>MetaMask Wallet Integration</h2>
            {flag && (
                <div className='info-reg1'>
                    <h1>Payment Details: </h1>
                    <h2>Sender Address: {accounts}</h2>
                    <h2>recipientAddress: {recipientAddress}</h2><br/>
                    <h2>Amount: {amount}</h2>
                    <button className="box-link" onClick={sendTransaction}>Send Transaction</button>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        </div>
      </div>
    );
};

export default MetaMaskWalletComponent;
