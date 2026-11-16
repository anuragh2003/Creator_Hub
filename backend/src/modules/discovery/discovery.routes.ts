import { Router } from "express";
import { searchCreators, searchPosts, getExplore } from "./discovery.controller.js";

const router = Router();

router.get("/explore", getExplore);
router.get("/creators", searchCreators);
router.get("/posts", searchPosts);

export default router;
