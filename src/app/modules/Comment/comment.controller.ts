import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CommentService } from "./comment.service";
import { Request } from "express";

const addComment = catchAsync(async (req: Request & { user?: any }, res) => {
  //   console.log(req.body);
//   console.log(req.user);
  const commentData = {
    ...req.body,
    userId:req.user.id
  }

//   console.log(commentData);
  const result = await CommentService.addComment(commentData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Comment Added Successfuly.",
    data: result,
  });
});

export const CommentController = {
  addComment,
};
