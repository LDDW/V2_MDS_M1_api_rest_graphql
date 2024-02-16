import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json"
import Routes from "./routes/routes";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import cors from "cors";
import fs from "fs";
import { resolvers } from "./resolvers/resolvers";

const app = express();
app.use(cors());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());

app.use("/api", Routes);

// graphql  
// const root =  {
//     ...resolvers
// }
// const schema = buildSchema(fs.readFileSync(__dirname + "/graphql/schema.gql", "utf8"))
// // console.log(schema)

// app.use("/graphql", graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
// }))

app.listen(3000); 