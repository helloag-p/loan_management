import {
  Response
} from "express"

import Application
from "../models/Application"

import {
  AuthRequest
} from "../middleware/authMiddleware"

export const uploadSalarySlip =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      if (!req.file) {

        return res.status(400).json({
          message:
            "File not uploaded"
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

      application.salarySlip =
        req.file.path

      await application.save()

      res.status(200).json({

        message:
          "Salary slip uploaded",

        file:
          req.file.path
      })

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error"
      })
    }
  }