import express from "express";
import { UserRole } from "@prisma/client";

import RoleValidation from "../../middlewares/RoleValidation";
import { DiscountController } from "./discount.controller";
const router = express.Router();

router.get(
  "/get-all-discount",
  RoleValidation(UserRole.ADMIN),
  DiscountController.getAllDiscount
);
router.get(
  "/my-discounts",
  RoleValidation(UserRole.USER),
  DiscountController.myDiscounts
);
router.patch(
  "/update-discount/:id",
  RoleValidation(UserRole.USER),
  DiscountController.updateDiscount
);
router.delete(
  "/delete-discount/:id",
  RoleValidation(UserRole.USER),
  DiscountController.deleteDiscount
);


export const DiscountRoutes = router;
