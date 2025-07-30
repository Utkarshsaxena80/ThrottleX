"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route2 = void 0;
const express_1 = __importDefault(require("express"));
const route2 = express_1.default.Router();
exports.route2 = route2;
const add_api_controller_1 = require("../controllers/add-api.controller");
const authentication_middleware_1 = require("../middleware/authentication.middleware");
route2.post('/add-api', authentication_middleware_1.authenticateRoute, add_api_controller_1.addApi);
