import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
import bcrypt from "bcryptjs"

import User from "../models/User"

const seedUsers = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI as string
    )

    await User.deleteMany()

    const adminPassword =
      await bcrypt.hash(
        "Admin@123",
        10
      )

    const sanctionPassword =
      await bcrypt.hash(
        "Sanction@123",
        10
      )

    const disbursementPassword =
      await bcrypt.hash(
        "Disbursement@123",
        10
      )

    const collectionPassword =
      await bcrypt.hash(
        "Collection@123",
        10
      )

    const borrowerPassword =
      await bcrypt.hash(
        "Borrower@123",
        10
      )

    const users = [

      {
        name: "Admin",
        email: "admin@capitalflow.com",
        password: adminPassword,
        role: "ADMIN"
      },

      {
        name: "Sanction Executive",
        email: "sanction@capitalflow.com",
        password: sanctionPassword,
        role: "SANCTION"
      },

      {
        name: "Disbursement Executive",
        email: "disbursement@capitalflow.com",
        password: disbursementPassword,
        role: "DISBURSEMENT"
      },

      {
        name: "Collection Executive",
        email: "collection@capitalflow.com",
        password: collectionPassword,
        role: "COLLECTION"
      },

      {
        name: "Borrower",
        email: "borrower@capitalflow.com",
        password: borrowerPassword,
        role: "BORROWER"
      }
    ]

    await User.insertMany(users)

    console.log(
      "Capital Flow users seeded successfully"
    )

    process.exit()

  } catch (error) {

    console.log(error)

    process.exit(1)
  }
}

seedUsers()