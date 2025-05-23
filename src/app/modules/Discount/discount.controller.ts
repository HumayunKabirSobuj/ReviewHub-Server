import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DiscountServices } from "./discount.service";
import { Request } from "express";

const getAllDiscount = catchAsync(async (req, res) => {
  const result = await DiscountServices.getAllDiscount();

  //   console.log(req.user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All Discount Get Successfully..",
    data: result,
  });
});
const myDiscounts = catchAsync(async (req: Request & { user?: any }, res) => {
  const result = await DiscountServices.myDiscounts(req.user.id);

  //   console.log(req.user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My Discounts Get Successfully..",
    data: result,
  });
});
const updateDiscount = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DiscountServices.updateDiscount(id, req.body);

  //   console.log(req.user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Discount Updated Successfully..",
    data: result,
  });
});
const deleteDiscount = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DiscountServices.deleteDiscount(id);

  //   console.log(req.user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Discount deleted Successfully..",
    data: result,
  });
});

export const DiscountController = {
  getAllDiscount,
  myDiscounts,
  updateDiscount,
  deleteDiscount
};
