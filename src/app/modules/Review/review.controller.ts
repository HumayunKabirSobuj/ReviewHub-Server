import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ReviewService } from "./review.service";
import { Request } from "express";

const addReview = catchAsync(async (req: Request & { user?: any }, res) => {
  const result = await ReviewService.addReview(req.body, req.user.id);

  //   console.log(req.user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Review Added Successfuly.",
    data: result,
  });
});
const getAllReview = catchAsync(async (req, res) => {
  // console.log(req.query);
  const {searchTerm, ...options} = req.query;
  // console.log(options);
  const result = await ReviewService.getAllReview(req.query,options);

  //   console.log(req.user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All Review Fetched Successfuly.",
    data: result,
  });
});
const getSingleReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewService.getSingleReview(id);

  //   console.log(req.user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Single Review Fetched Successfuly.",
    data: result,
  });
});

const myselfAllReviews = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const result = await ReviewService.myselfAllReviews(req.user.id);

    //   console.log(req.user);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Myself All Review Fetched Successfuly.",
      data: result,
    });
  }
);

export const reviewController = {
  addReview,
  getAllReview,
  getSingleReview,
  myselfAllReviews,
};
