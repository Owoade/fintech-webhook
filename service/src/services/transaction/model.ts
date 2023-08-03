import db from "../../db";
import model_types from "../../utils/models";
import { Model, Optional } from "sequelize";
import { ITransaction } from "./types";
import { Merchant } from "../account/model";

export const Transaction = db.define<Model<ITransaction, Optional<ITransaction, "id">>>("Transactions", {

    id: model_types.primary_key(),

    MerchantId: model_types.int(),

    transaction_id: model_types.string(),

    amount: model_types.double(),

    type: model_types.enum("credit", "debit")

})


Transaction.sync( { force: true })
