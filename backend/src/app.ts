import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import testRoutes from "./routes/testRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import uploadRoutes
from "./routes/uploadRoutes"
import loanRoutes
from "./routes/loanRoutes"
import paymentRoutes
from "./routes/paymentRoutes"



const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("LMS API Running");
});

app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/application", applicationRoutes);
app.use(
  "/api/upload",
  uploadRoutes
)
app.use(
  "/uploads",
  express.static("uploads")
)
app.use(
  "/api/loan",
  loanRoutes
)
app.use(
  "/api/payment",
  paymentRoutes
)
export default app;
