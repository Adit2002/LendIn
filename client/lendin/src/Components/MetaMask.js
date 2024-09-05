import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MetaMaskComponent = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const [expand, setExp] = useState(false);

    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');

    useEffect(() => {
        funcheck();
    }, []); 

    const funcheck = async () => {
        try {
            const checkToken = await axios.get('https://lend-8g9ih55s7-adit2002s-projects.vercel.app/checktoken', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            if (!checkToken.data.is_true) {
                navigate('/Home');
            } else {
                console.log('Token is valid');
            }
        } catch (error) {
            console.error('Error checking token:', error);
            navigate('/Home');
        }
    };

    const Expand = () => {
        setExp(!expand);
    };
    let acid;
    const connectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccounts(accounts);
            acid=accounts[0];
            setError(null);
            if(accounts.length>0)
            Submitrequest(acid);
        } catch (err) {
            setError(err.message || 'Error connecting to wallet.');
            setAccounts([]);
        }
    };

    const Submitrequest = async (ii) => {
        try {
          console.log(ii);
            const serverresponse = await axios.post('http://localhost:3001/maskconnect', {
                email: email,
                accid: ii,
                role: role
            });
            console.log('success');
            if (serverresponse.data.istrue === true) {
                navigate(`/${email}/DsbBrw`);
            }

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="page">
            <div className="image-postlogin">
                <div className="section">
                    <h2>MetaMask Wallet Integration</h2>
                    <button onClick={Expand} className='box-link'>Click for a guide on how to connect MetaMask <i class="fi fi-sr-angle-small-down"></i></button>
                    <br />
                    {expand && (
                        <div className='info-reg'>
                            <ul>
                            <li><h2>Step 1: Go to Chrome Web Store Extensions Section.</h2></li>
                    <li><h2>Step 2: Search MetaMask.</h2></li>
                    <li><h2>Step 3: Check the number of downloads to make sure that the legitimate MetaMask is being installed, as hackers might try to make clones of it.</h2></li>
                    <li><h2>Step 4: Click the Add to Chrome button.</h2></li>
                    <li><h2>Step 5: Once installation is complete this page will be displayed. Click on the Get Started button.</h2></li>
                    <li><h2>Step 6: This is the first time creating a wallet, so click the Create a Wallet button. If there is already a wallet then import the already created using the Import Wallet button.</h2></li>
                    <li><h2>Step 7: Click I Agree button to allow data to be collected to help improve MetaMask or else click the No Thanks button. The wallet can still be created even if the user will click on the No Thanks button.</h2></li>
                    <li><h2>Step 8: Create a password for your wallet. This password is to be entered every time the browser is launched and wants to use MetaMask. A new password needs to be created if chrome is uninstalled or if there is a switching of browsers. In that case, go through the Import Wallet button. This is because MetaMask stores the keys in the browser. Agree to Terms of Use.</h2></li>
                    <li><h2>Step 9: Click on the dark area which says Click here to reveal secret words to get your secret phrase. </h2></li>
                    <li><h2>Step 10: This is the most important step. Back up your secret phrase properly. Do not store your secret phrase on your computer. Please read everything on this screen until you understand it completely before proceeding. The secret phrase is the only way to access your wallet if you forget your password. Once done click the Next button.</h2></li>
                    <li><h2>Step 11: Click the buttons respective to the order of the words in your seed phrase. In other words, type the seed phrase using the button on the screen. If done correctly the Confirm button should turn blue.</h2></li>
                    <li><h2>Step 12: Click the Confirm button. Please follow the tips mentioned.</h2></li>
                    <li><h2>Step 13: One can see the balance and copy the address of the account by clicking on the Account 1 area.</h2></li>
                    <li><h2>Step 14: One can access MetaMask in the browser by clicking the Foxface icon on the top right. If the Foxface icon is not visible, then click on the puzzle piece icon right next to it.</h2></li>
                            </ul>
                        </div>
                    )}
                    <br />
                    <button className="box-link" onClick={connectWallet}>Connect Wallet</button>
                    {accounts.length > 0 && (
                        <div>
                            <h2>Connected Account:</h2>
                            <h2>{accounts[0]}</h2>
                        </div>
                    )}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default MetaMaskComponent;
