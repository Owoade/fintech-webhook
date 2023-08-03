import db from "../../db";
import { DataTypes, Model, Optional } from "sequelize";
import model_types from "../../utils/models";
import { IMerchant } from "./types";
import { Transaction } from "../transaction/model";

export const Merchant = db.define<Model<IMerchant, Optional<IMerchant, "id" >>>("Merchants", {

    email: model_types.unique_string(),

    id: model_types.primary_key(),

    password: model_types.string(),

    business_name:model_types.string(),

    secret_key: model_types.string(),

    public_key: model_types.string(),

    balance: model_types.double()

})

Merchant.hasMany( Transaction)

Transaction.belongsTo(Merchant);

Merchant.sync( { alter: true })




