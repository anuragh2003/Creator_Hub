import { Router } from "express";
import { getProfile, updateProfile } from "./user.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/:username", getProfile);
router.patch("/me", authenticate, updateProfile);

export default router;
