// Contract details
const contractAddress = "0xAa472e8EFcb448C52DE30Fb5Aee9aA476B974091";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "bookTicket",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "seatNumber",
        "type": "uint256"
      }
    ],
    "name": "cancelBooking",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_totalSeats",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "passenger",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "seatNumber",
        "type": "uint256"
      }
    ],
    "name": "TicketBooked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "passenger",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "seatNumber",
        "type": "uint256"
      }
    ],
    "name": "TicketCancelled",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "withdrawFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bookedSeats",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAvailableSeats",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyTickets",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ticketPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tickets",
    "outputs": [
      {
        "internalType": "address",
        "name": "passenger",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "seatNumber",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSeats",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "userBookings",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Global variables
let web3;
let contract;
let accounts = [];
let isConnected = false;

// Page navigation
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');

  // Load data when profile page is shown
  if (pageId === 'profile' && isConnected) {
    loadProfileData();
  }
}

// Initialize the app
window.addEventListener('load', async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);

    try {
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      isConnected = true;
      updateWalletStatus();

      contract = new web3.eth.Contract(contractABI, contractAddress);

      loadTrains();
      setupEventListeners();

      window.ethereum.on('accountsChanged', (newAccounts) => {
        accounts = newAccounts;
        updateWalletStatus();
        if (isConnected) {
          loadProfileData();
        }
      });
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    alert("Please install MetaMask to use this application!");
  }
});

// Set up event listeners
function setupEventListeners() {
  document.getElementById('connectWallet').addEventListener('click', connectWallet);
  document.getElementById('ticketForm').addEventListener('submit', bookTicket);
  document.getElementById('simulateAttackBtn').addEventListener('click', simulate51PercentAttack);
}

// Connect wallet function
async function connectWallet() {
  if (!isConnected) {
    try {
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      isConnected = true;
      updateWalletStatus();
      contract = new web3.eth.Contract(contractABI, contractAddress);
      loadTrains();
    } catch (error) {
      console.error("User denied account access");
    }
  }
}

// Update wallet connection status
function updateWalletStatus() {
  const walletInfo = document.getElementById('walletInfo');
  const connectBtn = document.getElementById('connectWallet');

  if (isConnected) {
    walletInfo.innerHTML = `Connected: <span class="connected">${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}</span>`;
    connectBtn.textContent = 'Connected';
    connectBtn.disabled = true;
    connectBtn.style.backgroundColor = '#27ae60';
  } else {
    walletInfo.textContent = 'Wallet not connected';
    connectBtn.textContent = 'Connect Wallet';
    connectBtn.disabled = false;
    connectBtn.style.backgroundColor = '#3498db';
  }
}

// Load available trains
async function loadTrains() {
  const trainsList = document.getElementById('trainsList');
  trainsList.innerHTML = '';

  const trains = [
    {
      id: 1,
      name: "Express 101",
      departure: "New York",
      destination: "Chicago",
      departureTime: "08:00 AM",
      arrivalTime: "04:30 PM",
      duration: "8h 30m",
      seats: 150,
      price: "0.01 ETH"
    },
    {
      id: 2,
      name: "Coastal 202",
      departure: "Los Angeles",
      destination: "San Francisco",
      departureTime: "09:15 AM",
      arrivalTime: "02:45 PM",
      duration: "5h 30m",
      seats: 120,
      price: "0.008 ETH"
    },
    {
      id: 3,
      name: "Northeast 303",
      departure: "Boston",
      destination: "Washington",
      departureTime: "07:30 AM",
      arrivalTime: "01:15 PM",
      duration: "5h 45m",
      seats: 180,
      price: "0.007 ETH"
    }
  ];

  trains.forEach(train => {
    const trainCard = document.createElement('div');
    trainCard.className = 'train-card';
    trainCard.innerHTML = `
      <h3>${train.name}</h3>
      <p><strong>Route:</strong> ${train.departure} to ${train.destination}</p>
      <p><strong>Departure:</strong> ${train.departureTime}</p>
      <p><strong>Arrival:</strong> ${train.arrivalTime}</p>
      <p><strong>Duration:</strong> ${train.duration}</p>
      <p class="seats"><strong>Available Seats:</strong> ${train.seats}</p>
      <p><strong>Price:</strong> ${train.price}</p>
      <a href="#" class="btn" onclick="showPage('booking'); setTrainSelection(${train.id})">Book Now</a>
    `;
    trainsList.appendChild(trainCard);
  });
}

// Set train selection in booking form
function setTrainSelection(trainId) {
  const trainSelect = document.getElementById('trainSelect');
  if (trainId === 1) {
    trainSelect.value = "Express 101";
  } else if (trainId === 2) {
    trainSelect.value = "Coastal 202";
  } else if (trainId === 3) {
    trainSelect.value = "Northeast 303";
  }
}

// Book ticket function
async function bookTicket(e) {
  e.preventDefault();

  if (!isConnected) {
    alert("Please connect your wallet first!");
    return;
  }

  const name = document.getElementById('passengerName').value;
  const age = document.getElementById('passengerAge').value;
  const departure = document.getElementById('departure').value;
  const destination = document.getElementById('destination').value;
  const train = document.getElementById('trainSelect').value;
  const travelDate = document.getElementById('travelDate').value;
  const travelClass = document.getElementById('travelClass').value;

  try {
    await contract.methods.bookTicket(name).send({
      from: accounts[0],
      value: web3.utils.toWei("0.01", "ether")
    });

    alert(`Ticket booked successfully!\n\nDetails:\nName: ${name}\nAge: ${age}\nRoute: ${departure} to ${destination}\nTrain: ${train}\nDate: ${travelDate}\nClass: ${travelClass}`);

    document.getElementById('ticketForm').reset();
    loadProfileData();
    showPage('profile');
  } catch (error) {
    console.error("Booking failed:", error);
    alert("Booking failed: " + error.message);
  }
}

// Load profile data
async function loadProfileData() {
  if (!isConnected) return;

  document.getElementById('walletAddress').textContent =
    `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;

  try {
    const [names, seatNumbers] = await contract.methods.getMyTickets().call({ from: accounts[0] });

    document.getElementById('totalBookings').textContent = names.length;

    const ticketsList = document.getElementById('userTickets');
    ticketsList.innerHTML = '';

    if (names.length === 0) {
      ticketsList.innerHTML = '<li class="ticket-item"><p>No tickets booked yet</p></li>';
      return;
    }

    names.forEach((name, index) => {
      const seatNumber = seatNumbers[index];
      const ticketItem = document.createElement('li');
      ticketItem.className = 'ticket-item';
      ticketItem.innerHTML = `
        <h4>Ticket #${index + 1}</h4>
        <p><strong>Passenger:</strong> ${name}</p>
        <p><strong>Seat Number:</strong> ${seatNumber}</p>
        <p><strong>Status:</strong> Confirmed</p>
      `;
      ticketsList.appendChild(ticketItem);
    });
  } catch (error) {
    console.error("Error loading profile data:", error);
  }
}

// Function to simulate 51% attack
async function simulate51PercentAttack() {
  if (!isConnected) {
    alert("Please connect your wallet first!");
    return;
  }

  try {
    const owner = await contract.methods.owner().call();

    if (owner.toLowerCase() !== accounts[0].toLowerCase()) {
      alert("Only the contract owner can simulate this attack!");
      return;
    }

    await contract.methods.withdrawFunds().send({ from: accounts[0] });

    alert("51% attack simulated! All funds have been withdrawn from the contract.");
  } catch (error) {
    console.error("Attack simulation failed:", error);
    alert("Attack simulation failed: " + error.message);
  }
}
