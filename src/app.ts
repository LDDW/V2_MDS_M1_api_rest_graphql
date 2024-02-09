import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json"
import Routes from "./routes/routes";

const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());


app.use("/api/users", Routes);


app.get("/api/", (req, res) => {
    res.send("Welcome on uber eat like !");
});

app.listen(3000); 