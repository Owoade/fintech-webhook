export interface ITransaction {
    id?: number,
    MerchantId: number,
    transaction_id: string,
    amount: number,
    type: "credit" | "debit"
}