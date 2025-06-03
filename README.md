# ERC-20 Token Sale DApp UI

This is a decentralized application (DApp) frontend built with **React** and **Ethers.js** that interacts with an ERC-20 Token and a Token Sale smart contract deployed on the Ethereum blockchain.

## 🚀 Features

- 🔍 Display token information (name, symbol, total supply, decimals)
- 💸 Buy tokens using ETH
- 🧾 View all token purchase transactions with:
  - Buyer address
  - ETH paid
  - Tokens received
  - Transaction hash
  - Purchase date and time
- 📦 Live blockchain interaction using Ethers.js
- 🦊 Metamask wallet integration

## 📁 Project Structure

src/
├── components/
│ ├── BuyToken.tsx
│ ├── Transactions.tsx
├── context/
│ └── WalletContext.tsx
├── hooks/
│ ├── useContract.ts
│ ├── useTokenPurchasedEvent.ts
├── types/
│ └── ...
├── App.tsx
├── main.tsx
└── RouteApp.tsk 

## ⚙️ Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/erc20-dapp-ui.git
cd erc20-dapp-ui

Yarn install 

yarn dev run




