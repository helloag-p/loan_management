import express from "express"

import {
  applyLoan,
  getMyLoans,
  getAppliedLoans,
  approveLoan,
  rejectLoan,
  getSanctionedLoans,
  disburseLoan,
  getDisbursedLoans

} from "../controllers/loanController"

import {
  authenticate
} from "../middleware/authMiddleware"

import {
  authorizeRoles
} from "../middleware/roleMiddleware"

const router = express.Router()

router.post(
  "/apply",

  authenticate,

  authorizeRoles(
    "BORROWER",
    "ADMIN"
  ),

  applyLoan
)

router.get(
  "/my-loans",

  authenticate,

  authorizeRoles(
    "BORROWER",
    "ADMIN"
  ),

  getMyLoans
)
router.get(
  "/applied",

  authenticate,

  authorizeRoles(
    "SANCTION",
    "ADMIN"
  ),

  getAppliedLoans
)

router.patch(
  "/:id/approve",

  authenticate,

  authorizeRoles(
    "SANCTION",
    "ADMIN"
  ),

  approveLoan
)

router.patch(
  "/:id/reject",

  authenticate,

  authorizeRoles(
    "SANCTION",
    "ADMIN"
  ),

  rejectLoan
)
router.get(
  "/sanctioned",

  authenticate,

  authorizeRoles(
    "DISBURSEMENT",
    "ADMIN"
  ),

  getSanctionedLoans
)

router.patch(
  "/:id/disburse",

  authenticate,

  authorizeRoles(
    "DISBURSEMENT",
    "ADMIN"
  ),

  disburseLoan
)
router.get(
  "/disbursed",

  authenticate,

  authorizeRoles(
    "COLLECTION",
    "ADMIN"
  ),

  getDisbursedLoans
)

export default router