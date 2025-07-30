"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const tableService_1 = __importDefault(require("../services/tableService"));
const redis_service_1 = require("../services/redis.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerController = async (req, res) => {
    try {
        const { name, email, totalLimit, totalAPIs, password1 } = req.body;
        const user = await tableService_1.default.table2.findUnique({
            where: { email },
        });
        if (user) {
            return res.status(401).json({ error: 'User Already exists' });
        }
        else {
            const saltRounds = 10;
            const password = await bcrypt_1.default.hash(password1, saltRounds);
            const user1 = await tableService_1.default.table2.create({
                data: {
                    name,
                    email,
                    totalLimit,
                    totalAPIs,
                    password,
                }
            });
            const user2 = await tableService_1.default.table2.findUnique({
                where: { email }
            });
            const id1 = user2?.id ?? '';
            if (user2) {
                res.status(200).json({ message: "user added", uniqueId: user2.id });
            }
            else {
                res.status(500).json({ error: "User creation failed: user not found after creation" });
            }
            const rd1 = {
                name: name,
                email: email,
                totalLimit: totalLimit,
                password: password,
                totalAPIs: totalAPIs,
            };
            await redis_service_1.redis.set(`${email}`, JSON.stringify(rd1), 'EX', 60);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'user creation failed ' });
    }
};
exports.registerController = registerController;
