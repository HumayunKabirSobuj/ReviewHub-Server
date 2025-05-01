import { Comment, Vote } from "@prisma/client";
import prisma from "../../../shared/prisma";
import AppError from "../../Errors/AppError";
import status from "http-status";

const addVote = async (voteData: Vote) => {
    console.log("add Vote...", voteData);

  const ifReviewExist = await prisma.review.findUnique({
    where: {
      id: voteData.reviewId,
    },
  });
  //   console.log(ifReviewExist);

  if (!ifReviewExist) {
    throw new AppError(status.NOT_FOUND, "Review Not found!");
  }

  const result = await prisma.vote.create({
    data: voteData,
  });
  return result;
};

const myVotes = async (userId: string) => {
  // console.log('myComments....', userId);

  const result = await prisma.vote.findMany({
    where: {
      userId,
    },
    include: {
      review: {
        select: {
          title: true,
          excerp: true,
          description: true,
        },
      },
    },
  });
  return result;
};

export const VoteService = {
    addVote,
    myVotes
};
