import { Review } from "@prisma/client";
import prisma from "../../../shared/prisma";
import AppError from "../../Errors/AppError";
import status from "http-status";
import { ReviewSearchableFields } from "../../constants/searchableFieldConstant";
import { paginationHelper } from "../../../helpers/paginationHelper";

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
const getAllReview = async (params: any, options: any) => {
  const { limit, skip, page } = paginationHelper.calculatePagination(options);

  const andConditions = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: ReviewSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  andConditions.push({
    isPublished: true,
  });

  // console.dir(andConditions, { depth: "infinity" });

  const whereConditions = { AND: andConditions };

  const result = await prisma.review.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
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
      comments: {
        select: {
          id: true,
          content: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              profileUrl: true,
            },
          },
        },
      },
      Payment: true,
      votes: {
        select: {
          id: true,
          type: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              profileUrl: true,
            },
          },
        },
      },
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
  const totalVotes = await prisma.vote.count({
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
  return result;
};

const pendingReviews = async () => {
  const result = await prisma.review.findMany({
    where: {
      isPublished: false,
    },
    orderBy: {
      createdAt: "desc",
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
};

const makeReviewPublished = async (id: string) => {
  // console.log("makeReviewPublished...",id);

  const isReviewExist = await prisma.review.findUnique({
    where: {
      id,
    },
  });
  // console.log(isReviewExist);

  if (!isReviewExist) {
    throw new AppError(status.NOT_FOUND, "Review not found!");
  }

  if (isReviewExist.isPublished === true) {
    throw new Error("Already Published!");
  }

  const result = await prisma.review.update({
    where: {
      id,
    },
    data: {
      isPublished: true,
    },
  });
  return result;
};

export const ReviewService = {
  addReview,
  getAllReview,
  getSingleReview,
  myselfAllReviews,
  pendingReviews,
  makeReviewPublished,
};
