import catchAsync from "../../../shared/catchAsync";
import { PaymentService } from "./payment.service";
import { Request } from "express";
import config from "../../../config";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const makeOrder = catchAsync(async (req: Request & { user?: any }, res) => {
  //   console.log(commentData);
  const { id } = req.params;
  await PaymentService.makeOrder(res, req.user.id, id);
});
const successOrder = catchAsync(async (req: Request & { user?: any }, res) => {
  const { reviewId } = req.params;
  await PaymentService.successOrder(req.user.id, reviewId);
  res.redirect(`${config.client_link}/payment-successful/${reviewId}`);
});

const PaymentFailed = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  res.redirect(`${config.client_link}/payment-failed/${reviewId}`);
});

const myPayments = catchAsync(async (req: Request & { user?: any }, res) => {

 const result= await PaymentService.myPayments(req.user.id,);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My Payments Fetched Successfuly.",
    data: result,
  });
});
export const PaymentController = {
  makeOrder,
  successOrder,
  PaymentFailed,
  myPayments
};
