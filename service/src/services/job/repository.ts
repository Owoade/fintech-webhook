import { Job } from "./model";
import { IJob } from "./type";

class JobRepository {
    constructor(){}

    async create( payload: Omit<IJob, "id">){

        const _job = await Job.create(payload);

        const job = _job.toJSON();

        return job;

    }

    async update_status_and_count(payload:{
        id: number,
        count: number,
        status: IJob["status"]
    }){

        await Job.update({ status: payload.status, retry_count: payload.count }, { where: { id: payload.id }})

        return true;

    }

    async update_count_and_duration(payload:{
        id: number,
        count: number,
        duration: IJob['duration']
    }){

        await Job.update({ duration: payload.duration, retry_count: payload.count }, { where: { id: payload.id }})

        return true;

    }

    async update_status(id: number, status: IJob["status"]){

        await Job.update({ status }, { where: { id }})

        return true;

    }

    async update_retry_count( id: number, count: number ){

        await Job.update( { retry_count: count }, { where: { id } })

        return true;

    }

}


const job_repository = new JobRepository();

export default job_repository;

