
import React, { Fragment, useEffect, useState } from "react";
import { ethers } from "ethers";

const Wallet = () => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);

    const onWallet = async() => {
        // ❌ Check if wallet extension exists 
    if(window.ethereum) {
        console.log('detected');
  
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          accountInfo(accounts[0]);
          // your success logic
        } catch (error) {
          console.log('Error connecting...');
        }
  
      } else {
        alert('Meta Mask not detected');
      }
    }

    const accountInfo = (data) => {
        setAddress(data);
       getBalance(data)
    }
    const getBalance = async(data) => {
        const amount = await window.ethereum.request({
            method: "eth_getBalance",
            params: [data, 'latest']
          });
          setBalance(ethers.utils.formatEther(amount));
    }
    return(
        <Fragment>
            <div>
               {`My balance is ${balance}`}
            </div>
            <div>
               {`My Address is ${address}`}
            </div>
            <button color="primary" onClick={onWallet}>
                Connect to wallet
            </button>
        </Fragment>
    )
}

export default Wallet;