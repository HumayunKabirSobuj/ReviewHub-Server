import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";

const createUser = async (payload: User) => {
  // console.log(payload);

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  // console.log(isUserExist);

  if (isUserExist) {
    throw new Error("User Already Exist");
  }

  const hashPassword = await bcrypt.hash(payload.password, 12);
  // console.log(hashPassword);

  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashPassword,
  };

  //   console.log(userData);

  const result = await prisma.user.create({
    data: {
      ...userData,
    },
  });
  return result;
};

export const UserService = {
  createUser,
};
