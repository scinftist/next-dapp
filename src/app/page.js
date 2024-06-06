"use client";
import Image from "next/image";
import { useState } from "react";
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

  const contractAddress = "0x00000";

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

          setUserProvider(await connectedProvider.getNetwork());
          console.log(` ${userProvider}`);
          const rpcUrl = window.ethereum.rpcUrls
            ? window.ethereum.rpcUrls[0]
            : "Unknown";
          console.log("RPC URL:", rpcUrl);
          setAddress(add);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
  const inputOnChange = (event) => {
    try {
      setNumberOfTicket(event.target.value);
    } catch (e) {
      console.log(e);
    }
  };
  const incrementNumberOfTicket = () => {
    setNumberOfTicket(numberOfTicket + 1);
  };
  const decrementValue = () => {
    setNumberOfTicket(numberOfTicket - 1);
  };
  const exec = () => {
    console.log(`exec`);
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
                onChange={inputOnChange}
                min="1"
                step="1"
                className="border border-gray-300 px-2 py-1 w-20 text-center rounded-md appearance-none text-black [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="0"
                style={{
                  "-moz-appearance": "textfield",
                  appearance: "textfield",
                }}
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
              onClick={exec()}
              disabled={numberOfTicket < 1}
              className="px-4 py-2  bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              buy Tickets
            </button>
          </div>
          {numberOfTicket !== 0 ? <h1>hi1</h1> : <h1>hi2</h1>}
          {isConnected ? (
            <h1>this is address {address}</h1>
          ) : (
            <h1>not Connected</h1>
          )}
        </main>
      ) : (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1> connect wallet plz</h1>
        </main>
      )}
    </div>
  );
}
