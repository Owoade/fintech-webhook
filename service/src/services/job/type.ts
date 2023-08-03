export interface IJob {
    id?: number,
    transaction_id: string,
    status: "failed" | "pending" | "fufilled",
    retry_count: number,
    duration: "instant" | "minutes" | "hours"
}