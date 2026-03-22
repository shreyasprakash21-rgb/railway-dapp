# 🚆 RailConnect — Blockchain-Based Railway Ticket Booking

A decentralized railway ticket booking system built with **HTML, CSS, JavaScript**, and **Web3.js**, integrated with a Solidity smart contract deployed on the Ethereum blockchain.

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Smart Contract](#smart-contract)
- [Getting Started](#getting-started)
- [How to Use](#how-to-use)
- [51% Attack Simulation](#51-attack-simulation)
- [Screenshots](#screenshots)
- [License](#license)

---

## 📖 About the Project

RailConnect is a **decentralized train ticket booking dApp** (decentralized application) that allows passengers to browse available trains, book tickets by paying ETH, and view their bookings — all stored transparently on the Ethereum blockchain via a smart contract.

This project was built to demonstrate how blockchain technology can be applied to real-world ticketing systems to ensure transparency, immutability, and trustless payments.

---

## ✨ Features

- 🔗 **MetaMask Wallet Integration** — Connect your Ethereum wallet seamlessly
- 🚂 **Browse Available Trains** — View trains, routes, timings, and pricing
- 🎟️ **Book Tickets On-Chain** — Tickets are recorded on the Ethereum blockchain
- 👤 **User Profile & Booking History** — View all your booked tickets and seat numbers
- ⚔️ **51% Attack Simulation** — Owner-only feature to demonstrate a blockchain attack scenario for educational purposes

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Blockchain | Solidity (Smart Contract) |
| Web3 Library | Web3.js v1.5.2 |
| Wallet | MetaMask |
| Network | Ethereum (Testnet / Mainnet) |

---

## 📁 Project Structure

```
railconnect/
│
├── index.html       # Main HTML structure and all pages (SPA)
├── styles.css       # All styling and responsive layout
├── scripts.js       # Web3 logic, contract interaction, UI logic
└── README.md        # Project documentation
```

---

## 📄 Smart Contract

**Contract Address:** `0xAa472e8EFcb448C52DE30Fb5Aee9aA476B974091`

### Key Functions

| Function | Type | Description |
|---|---|---|
| `bookTicket(name)` | `payable` | Books a ticket for the passenger |
| `cancelBooking(seatNumber)` | `nonpayable` | Cancels an existing booking |
| `getMyTickets()` | `view` | Returns all tickets for the caller |
| `getAvailableSeats()` | `view` | Returns the number of available seats |
| `withdrawFunds()` | `nonpayable` | Owner-only: withdraws all contract funds |

### Key Events

| Event | Description |
|---|---|
| `TicketBooked` | Emitted when a ticket is successfully booked |
| `TicketCancelled` | Emitted when a ticket is cancelled |

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Brave)
- [MetaMask](https://metamask.io/) browser extension installed
- Some ETH in your wallet (testnet ETH for testing)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/railconnect.git
   cd railconnect
   ```

2. **Open the app**

   Simply open `index.html` in your browser:

   ```bash
   open index.html
   ```

   Or use a local server for best results:

   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```

3. **Connect MetaMask**

   - Make sure MetaMask is installed and set to the correct network
   - Click **"Connect Wallet"** on the booking page
   - Approve the connection in MetaMask

---

## 🧭 How to Use

1. **Home Page** — Browse all available trains with routes, timings, and seat availability
2. **Book Ticket** — Fill in your details, select a train and travel date, then click **"Book Ticket"**
3. **Confirm Payment** — MetaMask will prompt you to confirm the ETH transaction (0.01 ETH per ticket)
4. **My Profile** — View your wallet address and all your booked tickets with seat numbers

---

## ⚠️ 51% Attack Simulation

This project includes an **educational feature** to simulate a 51% attack scenario:

- Only the **contract owner** can trigger this simulation
- It calls `withdrawFunds()` to drain all ETH from the contract, simulating what a malicious majority actor could do
- This is strictly for **educational and demonstration purposes**

> ⚠️ **Warning:** This feature is destructive in production. Use only on testnets or development environments.

---

## 📸 Screenshots

> Add your screenshots here after deployment.

| Home Page | Booking Page | Profile Page |
|---|---|---|
| *(screenshot)* | *(screenshot)* | *(screenshot)* |

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute it.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---
for any queries contact shreyasprakash21@gmail.com


