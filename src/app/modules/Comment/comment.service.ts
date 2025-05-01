import { Comment } from "@prisma/client";
import prisma from "../../../shared/prisma";
import AppError from "../../Errors/AppError";
import status from "http-status";

const addComment = async (commentData: Comment) => {
  //   console.log("add comment...", commentData);

  const ifReviewExist = await prisma.review.findUnique({
    where: {
      id: commentData.reviewId,
    },
  });
  //   console.log(ifReviewExist);

  if (!ifReviewExist) {
    throw new AppError(status.NOT_FOUND, "Review Not found!");
  }

  const result = await prisma.comment.create({
    data: commentData,
  });
  return result;
};

export const CommentService = {
  addComment,
};
