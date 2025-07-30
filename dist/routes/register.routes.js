"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const register_controllers_1 = require("../controllers/register.controllers");
const route = express_1.default.Router();
exports.route = route;
route.post('/submit', register_controllers_1.registerController);
