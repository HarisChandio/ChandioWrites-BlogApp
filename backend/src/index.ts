import express, { Request, Response } from 'express';
import jwt from "jsonwebtoken"
require('dotenv').config()

import userRouter from "./routes/user"
import blogRouter from "./routes/blogs";

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter)
app.use("/api/v1", blogRouter)

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});