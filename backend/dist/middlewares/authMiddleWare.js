"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const user = jsonwebtoken_1.default.verify(authHeader, process.env.JWT_KEY);
        if (user) {
            req.userId = user.id;
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ msg: "Error while verifying the token, server error" });
    }
};
exports.auth = auth;
