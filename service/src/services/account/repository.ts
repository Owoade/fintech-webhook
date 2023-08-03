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

  async retrieve_merchant_by_id( merchant_id: number ){

    const _merchant = await Merchant.findOne({ where: { id: merchant_id }});

    const merchant = _merchant?.toJSON();

    return merchant;

  }

  async update_balance( id: number, inc: number ){

    await Merchant.increment({balance: inc}, {where: { id }})
    
  }

  

}

const account_repository = new AccountRepository();

export default account_repository;

