"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route1 = void 0;
const express_1 = __importDefault(require("express"));
const route1 = express_1.default.Router();
exports.route1 = route1;
const login_controller_1 = require("../controllers/login.controller");
route1.post('/login', login_controller_1.loginController);
