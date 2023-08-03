export interface IMerchant {
    id?: number;
    email: string,
    password: string,
    business_name: string,
    public_key: string,
    secret_key: string,
    balance: number,
}