"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const medium_common_1 = require("@harischandio70/medium-common");
const router = (0, express_1.Router)();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const { success } = medium_common_1.signupInput.safeParse(body);
        console.log(success);
        if (!success)
            return res.status(403).json({ msg: "Wrong inputs" });
        const newUser = yield prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name
            }
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.JWT_KEY);
        res.status(201).json({ msg: "User created successfully", token: token, id: newUser.id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating the user" });
    }
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const { success } = medium_common_1.signinInput.safeParse(req.body);
        if (!success)
            return res.status(403).json({ msg: "Wrong inputs" });
        const user = yield prisma.user.findFirst({
            where: {
                username,
                password
            }
        });
        if (!user) {
            return res.status(403).json({ msg: "Unauthorized" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_KEY);
        res.status(200).json({ msg: "Logged Successfully", token: token });
    }
    catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
}));
exports.default = router;
