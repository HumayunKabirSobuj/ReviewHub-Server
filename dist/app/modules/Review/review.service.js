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
exports.ReviewService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const addReview = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log("data", data);
    //   console.log("data", authorId);
    const isCategoryExist = yield prisma_1.default.category.findUnique({
        where: {
            id: data.categoryId,
        },
    });
    //   console.log(isCategoryExist);
    if (!isCategoryExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Category Not found!");
    }
    //   console.log(isCategoryExist);
    const reviewData = Object.assign(Object.assign({}, data), { userId });
    //   console.log(reviewData);
    const result = yield prisma_1.default.review.create({
        data: Object.assign({}, reviewData),
    });
    return result;
});
const getAllReview = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profileUrl: true,
                },
            },
            category: true,
        },
    });
    return result;
});
const getSingleReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield prisma_1.default.review.findUnique({
        where: {
            id,
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profileUrl: true,
                },
            },
            category: true,
            comments: true,
            votes: true,
        },
    });
    const paymentCount = yield prisma_1.default.payment.count({
        where: {
            reviewId: id,
        },
    });
    const totalComments = yield prisma_1.default.comment.count({
        where: {
            reviewId: id,
        },
    });
    const totalVotes = yield prisma_1.default.comment.count({
        where: {
            reviewId: id,
        },
    });
    return Object.assign(Object.assign({}, review), { paymentCount,
        totalComments,
        totalVotes });
});
const myselfAllReviews = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    //  console.log('myselfAllReviews...',userId);
    const result = yield prisma_1.default.review.findMany({
        where: {
            userId,
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profileUrl: true,
                },
            },
            category: true,
        },
    });
    return result;
});
exports.ReviewService = {
    addReview,
    getAllReview,
    getSingleReview,
    myselfAllReviews,
};
