# ArcTrade Finance

## Decentralized Invoice Financing Platform on Arc

ArcTrade Finance is a decentralized invoice financing platform built on the Arc blockchain.

The platform enables buyers to create invoices, lock Test USDC into smart-contract escrows, and securely release payments to sellers through transparent on-chain transactions.

ArcTrade Finance demonstrates how programmable stablecoin payments can simplify trade finance by replacing manual settlement with automated smart contracts.

---

# Live Demo

https://arctrade---finance.pages.dev/

---

# GitHub Repository

https://github.com/shayansiss/ArcTradeFinance

---

# Project Overview

Traditional invoice financing often relies on centralized intermediaries, manual verification, and slow settlement processes.

ArcTrade Finance automates the entire workflow by combining:

- Invoice creation
- Smart contract escrow
- Stablecoin settlement
- On-chain payment verification

The platform demonstrates a complete invoice financing workflow powered by Arc.

---

# Features

- MetaMask wallet connection
- Test USDC balance management
- Invoice creation
- Seller address verification
- Smart contract escrow creation
- Secure payment locking
- Seller payment release
- Invoice history
- Escrow history
- Automated payment workflow

---

# Working MVP

The MVP demonstrates the complete on-chain workflow:

1. Connect Wallet
2. Mint Test USDC
3. View wallet balance
4. Enter seller wallet
5. Create invoice
6. Create escrow
7. Lock payment inside escrow
8. Release payment
9. Verify seller balance
10. Review invoice and escrow history

---

# Architecture

```text
                     User Wallet
                         │
                 MetaMask / EVM Wallet
                         │
                         │
            React + TypeScript Frontend
                         │
                         │
                    ethers.js
                         │
                         │
                 ┌─────────────────┐
                 │  Arc Blockchain │
                 └─────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼

 Invoice Registry    Escrow Contract    Test USDC
  Smart Contract     Smart Contract       Token

        │                │
        ▼                ▼

 Create Invoice     Lock Payment

        │                │
        └────────┬───────┘
                 ▼

          Release Payment

                 ▼

            Seller Wallet
```

---

# Smart Contracts

## InvoiceRegistry

Responsible for:

- Invoice creation
- Invoice storage
- Invoice ownership
- Invoice status tracking

---

## InvoiceEscrow

Responsible for:

- Locking Test USDC
- Escrow creation
- Secure payment management
- Payment release
- Transaction verification

---

## Test USDC

A test implementation of USDC used to demonstrate the complete stablecoin payment workflow during development and testing.

---

# Technology Stack

## Blockchain

- Arc Blockchain (EVM)

## Smart Contracts

- Solidity
- Hardhat
- OpenZeppelin

## Frontend

- React
- TypeScript
- Vite
- ethers.js

## Wallet

- MetaMask

## Stablecoin

- Test USDC

---

# Security

ArcTrade Finance uses smart-contract-based escrow to guarantee transparent payment execution.

Security features include:

- Non-custodial escrow
- On-chain payment verification
- Transparent transaction history
- Trustless payment release
- Immutable invoice records

---

# Running Locally

## Install dependencies

```bash
npm install
```

## Start local blockchain

```bash
npx hardhat node
```

## Deploy smart contracts

```bash
npx hardhat ignition deploy ignition/modules/ArcTradeFinance.ts --network localhost
```

## Start frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Local Contract Addresses

## InvoiceRegistry

```
0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## Test USDC

```
0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

## InvoiceEscrow

```
0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```

---

# Demo Flow

1. Connect MetaMask
2. Mint Test USDC
3. Verify wallet balance
4. Enter seller address
5. Create invoice
6. Create escrow
7. Lock payment
8. Release payment
9. Verify seller balance
10. Review invoice and escrow history

---

# Hackathon Submission

## Challenge

**The Stablecoins Commerce Stack Challenge**

Powered by:

- Arc
- Circle

---

## Track

**SME Trade Finance & Stablecoin Payment Infrastructure**

---

# Product Feedback

## Why Arc

Arc provides a familiar EVM environment that allows developers to build production-ready financial applications quickly.

## Why Stablecoins

Stablecoins enable transparent, programmable, and near-instant settlement while reducing payment friction.

## What Worked Well

- Excellent EVM compatibility
- Simple deployment workflow
- Smooth smart contract development
- Reliable stablecoin payment architecture

## Recommendations

Future developer experience could be improved by:

- More Arc-specific documentation
- Additional real-world business examples
- More stablecoin integration tutorials
- Production-ready escrow reference implementations

---

# Future Roadmap

- Native USDC integration
- Multi-invoice financing
- Business identity verification
- Invoice NFT receipts
- Institutional liquidity pools
- Multi-signature escrow approval
- Cross-border stablecoin settlement

---

# License

MIT License
