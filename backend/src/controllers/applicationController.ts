import {
  Response
} from "express"

import Application from "../models/Application"

import {
  AuthRequest
} from "../middleware/authMiddleware"

import {
  runBRE
} from "../services/breService"

export const createApplication =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const {
        fullName,
        pan,
        dob,
        monthlySalary,
        employmentMode,
        salarySlip
      } = req.body

      const breResult = runBRE({
        dob,
        monthlySalary,
        pan,
        employmentMode
      })

      if (!breResult.success) {

        return res.status(400).json({
          message:
            breResult.message
        })
      }

      const application =
        await Application.create({

          userId: req.user?.id,

          fullName,

          pan,

          dob,

          monthlySalary,

          employmentMode,

          salarySlip,

          brePassed: true
        })

      res.status(201).json({
        message:
          "Application created",

        application
      })

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error"
      })
    }
  }