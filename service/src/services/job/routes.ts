import { Router } from "express";
import job_controller from "./controller";

const job_router = Router();

job_router.get("/",  job_controller.get_all_jobs);

export default job_router;