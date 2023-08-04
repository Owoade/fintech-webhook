import { Request, Response } from "express";
import respond from "../../utils/respond";
import job_service from ".";

class JobController {
    constructor(){}

    async get_all_jobs( req: Request, res: Response ){

        const jobs = await job_service.get_all_jobs();

        respond( res, {
            code: 200,
            data: jobs,
            message: "All jobs"
        })
    }
}

const job_controller = new JobController();

export default job_controller;