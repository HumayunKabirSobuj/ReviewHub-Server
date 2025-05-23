"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountRoutes = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const RoleValidation_1 = __importDefault(require("../../middlewares/RoleValidation"));
const discount_controller_1 = require("./discount.controller");
const router = express_1.default.Router();
router.get("/get-all-discount", (0, RoleValidation_1.default)(client_1.UserRole.ADMIN), discount_controller_1.DiscountController.getAllDiscount);
router.get("/my-discounts", (0, RoleValidation_1.default)(client_1.UserRole.USER), discount_controller_1.DiscountController.myDiscounts);
router.patch("/update-discount/:id", (0, RoleValidation_1.default)(client_1.UserRole.USER), discount_controller_1.DiscountController.updateDiscount);
exports.DiscountRoutes = router;
