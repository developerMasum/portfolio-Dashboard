import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ProjectService } from "./project.service";

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProjectService.getSingleDonor(id);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: " single Project retrieved successfully!",
    data: result,
  });
});

const getAllProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProjects();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects retrieved successfully!",

    data: result,
  });
});
const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.createProject(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects Created successfully!",

    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectService.deleteProject(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project deleted successfully!",
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectService.updateProject(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project updated successfully!",
    data: result,
  });
});
export const ProjectController = {
  getAllProject,
  getSingleProject,
  createProject,
  deleteProject,
  updateProject,
};
