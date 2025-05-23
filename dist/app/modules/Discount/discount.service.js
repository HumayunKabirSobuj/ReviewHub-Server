"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const getAllDiscount = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.discount.findMany({
        include: {
            user: true,
            review: true,
        },
    });
    return result;
});
const myDiscounts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("myDiscounts...", userId);
    const result = yield prisma_1.default.discount.findMany({
        where: {
            userId,
        },
        include: {
            user: true,
            review: true,
        },
    });
    return result;
});
const updateDiscount = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isDiscountExist = yield prisma_1.default.discount.findUnique({
        where: {
            id,
        },
    });
    // console.log(isDiscountExist);
    if (!isDiscountExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Discount not found..");
    }
    const isReviewFind = yield prisma_1.default.review.findUnique({
        where: {
            id: isDiscountExist.reviewId,
        },
    });
    // console.log(isReviwFind);
    if (!isReviewFind) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Review not found..");
    }
    const disCountData = Object.assign(Object.assign({}, data), { newPrice: isReviewFind.price -
            (isReviewFind.price * data.percent) / 100 });
    // console.log(disCountData);
    const result = yield prisma_1.default.discount.update({
        where: {
            id,
        },
        data: disCountData,
    });
    return result;
});
exports.DiscountServices = {
    getAllDiscount,
    myDiscounts,
    updateDiscount,
};
