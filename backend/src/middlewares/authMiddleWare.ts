
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import { Request, Response, NextFunction } from "express";

declare module 'express-serve-static-core'{
    interface Request{
        userId: string
    }
}

interface CustomJWTPayload extends JwtPayload{
    id: string
}
export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization || "";
        const user = jwt.verify(authHeader, process.env.JWT_KEY!) as CustomJWTPayload
        if(user){
            req.userId = user.id 
        }
        next();
    } catch (error) {
        return res.status(500).json({ msg: "Error while verifying the token, server error" })
    }
}