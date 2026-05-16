# Capital Flow - Loan Management System

A full-stack Loan Management System built using MERN Stack, Next.js, TypeScript, MongoDB, JWT Authentication, and Role-Based Access Control (RBAC).

This platform simulates the complete lifecycle of a loan application from borrower onboarding to loan closure through multiple operational stages.

---

# Project Overview

Capital Flow is a lending platform where:

- Borrowers can apply for loans
- Internal teams manage loans through different stages
- Role-based dashboards restrict access to authorized modules
- Payments are tracked until the loan is fully closed

---

# Tech Stack

## Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios
- React Hot Toast

## Backend
- Node.js
- Express.js
- TypeScript
- JWT Authentication
- bcryptjs
- Multer

## Database
- MongoDB
- Mongoose

---

# Main Features

# Borrower Portal

- User Registration & Login
- JWT Authentication
- BRE (Business Rule Engine) Validation
- Salary Slip Upload
- Loan Application
- Live Loan Calculation
- Loan Status Tracking

# Operations Dashboard

## Sales Module
- Tracks registered users
- Lead management before application stage

## Sanction Module
- Reviews loan applications
- Approves or rejects applications

## Disbursement Module
- Handles sanctioned loans
- Marks loans as disbursed

## Collection Module
- Records borrower repayments
- Tracks outstanding balance
- Auto closes loan after full repayment

---

# Role-Based Access Control (RBAC)

The system supports the following roles:

- ADMIN
- SANCTION
- DISBURSEMENT
- COLLECTION
- BORROWER

Access is enforced on:
- Frontend routes
- Backend APIs

---

# Borrower Flow

## Step 1 - Authentication
- User Signup
- User Login
- JWT Token Generation
- Protected Routes

---

## Step 2 - BRE Validation

The borrower fills:
- Full Name
- PAN Number
- DOB
- Monthly Salary
- Employment Mode

The application is rejected if:

| Rule | Condition |
|---|---|
| Age | Not between 23 and 50 |
| Salary | Below ₹25,000 |
| PAN | Invalid PAN format |
| Employment | UNEMPLOYED |

---

## Step 3 - Salary Slip Upload

Supported Files:
- JPG
- PNG
- PDF

Validation:
- Maximum 5 MB

---

## Step 4 - Loan Configuration

Borrower selects:
- Loan Amount
- Tenure

Interest Rate:
- Fixed at 12% p.a.

Simple Interest Formula:

```text
SI = (P × R × T) / (365 × 100)
```

Where:
- P = Principal
- R = Interest Rate
- T = Tenure (days)

Total Repayment:

```text
Total = Principal + Interest
```

---

# Loan Lifecycle

```text
APPLIED
   ↓
SANCTIONED
   ↓
DISBURSED
   ↓
CLOSED
```

---

# Operational Flow

## Sanction Team
- Reviews loan application
- Approves or rejects loan

---

## Disbursement Team
- Releases funds
- Changes loan status to DISBURSED

---

## Collection Team
- Records payments
- Stores:
  - UTR Number
  - Payment Amount
  - Payment Date

Rules:
- UTR must be unique
- Payment cannot exceed outstanding amount

When outstanding amount becomes ₹0:
- Loan automatically changes to CLOSED

---

# Folder Structure

```bash
Capital-Flow-LMS/
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── seed/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── uploads/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   │
│   ├── app/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── register/
│   │   └── borrower/
│   │
│   ├── components/
│   ├── services/
│   ├── utils/
│   ├── middleware.ts
│   ├── package.json
│   └── tailwind.config.ts
│
├── README.md
└── .env.example
```

---

# API Modules

## Authentication
- Register
- Login

## Applications
- Create Application
- BRE Validation

## Uploads
- Salary Slip Upload

## Loans
- Apply Loan
- Approve Loan
- Disburse Loan
- Fetch Loans

## Payments
- Record Payment
- Auto Close Loan

---

# Database Collections

- users
- applications
- loans
- payments

---

# Setup Instructions

# 1. Clone Repository

```bash
git clone <repository-link>
```

---

# 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend server:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 3. Frontend Setup

```bash
cd frontend
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# Seeded Test Credentials

## Admin

```text
Email: admin@capitalflow.com
Password: Admin@123
```

## Sanction Executive

```text
Email: sanction@capitalflow.com
Password: Sanction@123
```

## Disbursement Executive

```text
Email: disbursement@capitalflow.com
Password: Disbursement@123
```

## Collection Executive

```text
Email: collection@capitalflow.com
Password: Collection@123
```

## Borrower

```text
Email: borrower@capitalflow.com
Password: Borrower@123
```

---

# Complete Testing Flow

## Borrower Side
1. Register/Login
2. Fill personal details
3. BRE validation passes
4. Upload salary slip
5. Configure loan
6. Apply loan

---

## Sanction Side
1. Login as SANCTION role
2. Review applied loans
3. Approve or reject application

---

## Disbursement Side
1. Login as DISBURSEMENT role
2. View sanctioned loans
3. Mark loan as disbursed

---

## Collection Side
1. Login as COLLECTION role
2. Record payments
3. Track outstanding balance
4. Loan auto closes after repayment completion

---

# Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected APIs
- RBAC Middleware
- Route Protection
- File Upload Validation

---

# Future Improvements

- EMI Schedule Generation
- Email Notifications
- Razorpay Integration
- Dashboard Analytics
- Credit Score Integration
- AWS S3 File Uploads

---

# Demo Video

Include:
- BRE failure case
- BRE success case
- Salary slip upload
- Loan approval flow
- Disbursement flow
- Collection flow
- Auto loan closure

---

# Author

Parv Agarwal

GitHub:
https://github.com/helloag-p

LinkedIn:
https://linkedin.com/in/parv-agarwal-09b042215