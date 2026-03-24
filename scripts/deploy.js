import hre from "hardhat";

async function main() {
  const trade = await hre.viem.deployContract("Trade");
  console.log("Trade contract deployed to:", trade.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});