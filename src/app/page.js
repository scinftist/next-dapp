"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
// import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import abi from "./abi";
export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();
  const [userProvider, setUserProvider] = useState();
  const [numberOfTicket, setNumberOfTicket] = useState(0);
  const [networkInfo, setNetworkInfo] = useState({});
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [latestTX, setLatestTx] = useState();
  const [contractValue, setContractValue] = useState();

  const contractAddress = "0x9604D9dbeA6c72B50A2c808d84FF51Ce9764Ca0C";
  const targetChainId = 11155111;

  useEffect(() => {
    if (signer) {
      fetchContractValue();
    }
  }, [signer, latestTX]);

  useEffect(() => {
    // fetchContractValue();

    // Listen for network change events
    // if (window.ethereum) {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("chainChanged", handleNetworkChange);
    }

    return () => {
      // Cleanup: remove event listener when component unmounts
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.off("chainChanged", handleNetworkChange);
      }
    };
  }, []);

  const handleNetworkChange = async () => {
    try {
      const connectedProvider = new ethers.BrowserProvider(window.ethereum);
      const network = await connectedProvider.getNetwork();
      setUserProvider(network);

      // Fetch network information
      const chainId = network.chainId;
      const networkName = network.name;
      setNetworkInfo({ chainId, networkName });

      // Check if the connected network is Sepolia
      if (chainId === 11155111) {
        setIsCorrectNetwork(true);
      } else {
        setIsCorrectNetwork(false);
      }
      console.log(`type of the isConnected ${typeof isConnected}`);

      console.log(`Network: ${networkName} (Chain ID: ${chainId})`);
    } catch (e) {
      console.log(e);
    }
  };

  async function connect() {
    if (isConnected == false) {
      if (typeof window.ethereum !== "undefined") {
        try {
          await ethereum.request({ method: "eth_requestAccounts" });
          setIsConnected(true);
          const connectedProvider = new ethers.BrowserProvider(window.ethereum);
          const sign = await connectedProvider.getSigner();
          setSigner(sign);

          const add = await sign.getAddress();
          setAddress(add);

          const network = await connectedProvider.getNetwork();
          setUserProvider(network);

          // Fetch network information
          const chainId = network.chainId;
          const networkName = network.name;
          setNetworkInfo({ chainId, networkName });

          console.log(`Network: ${networkName} (Chain ID: ${chainId})`);
          // console.log(`Network: ${networkName} (RPCURL: ${network.})`);
          console.log(`is correct?; ${isCorrectNetwork}`);
          if (chainId == targetChainId) {
            setIsCorrectNetwork(true);
            // const contract = new ethers.Contract(
            //   contractAddress,
            //   abi.abi,
            //   signer
            // );
            // console.log(`1`);
            // const v = await contract.getNum();
            // console.log(`2`);
            // setContractValue(v);
            // console.log(`val is ${v}`);
            // console.log(`val is ${v.toString()}`);
          } else {
            setIsCorrectNetwork(false);
          }
          console.log(`isCorrect val ${isCorrectNetwork}`);
          console.log(` type ${typeof chainId}, chainId ${chainId}`);
          console.log(
            `is correct? b; ${chainId == "11155111"} ${
              chainId == targetChainId
            }`
          );
          console.log(`isCorrect val ${isCorrectNetwork}`);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
  const inputOnChange = (event) => {
    const value = event.target.value;
    // Ensure the input is numeric and update the state
    if (/^\d*$/.test(value)) {
      setNumberOfTicket(parseInt(value, 10) || 0);
    }
  };

  const incrementNumberOfTicket = () => {
    setNumberOfTicket(numberOfTicket + 1);
  };
  const decrementValue = () => {
    setNumberOfTicket(numberOfTicket - 1);
  };
  const exec = async () => {
    console.log(`exec`);
    if (!signer) {
      console.log("Please connect your wallet first.");
      return;
    }

    const contract = new ethers.Contract(contractAddress, abi.abi, signer);

    try {
      const tx = await contract.setNum(`${numberOfTicket}`);
      await tx.wait(); // Wait for the transaction to be mined
      setLatestTx(tx.hash);
      console.log("Transaction successful", tx);
    } catch (e) {
      console.log("Transaction failed", e);
    }
  };
  const fetchContractValue = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, abi.abi, signer);
      const value = await contract.getNum();
      setContractValue(value.toString());
      console.log("Contract value:", value.toString());
    } catch (e) {
      console.log("Failed to fetch contract value", e);
    }
  };

  return (
    <div>
      {/* <meta
        name="description"
        content="A simple DApp using Next.js and Ethers.js"
      /> */}

      <button
        onClick={connect}
        className="fixed top-4 right-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {""}
        {isConnected ? "connected" : "connect"}
      </button>
      {isConnected ? (
        <h1 className="text-base text-sky-700">Address {address}</h1>
      ) : (
        <h1>not Connected</h1>
      )}
      {isConnected ? (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h2 className="text-4xl">Each ticket is .00025 ETH ~ 1$ </h2>

          <label>
            number of mferticket
            <div className="flex items-center">
              <button
                className={`w-8 h-8 flex items-center justify-center mr-2 ${
                  numberOfTicket < 2
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed rounded-full"
                    : "bg-red-400 text-white hover:bg-red-600 rounded-full"
                }`}
                onClick={decrementValue}
                disabled={numberOfTicket < 2}
              >
                -
              </button>
              <input
                type="number"
                value={numberOfTicket}
                pattern="\d+"
                onChange={inputOnChange}
                min="1"
                step="1"
                className="border border-gray-300 px-2 py-1 w-20 text-center rounded-md appearance-none text-black [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="0"
              />
              <button
                className="px-3 py-1 ml-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
                onClick={incrementNumberOfTicket}
              >
                +
              </button>
            </div>
          </label>
          <div>
            <button
              onClick={exec}
              disabled={numberOfTicket === 0 || !isCorrectNetwork}
              className={`px-4 py-2 text-white rounded-md  m-2 ${
                numberOfTicket === 0 || !isCorrectNetwork
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500  hover:bg-blue-700"
              }`}
            >
              buy Tickets
            </button>
          </div>
          {numberOfTicket !== 0 ? (
            <h1>hi1</h1>
          ) : (
            <h1>hi2 {numberOfTicket > 1 && isCorrectNetwork}</h1>
          )}
          {numberOfTicket > 1 && isCorrectNetwork ? (
            <h1>true</h1>
          ) : (
            <h1>false</h1>
          )}
          {numberOfTicket > 1 && isCorrectNetwork ? (
            <h1>true</h1>
          ) : (
            <h1>false</h1>
          )}
          {isConnected ? (
            <h1>this is address {address}</h1>
          ) : (
            <h1>not Connected</h1>
          )}
          <h1>
            {typeof latestTX !== "undefined"
              ? ` the latest transaction is ${latestTX.hash}`
              : ""}
          </h1>
          <h1>{isCorrectNetwork ? ` the value ${contractValue}` : ""}</h1>
        </main>
      ) : (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1> connect wallet plz</h1>
        </main>
      )}
    </div>
  );
}
