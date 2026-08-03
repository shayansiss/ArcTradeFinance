import { expect } from "chai";
import { network } from "hardhat";

describe("InvoiceEscrow", function () {

  it("Should create escrow and release payment", async function () {

    const { ethers } = await network.connect();

    const [buyer, seller] = await ethers.getSigners();


    // Deploy MockUSDC
    const MockUSDC =
      await ethers.getContractFactory("MockUSDC");

    const usdc =
      await MockUSDC.deploy();

    await usdc.waitForDeployment();


    // Deploy Escrow
    const InvoiceEscrow =
      await ethers.getContractFactory("InvoiceEscrow");


    const escrow =
      await InvoiceEscrow.deploy(
        await usdc.getAddress()
      );

    await escrow.waitForDeployment();


    // Approve USDC
    await usdc.approve(
      await escrow.getAddress(),
      1000
    );


    // Create escrow
    await escrow.createEscrow(
      seller.address,
      1000
    );


    const data =
      await escrow.escrows(1);


    expect(data.amount)
      .to.equal(1000);


    // Release payment
    await escrow.releasePayment(1);


    expect(
      await usdc.balanceOf(seller.address)
    ).to.equal(1000);


  });

});