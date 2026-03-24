import { ethers } from "ethers";
import hre from "hardhat";

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const signer = await provider.getSigner(0);
  
  const artifact = await hre.artifacts.readArtifact("Trade");
  
  const factory = new ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    signer
  );
  
  const trade = await factory.deploy();
  await trade.waitForDeployment();
  console.log("Trade contract deployed to:", await trade.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});