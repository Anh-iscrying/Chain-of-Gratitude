# 🌸 Chain of Gratitude (On-Chain Journal)

**Final Project Submission**

This is a **Decentralized Gratitude Journal** application running on the IOTA Testnet. The application allows users to preserve positive moments and expressions of gratitude immutably on the Blockchain.

## 📖 Introduction
Instead of a standard, dry To-Do List, **Chain of Gratitude** transforms basic CRUD operations (Create, Read, Update, Delete) on the Blockchain into an emotional experience:
- Sending out positive energy.
- "Cherishing" beautiful moments in the heart (and on the chain).
<img width="1898" height="907" alt="Screenshot 2025-12-07 114954" src="https://github.com/user-attachments/assets/a0eb2e77-e3e6-4d42-8cfc-340b7368ddcc" />

## 🌟 Features
- **Sending Gratitude (Create):** Create an Object containing the gratitude message and store it directly on-chain.
- **Stream of Memories (Read):** Automatically fetch and display the user's gratitude list from the wallet.
- **Cherish (Update State):** Change the status from "New" to "Cherished" (updates the `is_done` field on the contract).
- **Let Go (Delete):** Permanently remove items that no longer resonate from the stream of memories.
- **Interface:** Warm design (Rose/Pink theme), supporting smooth interaction with Radix UI & Tailwind CSS.

## 💡 Technical Note on Structure
The project is built upon the technical core of a **To-Do List (CRUD Application)**:
- Repo Name: `Chain-of-Gratitude`
- Smart Contract Module: `todo_list::todo_list`
- Struct: `Task`

However, the Frontend has been completely re-skinned to serve the "Chain of Gratitude" use case. This demonstrates the flexibility of Move Objects: the same data structure can serve multiple different purposes.

## 🔧 Technical Information
- **Network:** IOTA Testnet
- **Smart Contract Language:** Move
- **Frontend:** Next.js, TypeScript, IOTA dApp Kit, Radix UI
- **Package ID:** `0x572fe621c85d764c1564837f5deb8273dfe5631e8184ef4a08f49e83cecc67d5`
- **Contract Address:** https://explorer.iota.org/object/0x572fe621c85d764c1564837f5deb8273dfe5631e8184ef4a08f49e83cecc67d5?network=devnet

## 🚀 Installation & Setup

### 1. Requirements
- Node.js (v18 or later)
- Pnpm
- IOTA Wallet (Browser Extension)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Anh-iscrying/Chain-of-Gratitude.git
cd to-do-list

# Install dependencies
pnpm install
```

### 3. Run Front-end
```bash
pnpm dev
```
Open your browser at: http://localhost:3000

