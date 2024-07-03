import express, { NextFunction, Request, Response } from "express";
import { BlogController } from "./blog.controller";

const router = express.Router();
router.post("/create", BlogController.createBlog);
router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getSingleBlog);
router.patch("/update/:id", BlogController.updateBlog);
router.delete("/delete/:id", BlogController.deleteBlog);
export const BlogRoutes = router;
