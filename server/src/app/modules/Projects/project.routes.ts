import express, { NextFunction, Request, Response } from "express";
import { ProjectController } from "./project.controller";

const router = express.Router();
router.post("/create", ProjectController.createProject);
router.get("/", ProjectController.getAllProject);
router.get("/:id", ProjectController.getSingleProject);
router.delete("/delete/:id", ProjectController.deleteProject);
router.post("/update/:id", ProjectController.updateProject);

export const ProjectRoutes = router;
