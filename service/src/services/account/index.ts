import crypto from "crypto";
import account_repository from "./repository";

class AccountService {
  constructor() {

    this.create_account = this.create_account.bind(this);

    this.retrieve_merchant_with_auth = this.retrieve_merchant_with_auth.bind(this);
    
  }

  async create_account(payload: ICreateAccount) {

    const balance = 0.0;

    const public_key = `pk_${this.create_key()}`;

    const secret_key = `sk_${this.create_key()}`;

    const merchant_id = crypto.randomUUID();

    payload.password = this.hash_password(payload.password);

    const merchant = await account_repository.create_account({
      ...payload,
      public_key,
      secret_key,
      merchant_id,
      balance,
    });

    merchant.password! = undefined as any;

    return merchant;

  }

  async retrieve_merchant_with_auth(payload: IRetrieveMerchantWithAuth) {

    const merchant = await account_repository.retrieve_merchant(payload.email);

    payload.password = this.hash_password(payload.password);

    if (!merchant)
      return {
        merchant: null,
        auth_code: 404,
      };

    if (merchant.password !== payload.password)
      return {
        merchant: null,
        auth_code: 401,
      };

    merchant.password = undefined as any;

    return {
        merchant,
        auth_code: 200
    }

  }

  private hash_password(password: string) {
    return crypto.createHash("sha256").update(password).digest("hex");
  }

  private create_key() {
    return crypto.randomBytes(Math.ceil(64)).toString("hex").slice(0, 64);
  }
}

const account_service = new AccountService();

export default account_service;

interface ICreateAccount {
    email: string,
    password: string,
    business_name: string
}

interface IRetrieveMerchantWithAuth {
    email: string,
    password: string;
}