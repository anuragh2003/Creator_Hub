import { Router } from "express";
import { createProject, getProjects, getProject } from "./collaboration.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getProjects);
router.get("/:projectId", getProject);
router.post("/", authenticate, createProject);

export default router;
