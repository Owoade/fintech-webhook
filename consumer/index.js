import express from "express";

const app = express();

app.use(express.urlencoded({ extended: false, limit: "50mb"  }));
app.use(express.json({limit: "50mb"}));

const PORT = process.env.PORT ?? 1200;

app.post("/web-hook", ( req, res )=>{

    res.sendStatus(200)

    console.log(">>>>> Webhook Recieved <<<<<<");

    console.log(req.body);
    
})

app.listen( PORT, ()=> console.log("Consumer Service is Live" ))