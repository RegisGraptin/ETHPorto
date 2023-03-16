import { ethers } from "hardhat";

async function main() {

  const Event = await ethers.getContractFactory("EventContract");
  const event = await Event.deploy();

  await event.deployed();

  console.log(
    `Event contract deployed to: ${event.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
