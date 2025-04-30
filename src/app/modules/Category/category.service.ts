import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createCategory = async (data: Category) => {
  //   console.log("createCategory...",data);

  const isCategoryExist = await prisma.category.findUnique({
    where: {
      name: data.name,
    },
  });

  if (isCategoryExist) {
    throw new Error("Category Already Exist");
  }

  const result = await prisma.category.create({
    data,
  });

  return result;
};

export const CategoryService = {
  createCategory,
};
