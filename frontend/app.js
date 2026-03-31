const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_assetName", "type": "string" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" },
      { "internalType": "uint256", "name": "_price", "type": "uint256" }
    ],
    "name": "addTrade",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tradeCount",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

let provider;
let signer;
let contract;

// Connect MetaMask wallet
async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not detected! Please install MetaMask.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);

    document.getElementById("account").innerText = `Connected: ${accounts[0]}`;
    alert("MetaMask connected successfully!");
  } catch (error) {
    console.error("Connect error:", error);
    alert("Failed to connect MetaMask");
  }
}

// Add a new trade
async function addTrade() {
  if (!contract) {
    alert("Please connect MetaMask first!");
    return;
  }

  const assetName = document.getElementById("assetName").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const price = document.getElementById("price").value.trim();

  if (!assetName || !amount || !price) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const tx = await contract.addTrade(assetName, amount, price);
    await tx.wait();

    alert(`Trade added successfully! Transaction Hash: ${tx.hash}`);
    getTradeCount();

    document.getElementById("assetName").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("price").value = "";
  } catch (error) {
    console.error("Add trade error:", error);
    alert("Transaction failed. Check console for details.");
  }
}

// Get total trade count
async function getTradeCount() {
  if (!contract) {
    alert("Please connect MetaMask first!");
    return;
  }

  try {
    const count = await contract.tradeCount();
    document.getElementById("tradeCount").innerText = `Total Trades: ${count.toString()}`;
  } catch (error) {
    console.error("Get count error:", error);
    alert("Failed to fetch trade count");
  }
}

// Event listeners
window.onload = function () {
  document.getElementById("connectBtn")?.addEventListener("click", connectWallet);
  document.getElementById("addTradeBtn")?.addEventListener("click", addTrade);
  document.getElementById("getCountBtn")?.addEventListener("click", getTradeCount);
};