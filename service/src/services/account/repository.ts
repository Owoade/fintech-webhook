import crypto from "crypto";
import { Merchant } from "./model";
import { IMerchant } from "./types";

class AccountRepository {

  constructor() {}

  async create_account(payload: Exclude<IMerchant, "id">) {

    const _merchant = await Merchant.create(payload);

    const merchant = _merchant.toJSON();

    return merchant as IMerchant;

  }

  async retrieve_merchant( email: string ){

    const _merchant = await Merchant.findOne({
       where: {
        email,
       }
    })

    const merchant = _merchant?.toJSON();

    return merchant;
    
  }

  

}

const account_repository = new AccountRepository();

export default account_repository;

