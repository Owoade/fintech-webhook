import { Router } from "express";
import account_controller from "./controller";
import { Merchant } from "./model";
import respond from "../../utils/respond";

const account_router = Router();

account_router.post('/create', account_controller.create);

account_router.get('/', async function ( req: any, res: any ) {
 const _ = await Merchant.findAll();

 respond( res, {
    code: 200,
    data: _,
    message: ""
 })
})

account_router.post('/login', account_controller.login);

export default account_router;