import { network } from "hardhat";

async function main() {

  const { ethers } = await network.connect();


  const usdc = await ethers.getContractAt(
    "MockUSDC",
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  );


  const tx = await usdc.mint(
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    ethers.parseUnits("1000", 18)
  );


  await tx.wait();


  console.log("1000 MockUSDC minted");

}


main().catch((error) => {

  console.error(error);

  process.exitCode = 1;

});