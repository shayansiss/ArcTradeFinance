import { expect } from "chai";
import { network } from "hardhat";


describe("InvoiceRegistry", function () {

  it("Should create an invoice", async function () {

    const { ethers } = await network.connect();


    const InvoiceRegistry =
      await ethers.getContractFactory("InvoiceRegistry");


    const invoice =
      await InvoiceRegistry.deploy();


    await invoice.waitForDeployment();


    await invoice.createInvoice(10000);


    const data =
      await invoice.invoices(1);


    expect(data.amount)
      .to.equal(10000);

  });

});