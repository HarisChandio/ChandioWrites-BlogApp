"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const user_1 = __importDefault(require("./routes/user"));
const blogs_1 = __importDefault(require("./routes/blogs"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/user", user_1.default);
app.use("/api/v1", blogs_1.default);
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
