import { Discount } from "@prisma/client";
import prisma from "../../../shared/prisma";
import AppError from "../../Errors/AppError";
import status from "http-status";

const getAllDiscount = async () => {
  const result = await prisma.discount.findMany({
    include: {
      user: true,
      review: true,
    },
  });
  return result;
};

const myDiscounts = async (userId: string) => {
  // console.log("myDiscounts...", userId);

  const result = await prisma.discount.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
      review: true,
    },
  });
  return result;
};
const updateDiscount = async (id: string, data: any) => {
  const isDiscountExist = await prisma.discount.findUnique({
    where: {
      id,
    },
  });
  // console.log(isDiscountExist);
  if (!isDiscountExist) {
    throw new AppError(status.NOT_FOUND, "Discount not found..");
  }

  const isReviewFind = await prisma.review.findUnique({
    where: {
      id: isDiscountExist.reviewId,
    },
  });

  // console.log(isReviwFind);
  if (!isReviewFind) {
    throw new AppError(status.NOT_FOUND, "Review not found..");
  }
  const disCountData = {
    ...data,
    newPrice:
      (isReviewFind.price as number) -
      ((isReviewFind.price as number) * data.percent) / 100,
  };

  // console.log(disCountData);
  const result = await prisma.discount.update({
    where: {
      id,
    },
    data: disCountData,
  });
  return result;
};

export const DiscountServices = {
  getAllDiscount,
  myDiscounts,
  updateDiscount,
};
