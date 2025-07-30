"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_routes_1 = require("./routes/register.routes");
const login_routes_1 = require("./routes/login.routes");
const addAPI_routes_1 = require("./routes/addAPI.routes");
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('hello');
});
app.post('/submit', register_routes_1.route);
app.post('/login', login_routes_1.route1);
app.post('/add-api', addAPI_routes_1.route2);
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
