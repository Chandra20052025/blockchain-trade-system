const { ethers } = require("hardhat");

async function main() {
  const Trade = await ethers.getContractFactory("Trade");
  const trade = await Trade.deploy();

  await trade.waitForDeployment();

  console.log("Contract deployed to:", await trade.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});