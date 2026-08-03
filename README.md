# ArcTrade Finance

## Decentralized Invoice Financing Platform on Arc

ArcTrade Finance is a stablecoin-based invoice financing platform built on Arc.

The platform enables Small and Medium Enterprises (SMEs) to create invoices, lock USDC in escrow, and securely release payments to sellers using programmable smart contracts.

The goal is to simplify trade finance workflows by providing transparent settlement, automated escrow management, and verifiable payment history.

---

## Features

- MetaMask wallet connection
- Create invoice workflow
- USDC-based settlement
- Smart contract escrow system
- Secure seller payment release
- Invoice history tracking
- Escrow transaction history
- Automated payment workflow

---

## Architecture

```
                 User Wallet
                     |
                  MetaMask
                     |
                     |
            React + TypeScript Frontend
                     |
                     |
             Solidity Smart Contracts
                     |
        --------------------------------
        |              |               |
 InvoiceRegistry    MockUSDC     InvoiceEscrow
        |                              |
        |                              |
        ----------- USDC Escrow --------
                       |
                Seller Wallet
```

---

## Smart Contracts

### InvoiceRegistry

Handles:
- Invoice creation
- Invoice records
- Invoice tracking

### InvoiceEscrow

Handles:
- USDC locking
- Escrow management
- Seller payment release

### MockUSDC

A test stablecoin used for demonstrating the USDC payment workflow.

---

## Technology Stack

- Arc Blockchain
- Solidity
- Hardhat
- React
- TypeScript
- Ethers.js
- MetaMask
- USDC Stablecoin Workflow

---

## Running Locally

### Install dependencies

```bash
npm install
```

### Start local blockchain

```bash
npx hardhat node
```

### Deploy smart contracts

```bash
npx hardhat ignition deploy ignition/modules/ArcTradeFinance.ts --network localhost
```

### Start frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Local Contract Addresses

### InvoiceRegistry

```
0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### MockUSDC

```
0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

### InvoiceEscrow

```
0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```

---

## Hackathon Submission

Track:

**Best SME Trade Finance & Working Capital Workflow**

Challenge:

**The Stablecoins Commerce Stack Challenge by Arc (Circle)**

---

## Circle Product Feedback

### Why we chose USDC

USDC provides a reliable dollar-denominated settlement layer for SME trade finance workflows.

### What worked well

USDC enables transparent, programmable, and automated payment flows through smart contracts.

### What could be improved

More beginner-friendly Arc examples and clearer developer onboarding documentation would help developers build faster.

### Recommendations

More reference implementations combining USDC, escrow, and real-world business workflows would improve developer experience.

---

## Demo Flow

1. Connect wallet
2. View USDC balance
3. Enter seller address
4. Create invoice
5. Lock payment in escrow
6. Release payment to seller
7. View transaction history