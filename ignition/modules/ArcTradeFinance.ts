import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


export default buildModule(
  "ArcTradeFinanceModule",
  (m) => {


    const registry =
      m.contract(
        "InvoiceRegistry"
      );


    const usdc =
      m.contract(
        "MockUSDC"
      );


    const escrow =
      m.contract(
        "InvoiceEscrow",
        [
          usdc,
          registry
        ]
      );



    m.call(
      registry,
      "setEscrowContract",
      [
        escrow
      ]
    );



    return {

      registry,

      usdc,

      escrow

    };


  }
);