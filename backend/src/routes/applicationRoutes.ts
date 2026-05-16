import express from "express"

import {
  createApplication
} from "../controllers/applicationController"
import {
  authorizeRoles
} from "../middleware/roleMiddleware"
import {
  authenticate
} from "../middleware/authMiddleware"

const router = express.Router()

router.post(
  "/",
  authenticate,
  authorizeRoles("BORROWER","ADMIN"),
  createApplication
)

export default router