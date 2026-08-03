// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract InvoiceRegistry {


    address public escrowContract;


    struct Invoice {

        uint256 id;

        address owner;

        uint256 amount;

        uint256 createdAt;

        bool paid;

    }



    uint256 public invoiceCount;


    mapping(uint256 => Invoice) public invoices;



    modifier onlyEscrow(){

        require(
            msg.sender == escrowContract,
            "Only escrow allowed"
        );

        _;

    }



    function setEscrowContract(
        address _escrow
    ) external {

        require(
            escrowContract == address(0),
            "Already set"
        );

        escrowContract = _escrow;

    }




    function createInvoice(
        uint256 _amount
    ) external {


        invoiceCount++;


        invoices[invoiceCount] =
        Invoice(

            invoiceCount,

            msg.sender,

            _amount,

            block.timestamp,

            false

        );


    }





    function markPaid(
        uint256 _id
    )
    external
    onlyEscrow
    {


        invoices[_id].paid = true;


    }


}