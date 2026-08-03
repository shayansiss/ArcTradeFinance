// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


interface IInvoiceRegistry {

    function markPaid(uint256 _id) external;

}



contract InvoiceEscrow {


    IERC20 public usdc;

    IInvoiceRegistry public invoiceRegistry;



    struct Escrow {

        uint256 invoiceId;

        address buyer;

        address seller;

        uint256 amount;

        bool released;

    }



    uint256 public escrowCount;


    mapping(uint256 => Escrow) public escrows;



    event EscrowCreated(

        uint256 indexed escrowId,

        uint256 indexed invoiceId,

        address buyer,

        address seller,

        uint256 amount

    );



    event EscrowReleased(

        uint256 indexed escrowId,

        uint256 indexed invoiceId,

        address seller,

        uint256 amount

    );





    constructor(

        address _usdc,

        address _registry

    ){

        usdc = IERC20(_usdc);

        invoiceRegistry =
            IInvoiceRegistry(_registry);

    }






    function createEscrow(

        uint256 _invoiceId,

        address _seller,

        uint256 _amount

    ) external {


        require(
            _amount > 0,
            "Invalid amount"
        );



        require(

            usdc.transferFrom(
                msg.sender,
                address(this),
                _amount
            ),

            "Transfer failed"

        );



        escrowCount++;



        escrows[escrowCount] =
        Escrow(

            _invoiceId,

            msg.sender,

            _seller,

            _amount,

            false

        );



        emit EscrowCreated(

            escrowCount,

            _invoiceId,

            msg.sender,

            _seller,

            _amount

        );


    }






    function releaseEscrow(

        uint256 _id

    ) external {


        Escrow storage escrow =
            escrows[_id];



        require(
            !escrow.released,
            "Already released"
        );



        require(
            msg.sender == escrow.buyer,
            "Only buyer"
        );



        escrow.released = true;



        require(

            usdc.transfer(
                escrow.seller,
                escrow.amount
            ),

            "Transfer failed"

        );



        invoiceRegistry.markPaid(
            escrow.invoiceId
        );



        emit EscrowReleased(

            _id,

            escrow.invoiceId,

            escrow.seller,

            escrow.amount

        );


    }


}