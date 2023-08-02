import db from "../../db";
import { DataTypes, Model, Optional } from "sequelize";
import model_types from "../../utils/models";
import { IMerchant } from "./types";

export const Merchant = db.define<Model<IMerchant, Optional<IMerchant, "id">>>("Merchants", {

    id: model_types.primary_key(),

    merchant_id: model_types.string(),

    email: model_types.unique_string(),

    password: model_types.string(),

    business_name:model_types.string(),

    secret_key: model_types.string(),

    public_key: model_types.string(),

    balance: model_types.float()

})

Merchant.sync()



