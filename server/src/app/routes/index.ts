import express from "express";

import { AuthRoutes } from "../modules/Auth/auth.route";
import { BlogRoutes } from "../modules/Blog/blog.routes";
import { ProjectRoutes } from "../modules/Projects/project.routes";
import { SkillsRoutes } from "../modules/Skills/project.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/login",
    route: AuthRoutes,
  },

  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },
  {
    path: "/skills",
    route: SkillsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
