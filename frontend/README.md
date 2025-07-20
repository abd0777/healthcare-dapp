node version required >=20.19.1

---

# 🏥 HealthLedger

**HealthLedger** is a blockchain-powered, decentralized healthcare ecosystem that connects **patients**, **doctors**, **pharmacies**, and **insurance providers** to ensure secure, interoperable, and transparent management of medical records, consultations, prescriptions, and payments.

> 🚀 Empowering healthcare with **blockchain**, **data ownership**, and **interoperability**.

---

## 🔗 Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [User Roles & Flows](#user-roles--flows)

  * [Patient Flow](#patient-flow)
  * [Doctor Flow](#doctor-flow)
  * [Pharmacy Flow](#pharmacy-flow)
  * [Insurance Provider Flow](#insurance-provider-flow)
* [Getting Started](#getting-started)
* [Metamask Wallet Integration](#metamask-wallet-integration)
* [Folder Structure](#folder-structure)
* [License](#license)

---

## ✨ Features

* 🔐 **Decentralized Authentication** using MetaMask wallet (Web3 login)
* 📁 **Encrypted Medical Records Storage** on IPFS
* ✅ **Fine-grained Access Control** (patients own and control their data)
* 📆 **Appointment Booking** with doctors
* 💊 **Digital Prescriptions & History Tracking**
* 🏪 **Pharmacy Access** to verify and dispense prescriptions
* 💳 **Blockchain-based Payments** (to doctor/pharmacy)
* 🏦 **Insurance Claim Verification** and status tracking
* 📲 **Personalized Dashboards** for all user roles

---

## 🧱 Tech Stack

| Layer             | Tech Used                                 |
| ----------------- | ----------------------------------------- |
| **Frontend**      | React.js, Tailwind CSS, Ethers.js         |
| **Backend**       | Node.js, Express.js                       |
| **Blockchain**    | Solidity (Smart Contracts), Ethereum      |
| **Storage**       | IPFS (for medical records, prescriptions) |
| **Database**      | MongoDB (non-sensitive metadata only)     |
| **Auth**          | MetaMask (Web3 wallet)                    |
| **Notifications** | Firebase Cloud Messaging                  |

---

## 🧠 Architecture

```
+-------------+      +------------+       +-------------+
|  Frontend   | ---> |  Backend   | --->  |   MongoDB   |
| (React.js)  |      | (Node.js)  |       |   (Meta)    |
+-------------+      +------------+       +-------------+
      |                     |
      v                     v
+-------------+     +----------------+
|  MetaMask   |<--> | Ethereum Smart |
| (Wallet)    |     |   Contracts    |
+-------------+     +----------------+
      |
      v
+------------------+
|    IPFS Storage  |
| (Encrypted Files)|
+------------------+
```

---

## 👤 User Roles & Flows

### 👨‍⚕️ Patient Flow

1. **Register** via MetaMask – provide name, age, gender, phone, email.
2. **Login** – Web3 wallet connect.
3. **Dashboard**:

   * 📁 *My Health Records*: View/share files stored on IPFS.
   * 📆 *Book Appointment*: Select doctor, time, and reason.
   * 📤 *Upload Records*: Encrypted upload to IPFS.
   * 📜 *Consultation History*: View past visits & prescriptions.
   * 💳 *Payments*: Pay doctor/pharmacy using crypto.

**Interacts With**:

* Doctors (for consultation, prescriptions)
* Pharmacy (for medicine dispensing)
* Insurer (for claim verification)

---

### 🩺 Doctor Flow

1. **Register/Login** with wallet – verify credentials.
2. **Dashboard**:

   * 📅 View Appointments
   * 👨‍⚕️ Access Patient Records (only if permission is granted)
   * 📝 Upload Prescription (signed and stored on IPFS)
   * 🧾 Add to Consultation History

**Interacts With**:

* Patients (for consultation)
* Pharmacy (prescription verification)
* Insurer (claim justification)

---

### 🧪 Pharmacy Flow

1. **Login** via MetaMask
2. **Dashboard**:

   * 🔍 Access prescriptions issued to patients
   * ✅ Verify authenticity via blockchain
   * 💳 Receive payment from patient

---

### 🏦 Insurance Provider Flow

1. **Login** via wallet
2. **Dashboard**:

   * 📜 View patient consultation/prescription logs
   * ✅ Verify claim eligibility
   * 📤 Upload approval/rejection

---

## 🚀 Getting Started

1. **Clone Repo**

   ```bash
   git clone https://github.com/your-username/HealthLedger.git
   cd HealthLedger
   ```

2. **Install Frontend & Backend Dependencies**

   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. **Run the App**

   ```bash
   # In one terminal
   cd server
   npm run dev

   # In another terminal
   cd client
   npm run dev
   ```

---

## 🦊 Metamask Wallet Integration

* Install [MetaMask](https://metamask.io/)

* Use Ethers.js to request wallet access:

  ```js
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  ```

* Every login/signup and transaction is verified on-chain.

---

## 📁 Folder Structure

```
/HealthLedger
│
├── client/                  # React Frontend
│   ├── components/
│   ├── pages/
│   └── utils/
│
├── server/                  # Node.js Backend
│   ├── routes/
│   ├── controllers/
│   └── models/
│
├── contracts/               # Solidity Smart Contracts
│
└── README.md
```

---

## 🛡️ License

This project is licensed under the MIT License.
© 2025 \[Your Name or Organization].

---

