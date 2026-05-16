# Loan Management System

A full-stack Loan Management System built using MERN Stack, Next.js, TypeScript, MongoDB, JWT Authentication, and Role-Based Access Control.

---

# Tech Stack

## Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Backend
- Node.js
- Express.js
- TypeScript

## Database
- MongoDB
- Mongoose

## Authentication
- JWT
- bcrypt

---

# Features

## Borrower Portal
- User Signup/Login
- BRE Validation
- Salary Slip Upload
- Loan Application
- Loan Tracking

## Operations Dashboard
- Sales Module
- Sanction Module
- Disbursement Module
- Collection Module

## RBAC
- Admin
- Sales
- Sanction
- Disbursement
- Collection
- Borrower

## Loan Lifecycle
APPLIED → SANCTIONED → DISBURSED → CLOSED

---

# BRE Rules

Loan application is rejected if:

- Age is not between 23 and 50
- Salary is below ₹25,000
- Invalid PAN format
- Employment mode is UNEMPLOYED

---

# Loan Calculation

Simple Interest Formula:

SI = (P × R × T) / (365 × 100)

Where:
- P = Principal
- R = Interest Rate
- T = Tenure in days

Interest Rate = 12% p.a.

---

# Folder Structure

```bash
frontend/
backend/
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone <repo-link>
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
```

Run backend

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Run frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Test Credentials

## Admin
Email: admin@gmail.com
Password: admin123

## Sales
Email: sales@gmail.com
Password: sales123

## Sanction
Email: sanction@gmail.com
Password: sanction123

## Disbursement
Email: disbursement@gmail.com
Password: disbursement123

## Collection
Email: collection@gmail.com
Password: collection123

## Borrower
Email: borrower@gmail.com
Password: borrower123

---

# Complete Flow

1. Borrower registers/logins
2. BRE validation runs
3. Borrower uploads salary slip
4. Borrower applies for loan
5. Sanction team approves/rejects
6. Disbursement team disburses loan
7. Collection team records payments
8. Loan auto closes after full repayment

---

# API Modules

- Authentication
- Applications
- Loan Management
- Salary Slip Upload
- Payments

---

# Author

Parv Agarwal