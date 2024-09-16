"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const node_http_1 = require("node:http");
const router_1 = require("../router");
const connect_1 = require("../lib/mongoose/connect");
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, node_http_1.createServer)(app);
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
app.get('/', (req, res) => res.json('Apertre Server 🚀'));
app.use('/api/v1', router_1.v1Router);
app.use('/api/v2', router_1.v2Router);
const port = process.env.PORT;
(0, connect_1.connectDB)().then(() => {
    httpServer.listen(port, () => {
        console.log(`SERVER PORT : ${port}`);
    });
});
