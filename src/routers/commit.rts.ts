import Router from "express";
import { viewCommitCtrl } from "../controllers/commit.ctrl";
export const commitRouter = Router();
commitRouter.get("/view/:owner/:repo/:sha", viewCommitCtrl);
