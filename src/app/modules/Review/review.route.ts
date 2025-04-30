import express from "express";
import { UserRole } from "@prisma/client";

import RoleValidation from "../../middlewares/RoleValidation";
import { reviewController } from "./review.controller";
const router = express.Router();

router.get(
  "/",
  reviewController.getAllReview
);
router.get(
  "/:id",
  RoleValidation(UserRole.ADMIN, UserRole.USER),
  reviewController.getSingleReview
);

router.post(
  "/create-review",
  RoleValidation(UserRole.ADMIN, UserRole.USER),
  reviewController.addReview
);

export const ReviewRoutes = router;
