import job_repository from "./repository";
import { IJob } from "./type";

class JobService {
    constructor(){
        this.init = this.init.bind(this);
        this.schedule = this.schedule.bind(this);
    }

    async schedule( payload: InitiateJob ){

        console.log(">>>>Scheduling Job<<<<<<", "INFO")

        if( payload.duration === "instant" ) 
            return (await this.init(payload));

        
        if(payload.duration === "minutes")
            return setTimeout(async ()=> await this.init(payload), 180000 );

    }

    async init( payload: InitiateJob  ){
    
            // base_case
        if( payload.retry === 0 && payload.duration === "hours" ){

            await job_repository.update_status(payload.job_id, "failed");

            await job_repository.update_status_and_count( {
                id: payload.job_id,
                count: 0,
                status: "failed"
            })

            return console.log(">>>>>Job failed, No Retries<<<<<<", "ERROR")
            
        }


        let timeout_id: number;

        try{

            timeout_id =0

            await payload.job()

            clearTimeout(timeout_id);
    
            console.log(">>>>>>Job Fufilled<<<<<<", "LOG");

            job_repository.update_status( payload.job_id, "fufilled");
    
            // .then( ()=>{
    
               
    
            // })

        }catch( e ){

            clearTimeout( payload.job_id );

            if( payload.duration === "instant" ){

                payload.duration = "minutes";

                payload.retry = 4;

                await job_repository.update_count_and_duration( {
                    id: payload.job_id,
                    count: payload.retry,
                    duration: payload.duration
                })

            }

            if( payload.duration === "minutes" && payload.retry === 0 ){

                payload.duration = "hours";

                payload.retry = 72;

            }

            payload.retry -= 1;

            console.log( payload)

            await job_repository.update_retry_count( payload.job_id, payload.retry - 1 );

           console.log(`>>>>>>Job Failed, Retries${payload.retry} <<<<<`)

           await this.schedule(payload);
   
        }

    }
}

const job_service = new JobService();

export default job_service;

interface InitiateJob {
    job: () => Promise<void>,
    job_id: number;
    retry: number,
    duration: IJob['duration']
}