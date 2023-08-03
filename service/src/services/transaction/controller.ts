import { Request, Response } from "express";
import ServiceDecorator from "../../decorators";
import { create_transaction_validator } from "../../validators/transaction";
import transaction_repository from "./repository";
import transaction_service from ".";
import respond from "../../utils/respond";

class TransactionController {
    constructor(){}

  @ServiceDecorator.forValidatingPayload(create_transaction_validator)
  @ServiceDecorator.forCatchingDatabaseException()
  async  create( req: Request, res: Response ){

        const transaction = await transaction_service.create(req.body);

        respond( res, {
            code: 200,
            message: "Transaction Created Successfully",
            data: {
                transaction
            }
        })

    }
}

const transaction_controller = new TransactionController();

export default transaction_controller;