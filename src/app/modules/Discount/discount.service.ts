import prisma from "../../../shared/prisma";

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
  return result
};

export const DiscountServices = {
  getAllDiscount,
  myDiscounts,
};
