import express from "express";

import { config } from "dotenv"

import cors from "cors";
import account_router from "./services/account/route";
import db from "./db";

config();

const app = express()

app.use(express.urlencoded({ extended: false, limit: "50mb"  }));
app.use(express.json({limit: "50mb"}));

app.use(cors({
    origin: "*"
}))

app.use("/account", account_router)

const PORT = process.env.PORT ?? 5000;

Promise.all([db.authenticate(), app.listen(PORT) ])

.then( ()=> console.log("The server is running fine and good"))

