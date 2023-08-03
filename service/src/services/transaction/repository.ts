import { Transaction } from "./model";
import { ITransaction } from "./types";

class TransactionRepository {
    constructor(){}

    async create( payload: ITransaction ){

        const _transaction = await Transaction.create(payload);

        const transaction = _transaction.toJSON();

        return transaction;

    }

}

const transaction_repository = new TransactionRepository();

export default transaction_repository;

