import express from "express"

import {
  authenticate
} from "../middleware/authMiddleware"

import {
  authorizeRoles
} from "../middleware/roleMiddleware"

const router = express.Router()

router.get(
  "/admin",

  authenticate,

  authorizeRoles("ADMIN"),

  (_, res) => {

    res.json({
      message:
        "Welcome Admin"
    })
  }
)

export default router