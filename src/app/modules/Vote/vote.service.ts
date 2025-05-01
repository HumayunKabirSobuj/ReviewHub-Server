import { Comment, Vote } from "@prisma/client";
import prisma from "../../../shared/prisma";
import AppError from "../../Errors/AppError";
import status from "http-status";

const addVote = async (voteData: Vote) => {
    // Step 1: Check if the review exists
    const ifReviewExist = await prisma.review.findFirst({
      where: {
        id: voteData.reviewId,
      },
    });
  
    if (!ifReviewExist) {
      throw new AppError(status.NOT_FOUND, "Review Not found!");
    }
  
    // Step 2: Check if user already voted on this review
    const existingVote = await prisma.vote.findFirst({
      where: {
        userId: voteData.userId,
        reviewId: voteData.reviewId,
      },
    });
  
    if (existingVote) {
      throw new AppError(status.CONFLICT, "You have already voted on this review!");
    }
  
    // Step 3: Create the vote
    const result = await prisma.vote.create({
      data: {
        ...voteData,
      },
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
  myVotes,
};
