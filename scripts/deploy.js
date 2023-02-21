// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() { 
  const EventTest = await hre.ethers.getContractFactory("Bank");
  const eventTest = await EventTest.deploy();

  await eventTest.deployed();

  eventTest.on("Deposit", (owner, amount) => {
    console.log(`New deposit: ${owner} ${amount} WEI`);
  })

  eventTest.on("Withdraw", (owner, amount) => {
    console.log(`New withdraw: ${owner} ${amount} WEI`);
  })

  eventTest.on("Transfer", (from, to, amount) => {
    console.log(`New transfer: ${from} ${to} ${amount} WEI`);
  })

  console.log(
    `Contract deployed to ${eventTest.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
