"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const tableService_1 = __importDefault(require("../services/tableService"));
const redis_service_1 = require("../services/redis.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginController = async (req, res) => {
    try {
        const { email, password1 } = req.body;
        const data = await redis_service_1.redis.get(`${email}`);
        if (data) {
            const parsed = JSON.parse(data);
            const isMatch = await bcrypt_1.default.compare(password1, parsed.password);
            if (isMatch) {
                res.status(200).json({ message: "hello from redis" });
            }
        }
        else {
            const user = await tableService_1.default.table2.findUnique({
                where: { email }
            });
            if (user && typeof user.password === 'string') {
                const isMatch = await bcrypt_1.default.compare(password1, user.password);
                if (isMatch) {
                    console.log("inside the fucking path ");
                    const name = user.name;
                    const totalLimit = user.totalLimit;
                    const totalAPIs = user.totalAPIs;
                    const saltRounds = 10;
                    const password = await bcrypt_1.default.hash(password1, saltRounds);
                    console.log("password hashed");
                    const rd1 = {
                        name: name,
                        email: email,
                        totalLimit: totalLimit,
                        password: password,
                        totalAPIs: totalAPIs,
                    };
                    await redis_service_1.redis.set(`${email}`, JSON.stringify(rd1), 'EX', 6000);
                    console.log("redis account set ");
                    res.status(200).json({ message: "logged  successfully and redis instance created" });
                }
                else {
                    res.status(401).json({ message: "invalid credentials" });
                }
            }
            else {
                res.status(501).json({ message: "user doesnt exist" });
            }
        }
    }
    catch (err) {
        console.error(err);
    }
};
exports.loginController = loginController;
