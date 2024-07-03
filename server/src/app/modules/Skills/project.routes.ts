import express, { NextFunction, Request, Response } from "express";
import { SkillsController } from "./project.controller";
const router = express.Router();
router.post("/create", SkillsController.createSkills);
router.get("/", SkillsController.getAllSkills);

export const SkillsRoutes = router;
