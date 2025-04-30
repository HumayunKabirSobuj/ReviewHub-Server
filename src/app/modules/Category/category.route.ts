import express from "express";
import { CategoryController } from "./category.controller";
import { UserRole } from "@prisma/client";

import RoleValidation from "../../middlewares/RoleValidation";
const router = express.Router();

router.get("/", CategoryController.getAllCategory);

router.post(
  "/create-category",
  RoleValidation(UserRole.ADMIN),
  CategoryController.createCategory
);

export const CategoryRoutes = router;
