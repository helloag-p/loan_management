import express from "express"

import upload
from "../config/multer"

import {
  authenticate
} from "../middleware/authMiddleware"

import {
  authorizeRoles
} from "../middleware/roleMiddleware"

import {
  uploadSalarySlip
} from "../controllers/uploadController"

const router = express.Router()

router.post(
  "/salary-slip",

  authenticate,

  authorizeRoles(
    "BORROWER",
    "ADMIN"
  ),

  upload.single("salarySlip"),

  uploadSalarySlip
)

export default router