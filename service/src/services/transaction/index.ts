import account_repository from "../account/repository";
import job_service from "../job";
import transaction_repository from "./repository";
import { ITransaction } from "./types";
import crypto from "crypto";
import axios from "axios";
import job_repository from "../job/repository";

class TransactionService {
  constructor() {}

  async create(payload: CreateTransaction) {

    const transaction_id = crypto.randomUUID();

    const resolved_amount = payload.amount * ( payload.type === "credit" ? 1 : -1 );

    const merchant = await account_repository.retrieve_merchant_by_id(
      payload.merchant_id
    );

    if (merchant!.balance < payload.amount && payload.type === "debit")
      throw new Error("Insufficient balance");
    
    payload.amount = resolved_amount;

    const transaction = await transaction_repository.create({
      MerchantId: payload.merchant_id,
      amount: payload.amount,
      type: payload.type,
      transaction_id,
    });

    await account_repository.update_balance(
      payload.merchant_id,
      payload.amount
    );

    const job = await job_repository.create({
        transaction_id: transaction.transaction_id,
        status: "pending",
        retry_count: 0,
        duration: "instant"
    })

    await job_service.schedule({
        job(){
            return axios.get('http://localhost:4000')
        },
        job_id: job.id as number,
        duration: "instant",
        retry: 0
    })

    return transaction;
  }
}

const transaction_service = new TransactionService();

export default transaction_service;

interface CreateTransaction {
  amount: number;
  type: ITransaction["type"];
  merchant_id: number;
}
