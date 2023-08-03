import db from "../../db";
import model_types from "../../utils/models";
import { Model, Optional } from "sequelize";
import { IJob } from "./type";

export const Job = db.define<Model<IJob, Optional<IJob, "id">>>("Job", {
    
    id: model_types.primary_key(),

    transaction_id: model_types.string(),

    status: model_types.enum("failed", "pending", "fufilled"),

    retry_count: model_types.int(),

    duration: model_types.enum("instant", "minutes", "hours")

})

Job.sync()