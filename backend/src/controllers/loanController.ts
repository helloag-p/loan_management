import {
  Response
} from "express"

import Loan from "../models/Loan"

import Application
from "../models/Application"

import {
  AuthRequest
} from "../middleware/authMiddleware"

import {
  calculateLoan
} from "../services/loanService"

export const applyLoan =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const {
        amount,
        tenure
      } = req.body

      // Loan validations

      if (
        amount < 50000 ||
        amount > 500000
      ) {

        return res.status(400).json({
          message:
            "Loan amount must be between 50K and 5L"
        })
      }

      if (
        tenure < 30 ||
        tenure > 365
      ) {

        return res.status(400).json({
          message:
            "Tenure must be between 30 and 365 days"
        })
      }

      const application =
        await Application.findOne({

          userId:
            req.user?.id
        })

      if (!application) {

        return res.status(404).json({
          message:
            "Application not found"
        })
      }

      // Ensure salary slip uploaded

      if (
        !application.salarySlip
      ) {

        return res.status(400).json({
          message:
            "Upload salary slip first"
        })
      }

      // Prevent multiple active loans

      const existingLoan =
        await Loan.findOne({

          borrower:
            req.user?.id,

          status: {
            $in: [
              "APPLIED",
              "SANCTIONED",
              "DISBURSED"
            ]
          }
        })

      if (existingLoan) {

        return res.status(400).json({
          message:
            "Active loan already exists"
        })
      }

      const loanData =
        calculateLoan(
          amount,
          tenure
        )

      const loan =
        await Loan.create({

          borrower:
            req.user?.id,

          application:
            application._id,

          amount,

          tenure,

          interestRate:
            loanData.interestRate,

          simpleInterest:
            loanData.simpleInterest,

          totalRepayment:
            loanData.totalRepayment,

          outstandingAmount:
            loanData.totalRepayment
        })

      res.status(201).json({

        message:
          "Loan applied successfully",

        loan
      })

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error"
      })
    }
  }
export const getMyLoans =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const loans =
        await Loan.find({

          borrower:
            req.user?.id
        })

      res.status(200).json(loans)

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error"
      })
    }
  }
  export const getAppliedLoans =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const loans =
        await Loan.find({

          status: "APPLIED"
        })

        .populate(
          "borrower",
          "name email"
        )

        .populate(
          "application"
        )

      res.status(200).json(loans)

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error"
      })
    }
  }
  export const approveLoan =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const loan =
        await Loan.findById(
          req.params.id
        )

      if (!loan) {

        return res.status(404).json({
          message:
            "Loan not found"
        })
      }

      // Only applied loans

      if (
        loan.status !==
        "APPLIED"
      ) {

        return res.status(400).json({
          message:
            "Only applied loans can be approved"
        })
      }

      loan.status =
        "SANCTIONED"

      await loan.save()

      res.status(200).json({

        message:
          "Loan sanctioned successfully",

        loan
      })

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error"
      })
    }
  }
  export const rejectLoan =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const {
        rejectionReason
      } = req.body

      const loan =
        await Loan.findById(
          req.params.id
        )

      if (!loan) {

        return res.status(404).json({
          message:
            "Loan not found"
        })
      }

      if (
        loan.status !==
        "APPLIED"
      ) {

        return res.status(400).json({
          message:
            "Only applied loans can be rejected"
        })
      }

      if (!rejectionReason) {

        return res.status(400).json({
          message:
            "Rejection reason required"
        })
      }

      loan.status =
        "REJECTED"

      loan.rejectionReason =
        rejectionReason

      await loan.save()

      res.status(200).json({

        message:
          "Loan rejected successfully",

        loan
      })

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error"
      })
    }
  }
  export const getSanctionedLoans =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const loans =
        await Loan.find({

          status: "SANCTIONED"
        })

        .populate(
          "borrower",
          "name email"
        )

        .populate(
          "application"
        )

      res.status(200).json(loans)

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error"
      })
    }
  }
  export const disburseLoan =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const loan =
        await Loan.findById(
          req.params.id
        )

      if (!loan) {

        return res.status(404).json({
          message:
            "Loan not found"
        })
      }

      // Only sanctioned loans

      if (
        loan.status !==
        "SANCTIONED"
      ) {

        return res.status(400).json({
          message:
            "Only sanctioned loans can be disbursed"
        })
      }

      loan.status =
        "DISBURSED"

      loan.disbursedAt =
        new Date()

      await loan.save()

      res.status(200).json({

        message:
          "Loan disbursed successfully",

        loan
      })

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error"
      })
    }
  }
  export const getDisbursedLoans =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const loans =
        await Loan.find({

          status: "DISBURSED"
        })

        .populate(
          "borrower",
          "name email"
        )

        .populate(
          "application"
        )

      res.status(200).json(loans)

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error"
      })
    }
  }