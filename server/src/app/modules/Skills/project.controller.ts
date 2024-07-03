import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { SkillsService } from "./project.service";

const getAllSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillsService.getAllSkills();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skills retrieved successfully!",

    data: result,
  });
});
const createSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillsService.createSkills(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skills Created successfully!",

    data: result,
  });
});

const deleteSkills = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SkillsService.deleteSkills(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skills deleted successfully!",
    data: result,
  });
});

export const SkillsController = {
  getAllSkills,
  createSkills,
  deleteSkills,
};
