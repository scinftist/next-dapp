"use client";
import Image from "next/image";
import { useState } from "react";
import { ethers } from "ethers";
// import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const connectedProvider = new ethers.BrowserProvider(window.ethereum);
        const sign = await connectedProvider.getSigner();
        setSigner(sign);

        const add = await sign.getAddress();
        setAddress(add);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div>
      {/* <meta
        name="description"
        content="A simple DApp using Next.js and Ethers.js"
      /> */}
      <button onClick={connect}> connect</button>
      {isConnected ? (
        <h1>this is address {address}</h1>
      ) : (
        <h1>not Connected</h1>
      )}
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1> ready to conneect the wallet?</h1>
        <button onClick={connect}> connect</button>
        {isConnected ? (
          <h1>this is address {address}</h1>
        ) : (
          <h1>not Connected</h1>
        )}
      </main>
    </div>
  );
}
