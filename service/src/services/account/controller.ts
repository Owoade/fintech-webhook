import { Request, Response } from "express";
import ServiceDecorator from "../../decorators";
import { create_account_validator, login_validator } from "../../validators/account";
import account_repository from "./repository";
import respond from "../../utils/respond";
import account_service from ".";

class AccountController {
  constructor() {}

  @ServiceDecorator.forValidatingPayload(create_account_validator)
  @ServiceDecorator.forCatchingDatabaseException()
  async create(req: Request, res: Response) {

    const merchant = await account_service.create_account(req.body);

    respond(res, {
      code: 200,
      message: "Merchant retrieved successfully",
      data: {
        merchant,
      },
    });

  }

  @ServiceDecorator.forValidatingPayload(login_validator)
  async login(req: Request, res: Response) {
    const data = await account_service.retrieve_merchant_with_auth(req.body);

    respond(res, {
      code: data.auth_code,
      message: "Merchant retrieved successfully",
      data: {
        merchat: data.merchant,
      },
    });
  }
}

const account_controller = new AccountController();

export default account_controller;