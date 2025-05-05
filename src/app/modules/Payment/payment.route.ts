import express from "express";
import RoleValidation from "../../middlewares/RoleValidation";
import { UserRole } from "@prisma/client";
import { PaymentController } from "./payment.controller";
const router = express.Router();

router.get(
  "/my-payments",
  RoleValidation(UserRole.USER),
  PaymentController.myPayments
);
router.post(
  "/make-order/:id",
  RoleValidation(UserRole.USER),
  PaymentController.makeOrder
);
router.post("/success", PaymentController.successOrder);
router.post(
  "/failed",
  PaymentController.PaymentFailed
);

export const PaymentRoutes = router;
