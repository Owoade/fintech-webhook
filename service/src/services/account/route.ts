import { Router } from "express";
import account_controller from "./controller";

const account_router = Router();

account_router.post('/create', account_controller.create);

account_router.post('/login', account_controller.login);

export default account_router;