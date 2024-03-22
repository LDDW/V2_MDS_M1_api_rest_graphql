"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
const routes_1 = __importDefault(require("./routes"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const resolvers_1 = require("./graphql/resolvers/resolvers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use(body_parser_1.default.json());
app.use("/api", routes_1.default);
// graphql  
const schema = (0, graphql_1.buildSchema)(fs_1.default.readFileSync(__dirname + "/graphql/schema.gql", "utf8"));
const rootValue = Object.assign({}, resolvers_1.resolvers);
app.use("/api/graphql", (0, cors_1.default)(), (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
}));
app.listen(3000);
