// import Web3 from 'web3';

// const web3 = new Web3('https://sepolia.infura.io/v3/f0ffbbe9c3544722ab0b40df9ad95d14');

// const getLatestBlock = async () => {
//   const blockNumber = await web3.eth.getBlockNumber();
//   console.log('Latest block:', blockNumber);
// };

// getLatestBlock();


import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/f0ffbbe9c3544722ab0b40df9ad95d14`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

(async () => {
  const balance = await provider.getBalance(wallet.address);
  console.log('Wallet balance:', ethers.formatEther(balance));
})();
