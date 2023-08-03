import { Router  } from "express";
import transaction_controller from "./controller";

const transaction_router = Router();

transaction_router.post("/", transaction_controller.create)

export default transaction_router;