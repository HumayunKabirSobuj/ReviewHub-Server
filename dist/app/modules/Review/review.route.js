"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const RoleValidation_1 = __importDefault(require("../../middlewares/RoleValidation"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.get("/", review_controller_1.reviewController.getAllReview);
router.get("/:id", (0, RoleValidation_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), review_controller_1.reviewController.getSingleReview);
router.post("/create-review", (0, RoleValidation_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), review_controller_1.reviewController.addReview);
exports.ReviewRoutes = router;
