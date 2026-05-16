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

    const password =
      await bcrypt.hash(
        "Admin@123",
        10
      )

    const users = [

      {
        name: "Admin",
        email: "admin@test.com",
        password,
        role: "ADMIN"
      },

      {
        name: "Sanction",
        email: "sanction@test.com",
        password,
        role: "SANCTION"
      },

      {
        name: "Disbursement",
        email: "disbursement@test.com",
        password,
        role: "DISBURSEMENT"
      },

      {
        name: "Collection",
        email: "collection@test.com",
        password,
        role: "COLLECTION"
      },

      {
        name: "Borrower",
        email: "borrower@test.com",
        password,
        role: "BORROWER"
      }
    ]

    await User.insertMany(users)

    console.log(
      "Users Seeded"
    )

    process.exit()

  } catch (error) {

    console.log(error)

    process.exit(1)
  }
}

seedUsers()