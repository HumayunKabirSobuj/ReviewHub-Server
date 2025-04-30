import { Review } from "@prisma/client";
import prisma from "../../../shared/prisma";
import AppError from "../../Errors/AppError";
import status from "http-status";

const addReview = async (data: Review, userId: string) => {
  //   console.log("data", data);
  //   console.log("data", authorId);

  const isCategoryExist = await prisma.category.findUnique({
    where: {
      id: data.categoryId,
    },
  });

  //   console.log(isCategoryExist);

  if (!isCategoryExist) {
    throw new AppError(status.NOT_FOUND, "Category Not found!");
  }
  //   console.log(isCategoryExist);

  const reviewData = {
    ...data,
    userId,
  };
  //   console.log(reviewData);

  const result = await prisma.review.create({
    data: {
      ...reviewData,
    },
  });
  return result;
};
const getAllReview = async () => {
  const result = await prisma.review.findMany({
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
};
const getSingleReview = async (id: string) => {
  const review = await prisma.review.findUnique({
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

  const paymentCount = await prisma.payment.count({
    where: {
      reviewId: id,
    },
  });
  const totalComments = await prisma.comment.count({
    where: {
      reviewId: id,
    },
  });
  const totalVotes = await prisma.comment.count({
    where: {
      reviewId: id,
    },
  });

  return {
    ...review,
    paymentCount,
    totalComments,
    totalVotes,
  };
};

const myselfAllReviews = async (userId: string) => {
  //  console.log('myselfAllReviews...',userId);

  const result = await prisma.review.findMany({
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
  return result
};

export const ReviewService = {
  addReview,
  getAllReview,
  getSingleReview,
  myselfAllReviews,
};
