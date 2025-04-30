import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategory(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Category Created Successfuly.",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
};
