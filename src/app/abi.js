module.exports = {
  abi: [
    {
      inputs: [],
      name: "getNum",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "num",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "n", type: "uint256" }],
      name: "setNum",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
