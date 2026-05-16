import {
  Response
} from "express"

import Payment
from "../models/Payment"

import Loan
from "../models/Loan"

import {
  AuthRequest
} from "../middleware/authMiddleware"

export const recordPayment =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const {
        loanId,
        utrNumber,
        amount,
        paymentDate
      } = req.body

      // Check loan

      const loan =
        await Loan.findById(
          loanId
        )

      if (!loan) {

        return res.status(404).json({
          message:
            "Loan not found"
        })
      }

      // Only disbursed loans

      if (
        loan.status !==
        "DISBURSED"
      ) {

        return res.status(400).json({
          message:
            "Payments allowed only for disbursed loans"
        })
      }

      // UTR duplicate check

      const existingUTR =
        await Payment.findOne({

          utrNumber
        })

      if (existingUTR) {

        return res.status(400).json({
          message:
            "UTR already exists"
        })
      }

      // Payment validation

      if (amount <= 0) {

        return res.status(400).json({
          message:
            "Invalid payment amount"
        })
      }

      // Prevent overpayment

      if (
        amount >
        loan.outstandingAmount
      ) {

        return res.status(400).json({
          message:
            "Payment exceeds outstanding amount"
        })
      }

      // Create payment

      const payment =
        await Payment.create({

          loanId,

          utrNumber,

          amount,

          paymentDate
        })

      // Reduce outstanding

      loan.outstandingAmount =
        Number(
          (
            loan.outstandingAmount -
            amount
          ).toFixed(2)
        )

      // Auto close

      if (
        loan.outstandingAmount === 0
      ) {

        loan.status =
          "CLOSED"
      }

      await loan.save()

      res.status(201).json({

        message:
          "Payment recorded successfully",

        payment,

        outstandingAmount:
          loan.outstandingAmount,

        loanStatus:
          loan.status
      })

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error"
      })
    }
  }
  export const getLoanPayments =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const payments =
        await Payment.find({

          loanId:
            req.params.loanId
        })

      res.status(200).json(
        payments
      )

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error"
      })
    }
  }