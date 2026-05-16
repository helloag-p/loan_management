import express from "express"

import {

  recordPayment,

  getLoanPayments

} from "../controllers/paymentController"

import {
  authenticate
} from "../middleware/authMiddleware"

import {
  authorizeRoles
} from "../middleware/roleMiddleware"

const router = express.Router()

router.post(
  "/",

  authenticate,

  authorizeRoles(
    "COLLECTION",
    "ADMIN"
  ),

  recordPayment
)

router.get(
  "/:loanId",

  authenticate,

  authorizeRoles(
    "COLLECTION",
    "ADMIN"
  ),

  getLoanPayments
)

export default router